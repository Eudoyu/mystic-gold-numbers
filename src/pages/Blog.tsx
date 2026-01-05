import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowRight, BookOpen, Sparkles, Search, X, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/i18n';
import { blogArticles, getFeaturedArticles, getAllCategories } from '@/data/blogArticles';

const Blog = () => {
  const { getLocalePath } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const featuredArticles = getFeaturedArticles();
  const categories = getAllCategories();
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogArticles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);
  
  // Filter articles based on search, category, and tags
  const filteredArticles = useMemo(() => {
    return blogArticles.filter(article => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.author.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      // Category filter
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => article.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags]);
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTags([]);
  };
  
  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0;

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
        <section className="container mx-auto px-4 mb-12">
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

        {/* Search & Filter Section */}
        <section className="container mx-auto px-4 mb-8">
          <div className="mystic-card p-4 md:p-6">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles by title, content, author, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-background border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Filter Toggle & Active Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-border"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-primary text-primary-foreground text-xs px-1.5">
                    {(selectedCategory ? 1 : 0) + selectedTags.length}
                  </Badge>
                )}
              </Button>
              
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear all
                </Button>
              )}
              
              {/* Active filter badges */}
              {selectedCategory && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => setSelectedCategory(null)}
                >
                  {selectedCategory}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            
            {/* Expandable Filters */}
            {showFilters && (
              <div className="space-y-4 pt-4 border-t border-border">
                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className={selectedCategory === null ? "bg-primary text-primary-foreground" : "border-border hover:bg-muted"}
                    >
                      All
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
                </div>
                
                {/* Tags Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Tags</h4>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-2 py-1 rounded-full transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Articles - only show when no filters active */}
        {!hasActiveFilters && (
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
        )}

        {/* All Articles */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold">
              {hasActiveFilters 
                ? `${filteredArticles.length} ${filteredArticles.length === 1 ? 'Result' : 'Results'}`
                : 'All Articles'}
            </h2>
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          ) : (
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
          )}
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