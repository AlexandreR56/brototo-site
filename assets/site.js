(() => {
  const isFrench = new URLSearchParams(window.location.search).get('lang') === 'fr';
  const canonicalBase = document.documentElement.dataset.canonicalBase;
  if (canonicalBase) {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalBase + (isFrench ? '?lang=fr' : '');
    document.head.append(canonical);
  }

  if (!isFrench) return;

  document.documentElement.lang = 'fr';

  document.querySelectorAll('meta[data-fr-content]').forEach(meta => {
    meta.content = meta.dataset.frContent;
  });

  document.querySelectorAll('[data-fr]').forEach(element => {
    element.textContent = element.dataset.fr;
  });

  document.querySelectorAll('[data-fr-aria-label]').forEach(element => {
    element.setAttribute('aria-label', element.dataset.frAriaLabel);
  });

  document.querySelectorAll('[data-fr-alt]').forEach(element => {
    element.alt = element.dataset.frAlt;
  });

  document.getElementById('language-en')?.removeAttribute('aria-current');
  document.getElementById('language-fr')?.setAttribute('aria-current', 'page');

  document.querySelectorAll('a[data-lang-link]').forEach(link => {
    const url = new URL(link.href);
    if (url.origin !== window.location.origin) return;
    url.searchParams.set('lang', 'fr');
    link.href = url.pathname + url.search + url.hash;
  });
})();
