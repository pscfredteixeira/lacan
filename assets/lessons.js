/* Sprint 2 • Leitura progressiva, avaliação em três fases e caderno local.
   O progresso é salvo somente neste navegador, não em servidores. */
(() => {
  "use strict";
  const lessons = window.LACAN_LESSONS || [];
  const content = document.getElementById("lessonContent");
  const nav = document.getElementById("lessonNav");
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const safe = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const KEY = "lacan-module-01-completed";
  const NOTES = "lacan-study-notes-";
  const getStorage = (key,fallback) => {try{const s=localStorage.getItem(key);return s===null?fallback:JSON.parse(s);}catch{return fallback;}};
  const setStorage = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
  let completed = getStorage(KEY, []);
  if (!Array.isArray(completed)) completed = [];
  let active = "";
  let phase = 0;
  let result = null;
  function getId() {
    const params = new URLSearchParams(location.search);
    const id = params.get("aula");
    return lessons.some(l=>l.id===id) ? id : (lessons[0]?.id || "");
  }
  function updateProgress() {
    const count = lessons.filter(l => completed.includes(l.id)).length;
    progressText.textContent = count + " de " + lessons.length;
    progressBar.style.width = lessons.length ? (count / lessons.length * 100) + "%" : "0%";
    progressBar.setAttribute("aria-valuenow",String(count));
    nav.innerHTML = lessons.map(lesson => `<button type="button" class="lesson-link" data-lesson="${safe(lesson.id)}" ${lesson.id===active?'aria-current="step"':''}><span class="lesson-link-index">${safe(lesson.id)}</span><span class="lesson-link-title">${safe(lesson.title)}</span>${completed.includes(lesson.id)?'<span class="lesson-check" aria-label="Avaliação concluída">✓</span>':''}</button>`).join("");
  }
  function selectLesson(id, changeURL = true, focus = false) {
    const lesson = lessons.find(l=>l.id===id);
    if (!lesson) return;
    active = id; phase = 0; result = null;
    if (changeURL) history.pushState({aula:id},"", "?aula="+encodeURIComponent(id));
    updateProgress();
    const index = lessons.findIndex(l=>l.id===id);
    const paragraphs = lesson.sections.map((section,i)=>`<section class="lesson-article-section" aria-labelledby="sect-${i}">
      <h2 id="sect-${i}">${safe(section.title)}</h2>
      ${section.paragraphs.map(p=>'<p>'+p+'</p>').join("")}
      ${section.inShort?`<div class="lesson-short"><strong>Em palavras simples</strong><p>${safe(section.inShort)}</p></div>`:""}
      </section>`).join("");
    content.innerHTML = `
      <p class="kicker">AULA ${safe(lesson.id)} / PRIMEIRO CICLO</p>
      <h1 class="lesson-title">${safe(lesson.title)}</h1>
      <p class="lesson-subtitle">${safe(lesson.subtitle)}</p>
      <div class="lesson-info"><span>◷ ${safe(lesson.duration)} de estudo orientado</span><span>◈ Módulo 01 de 18</span><span>◎ ${completed.includes(id)?"Avaliação concluída":"Estudo em andamento"}</span></div>
      <section class="lesson-question"><span class="prompt-label">A pergunta que abre esta aula</span><p>${safe(lesson.question)}</p></section>
      <section class="lesson-steps" aria-label="O que você vai aprender nesta aula">
        <div class="lesson-guided-intro"><span class="section-label">Seu ponto de partida</span>
        <h2>Você não precisa saber nada antes.</h2>
        <p>Vamos começar pelo básico. Nesta aula, seu objetivo é:</p>
        <ul>${(lesson.goal||[]).map(goal=>`<li>${safe(goal)}</li>`).join("")}</ul></div>
        <div class="lesson-no-rush"><span class="section-label">Pode deixar para depois</span><p>${lesson.later||""}</p></div>
      </section>
      <div class="lesson-intro" aria-label="Introdução à aula">${lesson.introduction}</div>
      <div class="lesson-text">${paragraphs}</div>
      <aside class="lesson-example"><span class="section-label">Um exemplo para pensar</span><h2>${safe(lesson.example.title)}</h2><p>${safe(lesson.example.text)}</p></aside>
      <section class="lesson-glossary" aria-label="Palavras importantes desta aula">
      <span class="section-label">Mini glossário · opcional</span>
      <h2>Se alguma palavra ainda estiver difícil...</h2>
      <p>Toque em cada termo para ver a explicação. Não é necessário memorizar estas definições agora.</p>
      <div class="lesson-glossary-grid">${(lesson.glossary||[]).map((word,i)=>`<details class="lesson-glossary-item"><summary><span>${String(i+1).padStart(2,"0")}</span>${safe(word.term)}</summary><p>${safe(word.meaning)}</p></details>`).join("")}</div>
      </section>
      <aside class="lesson-takeaway"><span class="section-label">O que levar desta aula</span><h2>Uma ideia para guardar</h2><p>${safe(lesson.takeaway)}</p></aside>
      ${(id==="1.1" || id==="1.6") ? '<aside class="lesson-interactive lesson-optional"><span class="section-label">Atividade complementar · opcional</span><h2>Uma linha do tempo para se orientar</h2><p>O Arquivo de Lacan reúne datas de aulas, textos e livros. <strong>Não é uma teoria e você não precisa decorar os anos.</strong> É apenas um material de consulta para usar agora ou depois.</p><a href="arquivo.html" class="action-button primary">Conhecer a linha do tempo ↗</a></aside>' : ""}
      <section class="lesson-references"><h2>Para consultar quando quiser</h2><p class="lesson-source-hint">Esses são textos e estudos que ajudam a conferir as informações. <strong>Não são leitura obrigatória para concluir esta aula introdutória.</strong></p><ul>${lesson.references.map(ref=>'<li>'+ref+'</li>').join("")}</ul></section>
      <section class="quiz-wrap" id="assessment" aria-labelledby="quizHeading"><span class="section-label">Avaliação formativa</span><h2 class="quiz-heading" id="quizHeading">Três fases de compreensão</h2><p class="quiz-help">São três perguntas sobre aquilo que acabamos de explicar: uma para lembrar, uma para entender e uma para usar a ideia em um exemplo. Você pode errar e tentar novamente.</p><div id="quizArea" aria-live="polite"></div></section>
      <section class="lesson-notebook" aria-labelledby="notebookHeading"><span class="section-label">Caderno pessoal</span><h2 id="notebookHeading">O que ficou em aberto?</h2><p>Escreva uma dúvida, relação ou descoberta. Suas anotações ficam apenas neste navegador; não são enviadas à plataforma.</p><label for="notes">Minhas anotações da aula ${safe(id)}</label><textarea id="notes" placeholder="Que pergunta esta aula deixou para você?"></textarea><p class="notes-status" id="notesStatus">Salvo apenas neste dispositivo.</p></section>
      <nav class="lesson-pager" aria-label="Mudar de aula">
        ${index>0?`<button class="action-button" type="button" data-goto="${safe(lessons[index-1].id)}">← Aula anterior</button>`:'<span></span>'}
        ${index<lessons.length-1?`<button class="action-button primary" type="button" data-goto="${safe(lessons[index+1].id)}">Próxima aula →</button>`:'<a class="action-button primary" href="modulo-2.html?aula=2.1">Avançar ao Módulo 2 →</a>'}
      </nav>`;
    const note = document.getElementById("notes");
    note.value = getStorage(NOTES + id, "");
    note.addEventListener("input", () => {
      const status = document.getElementById("notesStatus");
      status.textContent = setStorage(NOTES+id,note.value) ? "Anotação salva neste dispositivo." : "Não foi possível salvar no navegador. Copie seu texto para preservá-lo.";
    });
    renderQuiz(lesson);
    if (focus) {content.focus({preventScroll:true});content.scrollIntoView({behavior:"auto",block:"start"});}
  }
  function renderQuiz(lesson) {
    const area = document.getElementById("quizArea");
    if (phase >= lesson.quiz.length) {
      area.innerHTML = `<div class="quiz-finished"><h3>Três fases concluídas.</h3><p>Você respondeu às três questões desta aula. O registro de conclusão foi salvo somente neste navegador.</p><p>Retomar os textos e as perguntas anteriores faz parte do estudo.</p><button class="action-button" type="button" data-quiz-action="restart">Refazer a avaliação</button></div>`;
      return;
    }
    const q = lesson.quiz[phase];
    area.innerHTML = `<div class="quiz-phases" aria-hidden="true">${lesson.quiz.map((_,i)=>`<span class="phase-pill ${i<phase?"done":i===phase?"current":""}"></span>`).join("")}</div>
      <span class="phase-label">Fase ${phase+1} de ${lesson.quiz.length} · ${safe(q.phase)}</span>
      <h3 class="quiz-question">${safe(q.prompt)}</h3>
      <div class="quiz-options">${q.options.map((option,i)=>`<button type="button" class="quiz-option" data-option="${i}" ${result!==null?"disabled":""}>${safe(option)}</button>`).join("")}</div>
      ${result!==null?`<div class="quiz-feedback ${result===q.correct?"correct":""}" role="status"><strong>${result===q.correct?"Boa leitura conceitual.":"Vale revisar essa distinção."}</strong>${safe(q.explanation)}</div><div class="quiz-actions"><button type="button" class="action-button primary" data-quiz-action="${result===q.correct?"next":"retry"}">${result===q.correct?(phase===lesson.quiz.length-1?"Concluir avaliação":"Próxima fase →"):"Tentar outra vez"}</button></div>`:""}`;
    if (result!==null) {
      const selected = area.querySelector('[data-option="'+result+'"]');
      const correct = area.querySelector('[data-option="'+q.correct+'"]');
      if (selected) selected.classList.add("picked");
      if (correct) correct.classList.add("right");
    }
  }
  content.addEventListener("click", e => {
    const nextLesson = e.target.closest("[data-goto]");
    if (nextLesson) {selectLesson(nextLesson.dataset.goto,true,true);return;}
    const option = e.target.closest("[data-option]");
    if (option && result===null) {result=Number(option.dataset.option);renderQuiz(lessons.find(l=>l.id===active));const box=document.querySelector("#quizArea .quiz-feedback");if(box){box.tabIndex=-1;box.focus({preventScroll:true});}return;}
    const action = e.target.closest("[data-quiz-action]");
    if (!action) return;
    if (action.dataset.quizAction==="retry") result=null;
    if (action.dataset.quizAction==="restart") {phase=0;result=null;}
    if (action.dataset.quizAction==="next") {
      phase++;result=null;
      const lesson=lessons.find(l=>l.id===active);
      if(phase>=lesson.quiz.length && !completed.includes(active)) {
        completed.push(active);
        setStorage(KEY,completed);
        updateProgress();
      }
    }
    renderQuiz(lessons.find(l=>l.id===active));
    document.querySelector("#quizArea .quiz-option:not([disabled]),#quizArea .quiz-finished button")?.focus({preventScroll:true});
    document.getElementById("assessment").scrollIntoView({block:"start",behavior:"smooth"});
  });
  nav.addEventListener("click",e=>{
    const button=e.target.closest("[data-lesson]");
    if(button) selectLesson(button.dataset.lesson,true,true);
  });
  window.addEventListener("popstate",()=>selectLesson(getId(),false,true));
  let size = 1;
  try {size=Math.min(1.3,Math.max(.9,Number(localStorage.getItem("lacan-font-size"))||1));}catch{}
  function setSize(value) {
    size=Math.max(.9,Math.min(1.3,Math.round(value*10)/10));
    document.documentElement.style.setProperty("--font-scale",size);
    try{localStorage.setItem("lacan-font-size",String(size));}catch{}
  }
  document.getElementById("fontDown").addEventListener("click",()=>setSize(size-.1));
  document.getElementById("fontUp").addEventListener("click",()=>setSize(size+.1));
  setSize(size);
  if(!lessons.length) {
    content.innerHTML="<p>As aulas não foram carregadas. Atualize esta página e tente novamente.</p>";
    return;
  }
  selectLesson(getId(),false);
})();