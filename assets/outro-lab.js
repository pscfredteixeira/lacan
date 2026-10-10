/* Sprint 9 · O Enigma do Outro
   Three touch-friendly investigation rooms; no tracking, diagnosis or server calls. */
(() => {
  "use strict";
  const d=window.LACAN_OUTRO_LAB;
  if(!d?.rooms?.length)return;
  const $=id=>document.getElementById(id);
  const safe=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const key="lacan-lab-outro-v1-";
  const read=(k,fallback)=>{try{const result=JSON.parse(localStorage.getItem(key+k));return result??fallback;}catch{return fallback;}};
  const save=(k,value)=>{try{localStorage.setItem(key+k,JSON.stringify(value));}catch{}};
  const roomIds=d.rooms.map(r=>r.id);
  let solved=new Set((Array.isArray(read("solved",[]))?read("solved",[]):[]).filter(x=>roomIds.includes(x)));
  let room="lugares";
  let progress={lugares:solved.has("lugares")?d.rooms[0].cases.length:0,limites:solved.has("limites")?d.rooms[2].quizzes.length:0};
  let selected=null;
  const basta=d.rooms.find(r=>r.id==="basta");
  let stem=basta.stems[0].id;
  let ending=basta.stems[0].endings[0].id;
  let versions=[];
  let evaluated=null;
  function roomData(id){return d.rooms.find(r=>r.id===id);}
  function complete(id){solved.add(id);save("solved",[...solved]);updateProgress();}
  function updateProgress(){
    $("otherProgress").textContent=solved.size+" / "+d.rooms.length;
    $("otherProgressBar").style.width=(100*solved.size/d.rooms.length)+"%";
  }
  function heading(r){
    return `<div class="other-room-heading"><span class="kicker">SALA ${safe(r.number)} / 03</span><h3>${safe(r.title)}</h3><p>${safe(r.description)}</p></div>`;
  }
  function done(r){
    return heading(r)+`<div class="other-completed"><span class="kicker">INVESTIGAÇÃO CONCLUÍDA</span><h3>Você abriu mais uma relação.</h3>
    <p>O exercício treinou uma distinção conceitual, não uma leitura clínica. Retorne às aulas e às fontes para aprofundar os argumentos.</p>
    <button type="button" class="other-button secondary" data-room-action="restart">Refazer a sala ↺</button>
    <button type="button" class="other-button" data-room-action="next-room">Explorar a próxima sala →</button></div>`;
  }
  const optionButton=(o,i,chosen,disabled)=>`<button type="button" class="other-option" data-answer="${safe(o.id)}" aria-pressed="${chosen===o.id}" ${disabled?"disabled":""}>
    <span class="other-option-index" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${safe(o.label||o.text)}</span></button>`;
  function renderQuizRoom(id){
    const r=roomData(id),index=progress[id],count=(r.cases||r.quizzes).length;
    const output=$("otherRoom-"+id);
    if(index>=count){output.innerHTML=done(r);return;}
    const caseItem=(r.cases||r.quizzes)[index];
    const opts=id==="lugares"?r.options.map(x=>({...x,correct:x.id===caseItem.correct})):caseItem.options;
    const answer=opts.find(x=>x.id===selected);
    const success=answer?.correct===true;
    output.innerHTML=heading(r)+`<div class="other-challenge">
      <div class="other-counter"><span>${id==="lugares"?"FICHA":"FASE"} ${String(index+1).padStart(2,"0")} / ${String(count).padStart(2,"0")}</span><span>${safe(r.subtitle)}</span></div>
      <div class="other-bars" aria-hidden="true">${Array.from({length:count},(_,i)=>`<span class="other-bar ${i<index?"finished":i===index?"current":""}"></span>`).join("")}</div>
      <h4 class="other-question">${safe(caseItem.text||caseItem.prompt)}</h4>
      <div class="other-options" role="group" aria-label="Escolha uma interpretação">${opts.map((x,i)=>optionButton(x,i,selected,selected!==null)).join("")}</div>
      ${answer?`<div class="other-feedback ${success?"correct":""}" role="status"><strong>${success?"A função foi distinguida.":"Essa alternativa precisa ser revista."}</strong><p>${safe(caseItem.why||answer.why)}</p></div>
      <div class="other-controls"><button class="other-button" type="button" data-room-action="${success?"advance":"retry"}">${success?(index===count-1?"Concluir sala ↗":"Próxima questão →"):"Ler novamente e tentar ↺"}</button></div>`:""}
    </div>`;
  }
  function validEnding(s,e){return basta.stems.find(x=>x.id===s)?.endings.some(x=>x.id===e);}
  function currentStem(){return basta.stems.find(x=>x.id===stem);}
  function currentEnding(){return currentStem().endings.find(x=>x.id===ending);}
  function renderBasta(){
    const r=basta,element=$("otherRoom-basta");
    if(solved.has("basta")){element.innerHTML=done(r);return;}
    const current=currentStem(),end=currentEnding();
    element.innerHTML=heading(r)+`<div class="other-challenge">
    <span class="kicker">ESCOLHA UMA CENA</span>
    <div class="other-basta-tabs" role="group" aria-label="Escolha a narrativa">${basta.stems.map((s,i)=>`<button type="button" class="other-basta-tab ${s.id===stem?"selected":""}" data-stem="${safe(s.id)}" aria-pressed="${s.id===stem}">${i+1}. ${s.id==="carta"?"A carta":"A chave"}</button>`).join("")}</div>
    <div class="other-basta-scene"><span class="scene-label">FRAGMENTO EM MOVIMENTO / EXEMPLO FICTÍCIO</span>
    <blockquote>“${safe(current.start)} <mark>${safe(end.text)}</mark>”</blockquote>
    <div class="other-ending-options" role="group" aria-label="Escolha como a frase termina">
    ${current.endings.map(e=>`<button type="button" class="other-ending-choice" data-ending="${safe(e.id)}" aria-pressed="${e.id===ending}">${safe(e.text)}</button>`).join("")}</div>
    <p class="other-basta-hint">${safe(end.why)}</p></div>
    <div class="other-controls"><button class="other-button" type="button" data-room-action="save-version">Guardar versão ↗</button><button class="other-button secondary" type="button" data-room-action="clear-versions">Limpar versões</button></div>
    <p class="other-basta-status" id="otherVersionStatus" role="status">Guarde dois finais diferentes para a mesma cena e compare-os.</p>
    <div class="other-version-board">${[0,1].map(i=>{
      const v=versions[i];const start=basta.stems.find(s=>s.id===v?.stem);const suffix=start?.endings.find(e=>e.id===v?.ending);
      return `<article class="other-version ${!v?"empty":""}"><strong>VERSÃO ${String(i+1).padStart(2,"0")}</strong><p>${v?`“${safe(start.start)} ${safe(suffix.text)}”`:"Nenhuma versão guardada."}</p></article>`;
    }).join("")}</div>
    ${versions.length===2?`<div class="other-basta-answer"><p>As duas versões têm o mesmo começo e finais diferentes. O que essa diferença pode ensinar?</p>
    <h4>${safe(r.mainQuestion)}</h4>
    <div class="other-options" role="group" aria-label="Conclusão sobre o ponto de basta">
    ${r.conclusions.map((o,i)=>optionButton(o,i,evaluated,evaluated!==null)).join("")}</div>
    ${evaluated?`<div class="other-feedback ${r.conclusions.find(o=>o.id===evaluated)?.correct?"correct":""}" role="status"><strong>${r.conclusions.find(o=>o.id===evaluated)?.correct?"A interpretação respeita os limites do exemplo.":"Essa conclusão vai além do que o exercício mostra."}</strong>
    <p>${safe(r.conclusions.find(o=>o.id===evaluated)?.why)}</p></div>
    <div class="other-controls"><button class="other-button" type="button" data-room-action="${r.conclusions.find(o=>o.id===evaluated)?.correct?"finish-basta":"retry-basta"}">${r.conclusions.find(o=>o.id===evaluated)?.correct?"Concluir a investigação ↗":"Tentar novamente ↺"}</button></div>`:""}`:""}</div>`;
  }
  function renderRoom(){
    if(room==="basta")renderBasta();
    else renderQuizRoom(room);
  }
  function showRoom(id,focus=false){
    if(!roomIds.includes(id))return;
    room=id;selected=null;
    document.querySelectorAll("[data-tab]").forEach(t=>{
      const on=t.dataset.tab===id;
      t.classList.toggle("selected",on);t.setAttribute("aria-selected",String(on));t.tabIndex=on?0:-1;
      if(on&&focus)t.focus();
    });
    roomIds.forEach(i=>$("otherPanel-"+i).hidden=i!==id);
    renderRoom();
  }
  $("otherTabs").addEventListener("click",e=>{
    const b=e.target.closest("[data-tab]");if(b)showRoom(b.dataset.tab);
  });
  $("otherTabs").addEventListener("keydown",e=>{
    if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;
    e.preventDefault();let i=roomIds.indexOf(room);
    if(e.key==="Home")i=0;else if(e.key==="End")i=roomIds.length-1;else i=(i+(e.key==="ArrowRight"?1:roomIds.length-1))%roomIds.length;
    showRoom(roomIds[i],true);
  });
  $("otherWorkshop").addEventListener("click",e=>{
    const area=e.target.closest(".other-panel");if(!area)return;
    const r=roomData(room);
    const stemButton=e.target.closest("[data-stem]");
    if(stemButton&&room==="basta"){
      stem=stemButton.dataset.stem;
      ending=currentStem().endings[0].id;versions=[];evaluated=null;renderBasta();return;
    }
    const endingButton=e.target.closest("[data-ending]");
    if(endingButton&&room==="basta"){
      if(!validEnding(stem,endingButton.dataset.ending))return;
      ending=endingButton.dataset.ending;renderBasta();
      [...area.querySelectorAll("[data-ending]")].find(b=>b.dataset.ending===ending)?.focus();return;
    }
    const choice=e.target.closest("[data-answer]");
    if(choice){
      if(room==="basta"){
        if(evaluated!==null||versions.length!==2)return;
        const option=r.conclusions.find(x=>x.id===choice.dataset.answer);
        if(!option)return;
        evaluated=option.id;renderBasta();
        const feedback=area.querySelector(".other-feedback");
        if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}
        return;
      }
      if(selected!==null)return;
      const q=(r.cases||r.quizzes)[progress[room]];
      if(!q)return;
      const valid=room==="lugares"?r.options.some(x=>x.id===choice.dataset.answer):q.options.some((x,i)=>String(i)===choice.dataset.answer);
      if(!valid)return;
      selected=choice.dataset.answer;
      renderQuizRoom(room);
      const feedback=area.querySelector(".other-feedback");
      if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}
      return;
    }
    const action=e.target.closest("[data-room-action]")?.dataset.roomAction;
    if(!action)return;
    if(action==="save-version"&&room==="basta"){
      const next={stem,ending};
      if(versions.length && versions[0].stem!==stem){
        versions=[];evaluated=null;
      }
      if(versions.some(v=>v.stem===stem && v.ending===ending)){
        $("otherVersionStatus").textContent="Esta versão já foi guardada. Escolha outro final da mesma cena.";
        return;
      }
      versions=[...versions,next].slice(-2);evaluated=null;renderBasta();return;
    }
    if(action==="clear-versions"&&room==="basta"){versions=[];evaluated=null;renderBasta();return;}
    if(action==="retry-basta"&&room==="basta"){evaluated=null;renderBasta();return;}
    if(action==="finish-basta"&&room==="basta"){
      if(!r.conclusions.find(x=>x.id===evaluated)?.correct)return;
      complete("basta");renderBasta();return;
    }
    if(action==="retry"&&room!=="basta"){
      selected=null;renderQuizRoom(room);area.querySelector(".other-option")?.focus();return;
    }
    if(action==="advance"&&room!=="basta"){
      const q=(r.cases||r.quizzes)[progress[room]];
      const success=room==="lugares"?q.correct===selected:q.options[Number(selected)]?.correct===true;
      if(!success)return;
      progress[room]++;selected=null;
      if(progress[room]===(r.cases||r.quizzes).length)complete(room);
      renderQuizRoom(room);area.querySelector(".other-option,.other-completed .other-button")?.focus({preventScroll:true});return;
    }
    if(action==="restart"){
      solved.delete(room);save("solved",[...solved]);updateProgress();
      if(room==="basta"){versions=[];evaluated=null;}
      else progress[room]=0;
      selected=null;renderRoom();return;
    }
    if(action==="next-room"){
      const i=(roomIds.indexOf(room)+1)%roomIds.length;showRoom(roomIds[i],true);
    }
  });
  $("otherSources").innerHTML=d.sources.map(s=>`<a href="${safe(s.url)}" target="_blank" rel="noopener noreferrer">${safe(s.label)} ↗<small>${safe(s.note)}</small></a>`).join("");
  let font=1;
  try{font=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function resize(v){
    font=Math.max(.9,Math.min(1.3,Math.round(v*10)/10));
    document.documentElement.style.setProperty("--font-scale",font);
    try{localStorage.setItem("lacan-font-size",String(font));}catch{}
  }
  $("fontDown").addEventListener("click",()=>resize(font-.1));
  $("fontUp").addEventListener("click",()=>resize(font+.1));
  resize(font);showRoom("lugares");updateProgress();
})();