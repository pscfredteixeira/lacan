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
  const PHASE = "lacan-module-01-quiz-phase-";
  const LAST = "lacan-study-last-lesson";
  let storageWarning = false;
  const getStorage = (key,fallback) => {try{const s=localStorage.getItem(key);return s===null?fallback:JSON.parse(s);}catch{return fallback;}};
  const setStorage = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{storageWarning=true;return false;}};
  const saveLastLesson = id => setStorage(LAST,"modulo-1.html?aula="+id);
  const progressMessage = () => storageWarning
    ? "Não foi possível salvar neste navegador. Evite fechar o aplicativo antes de copiar suas anotações."
    : "O progresso fica salvo neste dispositivo.";
  function markCompleted(id) {
    const next=[...new Set([...completed,id])];
    const ok=setStorage(KEY,next);
    if(ok) completed=next;
    updateProgress();
    return ok;
  }
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
    const status=document.getElementById("progressSaveStatus");
    if(status) status.textContent=progressMessage();
    nav.innerHTML = lessons.map(lesson => `<button type="button" class="lesson-link" data-lesson="${safe(lesson.id)}" ${lesson.id===active?'aria-current="step"':''}><span class="lesson-link-index">${safe(lesson.id)}</span><span class="lesson-link-title">${safe(lesson.title)}</span>${completed.includes(lesson.id)?'<span class="lesson-check" aria-label="Avaliação concluída">✓</span>':''}</button>`).join("");
  }
  // Abertura editorial específica da aula 1.1: preserva a introdução original.
  // Ilustração editorial discreta na primeira aula; a introdução continua como texto de leitura.
  // A fotografia abre a aula 1.1; a explicação está reunida na seção "Quem foi Lacan?".
  function renderOpening(lesson) {
    if (lesson.id !== "1.1") return `<div class="lesson-intro" aria-label="Introdução à aula">${lesson.introduction}</div>`;
    return `<section class="lesson-intro-film" aria-labelledby="lacanIntroFilmHeading">
    <div class="lesson-intro-film-header"><span class="section-label">FILME DE ABERTURA · 2 MIN 01 S</span><h2 id="lacanIntroFilmHeading">Uma introdução à psicanálise lacaniana</h2><p>Antes da leitura, acompanhe uma primeira aproximação ao inconsciente, à linguagem e ao desejo. O vídeo já inclui narração sincronizada.</p></div>
    <div class="lesson-intro-film-player"><iframe id="lacanIntroEmbed" title="Motion graphics: uma introdução à psicanálise lacaniana" src="introducao.html?embed=1&v=20261017d" loading="lazy" allow="fullscreen" allowfullscreen></iframe></div>
    <p class="lesson-intro-film-link"><a href="introducao.html" target="_blank" rel="noopener">Abrir o filme em página inteira ↗</a></p>
    </section>
    <div class="lacan-editorial">
      <figure class="lacan-editorial-figure">
        <span class="lacan-editorial-halo" aria-hidden="true"></span>
        <img src="assets/lacan-portrait-editorial.webp?v=20261012d" width="280" height="364" alt="Retrato editorial de Jacques Lacan em sépia e lavanda" decoding="async" fetchpriority="high">
        <figcaption>Jacques Lacan <span aria-hidden="true">·</span> 1901–1981</figcaption>
      </figure>
    </div>`;
  }
  // Retrato editorial de Freud na primeira aula, sem alterar o texto didático.
  function renderFreudPortrait() {
    return `<div class="lacan-editorial freud-editorial" aria-label="Retrato ilustrativo de Sigmund Freud">
      <figure class="lacan-editorial-figure">
        <span class="lacan-editorial-halo" aria-hidden="true"></span>
        <img src="assets/freud-portrait-editorial.webp?v=20261012f" width="320" height="427" alt="Retrato artístico de Sigmund Freud em tons de sépia e lavanda" loading="lazy" decoding="async">
        <figcaption>Sigmund Freud <span aria-hidden="true">·</span> 1856–1939</figcaption>
      </figure>
    </div>`;
  }
  function selectLesson(id, changeURL = true, focus = false) {
    const lesson = lessons.find(l=>l.id===id);
    if (!lesson) return;
    active = id;
    const remembered = getStorage(PHASE+id,completed.includes(id)?lesson.quiz.length:0);
    phase = Number.isInteger(remembered) ? Math.max(0,Math.min(lesson.quiz.length,remembered)) : 0;
    result = null;
    saveLastLesson(id);
    if (changeURL) history.pushState({aula:id},"", "?aula="+encodeURIComponent(id));
    updateProgress();
    const index = lessons.findIndex(l=>l.id===id);
    const paragraphs = lesson.sections.map((section,i)=>`<section class="lesson-article-section" ${id==="1.1" && i===0?'aria-label="Apresentação de Jacques Lacan"':`aria-labelledby="sect-${i}"`}>
      ${id==="1.1" && i===0?"":`<h2 id="sect-${i}">${safe(section.title)}</h2>`}
      ${id==="1.1" && i===1 ? renderFreudPortrait() : ""}
      ${section.paragraphs.map(p=>'<p>'+p+'</p>').join("")}
      ${section.inShort?`<div class="lesson-short"><strong>Em palavras simples</strong><p>${safe(section.inShort)}</p></div>`:""}
      </section>`).join("");
    content.innerHTML = `
      <p class="kicker">AULA ${safe(lesson.id)} / PRIMEIRO CICLO</p>
      <h1 class="lesson-title">${safe(lesson.title)}</h1>
      <p class="lesson-subtitle">${safe(lesson.subtitle)}</p>
      <div class="lesson-info"><span>◷ ${safe(lesson.duration)} de estudo orientado</span><span>◈ Módulo 01 de 18</span><span>◎ ${completed.includes(id)?"Avaliação concluída":"Estudo em andamento"}</span></div>
      ${renderOpening(lesson)}
      ${id==="1.1"?"":`<section class="lesson-question"><span class="prompt-label">A pergunta desta aula</span><p>${safe(lesson.question)}</p></section>`}
      <div class="lesson-text">${paragraphs}</div>
      <aside class="lesson-example"><span class="section-label">Um exemplo para pensar</span><h2>${safe(lesson.example.title)}</h2><p>${safe(lesson.example.text)}</p></aside>
      <section class="lesson-glossary" aria-label="Palavras importantes desta aula">
      <span class="section-label">Mini glossário · opcional</span>
      <h2>Palavras que apareceram na aula</h2>
      <p>Abra um termo para rever sua explicação.</p>
      <div class="lesson-glossary-grid">${(lesson.glossary||[]).map((word,i)=>`<details class="lesson-glossary-item"><summary><span>${String(i+1).padStart(2,"0")}</span>${safe(word.term)}</summary><p>${safe(word.meaning)}</p></details>`).join("")}</div>
      </section>
      <aside class="lesson-takeaway"><span class="section-label">O que levar desta aula</span><h2>Uma ideia para guardar</h2><p>${safe(lesson.takeaway)}</p></aside>
      ${id==="1.6" ? '<aside class="lesson-interactive lesson-optional"><span class="section-label">Material complementar</span><h2>Conheça o Arquivo de Lacan</h2><p>Consulte uma linha do tempo com acontecimentos, aulas e publicações. Ela ajuda a localizar os textos que aparecem na formação.</p><a href="arquivo.html" class="action-button primary">Abrir a linha do tempo ↗</a></aside>' : ""}
      <details class="lesson-references"><summary>Livros e fontes para aprofundar</summary>
        <div class="lesson-references-inner"><p class="lesson-source-hint">Referências utilizadas na preparação da aula. A leitura desses textos é complementar ao conteúdo explicado aqui.</p>
        <ul>${lesson.references.map(ref=>'<li>'+ref+'</li>').join("")}</ul></div>
      </details>
      <section class="quiz-wrap" id="assessment" aria-labelledby="quizHeading"><span class="section-label">Revisão da aula</span><h2 class="quiz-heading" id="quizHeading">Confira o que aprendeu</h2><p class="quiz-help">Responda a três perguntas sobre o que acabamos de estudar. Depois de cada resposta, você verá uma explicação. Cada etapa é guardada para você continuar depois.</p><div id="quizArea" aria-live="polite"></div>
      <div class="lesson-study-mark" id="studyMark"><span class="lesson-study-mark-copy">Já estudou esta aula anteriormente? Você pode registrar seu estudo sem refazer o quiz.</span>
      <button type="button" class="action-button" data-study-action="toggle" id="studyToggle"></button>
      <p class="lesson-study-feedback" id="studyStatus" role="status"></p></div></section>
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
    updateStudyMark();
    if (focus) {content.focus({preventScroll:true});content.scrollIntoView({behavior:"auto",block:"start"});}
  }
  function updateStudyMark() {
    const button=document.getElementById("studyToggle");
    const status=document.getElementById("studyStatus");
    if(!button||!status)return;
    const yes=completed.includes(active);
    button.textContent=yes?"✓ Aula registrada — desfazer":"Marcar esta aula como estudada";
    button.setAttribute("aria-pressed",String(yes));
    status.textContent=progressMessage();
  }
  function renderQuiz(lesson) {
    const area = document.getElementById("quizArea");
    if (phase >= lesson.quiz.length) {
      area.innerHTML = `<div class="quiz-finished"><h3>Revisão concluída.</h3><p>As três perguntas foram respondidas. ${completed.includes(active)?"Esta aula está registrada no seu progresso.":progressMessage()}</p><p>Retomar os textos e as perguntas anteriores faz parte do estudo.</p><button class="action-button" type="button" data-quiz-action="restart">Refazer a avaliação</button></div>`;
      return;
    }
    const q = lesson.quiz[phase];
    area.innerHTML = `<div class="quiz-phases" aria-hidden="true">${lesson.quiz.map((_,i)=>`<span class="phase-pill ${i<phase?"done":i===phase?"current":""}"></span>`).join("")}</div>
      <span class="phase-label">Fase ${phase+1} de ${lesson.quiz.length} · ${safe(q.phase)}</span>
      <h3 class="quiz-question">${safe(q.prompt)}</h3>
      <div class="quiz-options">${q.options.map((option,i)=>`<button type="button" class="quiz-option" data-option="${i}" ${result!==null?"disabled":""}>${safe(option)}</button>`).join("")}</div>
      ${result!==null?`<div class="quiz-feedback ${result===q.correct?"correct":""}" role="status"><strong>${result===q.correct?"Boa leitura conceitual.":"Vale revisar essa distinção."}</strong>${safe(q.explanation)}${result===q.correct&&phase===lesson.quiz.length-1?`<p class="quiz-save-confirmation">${completed.includes(active)?"✓ Aula registrada no progresso.":progressMessage()}</p>`:""}</div><div class="quiz-actions"><button type="button" class="action-button primary" data-quiz-action="${result===q.correct?"next":"retry"}">${result===q.correct?(phase===lesson.quiz.length-1?"Concluir avaliação":"Próxima fase →"):"Tentar outra vez"}</button></div>`:""}`;
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
    if (option && result===null) {
      const lesson=lessons.find(l=>l.id===active);
      const choice=Number(option.dataset.option);
      if(!Number.isInteger(choice)||choice<0||choice>=lesson.quiz[phase].options.length)return;
      result=choice;
      if(choice===lesson.quiz[phase].correct) {
        setStorage(PHASE+active,phase+1);
        if(phase===lesson.quiz.length-1)markCompleted(active);
      }
      renderQuiz(lesson);updateStudyMark();
      const box=document.querySelector("#quizArea .quiz-feedback");if(box){box.tabIndex=-1;box.focus({preventScroll:true});}
      return;
    }
    const manual=e.target.closest("[data-study-action]");
    if(manual){
      if(completed.includes(active)){
        const next=completed.filter(id=>id!==active);
        if(setStorage(KEY,next)){
          completed=next;
          setStorage(PHASE+active,0);
          phase=0;result=null;
        }
        updateProgress();renderQuiz(lessons.find(l=>l.id===active));
      }else {
        setStorage(PHASE+active,lessons.find(l=>l.id===active).quiz.length);
        markCompleted(active);
        phase=lessons.find(l=>l.id===active).quiz.length;
        result=null;renderQuiz(lessons.find(l=>l.id===active));
      }
      updateStudyMark();return;
    }
    const action = e.target.closest("[data-quiz-action]");
    if (!action) return;
    if (action.dataset.quizAction==="retry") result=null;
    if (action.dataset.quizAction==="restart") {phase=0;result=null;setStorage(PHASE+active,0);}
    if (action.dataset.quizAction==="next") {
      const lesson=lessons.find(l=>l.id===active);
      if(result!==lesson.quiz[phase]?.correct)return;
      phase++;result=null;
      setStorage(PHASE+active,phase);
      if(phase>=lesson.quiz.length) markCompleted(active);
    }
    renderQuiz(lessons.find(l=>l.id===active));
    updateStudyMark();
    document.querySelector("#quizArea .quiz-option:not([disabled]),#quizArea .quiz-finished button")?.focus({preventScroll:true});
    document.getElementById("assessment").scrollIntoView({block:"start",behavior:"smooth"});
  });
  document.getElementById("restoreModule1")?.addEventListener("click",()=>{
    const merged=lessons.map(l=>l.id);
    const status=document.getElementById("restoreModule1Status");
    if(!setStorage(KEY,merged)){
      if(status)status.textContent="Não foi possível salvar neste navegador. Verifique as permissões de armazenamento.";
      updateProgress();
      return;
    }
    completed=merged;
    lessons.forEach(l=>setStorage(PHASE+l.id,l.quiz.length));
    updateProgress();
    selectLesson(active,false);
    if(status)status.textContent="✓ As seis aulas foram registradas como estudadas neste dispositivo.";
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