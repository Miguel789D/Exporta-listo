import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';

// Lazy load páginas pesadas (recharts, jspdf)
const DiagnosticPage = lazy(() => import('@/pages/DiagnosticPage').then(m => ({ default: m.DiagnosticPage })));
const ResultsPage = lazy(() => import('@/pages/ResultsPage').then(m => ({ default: m.ResultsPage })));

// Loading fallback
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </ErrorBoundary>
  );
}

export default App;
