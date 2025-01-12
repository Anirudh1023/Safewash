import React, { useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let animationFrameId: number;
    let lastScrollTop = 0;
    let velocity = 0;
    const friction = 0.95;
    const springStrength = 0.1;

    const updateFixedElements = (scrollTop: number): void => {
      const fixedElements = document.querySelectorAll(".fixed-element");
      fixedElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrollTop}px)`;
      });
    };

    const animate = (): void => {
      const scrollTop = container.scrollTop;
      const delta = scrollTop - lastScrollTop;

      velocity = velocity * friction + delta * springStrength;
      lastScrollTop = scrollTop;

      if (Math.abs(velocity) > 0.1) {
        container.scrollTop += velocity;
        updateFixedElements(scrollTop);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleScroll = (): void => {
      cancelAnimationFrame(animationFrameId);
      updateFixedElements(container.scrollTop);
      animationFrameId = requestAnimationFrame(animate);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      <div ref={contentRef} className="scroll-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
