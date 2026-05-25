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
    phone: companyInfo?.phone ?? '',
    email: companyInfo?.email ?? '',
    legalRepresentative: companyInfo?.legalRepresentative ?? '',
    ruc: companyInfo?.ruc ?? '',
    acceptInfo: companyInfo?.acceptInfo ?? false,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    sector?: string;
    ruc?: string;
    legalRepresentative?: string;
    email?: string;
    phone?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    // Validación de nombre
    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre de la empresa es obligatorio';
    }

    // Validación de sector
    if (!formData.sector) {
      newErrors.sector = 'Selecciona un sector';
    }

    // Validación de RUC
    if (!formData.ruc) {
      newErrors.ruc = 'El RUC es obligatorio';
    } else if (formData.ruc.length !== 11) {
      newErrors.ruc = 'El RUC debe tener exactamente 11 dígitos';
    }

    // Validación de representante legal
    if (!formData.legalRepresentative?.trim()) {
      newErrors.legalRepresentative = 'El representante legal es obligatorio';
    }

    // Validación de email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un correo electrónico válido';
    }

    // Validación de celular
    if (!formData.phone) {
      newErrors.phone = 'El número de celular es obligatorio';
    } else if (formData.phone.length < 9) {
      newErrors.phone = 'Introduce un número de celular válido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCompanyInfo(formData);
    nextStep();
  };

  const isValid =
    (formData.name?.trim() ?? '') !== '' &&
    formData.sector !== '' &&
    (formData.ruc?.trim() ?? '') !== '' &&
    (formData.legalRepresentative?.trim() ?? '') !== '' &&
    (formData.email?.trim() ?? '') !== '' &&
    (formData.phone?.trim() ?? '') !== '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuéntanos sobre tu empresa</CardTitle>
        <CardDescription>
          Esta información nos ayuda a personalizar las recomendaciones.
          Todos los campos son obligatorios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la empresa *</Label>
            <Input
              id="name"
              placeholder="Ej: Exportaciones ABC S.A.C."
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* RUC */}
          <div className="space-y-2">
            <Label htmlFor="ruc">RUC de la empresa *</Label>
            <Input
              id="ruc"
              placeholder="Ej: 20123456789"
              maxLength={11}
              value={formData.ruc}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ''); // Solo números
                setFormData({ ...formData, ruc: val });
                if (errors.ruc) setErrors({ ...errors, ruc: undefined });
              }}
            />
            {errors.ruc && (
              <p className="text-sm text-destructive">{errors.ruc}</p>
            )}
          </div>

          {/* Representante Legal */}
          <div className="space-y-2">
            <Label htmlFor="legalRepresentative">Representante legal de la entidad *</Label>
            <Input
              id="legalRepresentative"
              placeholder="Ej: Juan Pérez"
              value={formData.legalRepresentative}
              onChange={(e) => {
                setFormData({ ...formData, legalRepresentative: e.target.value });
                if (errors.legalRepresentative) setErrors({ ...errors, legalRepresentative: undefined });
              }}
            />
            {errors.legalRepresentative && (
              <p className="text-sm text-destructive">{errors.legalRepresentative}</p>
            )}
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ej: representante@empresa.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Número de Celular */}
          <div className="space-y-2">
            <Label htmlFor="phone">Número de celular *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: 987654321"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d+ ]/g, ''); // Números, espacios o '+'
                setFormData({ ...formData, phone: val });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
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

          {/* Acepta información */}
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/20">
            <input
              id="acceptInfo"
              type="checkbox"
              className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-primary accent-blue-600 cursor-pointer"
              checked={formData.acceptInfo}
              onChange={(e) => setFormData({ ...formData, acceptInfo: e.target.checked })}
            />
            <Label htmlFor="acceptInfo" className="text-sm font-normal text-muted-foreground cursor-pointer leading-relaxed select-none">
              Acepto recibir información relevante sobre exportación, tendencias y oportunidades comerciales específicas para mi sector e industria.
            </Label>
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
