import { useCallback, useState, type RefObject } from 'react';

/**
 * Custom hook for exporting a DOM element as a multi-page PDF
 * using html2pdf.js.
 *
 * Features:
 * - Awaits document.fonts.ready before capture
 * - Temporarily removes preview scaling (transform)
 * - Uses pagebreak mode: ['css', 'legacy'] for multi-page support
 * - High DPI (scale: 3) for print-quality output
 */
export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPdf = useCallback(
    async (elementRef: RefObject<HTMLElement | null>, filename: string = 'resume.pdf') => {
      const element = elementRef.current;
      if (!element) return;

      setIsExporting(true);

      try {
        // Wait for all fonts to be loaded
        await document.fonts.ready;

        // Store and remove preview scaling
        const prevTransform = element.style.transform;
        const prevTransformOrigin = element.style.transformOrigin;
        const prevWidth = element.style.width;
        element.style.transform = 'none';
        element.style.transformOrigin = '';
        element.style.width = '794px'; // Exact A4 width at 96 DPI

        // Dynamic import to avoid SSR issues
        const html2pdf = (await import('html2pdf.js')).default;

        await html2pdf()
          .set({
            margin: 0,
            filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
              scale: 3,
              useCORS: true,
              logging: false,
              letterRendering: true,
            },
            jsPDF: {
              unit: 'mm',
              format: 'a4',
              orientation: 'portrait' as const,
            },
            pagebreak: {
              mode: ['css', 'legacy'],
            },
          })
          .from(element)
          .save();

        // Restore preview scaling
        element.style.transform = prevTransform;
        element.style.transformOrigin = prevTransformOrigin;
        element.style.width = prevWidth;
      } catch (err) {
        console.error('PDF export failed:', err);
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  return { exportPdf, isExporting };
}
