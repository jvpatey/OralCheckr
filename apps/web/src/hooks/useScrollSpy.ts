import { useState, useEffect, useRef } from "react";

/**
 * Modern scroll spy using Intersection Observer API
 * Much more reliable and performant than scroll event listeners
 */
export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Map to track which sections are currently visible
    const visibleSections = new Map<string, number>();

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;

          if (entry.isIntersecting) {
            // Section is visible - store its intersection ratio
            visibleSections.set(sectionId, entry.intersectionRatio);
          } else {
            // Section is not visible - remove it
            visibleSections.delete(sectionId);
          }
        });

        // Find the most visible section
        let maxRatio = 0;
        let mostVisibleSection = sectionIds[0];

        visibleSections.forEach((ratio, sectionId) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = sectionId;
          }
        });

        // Update active section if it changed
        if (mostVisibleSection !== activeSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        // Trigger when section is visible with multiple thresholds for accuracy
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // Account for fixed navbar at top
        rootMargin: "-80px 0px -50% 0px",
      }
    );

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, activeSection]);

  return activeSection;
}
