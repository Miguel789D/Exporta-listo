import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Globe className="h-6 w-6" />
          <span>ExportaListo</span>
        </Link>
      </div>
    </header>
  );
}
