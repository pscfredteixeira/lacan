(function activity() {
  "use strict";
  const LESSON = "3.3";
  const STORE = "lacan-modulo-03-aula-33-retroacao-v1";
  const scenes = [
    {
      label: "A chave",
      opening: "Ela guardou a chave porque...",
      guesses: ["Talvez quisesse impedir uma entrada.", "Talvez precisasse voltar depois."],
      endings: ["não queria que outra pessoa entrasse.", "precisaria abrir aquela porta na manhã seguinte."],
      meanings: ["Proteger o acesso.", "Preparar um retorno."],
      explanation: "O início permaneceu idêntico. O que veio depois permitiu reler «guardou a chave» de duas maneiras: como impedir uma entrada ou como preparar uma volta."
    }
  ];
  const defaultState = () => ({ index: 0, step: "predict", guess: null, warning: false });
  let state = defaultState();
  let storageOK = true;
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
  function load() {
    try {
      const old = JSON.parse(localStorage.getItem(STORE));
      if (!old || typeof old !== "object") return defaultState();
      if (!Number.isInteger(old.index) || old.index < 0 || old.index > 3) return defaultState();
      // Ao reduzir o percurso, quem já avançou além da primeira cena mantém a conclusão.
      if (old.index >= 1) return { index: 1, step: "done", guess: null, warning: false };
      const validSteps = ["predict", "first", "compare", "resolved", "done"];
      if (!validSteps.includes(old.step)) return defaultState();
      if (old.index === scenes.length && old.step !== "done") return defaultState();
      if (old.index < scenes.length && old.step === "done") return defaultState();
      const guess = old.guess === 0 || old.guess === 1 ? old.guess : null;
      if (old.index < scenes.length && old.step !== "predict" && guess === null) return defaultState();
      return { index: old.index, step: old.step, guess, warning: false };
    } catch {
      storageOK = false;
      return defaultState();
    }
  }
  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        index: state.index, step: state.step, guess: state.guess
      }));
      storageOK = true;
    } catch {
      storageOK = false;
    }
  }
  function heading(kicker, title, body) {
    return `<div class="retro-scene-intro">
      <p class="retro-scene-kicker">${esc(kicker)}</p>
      <h3 class="retro-scene-title" tabindex="-1" data-retro-focus>${esc(title)}</h3>
      <p class="retro-scene-desc">${esc(body)}</p>
    </div>`;
  }
  function sentence(scene, ending, letter) {
    return `<div class="retro-ending-card">
      <span class="retro-ending-label">DESFECHO ${letter}</span>
      <p class="retro-ending-line"><span>${esc(scene.opening.replace(/\.\.\.$/, ""))}</span> <strong>${esc(ending)}</strong></p>
      <div class="retro-ending-reading">${esc(scene.meanings[letter === "A" ? 0 : 1])}</div>
    </div>`;
  }
  function boardMarkup() {
    const finished = state.index >= scenes.length;
    if (finished) {
      return `<div class="retro-finish">
          <div class="retro-finish-mark" aria-hidden="true">✓</div>
          ${heading("EXPERIMENTO CONCLUÍDO", "Agora volte ao início.", "Você observou como duas continuações da mesma frase podem modificar a leitura do começo.")}
          <p>Esse movimento ajuda a introduzir a <strong>retroação</strong>. Não significa que todo sentido só exista ao final de uma frase, nem que esse exemplo permita interpretar o inconsciente de alguém.</p>
          <button type="button" class="retro-action retro-primary" data-retro-action="reset">Refazer a experiência <span aria-hidden="true">↺</span></button>
        </div>`;
    }
    const scene = scenes[state.index];
    if (state.step === "predict") {
      return `${heading(`EXPERIÊNCIA · ${scene.label.toUpperCase()}`, "O que você imagina?", "Leia o começo da frase. Antes de conhecer o final, escolha uma hipótese provisória. Nenhuma delas é um diagnóstico ou uma resposta certa.")}
        <div class="retro-stem"><span class="retro-stem-label">A FRASE COMEÇA ASSIM</span><p>${esc(scene.opening)}</p><span class="retro-cursor" aria-hidden="true"></span></div>
        <p class="retro-prompt">Qual leitura veio primeiro à sua cabeça?</p>
        <div class="retro-choices">${scene.guesses.map((g, i) => `<button type="button" class="retro-choice" data-retro-action="predict" data-retro-value="${i}"><span class="retro-choice-index">${i === 0 ? "A" : "B"}</span><span>${esc(g)}</span><span class="retro-choice-arrow" aria-hidden="true">↗</span></button>`).join("")}</div>
        <p class="retro-hint">Aqui, não existe resposta correta. Estamos registrando uma primeira expectativa.</p>`;
    }
    if (state.step === "first") {
      return `${heading(`EXPERIÊNCIA · ${scene.label.toUpperCase()}`, "Um primeiro desfecho.", "Sua hipótese inicial é apenas uma possibilidade. Observe como a continuação orienta a leitura.")}
        <div class="retro-guess"><span>SUA HIPÓTESE INICIAL</span><p>${esc(scene.guesses[state.guess])}</p></div>
        <div class="retro-endings retro-one">${sentence(scene, scene.endings[0], "A")}</div>
        <button type="button" class="retro-action retro-primary" data-retro-action="second">Revelar outro desfecho <span aria-hidden="true">→</span></button>`;
    }
    const comparison = `<div class="retro-endings">${sentence(scene, scene.endings[0], "A")}${sentence(scene, scene.endings[1], "B")}</div>`;
    if (state.step === "compare") {
      return `${heading(`EXPERIÊNCIA · ${scene.label.toUpperCase()}`, "Mesmo começo. Leituras diferentes.", "Compare os dois desfechos. As palavras iniciais não mudaram, mas a compreensão da cena pode mudar.")}
        ${comparison}
        <div class="retro-question"><p class="retro-prompt">O que esta comparação ajuda a perceber?</p>
          <div class="retro-choices">
            <button type="button" class="retro-choice" data-retro-action="judge" data-retro-value="0"><span class="retro-choice-index">A</span><span>O início já tinha uma única interpretação, e ela não pode mudar.</span></button>
            <button type="button" class="retro-choice" data-retro-action="judge" data-retro-value="1"><span class="retro-choice-index">B</span><span>O que aparece depois pode reorganizar como lemos o começo.</span></button>
          </div>
          ${state.warning ? '<p class="retro-feedback" role="alert">Reexamine a comparação: as mesmas palavras iniciais participam de leituras diferentes. Tente novamente.</p>' : ""}
        </div>`;
    }
    return `${heading(`EXPERIÊNCIA · ${scene.label.toUpperCase()}`, "Você encontrou a retroação.", "O elemento posterior pode modificar a leitura do que veio antes.")}
      ${comparison}
      <div class="retro-insight"><span class="retro-insight-label">POR QUE ISSO IMPORTA?</span><p>${esc(scene.explanation)}</p></div>
      <p class="retro-caution">Esta é uma demonstração didática de um efeito de leitura, não uma interpretação clínica.</p>
      <button type="button" class="retro-action retro-primary" data-retro-action="advance">Concluir experiência <span aria-hidden="true">→</span></button>`;
  }
  function renderBoard(root, focus) {
    const board = root.querySelector("#retroBoard");
    if (!board) return;
    board.innerHTML = boardMarkup() + (!storageOK ? '<p class="retro-save-warning" role="status">Não foi possível salvar neste dispositivo. Você ainda pode jogar, mas o progresso pode não permanecer ao sair.</p>' : "");
    if (focus) {
      const target = board.querySelector("[data-retro-focus]");
      if (target) {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "nearest", behavior: "auto" });
      }
    }
  }
  function onClick(event) {
    const button = event.target.closest("[data-retro-action]");
    if (!button) return;
    const root = button.closest("#retroacao");
    if (!root) return;
    const act = button.dataset.retroAction;
    if (act === "reset" && state.step === "done") {
      state = defaultState();
    } else if (act === "predict" && state.step === "predict") {
      const guess = Number(button.dataset.retroValue);
      if (guess !== 0 && guess !== 1) return;
      state.guess = guess;
      state.step = "first";
    } else if (act === "second" && state.step === "first") {
      state.step = "compare";
    } else if (act === "judge" && state.step === "compare") {
      if (button.dataset.retroValue === "1") {
        state.step = "resolved";
        state.warning = false;
      } else if (button.dataset.retroValue === "0") {
        state.warning = true;
      } else return;
    } else if (act === "advance" && state.step === "resolved") {
      state.index += 1;
      state.guess = null;
      state.warning = false;
      state.step = state.index >= scenes.length ? "done" : "predict";
    } else return;
    save();
    renderBoard(root, true);
  }
  window.LACAN_INLINE_ACTIVITY = {
    render(lesson) {
      if (lesson.id !== LESSON) return "";
      return `<section class="retroacao" id="retroacao" aria-labelledby="retroTitle">
        <div class="retro-heading">
          <span class="retro-kicker">EXPERIÊNCIA INTERATIVA · AULA 3.3</span>
          <h2 id="retroTitle">O final muda <em>o começo.</em></h2>
          <p>Experimente como uma continuação pode modificar a leitura das mesmas palavras. Um exemplo, sem respostas psicológicas prontas.</p>
        </div>
        <div id="retroBoard" class="retro-board"></div>
        <p class="retro-footnote">Seu percurso é salvo apenas neste navegador. A atividade é independente do quiz da aula.</p>
      </section>`;
    },
    mount(article, lesson) {
      if (lesson.id !== LESSON) return;
      const root = article.querySelector("#retroacao");
      if (!root) return;
      storageOK = true;
      state = load();
      renderBoard(root, false);
      if (!article.dataset.retroListening) {
        article.addEventListener("click", onClick);
        article.dataset.retroListening = "1";
      }
    }
  };
})();
