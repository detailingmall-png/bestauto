/**
 * ScrollReveal — fade-in animation on scroll using IntersectionObserver.
 * Used as a React island (client:visible) to wrap sections that should
 * animate when they enter the viewport.
 *
 * Lightweight: no Framer Motion, just native IntersectionObserver + CSS.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation type */
  animation?: 'fade-in' | 'slide-up';
  /** Delay in ms before animation starts */
  delay?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** CSS class name for the wrapper */
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  threshold = 0.15,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const baseStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'translateY(0)'
      : animation === 'slide-up'
        ? 'translateY(20px)'
        : 'none',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  };

  return (
    <div ref={ref} style={baseStyle} className={className}>
      {children}
    </div>
  );
}
