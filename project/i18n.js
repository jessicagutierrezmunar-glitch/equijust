(function () {
  var LANG_KEY = 'eq_lang';

  function applyTranslations(lang) {
    var t = (window.TRANSLATIONS || {})[lang] || {};

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.dataset.i18nHtml;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    /* Translate <option> elements inside selects that carry data-i18n */
    document.querySelectorAll('select[data-i18n-options]').forEach(function (sel) {
      var keys = sel.dataset.i18nOptions.split(',');
      sel.querySelectorAll('option').forEach(function (opt, idx) {
        if (keys[idx] && t[keys[idx]] !== undefined) opt.textContent = t[keys[idx]];
      });
    });

    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }

  window.setLanguage = function (lang) {
    applyTranslations(lang);

    /* Update active state in language menu */
    document.querySelectorAll('.nav-lang-menu li').forEach(function (li) {
      li.classList.toggle('active', li.dataset.lang === lang);
    });

    var current = document.querySelector('.nav-lang-current');
    if (current) current.textContent = lang === 'es' ? 'Es' : 'En';
  };

  /* Auto-apply on page load */
  document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem(LANG_KEY) || 'en';
    applyTranslations(saved);
    /* Sync nav selector state */
    document.querySelectorAll('.nav-lang-menu li').forEach(function (li) {
      li.classList.toggle('active', li.dataset.lang === saved);
    });
    var current = document.querySelector('.nav-lang-current');
    if (current) current.textContent = saved === 'es' ? 'Es' : 'En';
  });
})();
