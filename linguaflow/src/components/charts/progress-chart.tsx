'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface ProgressData {
  date: string
  xp: number
  lessonsCompleted: number
  wordsLearned: number
}

interface ProgressChartProps {
  data: ProgressData[]
}

export function ProgressChart({ data }: ProgressChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      {/* XP Chart */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Очки опыта (XP)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <Tooltip 
              labelFormatter={(value) => formatDate(value as string)}
              formatter={(value: number | undefined) => [`${value || 0} XP`, 'Опыт']}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="xp" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Lessons and Words Chart */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Уроки и слова</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <Tooltip 
              labelFormatter={(value) => formatDate(value as string)}
              formatter={(value: number | undefined, name: string) => [
                value || 0, 
                name === 'lessonsCompleted' ? 'Уроков' : 'Слов'
              ]}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar 
              dataKey="lessonsCompleted" 
              fill="hsl(var(--primary))" 
              radius={[2, 2, 0, 0]}
              name="lessonsCompleted"
            />
            <Bar 
              dataKey="wordsLearned" 
              fill="hsl(var(--muted-foreground))" 
              radius={[2, 2, 0, 0]}
              name="wordsLearned"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}