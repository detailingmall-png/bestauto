/**
 * MobileNav — hamburger menu for mobile viewports.
 * React island (client:load) for interactive toggle.
 */

import { useState, useCallback } from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  langLinks: { label: string; href: string; active: boolean }[];
}

export default function MobileNav({ items, ctaLabel, ctaHref, langLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Burger button */}
      <button
        onClick={toggle}
        aria-label="Menu"
        aria-expanded={isOpen}
        className="lg:hidden relative z-50 flex items-center justify-center w-12 h-12"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block w-6 h-0.5 bg-white-primary transition-transform duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white-primary transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white-primary transition-transform duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black-primary/80 z-40 lg:hidden"
          onClick={close}
        />
      )}

      {/* Slide-out menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-black-primary z-40 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-20 px-6 gap-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="block py-3 text-lg text-white-primary hover:text-gold-accent transition-colors no-underline"
            >
              {item.label}
            </a>
          ))}

          <a
            href={ctaHref}
            onClick={close}
            className="mt-4 inline-flex items-center justify-center bg-gold-accent text-black-primary font-semibold rounded-full px-6 py-3 hover:bg-gold-hover transition-colors no-underline"
          >
            {ctaLabel}
          </a>

          {/* Language switcher */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-800">
            {langLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm no-underline ${
                  l.active ? 'text-gold-accent font-semibold' : 'text-gray-400 hover:text-white-primary'
                } transition-colors`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
