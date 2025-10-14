'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { use } from 'react';

export default function ReadChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const router = useRouter();
  const { chapter } = use(params);

  const images = [
    'https://gg.asuracomic.net/storage/media/182960/conversions/02-optimized.webp',
    'https://gg.asuracomic.net/storage/media/183029/conversions/03-optimized.webp',
    'https://gg.asuracomic.net/storage/media/183096/conversions/04-optimized.webp',
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-white">
        <div className="relative h-16 flex items-center justify-between px-4">
          {/* Left-aligned Home button */}
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>

          {/* Centered title */}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold tracking-tight">
            Chapter {chapter}
          </h1>

          {/* Right-aligned Translate button */}
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.push('/upload')}
          >
            <ArrowRight className="w-4 h-4" />
            Translate Another Chapter
          </Button>
        </div>
      </header>

      {/* Main reader */}
      <main className="flex-1 flex flex-col items-center">
        {images.map((src, index) => (
          <div key={index} className="w-full flex justify-center">
            {/* <Image
              src={src}
              alt={`Page ${index + 1}`}
              width={800}
              height={1200}
              className="w-full max-w-3xl object-contain select-none"
              priority={index === 0}
            /> */}
            <img
              key={index}
              src={src}
              alt={`Page ${index + 1}`}
              className="select-none max-w-full"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="max-w-5xl mx-auto px-4 flex justify-center">
          <Button
            onClick={() => router.push('/upload')}
            size="lg"
            className="text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            Translate Another Chapter
          </Button>
        </div>
      </footer>
    </div>
  );
}
