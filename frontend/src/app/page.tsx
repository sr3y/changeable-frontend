'use client';

import Image from "next/image";
import { Upload, Link, Eye, Download, ArrowRight, BookOpen, Languages, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const handleNavigate = (screen: string) => {
    console.log(`Navigate to ${screen}`);
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="w-full px-4 py-6 border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Translateable</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => handleNavigate('dashboard')}
            className="hidden sm:flex"
          >
            My Translations
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-purple-50/30">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-purple-600 text-sm">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Translation
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Read any manga,{' '}
                  <span className="text-gradient">
                    in your language
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Upload manga pages or link to websites for instant AI translation. 
                  Preserve the original art while enjoying stories in your preferred language.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => handleNavigate('source')}
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 group text-white"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Manga Pages
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleNavigate('source')}
                  className="border-2 hover:bg-primary/5"
                >
                  <Link className="w-5 h-5 mr-2" />
                  Link to Website
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGFuaW1lJTIwY2hhcmFjdGVyJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1OTExMjg4MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Manga character illustration"
                  className="w-full h-full object-cover"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center shadow-lg animate-bounce">
                <Languages className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your manga translated in just three simple steps. Our AI preserves the original artwork while providing accurate translations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative border-2 hover:border-primary/20 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Upload</h3>
                <p className="text-muted-foreground">
                  Upload your manga pages or paste a link to your favorite manga website. We support various formats.
                </p>
              </CardContent>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-orange-500 rounded-full hidden md:flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Card>

            <Card className="relative border-2 hover:border-primary/20 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Languages className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Translate</h3>
                <p className="text-muted-foreground">
                  Our AI extracts text from speech bubbles and translates it while preserving the original formatting and style.
                </p>
              </CardContent>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-orange-500 rounded-full hidden md:flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Read & Download</h3>
                <p className="text-muted-foreground">
                  Preview your translated manga with side-by-side comparison, then download or read online in your preferred format.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-purple-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Perfect Translation,{' '}
                <span className="text-primary">Original Art</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">AI-Powered OCR</h4>
                    <p className="text-muted-foreground">Advanced text recognition that understands manga formatting and speech bubbles.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <Languages className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Multi-Language Support</h4>
                    <p className="text-muted-foreground">Translate between dozens of languages with context-aware AI translation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <Download className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Multiple Formats</h4>
                    <p className="text-muted-foreground">Download as PDF, images, or read online with our built-in manga reader.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1620328038775-6e8c620277b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNvbWljJTIwYm9vayUyMHBhZ2VzfGVufDF8fHx8MTc1OTExMDIzMXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Japanese comic book pages"
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Translating?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of manga fans who are already enjoying their favorite stories in their native language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => handleNavigate('source')}
              className="bg-white text-primary hover:bg-white/90"
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Translating Now
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => handleNavigate('dashboard')}
              className="border-2 border-white text-primary hover:bg-white/90"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
