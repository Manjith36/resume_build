import { useState, useLayoutEffect, type RefObject } from 'react';

export function usePagination(containerRef: RefObject<HTMLDivElement | null>, deps: any[]) {
  const [numPages, setNumPages] = useState(1);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const A4_HEIGHT = 1123;
    const TOP_MARGIN_ON_NEW_PAGE = 72; // 72px margin at the top of a new page (1.5x the 48px side margins)

    // 1. Reset any previously added margins to calculate naturally
    const breakableElements = Array.from(
      container.querySelectorAll('.experience-card, .education-card, h2, h3, .project-card')
    ) as HTMLElement[];
    
    breakableElements.forEach(el => {
      el.style.marginTop = '';
    });

    // 2. Iterate and push elements that cross the page boundary
    // We must do this sequentially because pushing one element affects all subsequent elements
    for (let i = 0; i < breakableElements.length; i++) {
      const el = breakableElements[i];
      
      // Calculate position relative to the container
      const containerRect = container.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      
      // The container might be scaled via CSS transform, so we must un-scale the measurements
      const scale = containerRect.width / container.offsetWidth;
      
      const relativeTop = (rect.top - containerRect.top) / scale;
      const relativeBottom = relativeTop + (rect.height / scale);
      
      const startPage = Math.floor(relativeTop / A4_HEIGHT);
      const endPage = Math.floor(relativeBottom / A4_HEIGHT);
      
      // If the element crosses a page boundary, push it to the next page
      if (endPage > startPage && startPage >= 0) {
        const nextPageBoundary = (startPage + 1) * A4_HEIGHT;
        const pushAmount = nextPageBoundary - relativeTop;
        
        // Add TOP_MARGIN_ON_NEW_PAGE so it doesn't stick exactly to the very top edge of the new page
        el.style.marginTop = `${pushAmount + TOP_MARGIN_ON_NEW_PAGE}px`;
      }
      
      // Also, prevent "orphaned" headings: 
      // If an h2 or h3 is near the bottom of a page (e.g. within 60px of the boundary), 
      // push it to the next page so it stays with its content.
      if (el.tagName === 'H2' || el.tagName === 'H3') {
        const updatedRect = el.getBoundingClientRect();
        const updatedTop = (updatedRect.top - containerRect.top) / scale;
        const pageBoundary = Math.floor(updatedTop / A4_HEIGHT) * A4_HEIGHT + A4_HEIGHT;
        
        if (pageBoundary - updatedTop < 60) {
           const pushAmount = pageBoundary - updatedTop;
           el.style.marginTop = `${pushAmount + TOP_MARGIN_ON_NEW_PAGE}px`;
        }
      }
    }
    
    // 3. Final measurement to determine total number of pages needed
    const finalRect = container.getBoundingClientRect();
    const finalScale = finalRect.width / container.offsetWidth;
    setNumPages(Math.max(1, Math.ceil((finalRect.height / finalScale) / A4_HEIGHT)));
    
  }, deps);

  return numPages;
}
