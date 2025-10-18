'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Plus,
  Search,
  Download,
  Eye,
  Trash2,
  Edit,
  BookOpen,
  Calendar,
  Clock,
  Filter,
} from 'lucide-react';

interface Translation {
  id: string;
  title: string;
  thumbnail: string;
  pages: number;
  language: string;
  dateCreated: string;
  status: 'completed' | 'processing' | 'error';
  size: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing'>('all');

  const translations: Translation[] = [
    {
      id: '1',
      title: 'Attack on Titan - Chapter 139',
      thumbnail:
        'https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGFuaW1lJTIwY2hhcmFjdGVyJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc1OTExMjg4MHww&ixlib=rb-4.1.0&q=80&w=1080',
      pages: 45,
      language: 'Japanese → English',
      dateCreated: '2024-01-15',
      status: 'completed',
      size: '12.5 MB',
    }
  ];

  const filteredTranslations = translations.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Translation['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: Translation['status']) => {
    switch (status) {
      case 'completed':
        return <BookOpen className="w-3 h-3" />;
      case 'processing':
        return <Clock className="w-3 h-3 animate-spin" />;
      case 'error':
        return <Trash2 className="w-3 h-3" />;
      default:
        return <BookOpen className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full px-4 py-6 border-b border-border bg-white space-y-8">
        <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center justify-between">
            {/* Left: Back Button */}
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
            </Button>

            {/* Center: Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center pt-10 py-2">
                <h1 className="text-3xl font-bold">My Translations</h1>
                <p className="text-muted-foreground text-sm">
                Manage and access all your translated manga
                </p>
            </div>

            {/* Right: New Translation */}
            <Button
                onClick={() => router.push('/upload')}
                className="text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
                <Plus className="w-4 h-4 mr-2" />
                New Translation
            </Button>
            </div>
        </div>

        {/* Bottom Row: Search & Filter */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
                placeholder="Search translations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
            />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                {(["all", "completed", "processing"] as const).map((key) => (
                <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    filter === key
                        ? "bg-white shadow-sm font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
                ))}
            </div>
            </div>
        </div>
      </header>


      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pt-1 pb-6">
        <h1 className="text-sm font-semibold text-gray-500 text-left py-2">
            {filteredTranslations.length} {filteredTranslations.length === 1 ? 'result' : 'results'}
        </h1>
        {filteredTranslations.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {searchQuery ? 'No matching translations found' : 'No translations yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start by translating your first manga'}
              </p>
              <Button onClick={() => router.push('/upload')} className="text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Translation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTranslations.map((translation) => (
              <Card key={translation.id} className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                    <img
                      src={translation.thumbnail}
                      alt={translation.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        translation.status
                      )}`}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(translation.status)}
                        {translation.status}
                      </div>
                    </div>

                    {/* Quick Actions on Hover */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        className="flex-1 bg-white/90 text-black hover:bg-white"
                        onClick={() => router.push('/reader')}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {translation.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>{translation.pages} pages</span>
                        <span>{translation.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(translation.dateCreated).toLocaleDateString()}
                      </div>
                      <div className="text-primary font-medium">{translation.language}</div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push('/reader')}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Read
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
