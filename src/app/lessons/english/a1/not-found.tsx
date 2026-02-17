import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <Card className="max-w-md mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6">🇬🇧</div>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Урок не найден
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Запрашиваемый урок английского языка не существует или был удален.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link href="/lessons/english/a1">
              <Button className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700">
                <BookOpen className="w-4 h-4 mr-2" />
                К урокам A1
              </Button>
            </Link>
            
            <Link href="/lessons">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Все языки
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}