/* Leitor modular v2 — criado no Sprint 6.
   Para novas disciplinas: carregar arquivo de conteúdos e definir LACAN_READER_CONFIG.
   Sem frameworks, login, telemetria ou chamadas a servidores. */
(() => {
  "use strict";
  const lessons=window.LACAN_LESSONS;
  const config=window.LACAN_READER_CONFIG;
  if(!Array.isArray(lessons) || !config || !lessons.length)return;
  const $=id=>document.getElementById(id);
  const article=$("lessonContent"),menu=$("lessonNav");
  const safe=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const canRenderHTML = value => String(value??""); // apenas textos editoriais estáticos e previamente revisados
  const getValue=(key,fallback)=>{
    try{const value=JSON.parse(localStorage.getItem(key));return value===null?fallback:value;}
    catch{return fallback;}
  };
  const setValue=(key,value)=>{
    try{localStorage.setItem(key,JSON.stringify(value));return true;}
    catch{return false;}
  };
  const validId=id=>lessons.some(l=>l.id===id);
  let completed=getValue(config.completionKey,[]);
  if(!Array.isArray(completed))completed=[];
  completed=completed.filter(validId);
  let current="",phase=0,answer=null;
  const currentQuery=()=>{
    const params=new URLSearchParams(location.search);
    const id=params.get("aula");
    return validId(id)?id:lessons[0].id;
  };
  const recordProgress=()=>{
    const n=lessons.filter(l=>completed.includes(l.id)).length;
    $("progressText").textContent=n+" de "+lessons.length;
    $("progressBar").style.width=(100*n/lessons.length)+"%";
    $("progressBar").setAttribute("aria-valuenow",String(n));
    menu.innerHTML=lessons.map(lesson=>`<button type="button" class="lesson-link" data-lesson="${safe(lesson.id)}" ${current===lesson.id?'aria-current="step"':''}><span class="lesson-link-index">${safe(lesson.id)}</span><span class="lesson-link-title">${safe(lesson.title)}</span>${completed.includes(lesson.id)?'<span class="lesson-check" aria-label="Avaliação concluída">✓</span>':''}</button>`).join("");
  };
  const renderConcepts=lesson=>{
    if(!Array.isArray(lesson.concepts)||!lesson.concepts.length)return "";
    return `<section class="reader-concepts" aria-label="Conceitos em foco"><div class="reader-inline-head"><span class="section-label">Caderno de conceitos</span><h2>O que cada termo permite pensar?</h2></div>
    <div class="reader-concept-grid">${lesson.concepts.map((c,i)=>`<details><summary><span>${String(i+1).padStart(2,"0")}</span>${safe(c.name)}</summary><p>${safe(c.definition)}</p></details>`).join("")}</div></section>`;
  };
  const renderPractice=lesson=>{
    if(!lesson.practice)return "";
    return `<section class="reader-practice" aria-labelledby="practiceHeading"><div class="reader-practice-title"><span class="section-label">Exercício de reflexão</span><h2 id="practiceHeading">${safe(lesson.practice.title)}</h2></div>
    <p>${safe(lesson.practice.prompt)}</p>
    <label for="practiceNotes">Sua elaboração pessoal</label>
    <textarea id="practiceNotes" rows="5" placeholder="Construa seu raciocínio. Nenhuma resposta é enviada para avaliação automática."></textarea>
    <p class="reader-storage" id="practiceStorage" role="status">Sua anotação fica somente neste navegador.</p></section>`;
  };
  const renderLaboratory=lesson=>{
    if(!config.laboratoryUrl || !config.laboratoryLessons?.includes(lesson.id))return "";
    return `<aside class="lesson-interactive"><span class="section-label">Experiência interativa · conectada à aula</span>
      <h2>${safe(config.laboratoryName)}</h2><p>${safe(config.laboratoryText)}</p>
      <a href="${safe(config.laboratoryUrl)}" class="action-button primary">Abrir laboratório ↗</a></aside>`;
  };
  function storageEditor(id,prefix,statusId){
    const editor=$(id),status=$(statusId);
    if(!editor||!status)return;
    const key=prefix+current;
    const old=getValue(key,"");
    editor.value=typeof old==="string"?old:"";
    editor.addEventListener("input",()=>{
      status.textContent=setValue(key,editor.value)?"Anotação salva neste navegador.":"Não foi possível salvar automaticamente. Copie seu texto para preservá-lo.";
    });
  }
  function showLesson(id,withHistory=true,moveFocus=false){
    const lesson=lessons.find(l=>l.id===id);
    if(!lesson)return;
    current=id;phase=0;answer=null;
    if(withHistory)history.pushState({aula:id},"","?aula="+encodeURIComponent(id));
    recordProgress();
    const index=lessons.findIndex(l=>l.id===id);
    article.innerHTML=`<div class="reader-path"><span>${safe(config.cycleLabel)}</span><span>↓</span><span>MÓDULO ${String(config.moduleNumber).padStart(2,"0")} / AULA ${safe(lesson.id)}</span></div>
    <p class="kicker">LEITURA GUIADA / AULA ${safe(lesson.id)}</p>
    <h1 class="lesson-title">${safe(lesson.title)}</h1>
    <p class="lesson-subtitle">${safe(lesson.subtitle)}</p>
    <div class="lesson-info"><span>◷ ${safe(lesson.duration)} de estudo estimado</span><span>◈ Módulo ${String(config.moduleNumber).padStart(2,"0")} de 18</span><span>◎ ${completed.includes(id)?"Avaliação já concluída":"Estudo em andamento"}</span></div>
    <div class="reader-objectives"><span class="section-label">A pergunta que organiza esta aula</span><h2>${safe(lesson.question)}</h2></div>
    <div class="reader-lead"><p>${safe(lesson.introduction)}</p></div>
    <div class="reader-separator"><span>DESENVOLVIMENTO TEÓRICO</span><span>${String(lesson.sections.length).padStart(2,"0")} PASSAGENS</span></div>
    ${lesson.sections.map((section,i)=>`<section class="lesson-article-section reader-chapter" aria-labelledby="chapter-${i}"><div class="reader-chapter-label">${String(i+1).padStart(2,"0")} / ${String(lesson.sections.length).padStart(2,"0")}</div><h2 id="chapter-${i}">${safe(section.title)}</h2>${section.paragraphs.map(text=>'<p>'+canRenderHTML(text)+'</p>').join("")}</section>`).join("")}
    <aside class="lesson-example reader-example"><span class="section-label">Uma cena para examinar</span><h2>${safe(lesson.example.title)}</h2><p>${safe(lesson.example.text)}</p><small>Exemplo construído para fins pedagógicos, não interpretação clínica.</small></aside>
    ${renderConcepts(lesson)}
    <aside class="lesson-takeaway"><span class="section-label">O que levar desta aula</span><h2>Uma ideia para guardar</h2><p>${safe(lesson.takeaway)}</p></aside>
    ${renderPractice(lesson)}
    ${renderLaboratory(lesson)}
    <section class="lesson-references"><h2>Fontes e leituras</h2><p class="reader-reference-note">Textos primários e leituras de contextualização. As datas do ensino oral podem diferir das datas das edições.</p><ul>${lesson.references.map(ref=>'<li>'+canRenderHTML(ref)+'</li>').join("")}</ul></section>
    <section class="quiz-wrap reader-quiz" id="assessment" aria-labelledby="quizHeading"><span class="section-label">Avaliação formativa · três etapas</span><h2 class="quiz-heading" id="quizHeading">Compreender é relacionar.</h2>
      <p class="quiz-help">Reconhecimento, compreensão e aplicação. Receba explicações para cada tentativa. Uma questão correta libera a etapa seguinte.</p>
      <div id="quizArea" aria-live="polite"></div></section>
    <section class="lesson-notebook"><span class="section-label">Caderno de estudo</span><h2>O que você quer retomar?</h2>
      <p>Registre dúvidas, leituras e problemas. O conteúdo é armazenado apenas no dispositivo atual, sem sincronização ou backup automático.</p>
      <label for="generalNotes">Anotações sobre a aula ${safe(id)}</label><textarea id="generalNotes" rows="5" placeholder="Registre uma dúvida, uma formulação ou uma referência para reler..."></textarea>
      <p class="notes-status" id="generalStorage" role="status">Sua anotação fica somente neste navegador.</p></section>
    <nav class="lesson-pager" aria-label="Navegação entre as aulas">
      ${index>0?`<button class="action-button" type="button" data-goto="${safe(lessons[index-1].id)}">← Aula anterior</button>`:'<span></span>'}
      ${index<lessons.length-1?`<button class="action-button primary" type="button" data-goto="${safe(lessons[index+1].id)}">Próxima aula →</button>`:`<a href="${safe(config.laboratoryUrl)}" class="action-button primary">Revisitar o laboratório ↗</a>`}
    </nav>`;
    storageEditor("practiceNotes",config.notesPrefix+"practice-","practiceStorage");
    storageEditor("generalNotes",config.notesPrefix+"general-","generalStorage");
    renderQuiz();
    if(moveFocus){article.focus({preventScroll:true});article.scrollIntoView({block:"start",behavior:"auto"});}
  }
  function renderQuiz(){
    const lesson=lessons.find(l=>l.id===current);
    if(!lesson)return;
    const area=$("quizArea");
    if(phase===lesson.quiz.length){
      area.innerHTML=`<div class="quiz-finished"><span class="section-label">Três etapas concluídas</span><h3>Você atravessou os três problemas.</h3><p>O registro de conclusão foi salvo somente neste navegador. Refaça o percurso quando quiser ou volte às fontes para aprofundar as formulações.</p>
      <button class="action-button" type="button" data-quiz-action="restart">Refazer a avaliação ↺</button></div>`;
      return;
    }
    const q=lesson.quiz[phase];
    area.innerHTML=`<div class="quiz-phases" aria-hidden="true">${lesson.quiz.map((_,i)=>`<span class="phase-pill ${i<phase?"done":i===phase?"current":""}"></span>`).join("")}</div>
    <span class="phase-label">FASE ${phase+1} DE ${lesson.quiz.length} · ${safe(q.phase)}</span>
    <h3 class="quiz-question">${safe(q.prompt)}</h3>
    <div class="quiz-options" role="group" aria-label="Respostas da fase ${phase+1}">
      ${q.options.map((option,i)=>`<button type="button" class="quiz-option" data-option="${i}" aria-pressed="${answer===i}" ${answer!==null?'disabled':''}><span class="reader-option-index" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${safe(option)}</span></button>`).join("")}
    </div>
    ${answer!==null?`<div class="quiz-feedback ${answer===q.correct?"correct":""}" role="status">
    <strong>${answer===q.correct?"Sua resposta preserva a distinção.":"Essa conclusão precisa de revisão."}</strong>
    <p>${safe(q.explanation)}</p></div>
    <div class="quiz-actions"><button type="button" class="action-button primary" data-quiz-action="${answer===q.correct?"next":"retry"}">${answer===q.correct?(phase===lesson.quiz.length-1?"Concluir avaliação ↗":"Continuar para a próxima fase →"):"Reexaminar e tentar novamente ↺"}</button></div>`:""}`;
    if(answer!==null){
      const selected=area.querySelector('[data-option="'+answer+'"]');
      const correct=area.querySelector('[data-option="'+q.correct+'"]');
      selected?.classList.add("picked");
      correct?.classList.add("right");
    }
  }
  article.addEventListener("click",event=>{
    const goto=event.target.closest("[data-goto]");
    if(goto){showLesson(goto.dataset.goto,true,true);return;}
    const option=event.target.closest("[data-option]");
    if(option && answer===null){
      const index=Number(option.dataset.option);
      if(!Number.isInteger(index)||index<0||index>=lessons.find(l=>l.id===current).quiz[phase].options.length)return;
      answer=index;renderQuiz();
      const feedback=$("quizArea").querySelector(".quiz-feedback");
      if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});}
      return;
    }
    const action=event.target.closest("[data-quiz-action]")?.dataset.quizAction;
    if(!action)return;
    if(action==="retry")answer=null;
    if(action==="restart"){phase=0;answer=null;}
    if(action==="next"){
      const lesson=lessons.find(l=>l.id===current);
      if(answer!==lesson.quiz[phase]?.correct)return;
      phase++;answer=null;
      if(phase===lesson.quiz.length&&!completed.includes(current)){
        completed.push(current);
        setValue(config.completionKey,completed);
        recordProgress();
      }
    }
    renderQuiz();
    const button=$("quizArea").querySelector(".quiz-option:not([disabled]),.quiz-finished .action-button");
    if(button)button.focus({preventScroll:true});
    $("assessment").scrollIntoView({block:"start",behavior:"smooth"});
  });
  menu.addEventListener("click",event=>{
    const btn=event.target.closest("[data-lesson]");
    if(btn)showLesson(btn.dataset.lesson,true,true);
  });
  window.addEventListener("popstate",()=>showLesson(currentQuery(),false,true));
  let scale=1;
  try{scale=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function setScale(value){
    scale=Math.max(.9,Math.min(1.3,Math.round(value*10)/10));
    document.documentElement.style.setProperty("--font-scale",scale);
    try{localStorage.setItem("lacan-font-size",String(scale));}catch{}
  }
  $("fontDown")?.addEventListener("click",()=>setScale(scale-.1));
  $("fontUp")?.addEventListener("click",()=>setScale(scale+.1));
  setScale(scale);showLesson(currentQuery(),false,false);
})();