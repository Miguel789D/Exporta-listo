# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ExportaListo** is an MVP web application designed to help Latin American small and medium enterprises (MYPEs) assess their export readiness. The app provides a diagnostic questionnaire that evaluates company capabilities across six categories and generates a personalized report with gaps analysis and recommendations.

## Development Commands

All commands run from the root directory:

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript compile + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture

### Tech Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Zustand for state management (persisted to localStorage)
- React Hook Form + Zod for form validation
- shadcn/ui components (New York style) with Radix UI primitives
- React Router DOM v7 for routing
- Recharts for data visualization
- jsPDF for PDF report generation

### Directory Structure (`client/src/`)

```
├── pages/           # Route components (HomePage, DiagnosticPage, ResultsPage)
├── components/
│   ├── ui/          # shadcn/ui components (button, card, form, select, etc.)
│   ├── diagnostic/  # Wizard and question components
│   └── results/     # Score display, category breakdown, gap report
├── store/           # Zustand store (diagnosticStore.ts)
├── lib/             # Business logic
│   ├── scoring.ts   # Score calculation and level determination
│   ├── gapAnalysis.ts # Gap identification and recommendations
│   └── pdfGenerator.ts # PDF report generation
├── data/            # Static data
│   ├── categories.ts    # 6 export readiness categories with weights
│   ├── questions.ts     # Diagnostic questions per category
│   └── recommendations.ts # Gap-specific recommendations
└── types/           # TypeScript type definitions
    └── diagnostic.ts # Core types (CategoryId, Answer, Gap, DiagnosticResult, etc.)
```

### Key Patterns

**Diagnostic Flow:**

1. User provides company info (sector, size)
2. Multi-step wizard presents questions by category (6 categories)
3. Answers stored in Zustand with localStorage persistence
4. On completion, `calculateDiagnosticResult()` computes weighted scores
5. `analyzeGaps()` identifies deficiencies and generates recommendations
6. Results page shows score breakdown and exportable PDF report

**Scoring System:**

- Each category has a weight (sums to 1.0)
- Questions have individual weights within categories
- Total score (0-100) determines export readiness level:
  - `not_ready` (0-25), `early_stage` (26-50), `developing` (51-70), `ready` (71-85), `export_pro` (86-100)

**Path Aliases:**

- `@/` maps to `src/` (configured in vite.config.ts and tsconfig.app.json)

## Adding shadcn/ui Components

The project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add <component-name>
```

Configuration is in `components.json` (New York style, Lucide icons).
