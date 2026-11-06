(function () {
  if (window.__bfcmBound) return;
  window.__bfcmBound = true;

  var second = 1000;
  var minute = 60 * second;
  var hour = 60 * minute;
  var day = 24 * hour;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function parseEnd(value) {
    if (!value) return null;
    var time = Date.parse(value);
    return Number.isNaN(time) ? null : time;
  }

  function renderCountdown(node) {
    var end = parseEnd(node.getAttribute("data-end"));
    var units = node.querySelector("[data-units]");
    var ended = node.querySelector("[data-ended]");
    if (!end || !units) return;

    var tick = function () {
      var remaining = end - Date.now();
      if (remaining <= 0) {
        units.hidden = true;
        if (ended) ended.hidden = false;
        return;
      }
      units.hidden = false;
      if (ended) ended.hidden = true;
      var days = Math.floor(remaining / day);
      var hours = Math.floor((remaining % day) / hour);
      var minutes = Math.floor((remaining % hour) / minute);
      var seconds = Math.floor((remaining % minute) / second);
      var map = { days: days, hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
      Object.keys(map).forEach(function (key) {
        var cell = units.querySelector('[data-unit="' + key + '"]');
        if (cell) cell.textContent = map[key];
      });
    };

    tick();
    window.setInterval(tick, 1000);
  }

  document.querySelectorAll("[data-bfcm-countdown]").forEach(renderCountdown);

  document.querySelectorAll("[data-bfcm-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll("[data-tab]"));
    var panels = Array.prototype.slice.call(root.querySelectorAll("[data-panel]"));

    function select(id) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute("data-tab") === id;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-panel") === id;
        panel.classList.toggle("is-active", on);
        panel.hidden = !on;
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        select(tab.getAttribute("data-tab"));
      });
    });

    var current = tabs.find(function (tab) {
      return tab.getAttribute("aria-selected") === "true";
    });
    select(current ? current.getAttribute("data-tab") : tabs[0] && tabs[0].getAttribute("data-tab"));
  });
})();
