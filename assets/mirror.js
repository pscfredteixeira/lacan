/* Laboratório do Estádio do Espelho — Sprint 4
   Foco: identificação imaginária, unidade antecipada, alienação.
   Diagramas são modelos pedagógicos, não simulações da experiência real de bebês. */
(() => {
  "use strict";
  const data=window.LACAN_MIRROR;
  if(!data || !data.trials?.length) return;
  const $=id=>document.getElementById(id);
  const safe=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const PREFIX="lacan-mirror-lab-v1";
  function restore(key,fallback) {
    try {const v=JSON.parse(localStorage.getItem(PREFIX+"-"+key));return v===null?fallback:v;}catch{return fallback;}
  }
  function persist(key,value) {try{localStorage.setItem(PREFIX+"-"+key,JSON.stringify(value));}catch{}}
  let mode="tensao", relation="imagem", phase=0, answer=null;
  let completed=restore("completed",false)===true;
  if(completed)phase=data.trials.length;
  let seenModes=new Set(Array.isArray(restore("modes",[]))?restore("modes",[]):[]);
  let seenRelations=new Set(Array.isArray(restore("relations",[]))?restore("relations",[]):[]);
  // Primeira mesa de estudo: comparar planos e explicar o descompasso.
  function renderMode() {
    const m=data.modes.find(x=>x.id===mode);
    document.querySelectorAll("[data-mode]").forEach(button=>{
      const active=button.dataset.mode===mode;
      button.setAttribute("aria-pressed",String(active));
    });
    $("mirrorDiagram").setAttribute("class","mirror-figure mode-"+mode);
    $("modeCaption").innerHTML=`<span class="caption-tag">${safe(m.tag)}</span><h3>${safe(m.title)}</h3><p>${safe(m.text)}</p>`;
    $("modeFocus").textContent=m.focus;
    $("modeInsight").textContent=m.insight;
    $("stageMode").textContent=m.tag.toUpperCase();
  }
  function changeMode(value) {
    if(!data.modes.some(m=>m.id===value))return;
    mode=value;
    seenModes.add(value);persist("modes",[...seenModes]);renderMode();
  }
  document.querySelectorAll("[data-mode]").forEach(button=>button.addEventListener("click",()=>changeMode(button.dataset.mode)));
  // Segunda mesa: relações não devem virar "quatro etapas de desenvolvimento".
  function renderRelation(){
    const r=data.relations.find(x=>x.id===relation);
    document.querySelectorAll("[data-rel]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.rel===relation)));
    $("relationExplanation").innerHTML=`<span class="rel-badge">${safe(r.badge)} / ${safe(r.label)}</span><h3>${safe(r.title)}</h3><p>${safe(r.description)}</p>`;
  }
  function changeRelation(id){
    if(!data.relations.some(r=>r.id===id))return;
    relation=id;seenRelations.add(id);persist("relations",[...seenRelations]);renderRelation();
  }
  document.querySelectorAll("[data-rel]").forEach(button=>button.addEventListener("click",()=>changeRelation(button.dataset.rel)));
  $("mirrorConcepts").innerHTML=data.concepts.map(c=>`<details><summary>${safe(c.name)}</summary><p>${safe(c.desc)}</p></details>`).join("");
  $("mirrorSources").innerHTML=data.sources.map(src=>`<a href="${safe(src.url)}" target="_blank" rel="noopener noreferrer">${safe(src.label)} ↗<small>${safe(src.note)}</small></a>`).join("");
  // Terceira mesa: seleção com explicação contextual, uma fase por vez.
  function updateTrialProgress(){
    $("trialProgressText").textContent=phase+" / "+data.trials.length;
    $("trialProgressBars").innerHTML=data.trials.map((_,i)=>`<span class="trial-bar ${completed||i<phase?"completed":i===phase?"current":""}"></span>`).join("");
  }
  function renderTrial(){
    updateTrialProgress();
    const area=$("trialContent");
    if(phase>=data.trials.length){
      area.innerHTML=`<div class="trial-finished"><span class="kicker">SÍNTESE / CONCLUÍDA</span><h3>Você atravessou os três problemas.</h3><p>Você distinguiu a forma especular, a identificação imaginária e os limites de reduzir o estádio do espelho ao reconhecimento de um rosto.</p><p><strong>Para continuar:</strong> releia a passagem de 1949 observando a relação entre imaturidade motora, imagem de unidade e formação do eu. A construção teórica não constitui prova empírica de um processo psicológico.</p><div class="trial-controls"><button type="button" class="trial-button secondary" data-trial-action="restart">Refazer investigação</button><a class="trial-button" href="modulo-4.html?aula=4.2">Retomar as aulas do espelho ↗</a></div></div>`;
      return;
    }
    const t=data.trials[phase];
    const selected=t.options[answer];
    const isCorrect=selected?.ok===true;
    area.innerHTML=`<span class="trial-phase">FASE ${phase+1} / 03 · ${safe(t.phase)}</span>
      <h3 class="trial-title">${safe(t.title)}</h3><p class="trial-prompt">${safe(t.prompt)}</p>
      <div class="trial-options" role="group" aria-label="Alternativas da fase ${phase+1}">${t.options.map((option,i)=>`
        <button type="button" class="trial-option" data-answer="${i}" aria-pressed="${answer===i}" ${answer!==null?"disabled":""}>
          <span class="option-mark" aria-hidden="true">${String.fromCharCode(65+i)}</span>
          <span>${safe(option.text)}</span>
        </button>`).join("")}</div>
      ${answer!==null?`<div class="trial-feedback ${isCorrect?"correct":""}" role="status">
        <strong>${isCorrect?"Essa interpretação preserva o problema teórico.":"Essa resposta precisa ser revista."}</strong>
        <p>${safe(selected.why)}</p>
        ${!isCorrect?`<p>Uma pista: distinga a imagem como forma de unidade da hipótese de uma identidade interior já constituída.</p>`:""}
        </div>
        <div class="trial-controls"><button type="button" class="trial-button ${isCorrect?"":"secondary"}" data-trial-action="${isCorrect?"next":"retry"}">${isCorrect?(phase===data.trials.length-1?"Concluir investigação":"Ir para a próxima fase →"):"Tentar novamente ↺"}</button></div>`:""}`;
  }
  $("trialContent").addEventListener("click",e=>{
    const option=e.target.closest("[data-answer]");
    if(option && answer===null){
      const i=Number(option.dataset.answer);
      if(i>=0 && i<data.trials[phase].options.length) {
        answer=i;renderTrial();
        const feedback=$("trialContent").querySelector(".trial-feedback");
        if(feedback){feedback.setAttribute("tabindex","-1");feedback.focus({preventScroll:true});}
      }
      return;
    }
    const action=e.target.closest("[data-trial-action]")?.dataset.trialAction;
    if(!action)return;
    if(action==="retry")answer=null;
    if(action==="restart"){phase=0;answer=null;}
    if(action==="next"){
      if(answer===null || !data.trials[phase].options[answer]?.ok)return;
      phase++;answer=null;
      if(phase===data.trials.length){completed=true;persist("completed",true);}
    }
    renderTrial();
    const focusNode=$("trialContent").querySelector(".trial-option:not([disabled]),.trial-finished h3");
    if(focusNode){focusNode.setAttribute("tabindex",focusNode.matches("button")?"0":"-1");focusNode.focus({preventScroll:true});}
  });
  // Font size persists across all pages; all controls work without hover.
  let size=1;
  try{size=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function setSize(value){
    size=Math.min(1.3,Math.max(.9,Math.round(value*10)/10));
    document.documentElement.style.setProperty("--font-scale",size);
    try{localStorage.setItem("lacan-font-size",String(size));}catch{}
  }
  $("fontDown").addEventListener("click",()=>setSize(size-.1));
  $("fontUp").addEventListener("click",()=>setSize(size+.1));
  setSize(size);
  seenModes.add(mode);persist("modes",[...seenModes]);
  seenRelations.add(relation);persist("relations",[...seenRelations]);
  renderMode();renderRelation();renderTrial();
})();