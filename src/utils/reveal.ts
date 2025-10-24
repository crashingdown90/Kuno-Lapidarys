export function initScrollReveal() {
  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with data-reveal attribute
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach((element) => {
    observer.observe(element);
  });

  // Observe elements with specific reveal classes
  const fadeElements = document.querySelectorAll('.reveal-fade, .reveal-fade-up, .reveal-fade-down, .reveal-scale');
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// Add stagger delay to elements
export function addStaggerDelay(selector: string, baseDelay = 0, increment = 100) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    const el = element as HTMLElement;
    el.style.transitionDelay = `${baseDelay + index * increment}ms`;
  });
}
