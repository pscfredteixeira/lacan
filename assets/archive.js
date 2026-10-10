/* O Arquivo de Lacan — exploração histórica e desafios conceituais.
   Sem bibliotecas, sem contas e sem transmissão de respostas a terceiros. */
(() => {
  "use strict";
  const archive = window.LACAN_ARCHIVE;
  if (!archive || !archive.records || !archive.records.length) return;
  const $ = id => document.getElementById(id);
  const escapeHTML = v => String(v ?? "").replace(/[&<>"']/g,c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const VISITED = "lacan-archive-visited-v1";
  const SOLVED = "lacan-archive-solved-v1";
  function load(key) {try {const value=JSON.parse(localStorage.getItem(key));return Array.isArray(value)?value:[];}catch {return [];}}
  function save(key,value) {try {localStorage.setItem(key,JSON.stringify(value));}catch {}}
  let visited = new Set(load(VISITED).filter(id => archive.records.some(r=>r.id===id)));
  let solved = new Set(load(SOLVED).filter(id=>["sequence","dates","theses"].includes(id)));
  let epoch = "all";
  let selectedId = archive.records[0].id;
  let activeMission = "sequence";
  let sequence = [...archive.sequence.ids];
  let sequenceFeedback = null;
  const dateAnswers = {};
  let datesFeedback = null;
  const selectedTheses = new Set();
  let thesesFeedback = null;
  const all = archive.records.slice().sort((a,b)=>a.order-b.order);
  function trackViewed(id) {
    if (!visited.has(id)) {
      visited.add(id);save(VISITED,[...visited]);
      updateProgress();
    }
  }
  function updateProgress() {
    $("archiveProgress").textContent = visited.size+" / "+all.length;
    $("archiveProgressFill").style.width = (100*visited.size/all.length)+"%";
    $("missionProgress").innerHTML = "Investigações concluídas neste dispositivo: <strong>"+solved.size+" de 3</strong>"+
      (solved.size===3 ? " · Você terminou o laboratório. Retorne aos textos para aprofundar os problemas." : " · Consulte as fichas sempre que precisar.");
  }
  function visibleRecords() {return epoch==="all"?all:all.filter(r=>r.epoch===epoch);}
  function renderList() {
    $("archiveTimeline").innerHTML = visibleRecords().map(r=>`<button type="button" class="archive-event ${r.id===selectedId?"active":""}" data-record="${escapeHTML(r.id)}" aria-pressed="${r.id===selectedId}">
      <span class="archive-event-year">${escapeHTML(r.year)}</span>
      <span><span class="archive-event-title">${escapeHTML(r.title)}</span><span class="archive-event-kind">${escapeHTML(r.kind)}</span>${visited.has(r.id)?'<span class="archive-visited">✓ Ficha examinada</span>':''}</span>
    </button>`).join("");
  }
  function renderDetail() {
    const r = all.find(x=>x.id===selectedId);
    if (!r) return;
    const idx = all.findIndex(x=>x.id===r.id);
    $("archiveDetail").innerHTML = `<div class="archive-index"><span>DOCUMENTO ${String(idx+1).padStart(2,"0")} / ${String(all.length).padStart(2,"0")}</span><span class="archive-kind">${escapeHTML(r.kind)}</span></div>
    <h3>${escapeHTML(r.title)}</h3><p class="archive-subtitle">${escapeHTML(r.year)} · ${escapeHTML(r.short)}</p>
    <p class="archive-summary">${escapeHTML(r.summary)}</p>
    <div class="archive-work"><span>Obra ou documento de referência</span><p>${escapeHTML(r.work)}</p></div>
    <section class="archive-mini-block"><span class="archive-label">01 · Qual questão está em jogo?</span><p>${escapeHTML(r.question)}</p></section>
    <section class="archive-mini-block"><span class="archive-label">02 · Qual fio conceitual continua?</span><p>${escapeHTML(r.movement)}</p></section>
    <section class="archive-mini-block"><span class="archive-label">03 · Uma leitura a evitar</span><p>${escapeHTML(r.caution)}</p></section>
    <div class="archive-tags">${r.tags.map(tag=>`<span class="archive-tag">${escapeHTML(tag)}</span>`).join("")}</div>
    <p class="archive-source-line"><strong>Referência para conferir:</strong> ${escapeHTML(r.source)}</p>
    <div class="archive-detail-footer"><button type="button" class="archive-step-btn" data-next-record="${escapeHTML(all[(idx+1)%all.length].id)}">Próximo documento →</button>
      <a href="modulo-1.html?aula=${encodeURIComponent(r.lessons[0])}">Rever aula relacionada ↗</a></div>`;
  }
  function openRecord(id, focus=false) {
    if (!all.some(r=>r.id===id)) return;
    selectedId=id; trackViewed(id);renderList();renderDetail();
    if (focus) $("archiveDetail").scrollIntoView({block:"start",behavior:"smooth"});
  }
  $("archiveTimeline").addEventListener("click",e=>{
    const button=e.target.closest("[data-record]");
    if(button) openRecord(button.dataset.record,window.innerWidth<721);
  });
  $("archiveDetail").addEventListener("click",e=>{
    const button=e.target.closest("[data-next-record]");
    if (!button) return;
    const next=all.find(x=>x.id===button.dataset.nextRecord);
    if(next && epoch!=="all" && next.epoch!==epoch) {
      epoch="all";
      document.querySelectorAll(".archive-filter").forEach(b=>{
        const yes=b.dataset.epoch==="all";b.classList.toggle("active",yes);b.setAttribute("aria-pressed",String(yes));
      });
    }
    openRecord(button.dataset.nextRecord,true);
  });
  document.querySelectorAll(".archive-filter").forEach(btn=>btn.addEventListener("click",()=>{
    epoch=btn.dataset.epoch;
    document.querySelectorAll(".archive-filter").forEach(b=>{
      const yes=b===btn;b.classList.toggle("active",yes);b.setAttribute("aria-pressed",String(yes));
    });
    if(!visibleRecords().some(r=>r.id===selectedId)) selectedId=visibleRecords()[0].id;
    openRecord(selectedId);
  }));
  // Investigação 1: reorganizar efetivamente um conjunto de fichas por posição.
  function sequenceMission() {
    const cfg=archive.sequence;
    const ok=sequenceFeedback?.success;
    $("sequenceMission").innerHTML = `<div class="mission-heading"><span class="mission-subtitle">01 / RECONSTRUÇÃO CRONOLÓGICA</span><h3>${escapeHTML(cfg.title)}</h3><p>${escapeHTML(cfg.description)}</p></div>
      <div class="sequence-board">${sequence.map((id,index)=>{
        const r=all.find(x=>x.id===id);
        return `<div class="sequence-row"><span class="sequence-position">${String(index+1).padStart(2,"0")}.</span><span class="sequence-year">${escapeHTML(r.year)}</span><span class="sequence-name">${escapeHTML(r.title)}</span><span class="sequence-controls"><button type="button" data-shift="${index}" data-dir="-1" aria-label="Mover ${escapeHTML(r.title)} para cima" ${index===0?"disabled":""}>↑</button><button type="button" data-shift="${index}" data-dir="1" aria-label="Mover ${escapeHTML(r.title)} para baixo" ${index===sequence.length-1?"disabled":""}>↓</button></span></div>`;
      }).join("")}</div>
      <div class="mission-actions"><button type="button" class="mission-button" data-action="check-sequence">Verificar sequência</button><button type="button" class="mission-button secondary" data-action="reset-sequence">Recomeçar</button></div>
      ${sequenceFeedback ? `<aside class="mission-feedback ${ok?"success":""}" role="status"><h4>${ok?"Sequência reconstruída.":"Há um deslocamento a revisar."}</h4><p>${escapeHTML(sequenceFeedback.text)}</p></aside>` : ""}`;
  }
  $("sequenceMission").addEventListener("click",e=>{
    const shift=e.target.closest("[data-shift]");
    if(shift){
      const index=Number(shift.dataset.shift),dir=Number(shift.dataset.dir),target=index+dir;
      if(target<0||target>=sequence.length) return;
      [sequence[index],sequence[target]]=[sequence[target],sequence[index]];
      sequenceFeedback=null;sequenceMission();
      const focus=$("sequenceMission").querySelector('[data-shift="'+target+'"][data-dir="'+dir+'"]');
      if (focus && !focus.disabled) focus.focus();
      return;
    }
    const action=e.target.closest("[data-action]")?.dataset.action;
    if(action==="reset-sequence"){sequence=[...archive.sequence.ids];sequenceFeedback=null;sequenceMission();}
    if(action==="check-sequence"){
      const correct=sequence.every((id,i)=>id===archive.sequence.correct[i]);
      if(correct){solved.add("sequence");save(SOLVED,[...solved]);}
      const wrong=sequence.findIndex((id,i)=>id!==archive.sequence.correct[i]);
      sequenceFeedback={success:correct,text:correct?archive.sequence.explanation:
        "Na posição "+(wrong+1)+", o documento de "+all.find(x=>x.id===sequence[wrong]).year+" aparece antes de "+all.find(x=>x.id===archive.sequence.correct[wrong]).year+". Compare as datas de ensino e de publicação. Você pode reorganizar as fichas sem perder seu progresso."};
      sequenceMission();updateProgress();
    }
  });
  // Investigação 2: diferençar comunicação, versão preservada e coletânea.
  function datesMission(){
    const cfg=archive.dates;const feedback=datesFeedback;
    $("datesMission").innerHTML = `<div class="mission-heading"><span class="mission-subtitle">02 / EDIÇÃO E HISTÓRIA</span><h3>${escapeHTML(cfg.title)}</h3><p>${escapeHTML(cfg.description)}</p></div>
    <div class="date-board">${cfg.questions.map((q,i)=>{
      const answer=dateAnswers[q.id]||"";
      const mark=feedback&&!feedback.success?(answer===q.answer?"good":"bad"):"";
      return `<div class="date-question ${mark}"><label for="date-${escapeHTML(q.id)}"><span class="mission-subtitle">DOCUMENTO 0${i+1}</span><br>${escapeHTML(q.label)}</label>
       <select id="date-${escapeHTML(q.id)}" data-date="${escapeHTML(q.id)}">
        <option value="">Selecionar data</option>${cfg.choices.map(year=>`<option value="${escapeHTML(year)}" ${answer===year?"selected":""}>${escapeHTML(year)}</option>`).join("")}
       </select>
       ${feedback?`<p class="date-note">${escapeHTML(answer===q.answer?"Correto. "+q.why:"Reveja este ponto: "+q.why)}</p>`:""}
       </div>`;
    }).join("")}</div>
    <div class="mission-actions"><button class="mission-button" type="button" data-action="check-dates">Conferir as três relações</button><button class="mission-button secondary" type="button" data-action="clear-dates">Limpar escolhas</button></div>
    ${feedback?`<aside class="mission-feedback ${feedback.success?"success":""}" role="status"><h4>${feedback.success?"Três tempos documentais distinguidos.":"Compare as fichas e tente novamente."}</h4><p>${escapeHTML(feedback.message)}</p></aside>`:""}`;
  }
  $("datesMission").addEventListener("change",e=>{
    const select=e.target.closest("[data-date]");
    if(select){dateAnswers[select.dataset.date]=select.value;datesFeedback=null;datesMission();}
  });
  $("datesMission").addEventListener("click",e=>{
    const action=e.target.closest("[data-action]")?.dataset.action;
    if(action==="clear-dates"){for(const key of Object.keys(dateAnswers))delete dateAnswers[key];datesFeedback=null;datesMission();}
    if(action==="check-dates"){
      const cfg=archive.dates;
      const blanks=cfg.questions.filter(q=>!dateAnswers[q.id]).length;
      const correct=cfg.questions.every(q=>dateAnswers[q.id]===q.answer);
      if(correct){solved.add("dates");save(SOLVED,[...solved]);}
      datesFeedback={success:correct,message:blanks?"Ainda há "+blanks+" relação(ões) sem resposta.":"A apresentação perdida de 1936, a formulação preservada em 1949 e a coletânea de 1966 não designam o mesmo documento."};
      if(correct)datesFeedback.message="Uma data de apresentação não equivale à data de publicação editorial. Esse cuidado será necessário em todos os seminários.";
      datesMission();updateProgress();
    }
  });
  // Investigação 3: ler teses em conjunto, sem projetar rupturas totais.
  function thesesMission() {
    const cfg=archive.theses;
    $("thesesMission").innerHTML = `<div class="mission-heading"><span class="mission-subtitle">03 / ARGUMENTAÇÃO</span><h3>${escapeHTML(cfg.title)}</h3><p>${escapeHTML(cfg.description)}</p></div>
      <div class="thesis-board">${cfg.options.map(o=>{
        const match=thesesFeedback?o.true===selectedTheses.has(o.id):null;
        return `<label class="thesis-row ${thesesFeedback?(match?"good":"bad"):""}"><input type="checkbox" data-thesis="${escapeHTML(o.id)}" ${selectedTheses.has(o.id)?"checked":""}><span>${escapeHTML(o.claim)}</span>${thesesFeedback?`<p class="thesis-note">${escapeHTML(o.why)}</p>`:""}</label>`;
      }).join("")}</div>
      <div class="mission-actions"><button class="mission-button" data-action="check-theses" type="button">Analisar hipóteses</button><button class="mission-button secondary" data-action="clear-theses" type="button">Limpar seleção</button></div>
      ${thesesFeedback?`<aside class="mission-feedback ${thesesFeedback.success?"success":""}" role="status"><h4>${thesesFeedback.success?"Leitura histórica consistente.":"Reexamine os argumentos, não só a contagem."}</h4><p>${escapeHTML(thesesFeedback.message)}</p></aside>`:""}`;
  }
  $("thesesMission").addEventListener("change",e=>{
    const checkbox=e.target.closest("[data-thesis]");
    if(!checkbox)return;
    if(checkbox.checked)selectedTheses.add(checkbox.dataset.thesis);else selectedTheses.delete(checkbox.dataset.thesis);
    thesesFeedback=null;
    // Manter foco para navegação por teclado enquanto se experimentam hipóteses.
    const id=checkbox.dataset.thesis;thesesMission();
    $("thesesMission").querySelector('[data-thesis="'+id+'"]')?.focus();
  });
  $("thesesMission").addEventListener("click",e=>{
    const action=e.target.closest("[data-action]")?.dataset.action;
    if(action==="clear-theses"){selectedTheses.clear();thesesFeedback=null;thesesMission();}
    if(action==="check-theses"){
      const cfg=archive.theses;
      const success=cfg.options.every(o=>selectedTheses.has(o.id)===o.true);
      if(success){solved.add("theses");save(SOLVED,[...solved]);}
      thesesFeedback={success,message:success?
        "Você distinguiu três hipóteses defensáveis das duas simplificações indevidas. O passo seguinte é verificar as formulações em cada texto primário.":
        "Algumas escolhas tratam as transformações como apagamentos completos, ou pressupõem que um conceito conserve sempre a mesma função. Leia a explicação sob cada hipótese e tente novamente."};
      thesesMission();updateProgress();
    }
  });
  // Três painéis acessíveis, com navegação por teclado e foco restaurado.
  const tabs=[...document.querySelectorAll(".mission-tab")];
  function activateMission(id,focus=false){
    if(!["sequence","dates","theses"].includes(id))return;
    activeMission=id;
    tabs.forEach(tab=>{
      const yes=tab.dataset.mission===id;tab.classList.toggle("active",yes);
      tab.setAttribute("aria-selected",String(yes));tab.tabIndex=yes?0:-1;
      if(focus&&yes)tab.focus();
    });
    ["sequence","dates","theses"].forEach(key=>{$("panel-"+key).hidden=key!==id;});
  }
  $("missionTabs").addEventListener("click",e=>{
    const tab=e.target.closest("[data-mission]");if(tab)activateMission(tab.dataset.mission);
  });
  $("missionTabs").addEventListener("keydown",e=>{
    if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
    const current=tabs.findIndex(t=>t.dataset.mission===activeMission);
    const n=e.key==="Home"?0:e.key==="End"?tabs.length-1:e.key==="ArrowRight"?(current+1)%tabs.length:(current+tabs.length-1)%tabs.length;
    e.preventDefault();activateMission(tabs[n].dataset.mission,true);
  });
  // Persistência tipográfica coerente com as outras páginas.
  let size=1;
  try{size=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function setSize(value){
    size=Math.min(1.3,Math.max(.9,Math.round(value*10)/10));
    document.documentElement.style.setProperty("--font-scale",size);
    try{localStorage.setItem("lacan-font-size",String(size));}catch{}
  }
  $("fontDown").addEventListener("click",()=>setSize(size-.1));
  $("fontUp").addEventListener("click",()=>setSize(size+.1));
  $("archiveSources").innerHTML=archive.sources.map(src=>`<a href="${escapeHTML(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(src.label)} ↗</a>`).join("");
  setSize(size);
  openRecord(selectedId);
  sequenceMission();datesMission();thesesMission();activateMission("sequence");updateProgress();
})();