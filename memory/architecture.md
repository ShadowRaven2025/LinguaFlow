# LinguaFlow Architecture

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Auth, Database)
- **Deployment**: Vercel

## Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── api/          # API routes
│   ├── lessons/      # Language lesson pages
│   ├── dashboard/    # User dashboard
│   └── ...
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── lib/              # Utilities & Supabase client
└── types/            # TypeScript types
```

## Key Features
- Multi-language lessons (English A1-B2, German A1-B2)
- Flashcard system with SRS
- Achievements & gamification
- Progress tracking
- Dark/light theme
