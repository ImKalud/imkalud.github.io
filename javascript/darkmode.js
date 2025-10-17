(function () {
  const storageKey = 'theme'; // 'dark' or 'light'

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function updateButtonText(btn) {
    if (!btn) return;
    const isDark = document.documentElement.classList.contains('dark');

      btn.textContent = isDark ? '🌙' : '☀';
    btn.setAttribute('aria-pressed', String(isDark));
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');

    const saved = getSavedTheme();
    const initial = saved || getSystemTheme();
    applyTheme(initial);

    try {
      if (!saved && window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener ? mq.addEventListener('change', e => {
          applyTheme(e.matches ? 'dark' : 'light');
          updateButtonText(btn);
        }) : mq.addListener && mq.addListener(e => {
          applyTheme(e.matches ? 'dark' : 'light');
          updateButtonText(btn);
        });
      }
    } catch (e) {}

    if (btn) {
      updateButtonText(btn);
      btn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        try {
          localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        } catch (e) {}
        updateButtonText(btn);
      });
    }
  });
})();
