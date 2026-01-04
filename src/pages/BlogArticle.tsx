import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, BookOpen, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n';
import { getArticleBySlug, getRelatedArticles } from '@/data/blogArticles';
import { toast } from 'sonner';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getLocalePath } = useLanguage();
  
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];

  if (!article) {
    return <Navigate to={getLocalePath('/blog')} replace />;
  }

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorTitle
    },
    "publisher": {
      "@type": "Organization",
      "name": "Numerology Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/favicon.ico`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/en/blog/${article.slug}`
    },
    "keywords": article.tags.join(', '),
    "articleSection": article.category,
    "wordCount": article.content.split(/\s+/).length
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${window.location.origin}/en`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${window.location.origin}/en/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `${window.location.origin}/en/blog/${article.slug}`
      }
    ]
  };

  // Convert markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let inTable = false;
    let tableRows: string[][] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
        elements.push(
          <ListTag key={elements.length} className={`${listType === 'ol' ? 'list-decimal' : 'list-disc'} list-inside space-y-2 my-4 text-muted-foreground`}>
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={elements.length} className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="text-left p-3 font-semibold text-foreground">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        flushList();
        return;
      }

      // Table handling
      if (trimmedLine.startsWith('|')) {
        flushList();
        inTable = true;
        const cells = trimmedLine.split('|').filter(c => c.trim()).map(c => c.trim());
        if (!trimmedLine.includes('---')) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="font-display text-2xl font-bold mt-10 mb-4 text-foreground">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="font-display text-xl font-semibold mt-8 mb-3 text-foreground">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Unordered lists
      if (trimmedLine.startsWith('- ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(trimmedLine.replace('- ', ''));
        return;
      }

      // Ordered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
        return;
      }

      // Regular paragraphs
      flushList();
      const formattedLine = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      elements.push(
        <p 
          key={index} 
          className="text-muted-foreground leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });

    flushList();
    flushTable();
    return elements;
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Numerology Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`${window.location.origin}/en/blog/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/en/blog/${article.slug}`} />
        <meta property="article:published_time" content={article.publishDate} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag, i) => (
          <meta key={i} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen pt-40 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to={getLocalePath('/')} className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={getLocalePath('/blog')} className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Back Button */}
          <Link to={getLocalePath('/blog')}>
            <Button variant="ghost" className="mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/20 text-primary border-0">
                {article.category}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {article.readTime} read
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gold-text leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{article.author}</div>
                  <div className="text-sm text-muted-foreground">{article.authorTitle}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <Button variant="outline" size="sm" onClick={handleShare} className="border-border">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {renderContent(article.content)}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-border">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 mystic-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1">About the Author</h3>
                <p className="text-primary font-medium mb-2">{article.author}</p>
                <p className="text-muted-foreground text-sm">{article.authorTitle}</p>
                <p className="text-muted-foreground text-sm mt-3">
                  Expert contributor to our numerology knowledge base with years of experience in personal and business numerology consultations.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 mt-16">
            <h2 className="font-display text-2xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((related) => (
                <Link key={related.id} to={getLocalePath(`/blog/${related.slug}`)}>
                  <Card className="mystic-card h-full hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-primary/20 text-primary border-0">
                        {related.category}
                      </Badge>
                      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {related.readTime}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default BlogArticle;
