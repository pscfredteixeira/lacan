/* Sprint 10 — Circuito do Desejo
   UI interactions operate on fictional narratives only. No clinical inference.
   User progress saved locally, no third-party analytics or remote storage. */
(() => {
  "use strict";
  const data=window.LACAN_DESEJO_LAB;
  if(!data?.scenes || !data?.experiments || !data?.quiz)return;
  const $=id=>document.getElementById(id);
  const safe=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const roomIds=["cenas","respostas","conclusao"];
  const storeKey="lacan-desejo-circuito-v1";
  function readDone(){try{const list=JSON.parse(localStorage.getItem(storeKey));return Array.isArray(list)?list.filter(i=>roomIds.includes(i)):[];}catch{return[];}}
  const done=new Set(readDone());
  function saveDone(){try{localStorage.setItem(storeKey,JSON.stringify([...done]));}catch{}}
  let room="cenas",answer=null;
  const step={cenas:done.has("cenas")?data.scenes.length:0,respostas:done.has("respostas")?data.experiments.length:0,conclusao:done.has("conclusao")?data.quiz.length:0};
  let responseId=data.experiments[0].choose[1],versions=[],message="";
  const letter=i=>String.fromCharCode(65+i);
  function setDone(id){done.add(id);saveDone();refreshCount();}
  function refreshCount(){
    $("desireProgress").textContent=done.size+" / 3";
    $("desireProgressBar").style.width=100*done.size/3+"%";
  }
  function stages(current,count){
    return `<div class="desire-game-count"><span>EXPERIÊNCIA ${String(current+1).padStart(2,"0")} / ${String(count).padStart(2,"0")}</span><span>EXEMPLOS FICTÍCIOS PARA APRENDER</span></div>
    <div class="desire-game-bars" aria-hidden="true">${Array.from({length:count},(_,i)=>`<span class="desire-game-bar ${i<current?"past":i===current?"current":""}"></span>`).join("")}</div>`;
  }
  function choiceButton(x,i,id,locked){
    return `<button type="button" class="desire-option" data-answer="${safe(id)}" aria-pressed="${answer===id}" ${locked?"disabled":""}>
      <span class="desire-option-letter" aria-hidden="true">${letter(i)}</span><span>${safe(x.text)}</span></button>`;
  }
  function feedback(correct,why){
    return `<div class="desire-feedback ${correct?"correct":""}" role="status"><strong>${correct?"A leitura preserva a distinção.":"Esta conclusão vai além do exemplo."}</strong><p>${safe(why)}</p></div>
    <div class="desire-controls"><button type="button" class="desire-button ${correct?"":"secondary"}" data-action="${correct?"advance":"retry"}">${correct?"Continuar a investigação →":"Ler novamente e tentar ↺"}</button></div>`;
  }
  function completedMarkup(){
    return `<div class="desire-finished"><span class="desire-label">ETAPA CONCLUÍDA</span><h3>Um circuito, novas distinções.</h3>
      <p>Você concluiu esta sala. O exercício apresenta operações conceituais por meio de cenas fictícias. Ele não interpreta o desejo de nenhuma pessoa.</p>
      <div class="desire-controls"><button type="button" class="desire-button secondary" data-action="restart">Refazer esta sala ↺</button>
      <button type="button" class="desire-button" data-action="next-room">Abrir a próxima sala →</button></div></div>`;
  }
  function roomHeading(number,title,intro){
    return `<div class="desire-room-top"><span class="desire-label">MOVIMENTO ${number} / 03</span><h3>${safe(title)}</h3><p>${safe(intro)}</p></div>`;
  }
  function renderScenes(){
    const el=$("desireRoom-cenas");
    if(step.cenas>=data.scenes.length){el.innerHTML=roomHeading("01","O que o pedido coloca em relação?","Um pedido pode atender uma exigência e estabelecer um endereçamento.")+completedMarkup();return;}
    const c=data.scenes[step.cenas];
    const selected=answer===null?null:c.answers[Number(answer)];
    el.innerHTML=roomHeading("01","Um objeto e alguém que escuta","Investigue o que pode ser explicitamente observado e o que exigiria uma interpretação indevida.")+
    `<div class="desire-game">${stages(step.cenas,data.scenes.length)}
      <div class="desire-story"><h4>${safe(c.label)}</h4><p><strong>Necessidade em questão:</strong> ${safe(c.need)}</p><p><strong>O que se diz:</strong> ${safe(c.message)}</p>
      <p><strong>A resposta:</strong> ${safe(c.reply)}</p><p><strong>Para pensar:</strong> ${safe(c.focus)}</p></div>
      <h4 class="desire-story-question">${safe(c.question)}</h4>
      <div class="desire-options" role="group" aria-label="Escolha uma conclusão">${c.answers.map((x,i)=>choiceButton(x,i,String(i),answer!==null)).join("")}</div>
      ${selected?feedback(selected.correct,selected.why):""}</div>`;
  }
  function renderResponses(){
    const el=$("desireRoom-respostas");
    if(step.respostas>=data.experiments.length){el.innerHTML=roomHeading("02","O objeto não conta toda a história","Explore as diferenças entre atender uma exigência e responder a uma demanda.")+completedMarkup();return;}
    const ex=data.experiments[step.respostas];
    const scene=data.scenes.find(x=>x.id===ex.choose[0]);
    const response=data.responses.find(x=>x.id===responseId)||data.responses[0];
    const selected=answer===null?null:ex.options.find(x=>x.id===answer);
    el.innerHTML=roomHeading("02","Altere a resposta e compare","Uma mesma demanda pode receber respostas diferentes. Guarde duas para investigar o que realmente podemos concluir.")+
    `<div class="desire-game">${stages(step.respostas,data.experiments.length)}
      <h4 class="desire-story-question">${safe(ex.title)}</h4>
      <div class="desire-story"><h4>${safe(scene.label)}</h4><p>${safe(ex.stem)}</p><p><strong>O pedido:</strong> ${safe(scene.message)}</p></div>
      <div class="desire-selects"><div class="desire-field"><span class="desire-label">ESCOLHA COMO O OUTRO RESPONDE</span>
      <div class="desire-field-buttons" role="group" aria-label="Três respostas à demanda">
      ${data.responses.map(x=>`<button type="button" data-response="${safe(x.id)}" aria-pressed="${response.id===x.id}">${safe(x.label)}</button>`).join("")}</div></div>
      <div class="desire-inspector"><h4>O efeito desta versão</h4><p>${safe(response.text)}</p><p>${safe(response.insight)}</p></div></div>
      <div class="desire-controls"><button class="desire-button" type="button" data-action="save-response">Guardar esta versão ↗</button>
      <button class="desire-button secondary" type="button" data-action="clear-responses">Limpar comparação</button></div>
      <p class="desire-label" id="desireSaveStatus" role="status">${safe(message||"Compare duas respostas diferentes para a mesma cena.")}</p>
      <div class="desire-archive">${[0,1].map(i=>{
        const v=versions[i],r=data.responses.find(x=>x.id===v);
        return `<article><strong>VERSÃO ${String(i+1).padStart(2,"0")}</strong><p>${r?safe(r.text):"Ainda não guardada."}</p></article>`;
      }).join("")}</div>
      ${versions.length===2?`<div class="desire-inspector"><h4>O que a comparação permite afirmar?</h4><p>Duas respostas diferentes não bastam para conhecer o desejo inconsciente de uma personagem. Escolha a conclusão mais rigorosa.</p></div>
      <div class="desire-options" role="group" aria-label="Conclusão da comparação">
      ${ex.options.map((x,i)=>choiceButton(x,i,x.id,answer!==null)).join("")}</div>
      ${selected?feedback(selected.correct,selected.why):""}`:""}</div>`;
  }
  function renderFinal(){
    const el=$("desireRoom-conclusao");
    if(step.conclusao>=data.quiz.length){el.innerHTML=roomHeading("03","O que ficou em aberto?","Uma avaliação em três fases para sintetizar as distinções.")+completedMarkup();return;}
    const q=data.quiz[step.conclusao];
    const selected=answer===null?null:q.answers[Number(answer)];
    el.innerHTML=roomHeading("03","O enigma do desejo","Reconheça, compreenda e aplique criticamente os conceitos sem recorrer a interpretações prontas.")+
      `<div class="desire-game">${stages(step.conclusao,data.quiz.length)}<span class="desire-label">FASE: ${safe(q.phase.toUpperCase())}</span>
      <h4 class="desire-story-question">${safe(q.title)}</h4><p>${safe(q.prompt)}</p>
      <div class="desire-options" role="group" aria-label="Escolha uma resposta">${q.answers.map((x,i)=>choiceButton(x,i,String(i),answer!==null)).join("")}</div>
      ${selected?feedback(selected.correct,selected.why):""}</div>`;
  }
  function renderRoom(){
    if(room==="cenas")renderScenes(); else if(room==="respostas")renderResponses();else renderFinal();
  }
  function openRoom(id,focus=false){
    if(!roomIds.includes(id))return;
    room=id;answer=null;message="";
    if(id==="respostas"){responseId=data.experiments[Math.min(step.respostas,data.experiments.length-1)].choose[1];versions=[];}
    document.querySelectorAll(".desire-tab").forEach(t=>{
      const on=t.dataset.room===id;t.classList.toggle("selected",on);t.setAttribute("aria-selected",String(on));t.tabIndex=on?0:-1;
      if(on&&focus)t.focus();
    });
    roomIds.forEach(r=>$("desirePanel-"+r).hidden=r!==id);
    renderRoom();
  }
  $("desireWorkshop").addEventListener("click",event=>{
    const panel=event.target.closest(".desire-panel");if(!panel)return;
    const resp=event.target.closest("[data-response]");
    if(resp&&room==="respostas"){
      if(!data.responses.some(x=>x.id===resp.dataset.response))return;
      responseId=resp.dataset.response;renderResponses();
      panel.querySelector('[data-response="'+responseId+'"]')?.focus();return;
    }
    const option=event.target.closest("[data-answer]");
    if(option&&answer===null){
      const id=option.dataset.answer;
      if(room==="respostas"){
        if(versions.length!==2||!data.experiments[step.respostas]?.options.some(x=>x.id===id))return;
      }else{
        const valid=room==="cenas"?data.scenes[step.cenas]?.answers[Number(id)]:data.quiz[step.conclusao]?.answers[Number(id)];
        if(!valid || !Number.isInteger(Number(id)))return;
      }
      answer=id;renderRoom();
      const feedback=panel.querySelector(".desire-feedback");
      if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}return;
    }
    const action=event.target.closest("[data-action]")?.dataset.action;
    if(!action)return;
    if(action==="save-response"&&room==="respostas"){
      if(versions.includes(responseId)){
        message="Esta resposta já está guardada. Selecione outra para comparar.";
        $("desireSaveStatus").textContent=message;return;
      }
      versions=[...versions,responseId].slice(-2);answer=null;message="Versão guardada. Compare duas respostas diferentes.";
      renderResponses();return;
    }
    if(action==="clear-responses"&&room==="respostas"){versions=[];answer=null;message="Comparação reiniciada.";renderResponses();return;}
    if(action==="retry"){
      answer=null;renderRoom();panel.querySelector("[data-answer]")?.focus();return;
    }
    if(action==="advance"){
      let correct=false;
      if(room==="cenas") correct=data.scenes[step.cenas]?.answers[Number(answer)]?.correct===true;
      else if(room==="respostas") correct=data.experiments[step.respostas]?.options.find(x=>x.id===answer)?.correct===true;
      else correct=data.quiz[step.conclusao]?.answers[Number(answer)]?.correct===true;
      if(!correct)return;
      step[room]++;answer=null;versions=[];message="";
      if(room==="respostas"&&step.respostas<data.experiments.length)responseId=data.experiments[step.respostas].choose[1];
      const length=room==="cenas"?data.scenes.length:room==="respostas"?data.experiments.length:data.quiz.length;
      if(step[room]===length)setDone(room);
      renderRoom();panel.querySelector("[data-answer],.desire-finished .desire-button")?.focus({preventScroll:true});return;
    }
    if(action==="restart"){
      done.delete(room);saveDone();refreshCount();step[room]=0;answer=null;versions=[];message="";
      if(room==="respostas")responseId=data.experiments[0].choose[1];
      renderRoom();return;
    }
    if(action==="next-room"){openRoom(roomIds[(roomIds.indexOf(room)+1)%roomIds.length],true);}
  });
  document.querySelectorAll(".desire-tab").forEach(button=>button.addEventListener("click",()=>openRoom(button.dataset.room)));
  document.querySelector(".desire-tabs").addEventListener("keydown",event=>{
    if(!["ArrowRight","ArrowLeft","Home","End"].includes(event.key))return;
    event.preventDefault();let index=roomIds.indexOf(room);
    index=event.key==="Home"?0:event.key==="End"?2:(index+(event.key==="ArrowRight"?1:2))%3;
    openRoom(roomIds[index],true);
  });
  $("desireSources").innerHTML=data.sources.map(s=>`<a href="${safe(s.url)}" target="_blank" rel="noopener noreferrer">${safe(s.title)} ↗<small>${safe(s.note)}</small></a>`).join("");
  let scale=1;
  try{scale=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function fontChange(x){
    scale=Math.min(1.3,Math.max(.9,Math.round(x*10)/10));
    document.documentElement.style.setProperty("--font-scale",scale);
    try{localStorage.setItem("lacan-font-size",String(scale));}catch{}
  }
  $("fontDown").addEventListener("click",()=>fontChange(scale-.1));
  $("fontUp").addEventListener("click",()=>fontChange(scale+.1));
  fontChange(scale);openRoom("cenas");refreshCount();
})();