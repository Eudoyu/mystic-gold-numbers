import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n';
import { getFeaturedArticles } from '@/data/blogArticles';

const BlogPreview = () => {
  const { getLocalePath } = useLanguage();
  const featuredArticles = getFeaturedArticles().slice(0, 3);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
            <BookOpen className="w-3 h-3 mr-2" />
            Expert Insights
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 gold-text">
            Learn from Numerology Experts
          </h2>
          <p className="text-muted-foreground text-lg">
            Dive deep into the mystical world of numbers with professionally written guides on business numerology, number meanings, and ancient wisdom.
          </p>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featuredArticles.map((article, index) => (
            <Link 
              key={article.id} 
              to={getLocalePath(`/blog/${article.slug}`)}
              className={`block ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <Card className={`mystic-card h-full hover:border-primary/50 transition-all duration-300 group overflow-hidden ${index === 0 ? 'flex flex-col' : ''}`}>
                <CardHeader className={`pb-3 ${index === 0 ? 'flex-grow' : ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary/20 text-primary border-0">
                      {article.category}
                    </Badge>
                    <Badge variant="outline" className="border-accent/50 text-accent">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <h3 className={`font-display font-semibold group-hover:text-primary transition-colors ${index === 0 ? 'text-2xl md:text-3xl mb-4' : 'text-lg'} line-clamp-2`}>
                    {article.title}
                  </h3>
                  <p className={`text-muted-foreground ${index === 0 ? 'text-base line-clamp-4' : 'text-sm line-clamp-2'}`}>
                    {article.excerpt}
                  </p>
                </CardHeader>
                <CardContent className={index === 0 ? 'mt-auto' : ''}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span>{article.author}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to={getLocalePath('/blog')}>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
