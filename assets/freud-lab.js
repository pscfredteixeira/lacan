/* Sprint 7: três investigações freudianas. Sem diagnóstico, sem transmissão de dados. */
(() => {
  "use strict";
  const data=window.LACAN_FREUD_LAB;
  if(!data?.rooms?.length)return;
  const $=id=>document.getElementById(id);
  const safe=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const key="lacan-freud-oficina-";
  function read(item,fallback){try {const result=JSON.parse(localStorage.getItem(key+item));return result===null?fallback:result;}catch{return fallback;}}
  function write(item,val){try{localStorage.setItem(key+item,JSON.stringify(val));}catch{}}
  const rooms=data.rooms;
  const validRooms=rooms.map(r=>r.id);
  let solved=new Set((Array.isArray(read("solved",[]))?read("solved",[]):[]).filter(x=>validRooms.includes(x)));
  let currentRoom="topicas";
  const steps={topicas:0,sonho:0};
  let answer=null,sequenceResult=null;
  let chronological=[...rooms.find(r=>r.id==="cronologia").initial];
  const letter=i=>String.fromCharCode(65+i);
  const headings=r=>`<div class="freud-room-heading"><span>INVESTIGAÇÃO ${safe(r.index)} / 03</span><h3>${safe(r.title)}</h3><p>${safe(r.description)}</p></div>`;
  function progress(){
    $("workshopCount").textContent=solved.size+" / "+rooms.length;
    $("workshopBar").style.width=(100*solved.size/rooms.length)+"%";
  }
  function finish(id){
    solved.add(id);
    write("solved",[...solved]);
    progress();
  }
  function quizRoom(r){
    const n=steps[r.id];
    const area=$("roomContent-"+r.id);
    if(n>=r.items.length){
      area.innerHTML=headings(r)+`<div class="freud-finish"><span class="freud-activity-label">MESA ${safe(r.index)} · CONCLUÍDA</span><h3>Você concluiu esta investigação.</h3><p>As distinções trabalhadas aqui são pontos de partida. Volte aos textos indicados para compreender seus argumentos completos e as mudanças ao longo da obra de Freud.</p><button class="freud-button secondary" type="button" data-restart="${safe(r.id)}">Refazer investigação ↺</button></div>`;
      return;
    }
    const item=r.items[n],choices=data.choices[r.id],mark=choices.find(c=>c.id===answer);
    area.innerHTML=headings(r)+`<div class="freud-activity"><div class="freud-question-counter"><span>DOCUMENTO ${String(n+1).padStart(2,"0")} DE ${String(r.items.length).padStart(2,"0")}</span><span>${safe(r.name)}</span></div>
    <div class="freud-question-step" aria-hidden="true">${r.items.map((_,i)=>`<span class="freud-step ${i<n?"past":i===n?"active":""}"></span>`).join("")}</div>
    <h4 class="freud-question">${safe(item.text)}</h4>
    <div class="freud-options" role="group" aria-label="Respostas possíveis">${choices.map((option,i)=>`<button type="button" class="freud-option" data-choice="${safe(option.id)}" aria-pressed="${answer===option.id}" ${answer!==null?"disabled":""}><span class="freud-option-letter" aria-hidden="true">${letter(i)}</span><span>${safe(option.label)}</span></button>`).join("")}</div>
    ${answer!==null?`<div class="freud-feedback ${answer===item.correct?"correct":""}" role="status"><strong>${answer===item.correct?"Essa classificação preserva o conceito.":"O modelo escolhido precisa ser revisto."}</strong><p>${safe(item.why)}</p></div>
    <div class="freud-button-row"><button class="freud-button" type="button" data-quiz-action="${answer===item.correct?"next":"retry"}">${answer===item.correct?(n===r.items.length-1?"Concluir esta mesa ↗":"Próximo documento →"):"Tentar outra vez ↺"}</button></div>`:""}
    </div>`;
  }
  const timeline=data.rooms.find(r=>r.id==="cronologia");
  function chronologyRoom(){
    const area=$("roomContent-cronologia");
    area.innerHTML=headings(timeline)+`<div class="freud-activity"><p class="freud-activity-label">REORDENE AS PUBLICAÇÕES · ANO MAIS ANTIGO PRIMEIRO</p>
    <div class="freud-sequence">${chronological.map((id,i)=>{
      const card=timeline.cards.find(c=>c.id===id);
      return `<div class="freud-sequence-row"><span class="freud-seq-num">${String(i+1).padStart(2,"0")}.</span><span class="freud-seq-year">${safe(card.date)}</span>
      <span class="freud-seq-name">${safe(card.title)}<small>${safe(card.note)}</small></span>
      <span class="freud-seq-controls"><button type="button" data-move="${i}" data-direction="-1" ${i===0?"disabled":""} aria-label="Mover ${safe(card.title)} para cima">↑</button>
      <button type="button" data-move="${i}" data-direction="1" ${i===chronological.length-1?"disabled":""} aria-label="Mover ${safe(card.title)} para baixo">↓</button></span></div>`;
    }).join("")}</div>
    <div class="freud-button-row"><button class="freud-button" type="button" data-verify>Verificar cronologia</button><button class="freud-button secondary" type="button" data-reset>Recomeçar</button></div>
    ${sequenceResult?`<div class="freud-feedback ${sequenceResult.good?"correct":""}" role="status"><strong>${sequenceResult.good?"Você reconstruiu a sequência.":"Ainda há um deslocamento a revisar."}</strong><p>${safe(sequenceResult.why)}</p></div>`:""}
    </div>`;
  }
  function showRoom(id,focus=false){
    if(!validRooms.includes(id))return;
    currentRoom=id;answer=null;
    document.querySelectorAll(".freud-tab").forEach(tab=>{
      const active=tab.dataset.room===id;
      tab.classList.toggle("selected",active);
      tab.setAttribute("aria-selected",String(active));
      tab.tabIndex=active?0:-1;
      if(active&&focus)tab.focus();
    });
    validRooms.forEach(key=>$("room-"+key).hidden=key!==id);
    const r=rooms.find(x=>x.id===id);
    if(id==="cronologia")chronologyRoom();
    else {
      if(solved.has(id))steps[id]=r.items.length;
      quizRoom(r);
    }
  }
  document.querySelectorAll(".freud-panel").forEach(panel=>panel.addEventListener("click",event=>{
    const r=rooms.find(x=>x.id===currentRoom);
    const restart=event.target.closest("[data-restart]");
    if(restart){
      solved.delete(r.id);write("solved",[...solved]);progress();
      steps[r.id]=0;answer=null;quizRoom(r);return;
    }
    if(r.id==="cronologia"){
      const move=event.target.closest("[data-move]");
      if(move){
        const i=Number(move.dataset.move),direction=Number(move.dataset.direction),target=i+direction;
        if(target<0||target>=chronological.length)return;
        [chronological[i],chronological[target]]=[chronological[target],chronological[i]];
        sequenceResult=null;chronologyRoom();
        const btn=[...$("roomContent-cronologia").querySelectorAll("[data-move]")].find(b=>Number(b.dataset.move)===target&&Number(b.dataset.direction)===direction&&!b.disabled);
        btn?.focus();return;
      }
      if(event.target.closest("[data-reset]")){chronological=[...timeline.initial];sequenceResult=null;chronologyRoom();return;}
      if(event.target.closest("[data-verify]")){
        const good=chronological.every((id,i)=>id===timeline.correct[i]);
        const first=chronological.findIndex((id,i)=>id!==timeline.correct[i]);
        sequenceResult={
          good,
          why:good?
            "1900 inaugura A interpretação dos sonhos; 1914 examina a repetição na clínica; 1915 aprofunda a metapsicologia; 1920 recoloca a questão do prazer e da repetição; 1923 reformula a tópica. São problemas relacionados, não etapas que se anulam.":
            "Na posição "+(first+1)+", aparece "+chronological[first]+", mas a publicação mais antiga que precisa aparecer nessa posição é "+timeline.correct[first]+". Mova as fichas com as setas e confira novamente."
        };
        if(good)finish(r.id);
        chronologyRoom();
      }
      return;
    }
    const option=event.target.closest("[data-choice]");
    if(option && answer===null){
      if(!data.choices[r.id].some(x=>x.id===option.dataset.choice))return;
      answer=option.dataset.choice;quizRoom(r);
      const feedback=$("roomContent-"+r.id).querySelector(".freud-feedback");
      if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}
      return;
    }
    const action=event.target.closest("[data-quiz-action]")?.dataset.quizAction;
    if(action==="retry"){answer=null;quizRoom(r);$("roomContent-"+r.id).querySelector(".freud-option")?.focus();}
    if(action==="next"){
      if(answer!==r.items[steps[r.id]]?.correct)return;
      steps[r.id]++;answer=null;
      if(steps[r.id]===r.items.length)finish(r.id);
      quizRoom(r);
      const focusNode=$("roomContent-"+r.id).querySelector(".freud-option,.freud-finish .freud-button");
      focusNode?.focus({preventScroll:true});
    }
  }));
  $("freudTabs").addEventListener("click",event=>{
    const tab=event.target.closest("[data-room]");
    if(tab)showRoom(tab.dataset.room);
  });
  $("freudTabs").addEventListener("keydown",event=>{
    if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
    const current=validRooms.indexOf(currentRoom);
    const i=event.key==="Home"?0:event.key==="End"?validRooms.length-1:event.key==="ArrowRight"?(current+1)%validRooms.length:(current+validRooms.length-1)%validRooms.length;
    event.preventDefault();showRoom(validRooms[i],true);
  });
  $("freudSources").innerHTML=data.sources.map(source=>`<a href="${safe(source.url)}" target="_blank" rel="noopener noreferrer">${safe(source.label)} ↗</a>`).join("");
  let scale=1;
  try{scale=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function setScale(value){
    scale=Math.max(.9,Math.min(1.3,Math.round(value*10)/10));
    document.documentElement.style.setProperty("--font-scale",scale);
    try{localStorage.setItem("lacan-font-size",String(scale));}catch{}
  }
  $("fontDown").addEventListener("click",()=>setScale(scale-.1));
  $("fontUp").addEventListener("click",()=>setScale(scale+.1));
  // Deep link da aula 2.2: abrir diretamente a mesa de sonhos, sem começar por tópicas.
  const requested=new URLSearchParams(location.search).get("sala");
  setScale(scale);showRoom(validRooms.includes(requested)?requested:"topicas");progress();
})();