import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, polar-signature',
};

// Verify Polar webhook signature
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return signature === expectedSignature || signature === `sha256=${expectedSignature}`;
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get('POLAR_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('POLAR_WEBHOOK_SECRET not configured');
      return new Response(JSON.stringify({ error: 'Webhook secret not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get('polar-signature') || req.headers.get('x-polar-signature') || '';

    // Verify signature
    const isValid = await verifySignature(body, signature, webhookSecret);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const event = JSON.parse(body);
    console.log('Polar webhook event:', event.type);

    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle different event types
    switch (event.type) {
      case 'order.created': {
        const order = event.data;
        const customerId = order.customer_id;
        const customerEmail = order.customer?.email;
        const productPriceType = order.product_price?.type; // 'one_time' or 'recurring'
        
        console.log(`Order created: ${order.id}, type: ${productPriceType}, customer: ${customerEmail}`);

        if (!customerEmail) {
          console.error('No customer email in order');
          break;
        }

        // Find user by email
        const { data: users, error: userError } = await supabase.auth.admin.listUsers();
        if (userError) {
          console.error('Error finding users:', userError);
          break;
        }

        const user = users.users.find(u => u.email === customerEmail);
        if (!user) {
          console.error('User not found for email:', customerEmail);
          break;
        }

        if (productPriceType === 'one_time') {
          // Sprint 72H purchase
          const sprintExpiresAt = new Date();
          sprintExpiresAt.setHours(sprintExpiresAt.getHours() + 72);

          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              plan_type: 'sprint',
              sprint_expires_at: sprintExpiresAt.toISOString(),
              polar_customer_id: customerId,
            })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating profile for Sprint:', updateError);
          } else {
            console.log(`Sprint 72H activated for user ${user.id} until ${sprintExpiresAt}`);
          }
        } else if (productPriceType === 'recurring') {
          // Pro subscription
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              plan_type: 'pro',
              polar_customer_id: customerId,
              polar_subscription_id: order.subscription_id,
            })
            .eq('id', user.id);

          if (updateError) {
            console.error('Error updating profile for Pro:', updateError);
          } else {
            console.log(`Pro subscription activated for user ${user.id}`);
          }
        }
        break;
      }

      case 'subscription.updated': {
        const subscription = event.data;
        console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`);
        // Handle plan changes if needed
        break;
      }

      case 'subscription.canceled': {
        const subscription = event.data;
        console.log(`Subscription canceled: ${subscription.id}`);
        // User keeps access until period end - we'll handle revocation separately
        break;
      }

      case 'subscription.revoked': {
        const subscription = event.data;
        const customerId = subscription.customer_id;
        
        console.log(`Subscription revoked: ${subscription.id}`);

        // Find user by polar_customer_id and downgrade to free
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            plan_type: 'free',
            polar_subscription_id: null,
          })
          .eq('polar_customer_id', customerId);

        if (updateError) {
          console.error('Error revoking subscription:', updateError);
        } else {
          console.log(`Subscription revoked for customer ${customerId}`);
        }
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
