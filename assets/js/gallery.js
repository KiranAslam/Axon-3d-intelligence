(function () {
  var models = window.AXON_MODEL_CATALOG;
  var grid = document.getElementById('modelsGrid');
  var backdrop = document.getElementById('modalBackdrop');
  var panel = document.getElementById('modalPanel');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(href) {
    if (reduceMotion) {
      window.location.href = href;
      return;
    }
    document.body.classList.add('leaving');
    window.setTimeout(function () {
      window.location.href = href;
    }, 220);
  }

  document.querySelectorAll('a[data-transition]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var href = link.getAttribute('href');
      if (!href || link.target === '_blank') return;
      event.preventDefault();
      goTo(href);
    });
  });

  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  function iconFor(type) {
    var icons = {
      'deep-learning': '<circle cx="26" cy="26" r="4" fill="#62E6B3"/><circle cx="26" cy="26" r="16" stroke="#A4F6D4" stroke-width="1.4" fill="none" opacity="0.6"/><circle cx="26" cy="10" r="2.4" fill="#A4F6D4"/><circle cx="26" cy="42" r="2.4" fill="#A4F6D4"/><circle cx="10" cy="26" r="2.4" fill="#A4F6D4"/><circle cx="42" cy="26" r="2.4" fill="#A4F6D4"/>',
      unsupervised: '<circle cx="16" cy="18" r="3" fill="#62E6B3"/><circle cx="12" cy="26" r="3" fill="#62E6B3"/><circle cx="20" cy="30" r="3" fill="#62E6B3"/><circle cx="36" cy="16" r="3" fill="#A4F6D4"/><circle cx="40" cy="24" r="3" fill="#A4F6D4"/><circle cx="34" cy="34" r="3" fill="#A4F6D4"/><circle cx="16" cy="24" r="7" fill="none" stroke="#62E6B3" stroke-width="1.2"/><circle cx="37" cy="24" r="7" fill="none" stroke="#A4F6D4" stroke-width="1.2"/>',
      supervised: '<path d="M26 8v10M26 18l-12 10M26 18l12 10M14 28l-6 10M14 28l6 10M38 28l-6 10M38 28l6 10" stroke="#62E6B3" stroke-width="1.4" fill="none"/><circle cx="26" cy="8" r="2.6" fill="#A4F6D4"/><circle cx="14" cy="28" r="2.6" fill="#62E6B3"/><circle cx="38" cy="28" r="2.6" fill="#62E6B3"/><circle cx="8" cy="38" r="2.2" fill="#A4F6D4"/><circle cx="20" cy="38" r="2.2" fill="#A4F6D4"/><circle cx="32" cy="38" r="2.2" fill="#A4F6D4"/><circle cx="44" cy="38" r="2.2" fill="#A4F6D4"/>',
      ensemble: '<path d="M14 40V22M26 40V14M38 40V26" stroke="#62E6B3" stroke-width="2.4" stroke-linecap="round"/><circle cx="14" cy="18" r="3.4" fill="#A4F6D4"/><circle cx="26" cy="10" r="3.4" fill="#A4F6D4"/><circle cx="38" cy="22" r="3.4" fill="#A4F6D4"/>'
    };
    return icons[type] || icons.supervised;
  }

  function sparkBars(values) {
    var max = Math.max.apply(null, values);
    return values.map(function (value) {
      return '<i style="--h:' + (value / max).toFixed(2) + '"></i>';
    }).join('');
  }

  function openModal(model) {
    panel.innerHTML =
      '<div class="modal-head"><div><h2 id="modalTitle">' + model.name + '</h2>' +
      '<span class="type-tag" style="position:static;display:inline-block">' + model.typeLabel + '</span></div>' +
      '<button class="modal-close" type="button" aria-label="Close">✕</button></div>' +
      '<h3>Overview</h3><p>' + model.overview + '</p>' +
      '<h3>Use case</h3><p>' + model.useCase + '</p>' +
      '<h3>Dataset</h3><p>' + model.dataset + '</p>' +
      '<h3>Metrics</h3><div class="modal-metrics">' +
      model.metrics.map(function (metric) {
        return '<div class="metric-badge"><b>' + metric.v + '</b><span>' + metric.l + '</span></div>';
      }).join('') + '</div>' +
      '<h3>Technologies</h3><div class="tag-row">' +
      model.tags.map(function (tag) { return '<span>' + tag + '</span>'; }).join('') + '</div>' +
      (model.sample ? '<h3>Sample result</h3><div class="modal-chart">' +
        model.sample.map(function (value) {
          return '<i style="height:' + (value / Math.max.apply(null, model.sample) * 100) + '%"></i>';
        }).join('') + '</div>' : '') +
      (model.link
        ? '<a class="modal-open-link" href="' + model.link + '" data-modal-link>Open live model →</a>'
        : '<div class="planned-status">' + model.statusLabel + '</div>');

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    var closeButton = panel.querySelector('.modal-close');
    closeButton.addEventListener('click', closeModal);
    closeButton.focus();
    var modalLink = panel.querySelector('[data-modal-link]');
    if (modalLink) {
      modalLink.addEventListener('click', function (event) {
        event.preventDefault();
        goTo(modalLink.getAttribute('href'));
      });
    }
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  models.forEach(function (model) {
    var card = document.createElement('div');
    card.className = 'mcard';
    card.dataset.category = model.type;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', (model.link ? 'Open ' : 'View details for ') + model.name);
    card.innerHTML =
      '<div class="mcard-top">' +
        '<span class="type-tag">' + model.typeLabel + '</span>' +
        '<span class="status-tag' + (model.status === 'live' ? ' live' : '') + '">' + model.statusLabel + '</span>' +
        '<div class="mcard-icon"><svg viewBox="0 0 52 52" aria-hidden="true">' + iconFor(model.type) + '</svg></div>' +
        (model.sample ? '<div class="sparkline">' + sparkBars(model.sample) + '</div>' : '') +
      '</div>' +
      '<div class="mcard-body">' +
        '<h2>' + model.name + '</h2>' +
        '<p class="desc">' + model.desc + '</p>' +
        (model.primary ? '<div class="progress-line"><i style="--pct:' + model.primary + '%"></i></div>' : '') +
        '<div class="metric-row">' + model.metrics.slice(0, 2).map(function (metric) {
          return '<div class="metric-badge"><b>' + metric.v + '</b><span>' + metric.l + '</span></div>';
        }).join('') + '</div>' +
        (model.metrics.length > 2 ? '<div class="extra-metrics"><div class="metric-row">' +
          model.metrics.slice(2).map(function (metric) {
            return '<div class="metric-badge"><b>' + metric.v + '</b><span>' + metric.l + '</span></div>';
          }).join('') + '</div></div>' : '') +
        '<div class="tag-row">' + model.tags.map(function (tag) { return '<span>' + tag + '</span>'; }).join('') + '</div>' +
        '<div class="view-hint">' + (model.link ? 'Open model →' : 'View details →') + '</div>' +
      '</div>';

    function activateCard() {
      if (model.link) goTo(model.link);
      else openModal(model);
    }
    card.addEventListener('click', activateCard);
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateCard();
      }
    });
    grid.appendChild(card);
  });

  document.querySelectorAll('.filter-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (filter) {
        filter.classList.remove('active');
        filter.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      var filter = button.dataset.filter;
      grid.querySelectorAll('.mcard').forEach(function (card) {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });
})();
