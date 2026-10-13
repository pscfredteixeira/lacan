/* Aula 3.6 — Formações do inconsciente. Player visual baseado no tempo REAL do áudio.
   Independente do motion da aula 3.5: não altera seu funcionamento. */
(() => {
  "use strict";
  const ID="3.6", DURATION=167.314;
  const AUDIO_FILE="assets/formacoes-inconsciente.mp3";
  const DB_NAME="lacan-motion-36-audio", FILE_KEY="narracao-36";
  // Trechos com começo nas pausas observadas do arquivo do ElevenLabs.
  const cues=[
    {at:0,kind:"dream",title:"Você já acordou de um sonho?",sub:"Por que certas imagens apareceram justamente ali?"},
    {at:6.49,kind:"speech",title:"Uma palavra trocada sem querer",sub:""},
    {at:8.68,kind:"laugh",title:"Uma piada inesperada",sub:""},
    {at:10.58,kind:"repeat",title:"Um comportamento que se repete",sub:"Mesmo tentando evitá-lo"},
    {at:14.79,kind:"four",title:"Experiências diferentes",sub:"Uma questão para a psicanálise"},
    {at:22.15,kind:"four",title:"As formações do inconsciente",sub:""},
    {at:24.79,kind:"freud",title:"Sigmund Freud",sub:"Sonhos · atos falhos · chistes · sintomas"},
    {at:30.59,kind:"lacan",title:"Jacques Lacan",sub:"A linguagem participa de seu funcionamento"},
    {at:37.31,kind:"dream",title:"Vamos começar pelos sonhos.",sub:""},
    {at:40.20,kind:"dream",title:"Um sonho não é simplesmente um filme sem sentido.",sub:""},
    {at:43.59,kind:"dreamwork",title:"Na construção do sonho...",sub:""},
    {at:45.14,kind:"dreamwork",title:"Combinar · transformar · deslocar",sub:""},
    {at:49.43,kind:"condensation",title:"Condensação e deslocamento",sub:"Operações do trabalho do sonho"},
    {at:54.21,kind:"door",title:"Uma porta fechada",sub:"Não possui o mesmo significado para todo mundo"},
    {at:60.85,kind:"dictionary",title:"Não existe um dicionário de símbolos.",sub:""},
    {at:63.91,kind:"listen",title:"Escutar as associações de quem sonhou.",sub:""},
    {at:67.64,kind:"speech",title:"Agora, os atos falhos.",sub:""},
    {at:69.95,kind:"swap",title:"Uma palavra dá lugar a outra.",sub:""},
    {at:73.44,kind:"question",title:"Esse desencontro pode levantar perguntas.",sub:""},
    {at:76.73,kind:"question",title:"Um engano não revela sozinho um desejo escondido.",sub:""},
    {at:81.69,kind:"laugh",title:"E as piadas?",sub:""},
    {at:83.03,kind:"laugh",title:"Freud estudou os chistes.",sub:""},
    {at:84.90,kind:"laugh",title:"Um jogo de palavras.",sub:"Uma surpresa. Uma quebra de expectativa."},
    {at:91.35,kind:"lacan",title:"Lacan retoma o tema.",sub:"Significantes e o lugar de quem escuta"},
    {at:98.40,kind:"repeat",title:"O sintoma pede outro cuidado.",sub:""},
    {at:101.05,kind:"repeat",title:"Não é uma mensagem secreta para traduzir.",sub:""},
    {at:106.29,kind:"repeat",title:"Sofrimento · repetição · satisfação",sub:""},
    {at:111.49,kind:"question",title:"Não existe fórmula simples.",sub:""},
    {at:114.55,kind:"four",title:"O que esses quatro fenômenos ensinam?",sub:""},
    {at:117.99,kind:"dictionary",title:"O inconsciente não é um código pronto.",sub:""},
    {at:124.51,kind:"question",title:"Aprender a formular perguntas melhores.",sub:""},
    {at:128.18,kind:"question",title:"O que aconteceu?",sub:""},
    {at:129.60,kind:"chain",title:"Que relações aparecem?",sub:"Entre os elementos"},
    {at:132.41,kind:"listen",title:"O que a pessoa associa a isso?",sub:""},
    {at:134.73,kind:"question",title:"Até onde podemos interpretar?",sub:"Sem inventar uma resposta"},
    {at:138.94,kind:"laboratory",title:"Laboratório das formações do inconsciente",sub:""},
    {at:143.17,kind:"swap",title:"Experimentar trocas de palavras",sub:"E diferentes maneiras de construir uma frase"},
    {at:147.94,kind:"chain",title:"Observar operações da linguagem",sub:""},
    {at:150.86,kind:"listen",title:"Um exercício não interpreta a vida psíquica de ninguém.",sub:""},
    {at:155.37,kind:"question",title:"Talvez esta seja a principal lição.",sub:""},
    {at:158.32,kind:"dictionary",title:"A psicanálise não tem resposta para tudo.",sub:""},
    {at:162.67,kind:"listen",title:"Escutar aquilo que ainda não compreendemos.",sub:""}
  ];
  const esc=v=>String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const clock=t=>{const n=Math.floor(Math.max(0,t));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  const drawings={
    dream:'<path d="M26 86V20h49v66M26 86h60M45 86V42h17v44"/><path d="M57 11a16 16 0 1 0 20 19 17 17 0 0 1-20-19"/><path d="M14 17h5m-2.5-2.5v5M87 50h6m-3-3v6"/>',
    door:'<path d="M28 83V17h44v66M20 83h60M35 24h30v59M58 52h2"/>',
    speech:'<path d="M14 25q0-12 13-12h46q13 0 13 12v29q0 12-13 12H41L22 83V65q-8-3-8-11z"/><path d="M32 36h36M32 48h21"/>',
    laugh:'<path d="M17 25q0-10 11-10h44q11 0 11 10v30q0 10-11 10H48L30 82V65q-13 0-13-11z"/><path d="M34 37q6-8 12 0m9 0q6-8 12 0M36 48q14 18 29 0"/>',
    repeat:'<path d="M25 39a30 30 0 0 1 51-11l7 10M83 38V18M83 38H63M75 61a30 30 0 0 1-51 11l-7-10M17 62v20M17 62h20"/>',
    book:'<path d="M50 78Q30 64 10 74V22q24-8 40 9q16-17 40-9v52q-20-10-40 4zM50 31v47M22 35h17M61 35h17"/>',
    dictionary:'<path d="M25 17h53v68H25q-11-8 0-15V17zm0 53h53"/><path d="M41 32l21 21M62 32L41 53"/>',
    listen:'<path d="M63 65c0-10 17-12 17-35C80 14 67 8 52 8 34 8 25 19 25 37m0 0c-1 15 15 22 17 33 2 9 14 12 20 2"/><path d="M43 37c0-10 10-16 19-12 12 7 6 19-2 24-9 5-6 15-14 15"/>',
    question:'<path d="M33 34q0-18 18-18t18 17c0 13-18 12-18 28M51 74v4"/>',
    laboratory:'<path d="M37 14h26M43 14v31L22 76q-3 7 5 7h46q8 0 5-7L57 45V14M35 65h30"/>',
    four:'<circle cx="34" cy="34" r="15"/><circle cx="66" cy="34" r="15"/><circle cx="34" cy="66" r="15"/><circle cx="66" cy="66" r="15"/><path d="M30 34h8M62 34h8M30 66h8M62 66h8"/>',
    chain:'<circle cx="20" cy="51" r="11"/><circle cx="50" cy="51" r="11"/><circle cx="80" cy="51" r="11"/><path d="M31 51h8M61 51h8"/>',
    condensation:'<circle cx="40" cy="40" r="19"/><circle cx="60" cy="40" r="19"/><path d="M28 72h44M40 62v20M60 62v20"/>',
    dreamwork:'<rect x="14" y="20" width="21" height="21" rx="3"/><rect x="39" y="40" width="21" height="21" rx="3"/><rect x="64" y="60" width="21" height="21" rx="3"/><path d="M35 31h15M50 31v9M60 51h15M75 51v9"/>'
  };
  function artwork(kind){
    if(kind==="freud"||kind==="lacan")return '<div class="lm36-portrait lm36-portrait-'+kind+'" aria-hidden="true"></div>';
    if(kind==="swap")return '<div class="lm36-swapping" aria-hidden="true"><span>palavra</span><b>→</b><span>outra</span></div>';
    const icon=drawings[kind]||drawings.question;
    return '<svg class="lm36-symbol" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icon+'</svg>';
  }
  let destroy=()=>{};
  function render(lesson){
    if(lesson.id!==ID)return "";
    return '<section class="lm-wrap lm36-wrap" id="lacanMotion36" aria-labelledby="lm36Heading">'
      +'<div class="lm-intro"><span class="section-label">ASSISTA E ESCUTE · 2 MIN 47 SEG</span><h2 id="lm36Heading">As formações do inconsciente em movimento.</h2><p>Sonhos, atos falhos, chistes e sintomas — uma introdução visual antes da leitura.</p></div>'
      +'<div class="lm-stage lm36-stage" id="lm36Stage" role="img" aria-label="Animação didática sobre as formações do inconsciente">'
      +'<div class="lm-top"><span>FORMAÇÃO LACANIANA</span><span>AULA 3.6 / LABORATÓRIO</span></div>'
      +'<div class="lm36-inner" id="lm36Inner"></div>'
      +'<div class="lm-bottom"><span>FORMAÇÕES DO INCONSCIENTE</span><span id="lm36Counter">01 / '+cues.length+'</span></div></div>'
      +'<div class="lm-controls"><button type="button" class="lm-play" id="lm36Play" aria-label="Reproduzir"><span>▶</span> Reproduzir</button>'
      +'<label class="lm-seek-label" for="lm36Seek">Avançar ou voltar</label><input type="range" id="lm36Seek" min="0" max="'+DURATION+'" step=".05" value="0" aria-label="Posição da narração">'
      +'<span class="lm-clock" id="lm36Clock">0:00 / '+clock(DURATION)+'</span></div>'
      +'<div class="lm36-load" id="lm36Load" hidden><p id="lm36Status" role="status">A narração ainda não está publicada no site. Selecione o MP3 para assistir com áudio.</p>'
      +'<label class="lm-file-label">Carregar MP3 para ouvir <input type="file" id="lm36File" accept="audio/*,.mp3,.m4a" aria-label="Carregar narração da aula 3.6"></label></div>'
      +'<audio id="lm36Audio" preload="metadata"></audio></section>';
  }
  function mount(article,lesson){
    destroy();
    if(lesson.id!==ID)return;
    const root=article.querySelector("#lacanMotion36");if(!root)return;
    const el=id=>root.querySelector("#"+id);
    const stage=el("lm36Stage"), inner=el("lm36Inner"),counter=el("lm36Counter"),
      seek=el("lm36Seek"),clockLabel=el("lm36Clock"),play=el("lm36Play"),audio=el("lm36Audio"),
      load=el("lm36Load"),status=el("lm36Status"),file=el("lm36File");
    let t=0,idx=-1,playing=false,preview=false,hasAudio=false,raf=0,stamp=0,objectUrl="",disposed=false;
    function paint(time){
      t=Math.min(DURATION,Math.max(0,time));
      let n=0;for(let i=1;i<cues.length;i++){if(t+.10>=cues[i].at)n=i;else break;}
      if(idx!==n){
        idx=n;const c=cues[idx];
        stage.className="lm-stage lm36-stage lm36-theme-"+c.kind;
        inner.innerHTML='<div class="lm36-scene"><div class="lm36-art">'+artwork(c.kind)+'</div><h3>'+esc(c.title)+'</h3>'+(c.sub?'<p>'+esc(c.sub)+'</p>':"")+'</div>';
        stage.setAttribute("aria-label",c.title+(c.sub?". "+c.sub:""));
        counter.textContent=String(n+1).padStart(2,"0")+" / "+cues.length;
      }
      seek.value=t.toFixed(2);
      seek.style.setProperty("--lm-pct",(100*t/DURATION).toFixed(2)+"%");
      clockLabel.textContent=clock(t)+" / "+clock(DURATION);
    }
    function refreshButton(){
      play.innerHTML=playing?'<span>❚❚</span> Pausar':preview?'<span>▶</span> Prévia sem som':'<span>▶</span> Reproduzir';
      play.setAttribute("aria-label",playing?"Pausar":"Reproduzir");
    }
    function stop(){
      playing=false;preview=false;stamp=0;
      audio.pause();cancelAnimationFrame(raf);
      refreshButton();
    }
    function tick(now){
      if(!playing||disposed)return;
      if(preview){
        if(stamp)t+=(now-stamp)/1000;
        stamp=now;paint(t);
        if(t>=DURATION){stop();return;}
      }else paint(audio.currentTime||0);
      raf=requestAnimationFrame(tick);
    }
    function setAudio(src,label){
      stop();
      audio.src=src;audio.load();hasAudio=true;
      if(status)status.textContent=label;
      load.hidden=true;paint(0);refreshButton();
    }
    function playPause(){
      if(playing){stop();return;}
      if(t>=DURATION-.2){paint(0);}
      if(hasAudio){
        audio.currentTime=t;
        const task=audio.play();
        Promise.resolve(task).then(()=>{
          if(disposed)return;
          playing=true;preview=false;stamp=0;refreshButton();raf=requestAnimationFrame(tick);
        }).catch(()=>{
          if(disposed)return;
          load.hidden=false;status.textContent="Não foi possível tocar o áudio. Experimente selecionar o MP3 novamente.";
        });
      }else{
        playing=true;preview=true;stamp=0;refreshButton();raf=requestAnimationFrame(tick);
      }
    }
    function openDb(){
      return new Promise((resolve,reject)=>{
        if(!window.indexedDB){reject(new Error("Sem IndexedDB"));return;}
        const q=indexedDB.open(DB_NAME,1);
        q.onupgradeneeded=()=>q.result.createObjectStore("files");
        q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);
      });
    }
    async function storeFile(blob){
      const db=await openDb();
      return new Promise((resolve,reject)=>{
        const tx=db.transaction("files","readwrite");
        tx.objectStore("files").put(blob,FILE_KEY);
        tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(tx.error);};
      });
    }
    async function getFile(){
      const db=await openDb();
      return new Promise((resolve,reject)=>{
        const tx=db.transaction("files","readonly");
        const q=tx.objectStore("files").get(FILE_KEY);
        q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);
        tx.oncomplete=()=>db.close();
      });
    }
    play.addEventListener("click",playPause);
    seek.addEventListener("input",()=>{paint(Number(seek.value)||0);if(hasAudio)audio.currentTime=t;stamp=0;});
    audio.addEventListener("ended",()=>{stop();paint(DURATION);});
    file.addEventListener("change",async()=>{
      const chosen=file.files?.[0];if(!chosen)return;
      if(!chosen.type.startsWith("audio/")&&!/\.(mp3|m4a|wav|ogg)$/i.test(chosen.name)){
        status.textContent="Selecione um arquivo MP3 ou outro áudio válido.";return;
      }
      if(objectUrl)URL.revokeObjectURL(objectUrl);
      objectUrl=URL.createObjectURL(chosen);
      setAudio(objectUrl,"Narração carregada.");
      try{await storeFile(chosen);}catch{}
    });
    // Usa primeiro o MP3 publicado no GitHub; no rascunho, aceita um arquivo local.
    async function restore(){
      try{
        const response=await fetch(AUDIO_FILE,{method:"HEAD",cache:"no-store"});
        if(response.ok){
          if(!disposed)setAudio(AUDIO_FILE,"Narração publicada no curso.");
          return;
        }
      }catch{}
      try{
        const previous=await getFile();
        if(previous instanceof Blob&&previous.size&&!disposed){
          objectUrl=URL.createObjectURL(previous);
          setAudio(objectUrl,"Narração recuperada neste navegador.");return;
        }
      }catch{}
      if(!disposed){load.hidden=false;refreshButton();}
    }
    function visibility(){if(document.hidden&&preview)stop();}
    document.addEventListener("visibilitychange",visibility);
    destroy=()=>{
      disposed=true;stop();
      document.removeEventListener("visibilitychange",visibility);
      if(objectUrl)URL.revokeObjectURL(objectUrl);
      audio.removeAttribute("src");audio.load();
      destroy=()=>{};
    };
    paint(0);refreshButton();restore();
  }
  window.LACAN_MOTION_36={render,mount,unmount:()=>destroy()};
})();
