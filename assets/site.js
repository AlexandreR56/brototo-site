(() => {
  if (new URLSearchParams(window.location.search).get('lang') !== 'fr') return;

  document.documentElement.lang = 'fr';

  const description = document.querySelector('meta[name="description"][data-fr-content]');
  if (description) description.content = description.dataset.frContent;

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
