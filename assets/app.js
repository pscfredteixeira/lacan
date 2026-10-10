(() => {
  "use strict";
  const course = window.LACAN_COURSE;
  const cycles = document.getElementById("cycles");
  const grid = document.getElementById("moduleGrid");
  const search = document.getElementById("search");
  const count = document.getElementById("resultCount");
  const empty = document.getElementById("empty");
  const overlay = document.getElementById("overlay");
  const body = document.getElementById("detailBody");
  const code = document.getElementById("detailCode");
  let currentCycle = "all";
  let returnFocus = null;
  const roman = {1:"I",2:"II",3:"III"};
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const normalize = value => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  cycles.innerHTML = course.cycles.map(c => `<article class="cycle-card"><span class="cycle-icon">${roman[c.id]}</span><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.description)}</p><small>${escapeHTML(c.range)} ↗</small></article>`).join("");
  function filtered() {
    const query = normalize(search.value.trim());
    return course.modules.filter(m =>
      (currentCycle === "all" || String(m.cycle) === currentCycle) &&
      (!query || normalize([m.title,m.description,m.outcome,...m.lessons.flat()].join(" ")).includes(query))
    );
  }
  function render() {
    const modules = filtered();
    count.textContent = `${modules.length} ${modules.length === 1 ? "módulo encontrado" : "módulos encontrados"} · 108 aulas no percurso completo`;
    empty.hidden = modules.length !== 0;
    grid.innerHTML = modules.map(m => `<button type="button" class="module-card" data-module="${m.id}" aria-label="Ver módulo ${m.id}: ${escapeHTML(m.title)}">
      <span class="module-top"><span class="module-number">${String(m.id).padStart(2,"0")}</span><span class="module-cycle">CICLO ${roman[m.cycle]}<br>${escapeHTML(m.level)}</span></span>
      <h3>${escapeHTML(m.title)}</h3><p>${escapeHTML(m.description)}</p>
      <span class="module-bottom"><span>${[1,2,3,4,5,6].includes(m.id)?'06 AULAS · JÁ DISPONÍVEIS':'06 AULAS · EM PREPARAÇÃO'}</span><span>EXPLORAR ↗</span></span>
    </button>`).join("");
  }
  function openModule(id) {
    const m = course.modules.find(x => x.id === id);
    if (!m) return;
    returnFocus = document.activeElement;
    code.textContent = `MÓDULO ${String(m.id).padStart(2,"0")} / CICLO ${roman[m.cycle]}`;
    body.innerHTML = `<h2 id="detailTitle">${escapeHTML(m.title)}</h2><p class="summary">${escapeHTML(m.description)}</p>
      <div class="detail-meta"><div><span>Nível</span><p>${escapeHTML(m.level)}</p></div><div><span>Pré-requisitos</span><p>${escapeHTML(m.prereqs)}</p></div><div><span>Resultado esperado</span><p>${escapeHTML(m.outcome)}</p></div><div><span>Estrutura</span><p>${[1,2,3,4,5,6].includes(m.id)?'6 aulas disponíveis':'6 aulas planejadas'}</p></div></div>
      <h3 class="lesson-heading">Aulas do módulo</h3>
      ${m.lessons.map((lesson,i) => `<article class="lesson"><span class="lesson-index">${String(m.id).padStart(2,"0")}.${i+1}</span><div><h4>${escapeHTML(lesson[0])}</h4><p>${escapeHTML(lesson[1])}</p><small>${[1,2,3,4,5,6].includes(m.id)?'Aula disponível para estudo':'Conteúdo em preparação'}</small></div></article>`).join("")}
      ${m.id===1?'<a class="button primary start-module" href="modulo-1.html?aula=1.1">Começar o Módulo 1 <span>↗</span></a>':''}
      ${m.id===2?'<a class="button primary start-module" href="modulo-2.html?aula=2.1">Começar as seis aulas de Freud <span>↗</span></a><a class="button ghost start-module" href="oficina-freud.html">Abrir a Oficina do Inconsciente <span>↗</span></a>':''}
      ${m.id===3?'<a class="button primary start-module" href="modulo-3.html?aula=3.1">Começar as seis aulas do Módulo 3 <span>↗</span></a><a class="button ghost start-module" href="significantes.html">Abrir o ateliê dos significantes <span>↗</span></a>':''}
      ${m.id===4?'<a class="button primary start-module" href="modulo-4.html?aula=4.1">Começar as seis aulas do Módulo 4 <span>↗</span></a><a class="button ghost start-module" href="espelho.html">Experimentar o laboratório do espelho <span>↗</span></a>':''}
      ${m.id===5?'<a class="button primary start-module" href="modulo-5.html?aula=5.1">Começar as seis aulas do Módulo 5 <span>↗</span></a><a class="button ghost start-module" href="enigma-outro.html">Investigar o Enigma do Outro <span>↗</span></a>':''}
      ${m.id===6?'<a class="button primary start-module" href="modulo-6.html?aula=6.1">Começar as seis aulas do Módulo 6 <span>↗</span></a><a class="button ghost start-module" href="circuito-desejo.html">Explorar o Circuito do Desejo <span>↗</span></a>':''}
      <div class="detail-notice"><strong>Nota editorial:</strong> ${m.id===1?'As seis aulas introdutórias já estão disponíveis, com textos, avaliações em três fases e caderno de estudo.':m.id===2?'As seis aulas de Freud estão disponíveis, com leituras, glossários, reflexão guiada, avaliações em três fases e Oficina do Inconsciente.':m.id===3?'As seis aulas de Linguagem e Inconsciente estão disponíveis, com leituras, glossários, reflexão guiada, avaliações em três fases e integração com o Ateliê dos Significantes.':m.id===4?'As seis aulas sobre imagem corporal, identificação, eu ideal, agressividade e alteridade já estão disponíveis, com glossários, exercícios de reflexão, avaliações em três fases e laboratório visual integrado.':m.id===5?'As seis aulas sobre grande Outro e sujeito estão disponíveis, com explicações contextualizadas, três fases de avaliação e o laboratório O Enigma do Outro.':m.id===6?'As seis aulas sobre necessidade, demanda e desejo estão disponíveis, com glossários, reflexão guiada, avaliações em três fases e Circuito do Desejo.':'Este módulo está planejado; suas aulas completas e atividades serão publicadas progressivamente.'}</div>`;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("closeDetail").focus();
  }
  function closeModule() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  }
  grid.addEventListener("click", e => {
    const card = e.target.closest("[data-module]");
    if (card) openModule(Number(card.dataset.module));
  });
  document.querySelectorAll(".chip").forEach(button => button.addEventListener("click", () => {
    currentCycle = button.dataset.cycle;
    document.querySelectorAll(".chip").forEach(b => {
      const active = b === button;
      b.classList.toggle("selected",active);
      b.setAttribute("aria-pressed",String(active));
    });
    render();
  }));
  search.addEventListener("input", render);
  document.getElementById("closeDetail").addEventListener("click",closeModule);
  document.getElementById("closeOverlayOutside").addEventListener("click",closeModule);
  document.addEventListener("keydown", e => {
    if (overlay.hidden) return;
    if (e.key === "Escape") closeModule();
    if (e.key === "Tab") {
      const focusable = [...overlay.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')].filter(el => el.getClientRects().length);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {e.preventDefault();last.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();}
    }
  });
  const root = document.documentElement;
  let fontSize = 1;
  try {fontSize = Math.min(1.3,Math.max(0.9,Number(localStorage.getItem("lacan-font-size"))||1));} catch {}
  function setSize(size) {
    fontSize = Math.min(1.3,Math.max(0.9,Math.round(size*100)/100));
    root.style.setProperty("--font-scale",fontSize);
    try {localStorage.setItem("lacan-font-size",String(fontSize));} catch {}
  }
  document.getElementById("fontDown").addEventListener("click",()=>setSize(fontSize-0.1));
  document.getElementById("fontUp").addEventListener("click",()=>setSize(fontSize+0.1));
  setSize(fontSize);
  render();
})();