// ========== FAQ accordion (single-open, animated) ==========
(function () {
  var items = document.querySelectorAll('.faq-section .faq-item');

  function closeItem(item) {
    if (!item.classList.contains('is-open')) return;
    var wrap = item.querySelector('.faq-answer-wrap');
    item.classList.remove('is-open');
    var onEnd = function (e) {
      if (e.propertyName !== 'grid-template-rows') return;
      wrap.removeEventListener('transitionend', onEnd);
      if (!item.classList.contains('is-open')) item.removeAttribute('open');
    };
    wrap.addEventListener('transitionend', onEnd);
  }

  function openItem(item) {
    item.setAttribute('open', '');
    // Force layout so the 0fr -> 1fr transition runs
    void item.offsetHeight;
    item.classList.add('is-open');
  }

  items.forEach(function (item) {
    var summary = item.querySelector('.faq-question');
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = item.classList.contains('is-open');
      if (isOpen) {
        closeItem(item);
      } else {
        items.forEach(function (other) { if (other !== item) closeItem(other); });
        openItem(item);
      }
    });
  });
})();

// ========== Contact section tabs ==========
(function () {
  var tabs = document.querySelectorAll('.contact-tab');
  var panels = {
    form: document.getElementById('panelForm'),
    call: document.getElementById('panelCall')
  };
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.dataset.tab;
      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      Object.keys(panels).forEach(function (key) {
        var isActive = key === target;
        panels[key].classList.toggle('active', isActive);
        if (isActive) panels[key].removeAttribute('hidden');
        else panels[key].setAttribute('hidden', '');
      });
    });
  });
})();

// ========== Custom selects (firm size + practice area) ==========
(function () {
  var selects = document.querySelectorAll('.contact-section .custom-select');
  selects.forEach(function (select) {
    var trigger = select.querySelector('.custom-select-trigger');
    var valueEl = select.querySelector('.custom-select-value');
    var placeholderText = valueEl.textContent;
    var hidden = select.querySelector('input[type="hidden"]');
    var options = select.querySelectorAll('.custom-select-option');
    select.dataset.placeholderText = placeholderText;

    trigger.addEventListener('click', function () {
      selects.forEach(function (other) { if (other !== select) other.classList.remove('open'); });
      var open = select.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        valueEl.textContent = opt.textContent;
        valueEl.removeAttribute('data-placeholder');
        hidden.value = opt.dataset.value;
        select.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        hidden.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  document.addEventListener('click', function (e) {
    selects.forEach(function (select) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
        var trigger = select.querySelector('.custom-select-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// ========== Contact form: validation + submit to send-immigration-mail.php ==========
(function () {
  var form = document.getElementById('auditForm');
  if (!form) return;
  var statusEl = document.getElementById('formStatus');
  var submitBtn = form.querySelector('.contact-submit');
  var originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(fieldName, hasError) {
    var errorEl = form.querySelector('[data-error-for="' + fieldName + '"]');
    if (!errorEl) return;
    var group = errorEl.closest('.form-group');
    errorEl.classList.toggle('visible', hasError);
    if (group) group.classList.toggle('has-error', hasError);
  }

  function validateField(name) {
    var value;
    if (name === 'platform') {
      value = form.querySelector('input[name="platform"]:checked');
      var ok = !!value;
      setError('platform', !ok);
      return ok;
    }
    var field = form.querySelector('[name="' + name + '"]');
    value = (field && field.value || '').trim();

    if (!value) { setError(name, true); return false; }
    if (name === 'email' && !EMAIL_RE.test(value)) { setError(name, true); return false; }
    setError(name, false);
    return true;
  }

  var required = ['fullName', 'email', 'firmName', 'firmSize', 'practiceArea', 'platform'];

  required.forEach(function (name) {
    if (name === 'platform') {
      form.querySelectorAll('input[name="platform"]').forEach(function (input) {
        input.addEventListener('change', function () { setError('platform', false); });
      });
      return;
    }
    var field = form.querySelector('[name="' + name + '"]');
    if (!field) return;
    var ev = field.type === 'hidden' ? 'change' : 'input';
    field.addEventListener(ev, function () {
      if (form.querySelector('[data-error-for="' + name + '"]').classList.contains('visible')) {
        validateField(name);
      }
    });
    field.addEventListener('blur', function () { validateField(name); });
  });

  function resetSelects() {
    form.querySelectorAll('.custom-select').forEach(function (sel) {
      var valueEl = sel.querySelector('.custom-select-value');
      if (valueEl) {
        valueEl.textContent = sel.dataset.placeholderText || 'Please select';
        valueEl.setAttribute('data-placeholder', 'true');
      }
    });
    form.querySelectorAll('.custom-select-option.selected').forEach(function (o) {
      o.classList.remove('selected');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    var allValid = required.map(validateField).every(Boolean);
    if (!allValid) {
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Please fix the highlighted fields and try again.';
      var firstErr = form.querySelector('.form-group.has-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Submit to PHP handler
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    var formData = new FormData(form);

    fetch('send-immigration-mail.php', { method: 'POST', body: formData })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result && result.success) {
          statusEl.className = 'form-status success';
          statusEl.textContent = result.message || 'Thanks - we\'ll be in touch shortly to start the conversation.';
          form.reset();
          resetSelects();
          statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          statusEl.className = 'form-status error';
          statusEl.textContent = (result && result.message) || 'Something went wrong. Please try again.';
        }
      })
      .catch(function () {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Network error. Please check your connection and try again.';
      })
      .then(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      });
  });
})();
