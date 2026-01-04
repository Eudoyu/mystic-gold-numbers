import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n';
import { blogArticles, getFeaturedArticles, getAllCategories } from '@/data/blogArticles';

const Blog = () => {
  const { getLocalePath } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const featuredArticles = getFeaturedArticles();
  const categories = getAllCategories();
  
  const filteredArticles = selectedCategory 
    ? blogArticles.filter(article => article.category === selectedCategory)
    : blogArticles;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Numerology Insights - Expert Articles & Guides",
    "description": "Professional numerology articles covering business name analysis, number meanings, and ancient wisdom from Pythagorean, Chaldean, and Gematria systems.",
    "url": `${window.location.origin}/en/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Numerology Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/favicon.ico`
      }
    },
    "blogPost": blogArticles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.publishDate,
      "author": {
        "@type": "Person",
        "name": article.author,
        "jobTitle": article.authorTitle
      },
      "url": `${window.location.origin}/en/blog/${article.slug}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Numerology Blog: Expert Articles on Number Meanings & Business Success</title>
        <meta name="description" content="Discover expert numerology insights, business name analysis guides, and in-depth articles on Pythagorean, Chaldean, and Gematria systems. Learn from certified numerologists." />
        <link rel="canonical" href={`${window.location.origin}/en/blog`} />
        <meta property="og:title" content="Numerology Blog: Expert Articles on Number Meanings & Business Success" />
        <meta property="og:description" content="Professional numerology articles covering business name analysis, number meanings, and ancient wisdom." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/en/blog`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen pt-40 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
              <BookOpen className="w-3 h-3 mr-2" />
              Numerology Insights
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-text">
              Expert Numerology Articles
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive deep into the mystical world of numbers with our professionally written guides on business numerology, number meanings, and ancient wisdom traditions.
            </p>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">Featured Articles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.slice(0, 3).map((article) => (
              <Link key={article.id} to={getLocalePath(`/blog/${article.slug}`)}>
                <Card className="mystic-card h-full hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  <CardHeader className="pb-3">
                    <Badge className="w-fit mb-3 bg-primary/20 text-primary border-0">
                      {article.category}
                    </Badge>
                    <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="container mx-auto px-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-primary text-primary-foreground" : "border-border hover:bg-muted"}
            >
              All Articles
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary text-primary-foreground" : "border-border hover:bg-muted"}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold mb-8">
            {selectedCategory ? `${selectedCategory} Articles` : 'All Articles'}
          </h2>
          
          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <Link key={article.id} to={getLocalePath(`/blog/${article.slug}`)}>
                <Card className="mystic-card hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-primary/20 text-primary border-0">
                            {article.category}
                          </Badge>
                          {article.featured && (
                            <Badge variant="outline" className="border-accent text-accent">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.publishDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {article.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                            >
                              <Tag className="w-3 h-3 inline mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Button variant="ghost" className="group-hover:text-primary group-hover:bg-primary/10">
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="container mx-auto px-4 mt-20">
          <div className="mystic-card p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 gold-text">
              Learn Numerology from Certified Experts
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg mb-4">
                Our blog features in-depth articles written by certified numerologists, researchers, and practitioners with decades of combined experience. Whether you're exploring numerology for personal growth, business success, or spiritual development, our expert guides provide the knowledge you need.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Expert Articles</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Numerology Systems</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
