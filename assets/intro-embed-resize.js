/* Formação Lacaniana · player incorporado: altura ajustada ao conteúdo real. */
(() => {
  "use strict";
  function applyHeight(event) {
    if (event.origin !== location.origin) return;
    const data = event.data;
    if (!data || data.type !== "lacan-intro-player-height") return;
    const h = Number(data.height);
    if (!Number.isFinite(h) || h < 180 || h > 3500) return;
    document.querySelectorAll('iframe[src*="introducao.html?embed=1"]').forEach(frame => {
      if (frame.contentWindow !== event.source) return;
      frame.style.height = Math.ceil(h + 2) + "px";
    });
  }
  window.addEventListener("message", applyHeight);
})();
