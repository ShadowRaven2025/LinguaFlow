import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Страница не найдена</div>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="max-w-lg mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-12 text-center">
            <div className="text-8xl mb-8">🤔</div>
            
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Страница не найдена
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              Похоже, что страница, которую вы ищете, не существует или была перемещена. 
              Не волнуйтесь, давайте найдем то, что вам нужно!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
                  <Home className="w-4 h-4 mr-2" />
                  На главную
                </Button>
              </Link>
              
              <Link href="/lessons">
                <Button variant="outline" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                  <Search className="w-4 h-4 mr-2" />
                  К урокам
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Нужна помощь? Попробуйте:
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
                  Дашборд
                </Link>
                <Link href="/achievements" className="text-sm text-blue-600 hover:underline">
                  Достижения
                </Link>
                <Link href="/flashcards" className="text-sm text-blue-600 hover:underline">
                  Карточки
                </Link>
                <Link href="/exercises" className="text-sm text-blue-600 hover:underline">
                  Упражнения
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}