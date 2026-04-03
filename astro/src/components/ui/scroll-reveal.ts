/**
 * Scroll reveal — vanilla JS with IntersectionObserver.
 * Adds 'revealed' class to [data-reveal] elements when they enter viewport.
 * CSS handles the animation via .reveal-base and .revealed classes.
 */

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll('[data-reveal]').forEach((el) => {
  observer.observe(el);
});
