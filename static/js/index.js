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
        burger.classList.toggle('is-active');
        if (target) {
          target.classList.toggle('is-active');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initNavbarBurger);
})();
