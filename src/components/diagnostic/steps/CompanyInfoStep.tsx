import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { CompanyInfo } from '@/types/diagnostic';

const SECTORS = [
  'Agroindustria',
  'Textil y Confecciones',
  'Artesanía',
  'Pesca y Acuicultura',
  'Manufactura',
  'Alimentos Procesados',
  'Cosméticos y Cuidado Personal',
  'Joyería',
  'Madera y Derivados',
  'Servicios',
  'Tecnología',
  'Otro',
];

export function CompanyInfoStep() {
  const { companyInfo, setCompanyInfo, nextStep } = useDiagnosticStore();

  const [formData, setFormData] = useState<CompanyInfo>({
    name: companyInfo?.name ?? '',
    sector: companyInfo?.sector ?? '',
    size: companyInfo?.size ?? 'micro',
    country: companyInfo?.country ?? 'Perú',
  });

  const [errors, setErrors] = useState<{ sector?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!formData.sector) {
      setErrors({ sector: 'Selecciona un sector' });
      return;
    }

    setCompanyInfo(formData);
    nextStep();
  };

  const isValid = formData.sector !== '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuéntanos sobre tu empresa</CardTitle>
        <CardDescription>
          Esta información nos ayuda a personalizar las recomendaciones.
          Solo el sector es obligatorio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la empresa (opcional)</Label>
            <Input
              id="name"
              placeholder="Ej: Exportaciones ABC S.A.C."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Sector */}
          <div className="space-y-2">
            <Label htmlFor="sector">Sector / Industria *</Label>
            <Select
              value={formData.sector}
              onValueChange={(value) => {
                setFormData({ ...formData, sector: value });
                setErrors({});
              }}
            >
              <SelectTrigger id="sector">
                <SelectValue placeholder="Selecciona un sector" />
              </SelectTrigger>
              <SelectContent>
                {SECTORS.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sector && (
              <p className="text-sm text-destructive">{errors.sector}</p>
            )}
          </div>

          {/* Tamaño */}
          <div className="space-y-3">
            <Label>Tamaño de empresa</Label>
            <RadioGroup
              value={formData.size}
              onValueChange={(value) =>
                setFormData({ ...formData, size: value as CompanyInfo['size'] })
              }
              className="space-y-2"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="micro" id="micro" />
                <Label htmlFor="micro" className="font-normal cursor-pointer">
                  Micro (1-10 empleados)
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="font-normal cursor-pointer">
                  Pequeña (11-50 empleados)
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="font-normal cursor-pointer">
                  Mediana (51-250 empleados)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* País */}
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
            >
              <SelectTrigger id="country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Perú">Perú</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Link>
            </Button>
            <Button type="submit" className="flex-1 gap-2" disabled={!isValid}>
              Comenzar Diagnóstico
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
