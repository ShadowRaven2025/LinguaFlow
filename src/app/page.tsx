'use client'

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchDialog } from "@/components/search/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Brain, Trophy, Search, Sparkles, Target, Users, Zap, Star, ArrowRight, Play, GraduationCap, Rocket, ChevronRight, Sparkle, Volume2 } from "lucide-react";

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio('/music/Die Bots - Was wollen wir trinken.mp3');
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playGermanMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const playEnglishAudio = () => {
    const englishAudio = new Audio('/music/3GGqgH1JsC6oPh8XMpE2yNcA96S5XIyZgZ-s1FBdr5DVlJHmFwU2kdX8hqhPWogi0nhjk6u7g734PaUbJDridK8TzsjISP9TMkp5Df4Nx9jZsac2WANicDZAMaczIUx84sTiLZWNAsYvLDE0XwYfvpo_G3FkF73UnN9K7c1jSXj6v45DMA.mp3');
    englishAudio.play().catch(console.error);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg"></div>
      
      {/* Header */}
      <header className="relative z-40 bg-slate-900 border-b border-slate-700 sticky top-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-300">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                LinguaFlow
              </span>
              <div className="text-xs text-muted-foreground">Изучай с удовольствием</div>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 hover:bg-secondary/80 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-muted-foreground">Поиск</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <ThemeToggle />
            <Link href="/lessons">
              <Button variant="ghost" size="sm" className="hover:bg-secondary/80 transition-colors">Уроки</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 button-glow">Дашборд</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-normal bg-secondary/50 backdrop-blur-sm">
              <Sparkle className="w-3.5 h-3.5 mr-1.5 text-primary animate-pulse" />
              Новая эра изучения языков
            </Badge>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">
                Изучайте языки
              </span>
              <br />
              <span className="text-gradient flex items-center justify-center gap-3">
                интерактивно
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse" />
              </span>
            </h1>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Революционная платформа для изучения английского и немецкого языков 
              с ИИ-помощником, геймификацией и персонализированным подходом
            </p>
          </div>
          
          <div className="animate-in-up opacity-0 flex flex-col sm:flex-row gap-4 justify-center mb-16" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <Link href="/lessons">
              <Button size="lg" className="text-base px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 button-glow">
                <Play className="w-5 h-5 mr-2" />
                Начать изучение
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-base px-8 h-12 hover:bg-secondary/80 hover:scale-105 transition-all duration-300">
                <Target className="w-5 h-5 mr-2" />
                Мой прогресс
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-in-up opacity-0 flex justify-center gap-8 md:gap-16" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Уроков</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Упражнений</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Уровня</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Card className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Интерактивные уроки</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Изучайте язык через разнообразные упражнения с мгновенной обратной связью
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Тесты</Badge>
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Диалоги</Badge>
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Теория</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">ИИ-помощник</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Персонализированное обучение с адаптивными алгоритмами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Адаптация</Badge>
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Анализ</Badge>
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Рекомендации</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Геймификация</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Получайте очки опыта, достижения и соревнуйтесь с друзьями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">XP</Badge>
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Достижения</Badge>
                <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">Рейтинг</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Languages */}
        <div className="text-center mb-16">
          <div className="animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Доступные языки
            </h2>
            <p className="text-muted-foreground mb-10">
              Выберите язык и начните свое путешествие
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/lessons/english/a1" className="block opacity-0 animate-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }} onClick={playEnglishAudio}>
              <Card className="group border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full card-hover">
                <CardHeader className="text-center pb-2">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                    🇬🇧
                    <Volume2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">Английский язык</CardTitle>
                  <CardDescription>
                    От начального до продвинутого уровня
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">A1-B2</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lessons/german/a1" className="block opacity-0 animate-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }} onClick={playGermanMusic}>
              <Card className="group border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full card-hover">
                <CardHeader className="text-center pb-2">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                    🇩🇪
                    <Volume2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">Немецкий язык</CardTitle>
                  <CardDescription>
                    Систематическое изучение грамматики и лексики
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">A1-B2</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="opacity-0 animate-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <Card className="text-center border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse"></div>
            <CardContent className="p-8 md:p-12 relative">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Готовы начать?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Присоединяйтесь к тысячам студентов, которые уже изучают языки с LinguaFlow
              </p>
              <Link href="/lessons">
                <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 button-glow">
                  <Users className="w-5 h-5 mr-2" />
                  Начать бесплатно
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-8 mt-16 border-t border-border/50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">LinguaFlow</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Изучайте языки с удовольствием
          </p>
          <p className="text-xs text-muted-foreground/70">
            © 2024 LinguaFlow. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
