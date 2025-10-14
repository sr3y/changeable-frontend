'use client';

import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, LinkIcon, ArrowLeft, ArrowRight, FileImage, X, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [mangaUrl, setMangaUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files).filter(
        (file) => file.type.startsWith('image/') || file.type === 'application/pdf' || file.type === 'application/zip'
      );

      if (files.length > 0) {
        setUploadedFiles((prev) => [...prev, ...files]);
      }
    },
    []
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceed = uploadedFiles.length > 0 || mangaUrl.trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full px-4 py-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Select Your Source</h1>
            <p className="text-muted-foreground">
              Upload manga pages or provide a website link
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Selection */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'
            }`}
          >
            <Upload className="w-4 h-4 mr-2 inline" />
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'url'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-border'
            }`}
          >
            <LinkIcon className="w-4 h-4 mr-2 inline" />
            Website Link
          </button>
        </div>

        {activeTab === 'upload' ? (
          <div className="space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Manga Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-primary/2'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.zip"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">
                        Drag and drop your manga files here
                      </p>
                      <p className="text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports: JPG, PNG, PDF, ZIP • Max 50MB per file
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-[3/4] rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileImage className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-2 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Manga Website Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="manga-url">Website URL</Label>
                <Input
                  id="manga-url"
                  type="url"
                  placeholder="https://example.com/manga/chapter-1"
                  value={mangaUrl}
                  onChange={(e) => setMangaUrl(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Enter the URL of the manga chapter or page you want to translate
                </p>
              </div>

              {mangaUrl && (
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white border border-border flex items-center justify-center">
                      <Globe className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">Manga Website</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {mangaUrl}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Supported Sites</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• MangaDex, MangaPlus, Viz Media</li>
                  <li>• Crunchyroll Manga, ComiXology</li>
                  <li>• And many other popular manga sites</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="flex justify-between items-center pt-8">
          <Button variant="outline" onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={() => router.push('/progress')}
            disabled={!canProceed}
            size="lg"
            className="text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            Start Translation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}