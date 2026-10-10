/* Sprint 5 — Ateliê dos Significantes.
   Demonstra relações de linguagem, nunca interpreta um sujeito ou diagnostica alguém. */
(() => {
  "use strict";
  const d = window.LACAN_SIGNIFICANTES;
  if (!d || !Array.isArray(d.slots) || !Array.isArray(d.machineCases)) return;
  const $ = id => document.getElementById(id);
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const prefix = "lacan-significantes-v1-";
  const read = (name,fallback) => {try {const result=JSON.parse(localStorage.getItem(prefix+name));return result===null?fallback:result;} catch {return fallback;}};
  const write = (name,value) => {try {localStorage.setItem(prefix+name,JSON.stringify(value));return true;}catch{return false;}};
  const defaults = () => Object.fromEntries(d.slots.map(slot => [slot.key,slot.starting]));
  const allowedSelection = (key,value) => d.slots.some(slot=>slot.key===key && slot.choices.some(c=>c.value===value));
  const savedSelections=read("selections",defaults());
  let selected=defaults();
  if(savedSelections && typeof savedSelections==="object") d.slots.forEach(slot=>{
    if(allowedSelection(slot.key,savedSelections[slot.key])) selected[slot.key]=savedSelections[slot.key];
  });
  const cleanVersion = v => v && typeof v==="object" && d.slots.every(slot=>allowedSelection(slot.key,v[slot.key])) ?
    Object.fromEntries(d.slots.map(slot=>[slot.key,v[slot.key]])) : null;
  let versions=(Array.isArray(read("versions",[]))?read("versions",[]):[]).map(cleanVersion).filter(Boolean).slice(-2);
  let activeCase=d.machineCases[0].id;
  let chosenOperation=null;
  const allowedIds=d.machineCases.map(x=>x.id);
  let solvedCases=new Set((Array.isArray(read("solvedCases",[]))?read("solvedCases",[]):[]).filter(x=>allowedIds.includes(x)));
  let quizComplete=read("quizComplete",false)===true;
  let quizPhase=quizComplete?d.quiz.length:0;
  let quizChoice=null;
  // Mesa 01: edição e comparação entre duas versões da mesma estrutura.
  const sentence = v => `A casa virou <mark class="word-highlight">${escapeHTML(v.figura)}</mark>. No silêncio havia <mark class="word-highlight">${escapeHTML(v.vestigio)}</mark>. Na carta, uma palavra: ‘<mark class="word-highlight">${escapeHTML(v.palavra)}</mark>’.`;
  const plainSentence = v => `A casa virou ${v.figura}. No silêncio havia ${v.vestigio}. Na carta, uma palavra: ‘${v.palavra}’.`;
  const equalVersion = (a,b) => d.slots.every(slot=>a[slot.key]===b[slot.key]);
  function renderSlots() {
    $("wordSlots").innerHTML = d.slots.map((slot,i)=>`<section class="word-slot"><div class="slot-heading"><span>${String(i+1).padStart(2,"0")}</span><strong>${escapeHTML(slot.prompt)}</strong></div>
      <div class="slot-choices" role="group" aria-label="${escapeHTML(slot.prompt)}">
      ${slot.choices.map(choice=>`<button type="button" class="slot-choice" data-slot="${escapeHTML(slot.key)}" data-choice="${escapeHTML(choice.value)}" aria-pressed="${selected[slot.key]===choice.value}">${escapeHTML(choice.value)}</button>`).join("")}</div></section>`).join("");
    $("liveSentence").innerHTML=sentence(selected);
    $("wordEffects").innerHTML=d.slots.map(slot=>{
      const choice=slot.choices.find(c=>c.value===selected[slot.key]);
      return `<div class="word-effect"><strong>${escapeHTML(slot.key.toUpperCase())} ·</strong> ${escapeHTML(choice.note)}</div>`;
    }).join("");
  }
  function renderVersions(){
    $("versionCards").innerHTML=[0,1].map(i=>{
      const v=versions[i];
      return `<article class="version-card"><span class="version-number">VERSÃO ${String(i+1).padStart(2,"0")}</span>
      ${v?`<p>${escapeHTML(plainSentence(v))}</p>`:'<p class="version-empty">Você ainda não guardou esta versão.</p>'}</article>`;
    }).join("");
    if(versions.length<2){
      $("compareResult").textContent="A comparação aparecerá depois que você guardar duas montagens diferentes.";
      return;
    }
    const differences=d.slots.filter(slot=>versions[0][slot.key]!==versions[1][slot.key]);
    $("compareResult").innerHTML=`<strong>Diferenças observáveis:</strong> ${differences.length} ${differences.length===1?"posição foi alterada":"posições foram alteradas"}.
    <ul>${differences.map(slot=>`<li><strong>${escapeHTML(slot.key)}:</strong> de ‘${escapeHTML(versions[0][slot.key])}’ para ‘${escapeHTML(versions[1][slot.key])}’.</li>`).join("")}</ul>
    <p>Observe como a leitura possível da cena se reorganiza. Esse efeito da montagem literária não é uma interpretação do inconsciente e não atribui um sentido universal a cada palavra.</p>`;
  }
  $("wordSlots").addEventListener("click",event=>{
    const btn=event.target.closest("[data-slot]");
    if(!btn)return;
    const key=btn.dataset.slot,choice=btn.dataset.choice;
    if(!allowedSelection(key,choice))return;
    selected[key]=choice;write("selections",selected);
    $("benchMessage").textContent="";
    renderSlots();
    const same=[...$("wordSlots").querySelectorAll("[data-slot]")].find(node=>node.dataset.slot===key && node.dataset.choice===choice);
    if(same)same.focus();
  });
  $("saveVersion").addEventListener("click",()=>{
    const current=cleanVersion(selected);
    if(versions.some(v=>equalVersion(v,current))){
      $("benchMessage").textContent="Essa combinação já está no arquivo. Mude pelo menos uma palavra para guardar uma nova versão.";
      return;
    }
    versions=[...versions,current].slice(-2);
    const saved=write("versions",versions);
    renderVersions();
    $("benchMessage").textContent=saved?"Versão registrada neste navegador. Compare agora com outra montagem.":"Versão guardada nesta sessão; o navegador não permitiu salvá-la permanentemente.";
  });
  $("resetBench").addEventListener("click",()=>{
    selected=defaults();write("selections",selected);renderSlots();
    $("benchMessage").textContent="A montagem voltou ao início. As versões já guardadas continuam no arquivo.";
  });
  // Mesa 02: identificar qual operação é demonstrada por um exemplo controlado.
  const opLabel={substituicao:"Substituição",conexao:"Conexão"};
  function renderCaseList() {
    $("operationCards").innerHTML=d.machineCases.map((item,index)=>`<button class="operation-card" type="button" data-case="${escapeHTML(item.id)}" aria-pressed="${activeCase===item.id}">
      <span class="case-index">${String(index+1).padStart(2,"0")}</span><span><strong>${escapeHTML(item.title)}</strong><small>${solvedCases.has(item.id)?"✓ Operação compreendida":"Abrir dossiê"}</small></span></button>`).join("");
    $("operationCount").textContent=solvedCases.size+" de "+d.machineCases.length+" dossiês resolvidos neste dispositivo.";
  }
  function renderCase(){
    const c=d.machineCases.find(x=>x.id===activeCase);
    if(!c)return;
    const answered=chosenOperation!==null;
    const correct=chosenOperation===c.type;
    $("operationStage").innerHTML=`<span class="case-label">O DOSSIÊ / ${escapeHTML(c.id.toUpperCase())}</span>
      <h3>${escapeHTML(c.title)}</h3><p class="case-setup">${escapeHTML(c.setup)}</p>
      <div class="case-board"><span>DIAGRAMA DIDÁTICO / TERMOS EM RELAÇÃO</span>
      <div class="case-nodes">${c.nodes.map((node,i)=>`${i?'<span class="case-arrow" aria-hidden="true">→</span>':''}<span class="case-node">${escapeHTML(node)}</span>`).join("")}</div>
      <p>${escapeHTML(c.source)}</p></div>
      <p class="sign-label">QUAL OPERAÇÃO ESTA CENA FOI CONSTRUÍDA PARA EXPLORAR?</p>
      <div class="operation-choices" role="group" aria-label="Escolher operação">
      ${Object.entries(opLabel).map(([value,label])=>`<button type="button" class="operation-choice" data-operation="${value}" aria-pressed="${chosenOperation===value}" ${answered?"disabled":""}>${escapeHTML(label)}</button>`).join("")}</div>
      ${answered?`<aside class="operation-feedback ${correct?"correct":""}" role="status"><strong>${correct?"A distinção está correta.":"A operação escolhida não é a ênfase deste exemplo."}</strong>
        <p>${escapeHTML(c.why)}</p>${correct?`<p><strong>Efeito observado:</strong> ${escapeHTML(c.result)}</p><p><strong>Atenção:</strong> ${escapeHTML(c.note)}</p>`:""}</aside>
        <button class="sign-button operation-next" type="button" data-operation-action="${correct?"next":"retry"}">${correct?"Abrir outro dossiê →":"Reexaminar as duas operações ↺"}</button>`:""}`;
    renderCaseList();
  }
  $("operationCards").addEventListener("click",event=>{
    const button=event.target.closest("[data-case]");
    if(!button)return;
    activeCase=button.dataset.case;chosenOperation=null;renderCase();
    if(innerWidth<741)$("operationStage").scrollIntoView({block:"start",behavior:"smooth"});
  });
  $("operationStage").addEventListener("click",event=>{
    const choice=event.target.closest("[data-operation]");
    const c=d.machineCases.find(x=>x.id===activeCase);
    if(choice && chosenOperation===null){
      const operation=choice.dataset.operation;
      if(!Object.keys(opLabel).includes(operation))return;
      chosenOperation=operation;
      if(operation===c.type){
        solvedCases.add(c.id);write("solvedCases",[...solvedCases]);
      }
      renderCase();return;
    }
    const action=event.target.closest("[data-operation-action]")?.dataset.operationAction;
    if(action==="retry"){chosenOperation=null;renderCase();}
    if(action==="next"){
      const index=d.machineCases.findIndex(x=>x.id===activeCase);
      const order=[...d.machineCases.slice(index+1),...d.machineCases.slice(0,index+1)];
      const next=order.find(x=>!solvedCases.has(x.id)) || d.machineCases[(index+1)%d.machineCases.length];
      activeCase=next.id;chosenOperation=null;renderCase();
      $("operationStage").scrollIntoView({block:"start",behavior:"smooth"});
    }
  });
  // Mesa 03: cada alternativa fornece justificativa; conclusão só após três acertos.
  function renderQuiz(){
    $("quizCounter").textContent=String(Math.min(quizPhase+1,d.quiz.length)).padStart(2,"0")+" / 03";
    $("quizSteps").innerHTML=d.quiz.map((_,i)=>`<span class="quiz-step ${i<quizPhase?"finished":i===quizPhase?"current":""}"></span>`).join("");
    if(quizPhase>=d.quiz.length){
      $("quizCounter").textContent="03 / 03";
      $("signQuiz").innerHTML=`<div class="sign-quiz-finished"><span class="sign-label">INVESTIGAÇÃO CONCLUÍDA</span>
      <h3>O sentido continua em aberto.</h3><p>Você reconheceu a cadeia, diferenciou duas operações e identificou os limites de uma analogia didática. Este resultado não substitui a leitura de Lacan, mas prepara questões para ela.</p>
      <button class="sign-button secondary" data-quiz-action="restart" type="button">Recomeçar as três fases ↺</button></div>`;
      return;
    }
    const q=d.quiz[quizPhase];
    const marked=q.answers[quizChoice];
    $("signQuiz").innerHTML=`<span class="sign-quiz-phase">FASE ${quizPhase+1} · ${escapeHTML(q.phase.toUpperCase())}</span>
      <h3 class="sign-quiz-title">${escapeHTML(q.title)}</h3><p class="sign-quiz-question">${escapeHTML(q.question)}</p>
      <div class="sign-quiz-options">${q.answers.map((answer,i)=>`<button class="sign-quiz-choice" data-quiz-choice="${i}" type="button" aria-pressed="${quizChoice===i}" ${marked?"disabled":""}><span aria-hidden="true">${String.fromCharCode(65+i)}</span>${escapeHTML(answer.label)}</button>`).join("")}</div>
      ${marked?`<div class="sign-quiz-feedback ${marked.correct?"correct":""}" role="status"><strong>${marked.correct?"Você preservou a distinção conceitual.":"Essa resposta precisa de uma revisão."}</strong><p>${escapeHTML(marked.explanation)}</p></div>
      <div class="sign-quiz-controls"><button class="sign-button ${marked.correct?"":"secondary"}" type="button" data-quiz-action="${marked.correct?"advance":"retry"}">${marked.correct?(quizPhase===d.quiz.length-1?"Concluir laboratório →":"Próxima fase →"):"Tentar de novo ↺"}</button></div>`:""}`;
  }
  $("signQuiz").addEventListener("click",event=>{
    const choice=event.target.closest("[data-quiz-choice]");
    if(choice && quizChoice===null){
      const index=Number(choice.dataset.quizChoice);
      if(!d.quiz[quizPhase]?.answers[index])return;
      quizChoice=index;renderQuiz();
      return;
    }
    const action=event.target.closest("[data-quiz-action]")?.dataset.quizAction;
    if(action==="retry"){quizChoice=null;renderQuiz();}
    if(action==="advance"){
      if(!d.quiz[quizPhase]?.answers[quizChoice]?.correct)return;
      quizPhase++;quizChoice=null;
      if(quizPhase===d.quiz.length){quizComplete=true;write("quizComplete",true);}
      renderQuiz();
      $("investigacao").scrollIntoView({block:"start",behavior:"smooth"});
    }
    if(action==="restart"){
      quizComplete=false;write("quizComplete",false);quizPhase=0;quizChoice=null;renderQuiz();
    }
  });
  // Metadados, acessibilidade e tipografia partilhada entre laboratórios.
  $("signSources").innerHTML=d.references.map(ref=>`<a href="${escapeHTML(ref.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(ref.title)} ↗<small>${escapeHTML(ref.detail)}</small></a>`).join("");
  let scale=1;
  try{scale=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function setScale(next){
    scale=Math.max(.9,Math.min(1.3,Math.round(next*10)/10));
    document.documentElement.style.setProperty("--font-scale",scale);
    try{localStorage.setItem("lacan-font-size",String(scale));}catch{}
  }
  $("fontDown").addEventListener("click",()=>setScale(scale-.1));
  $("fontUp").addEventListener("click",()=>setScale(scale+.1));
  setScale(scale);
  renderSlots();renderVersions();renderCase();renderQuiz();
})();