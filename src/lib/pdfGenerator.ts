import jsPDF from 'jspdf';
import type { DiagnosticResult } from '@/types/diagnostic';
import { getEffortLabel } from './gapAnalysis';

export async function generatePDF(result: DiagnosticResult): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper functions
  const addText = (text: string, size: number = 12, style: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * (size * 0.4) + 4;
  };

  const addLine = () => {
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  const checkNewPage = (requiredSpace: number = 30) => {
    if (y > doc.internal.pageSize.getHeight() - requiredSpace) {
      doc.addPage();
      y = 20;
    }
  };

  // Header
  doc.setFillColor(59, 130, 246); // primary blue
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ExportaListo', margin, 25);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Diagnóstico de Export Readiness', margin, 35);

  y = 55;
  doc.setTextColor(0, 0, 0);

  // Company info
  if (result.companyInfo.name) {
    addText(`Empresa: ${result.companyInfo.name}`, 14, 'bold');
  }
  addText(`Sector: ${result.companyInfo.sector}`, 11);
  addText(`Fecha: ${new Date(result.completedAt).toLocaleDateString('es-PE')}`, 11);
  y += 5;
  addLine();

  // Score principal
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
  y += 15;

  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text(`${Math.round(result.totalScore)}/100`, pageWidth / 2, y, { align: 'center' });
  y += 15;

  doc.setFontSize(16);
  doc.text(result.levelLabel, pageWidth / 2, y, { align: 'center' });
  y += 25;

  // Descripción del nivel
  doc.setFont('helvetica', 'normal');
  addText(result.levelDescription, 10);
  y += 5;
  addLine();

  // Desglose por categoría
  addText('DESGLOSE POR CATEGORÍA', 14, 'bold');
  y += 5;

  for (const cat of result.categoryScores) {
    checkNewPage(20);

    // Nombre y porcentaje
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(cat.categoryName, margin, y);
    doc.text(`${Math.round(cat.percentage)}%`, pageWidth - margin, y, { align: 'right' });

    y += 6;

    // Barra de progreso
    const barWidth = contentWidth;
    const barHeight = 6;
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(margin, y, barWidth, barHeight, 2, 2, 'F');

    // Color según nivel
    const levelColors: Record<string, [number, number, number]> = {
      critical: [239, 68, 68],
      needs_work: [249, 115, 22],
      developing: [234, 179, 8],
      ready: [34, 197, 94],
      excellent: [59, 130, 246],
    };
    const color = levelColors[cat.level] || [100, 100, 100];
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(margin, y, (barWidth * cat.percentage) / 100, barHeight, 2, 2, 'F');

    y += 14;
  }

  y += 5;
  addLine();

  // Brechas prioritarias
  if (result.gaps.length > 0) {
    checkNewPage(40);
    addText('BRECHAS PRIORITARIAS', 14, 'bold');
    y += 5;

    // Solo mostrar las primeras 8 brechas en el PDF
    const gapsToShow = result.gaps.slice(0, 8);

    for (const gap of gapsToShow) {
      checkNewPage(40);

      // Severidad + título
      const severityEmoji: Record<string, string> = {
        critical: '[CRITICO]',
        high: '[ALTO]',
        medium: '[MEDIO]',
        low: '[BAJO]',
      };

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${severityEmoji[gap.severity]} ${gap.title}`, margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Categoría: ${gap.categoryName}`, margin, y);
      y += 4;

      // Descripción
      const descLines = doc.splitTextToSize(gap.description, contentWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 4 + 2;

      // Estado actual vs objetivo
      doc.setFontSize(9);
      doc.text(`Estado actual: ${gap.currentState}`, margin, y);
      y += 4;
      doc.text(`Objetivo: ${gap.targetState}`, margin, y);
      y += 4;
      doc.text(`Esfuerzo: ${getEffortLabel(gap.estimatedEffort)}`, margin, y);
      y += 8;

      // Recomendaciones
      if (gap.recommendations.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.text('Acciones:', margin, y);
        y += 4;
        doc.setFont('helvetica', 'normal');

        for (let i = 0; i < Math.min(gap.recommendations.length, 2); i++) {
          const rec = gap.recommendations[i];
          const recText = `${i + 1}. ${rec.action} (${rec.timeframe})`;
          const recLines = doc.splitTextToSize(recText, contentWidth - 5);
          doc.text(recLines, margin + 5, y);
          y += recLines.length * 4 + 2;
        }
      }

      y += 5;

      // Línea separadora entre gaps
      doc.setDrawColor(230);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;
    }

    if (result.gaps.length > 8) {
      addText(`... y ${result.gaps.length - 8} brechas más identificadas.`, 10);
    }
  }

  // Footer
  checkNewPage(30);
  y = doc.internal.pageSize.getHeight() - 25;
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text('Generado por ExportaListo - www.exportalisto.pe', pageWidth / 2, y, { align: 'center' });
  doc.text('Este diagnóstico es orientativo. Consulta con PROMPERÚ para asesoría especializada.', pageWidth / 2, y + 5, { align: 'center' });

  // Descargar
  const fileName = result.companyInfo.name
    ? `diagnostico-${result.companyInfo.name.toLowerCase().replace(/\s+/g, '-')}.pdf`
    : 'diagnostico-export-readiness.pdf';

  doc.save(fileName);
}
