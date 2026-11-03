(function() {
  function initNavbarBurger() {
    var burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if (burgers.length === 0) {
      return;
    }

    burgers.forEach(function(burger) {
      burger.addEventListener('click', function() {
        var targetId = burger.dataset.target;
        var target = document.getElementById(targetId);
        var expanded = burger.classList.toggle('is-active');
        burger.setAttribute('aria-expanded', String(expanded));
        if (target) {
          target.classList.toggle('is-active');
        }
      });
    });
  }

  function selectCitation(code) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    return document.execCommand('copy');
  }

  function initCitations() {
    document.querySelectorAll('pre > code').forEach(function(code) {
      if (!/^\s*@(?:misc|article|inproceedings|techreport)\s*\{/i.test(code.textContent)) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'citation-copy';
      button.textContent = 'Copy BibTeX';
      button.setAttribute('aria-label', 'Copy BibTeX citation');
      var status = document.createElement('span');
      status.className = 'citation-copy-status';
      status.setAttribute('role', 'status');
      var timer;
      button.addEventListener('click', async function() {
        var copied = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(code.textContent);
            copied = true;
          }
        } catch (_) { }
        if (!copied) copied = selectCitation(code);
        status.textContent = copied ? 'Copied' : 'Citation selected';
        clearTimeout(timer);
        timer = setTimeout(function() { status.textContent = ''; }, 2500);
      });
      var controls = document.createElement('div');
      controls.className = 'citation-controls';
      controls.appendChild(button);
      controls.appendChild(status);
      code.parentNode.parentNode.insertBefore(controls, code.parentNode);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initNavbarBurger();
    initCitations();
  });
})();
