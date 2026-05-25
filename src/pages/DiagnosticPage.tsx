import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DiagnosticWizard } from '@/components/diagnostic/DiagnosticWizard';
import { useDiagnosticStore } from '@/store/diagnosticStore';

export function DiagnosticPage() {
  const navigate = useNavigate();
  const { isCompleted, result } = useDiagnosticStore();

  useEffect(() => {
    if (isCompleted && result) {
      navigate('/results');
    }
  }, [isCompleted, result, navigate]);

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <DiagnosticWizard />
      </div>
    </Layout>
  );
}
