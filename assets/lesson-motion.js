/* Motion editorial — aula 3.5. O áudio não é necessário para ver a prévia visual.
 * Para publicação definitiva, colocar assets/inconsciente-linguagem.mp3 no repositório.
 * Um arquivo escolhido pelo estudante pode ser salvo localmente via IndexedDB. */
(() => {
  "use strict";
  const TOTAL=182.204;
  const FILE="assets/inconsciente-linguagem.mp3";
  const DB="lacan-motion-narracoes";
  const KEY="inconsciente-linguagem-v1";
  // Marcos revistos sobre o áudio REAL do ElevenLabs (182,204 s).
  // Cada "at" corresponde ao início da fala, medido pelas pausas do MP3.
  // A voz, não um temporizador independente, governa a animação.
  const VISUAL_LEAD_SECONDS=0.12; // transição visual discretamente antes do fonema inicial
  const cues=[
    {at:0,type:"question",title:"Você já falou alguma coisa...",sub:"E logo em seguida se perguntou?"},
    {at:4.15,type:"question",title:"Por que eu disse isso?",sub:""},
    {at:5.70,type:"speech",title:"Trocou o nome de alguém?",sub:""},
    {at:7.92,type:"words",title:"Uma palavra inesperada",sub:""},
    {at:10.91,type:"speech",title:"Uma piada que revelou demais",sub:""},
    {at:14.59,type:"lacan",title:"Jacques Lacan",sub:"Psicanalista"},
    {at:16.59,type:"lacan",title:"Uma das ideias mais importantes de Lacan",sub:""},
    {at:21.89,type:"quote",title:"O inconsciente é estruturado como uma linguagem.",sub:""},
    {at:25.23,type:"question",title:"Mas o que isso realmente significa?",sub:""},
    {at:28.25,type:"question",title:"Quando pensamos no inconsciente...",sub:""},
    {at:30.12,type:"basement",title:"Um porão da mente?",sub:""},
    {at:33.41,type:"basement",title:"Um lugar onde ficam guardados pensamentos...",sub:""},
    {at:36.33,type:"basement",title:"Lembranças e desejos mais secretos",sub:""},
    {at:39.20,type:"lacan",title:"Mas, para Lacan...",sub:""},
    {at:40.52,type:"vault",title:"Não é simplesmente um depósito de coisas escondidas.",sub:""},
    {at:44.67,type:"chain",title:"Relações entre palavras",sub:""},
    {at:48.80,type:"chain",title:"Repetições e deslocamentos",sub:""},
    {at:51.07,type:"chain",title:"Assim como acontece na linguagem.",sub:""},
    {at:53.27,type:"words",title:"Pense em uma frase.",sub:""},
    {at:55.30,type:"words",title:"Uma palavra não produz sentido sozinha.",sub:""},
    {at:58.78,type:"chain",title:"Seu sentido depende das outras palavras.",sub:""},
    {at:63.54,type:"silence",title:"Aquilo que não dizemos...",sub:"Pode ser tão importante quanto aquilo que dizemos."},
    {at:69.06,type:"chain",title:"Os significantes",sub:""},
    {at:72.25,type:"chain",title:"Elementos da linguagem que se relacionam",sub:"E produzem efeitos de sentido."},
    {at:79.63,type:"question",title:"E existe algo ainda mais interessante.",sub:""},
    {at:82.30,type:"origin",title:"Antes mesmo de nascermos...",sub:""},
    {at:83.97,type:"origin",title:"Já existem palavras sobre nós.",sub:""},
    {at:86.24,type:"origin",title:"Um nome escolhido",sub:""},
    {at:87.51,type:"origin",title:"Histórias familiares",sub:""},
    {at:90.15,type:"origin",title:"Desejos de outras pessoas",sub:""},
    {at:92.94,type:"world",title:"Chegamos a um mundo organizado pela linguagem.",sub:""},
    {at:96.66,type:"world",title:"Essa linguagem participa de quem somos.",sub:""},
    {at:100.83,type:"people",title:"Uma pessoa conversa sobre seu chefe.",sub:""},
    {at:103.79,type:"people",title:"De repente, sem perceber...",sub:""},
    {at:105.53,type:"replace",title:"Chama o chefe pelo nome do próprio pai.",sub:""},
    {at:108.32,type:"question",title:"Seria apenas uma confusão?",sub:"Talvez."},
    {at:111.13,type:"question",title:"A psicanálise pode fazer outra pergunta.",sub:""},
    {at:114.08,type:"question",title:"Por que aquele nome apareceu naquele momento?",sub:""},
    {at:117.74,type:"question",title:"Não existe uma resposta pronta.",sub:""},
    {at:119.69,type:"origin",title:"O sentido depende da história da pessoa.",sub:"E de suas associações."},
    {at:124.45,type:"freud",title:"Sigmund Freud",sub:"Sonhos, sintomas e atos falhos."},
    {at:131.20,type:"lacan",title:"Lacan retoma essa descoberta.",sub:"Dois mecanismos da linguagem."},
    {at:136.82,type:"replace",title:"A metáfora",sub:"Um significante substitui outro."},
    {at:140.26,type:"chain",title:"A metonímia",sub:"O sentido se desloca entre significantes."},
    {at:145.22,type:"book",title:"Na psicanálise...",sub:""},
    {at:148.10,type:"book",title:"Não existe um dicionário universal.",sub:"Para interpretar sonhos ou atos falhos."},
    {at:152.76,type:"speech",title:"Escutar como cada pessoa fala",sub:""},
    {at:155.86,type:"words",title:"Palavras e associações singulares",sub:""},
    {at:159.48,type:"lacan",title:"Uma ideia provocadora de Lacan",sub:""},
    {at:163.69,type:"speech",title:"Não controlamos completamente aquilo que dizemos.",sub:""},
    {at:168.24,type:"speech",title:"Nem sempre sabemos tudo o que aparece em nossa fala.",sub:""},
    {at:172.34,type:"question",title:"Talvez a pergunta não seja apenas...",sub:""},
    {at:173.61,type:"question",title:"A pergunta mais interessante não seja apenas...",sub:""},
    {at:175.00,type:"question",title:"O que eu quis dizer?",sub:""},
    {at:176.38,type:"question",title:"Mas também...",sub:""},
    {at:176.90,type:"question",title:"O que apareceu naquilo que eu disse...",sub:""},
    {at:178.87,type:"question",title:"...sem que eu soubesse?",sub:""}
  ];
  const icon=(type)=>{
    const paths={
      basement:'<path d="M18 68V24h64v44M12 68h76M28 24v-10h44v10M43 68V45h16v23M25 36h12M65 36h12" />',
      vault:'<rect x="17" y="16" width="66" height="67" rx="5"/><circle cx="50" cy="49" r="19"/><circle cx="50" cy="49" r="6"/><path d="M50 31v12m0 12v12M32 49h12m12 0h12M17 28H8v14h9M83 28h9v14h-9"/>',
      speech:'<path d="M14 21q0-9 10-9h52q10 0 10 10v36q0 10-10 10H40L21 84V68q-7-2-7-10z"/><path d="M29 33h42M29 46h29"/>',
      silence:'<path d="M14 21q0-9 10-9h52q10 0 10 10v36q0 10-10 10H40L21 84V68q-7-2-7-10z"/><path stroke-dasharray="3 8" d="M30 44h39"/>',
      origin:'<circle cx="50" cy="27" r="14"/><path d="M23 82V65q0-19 27-19t27 19v17M14 18h13M73 18h13M10 35h18M72 35h18"/>',
      world:'<circle cx="50" cy="50" r="36"/><ellipse cx="50" cy="50" rx="15" ry="36"/><path d="M14 50h72M23 27h54M23 73h54"/>',
      people:'<circle cx="29" cy="28" r="12"/><circle cx="72" cy="28" r="12"/><path d="M9 77V61q0-21 20-21t20 21v16M52 77V61q0-21 20-21t20 21v16"/>',
      book:'<path d="M50 80q-20-13-40-7V22q23-7 40 8q17-15 40-8v51q-20-6-40 7zM50 30v50M21 36h19M60 36h19M21 48h19M60 48h19"/>'
    };
    return '<svg class="lm-picture" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[type]||'')+'</svg>';
  };
  const escapeText=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const format=t=>{const n=Math.floor(Math.max(0,t));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  function openStore(){
    return new Promise((resolve,reject)=>{
      if(!("indexedDB" in window)){reject(new Error("Armazenamento não disponível"));return;}
      const request=indexedDB.open(DB,1);
      request.onupgradeneeded=()=>request.result.createObjectStore("files");
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error);
    });
  }
  async function fileStore(action, value){
    const db=await openStore();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction("files",action==="get"?"readonly":"readwrite");
      const request=action==="get"?tx.objectStore("files").get(KEY):tx.objectStore("files").put(value,KEY);
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error);
      tx.oncomplete=()=>db.close();
    });
  }
  let cleanup=()=>{};
  const render=lesson=>{
    if(lesson.id!=="3.5")return "";
    return '<section class="lm-wrap" id="lacanMotion" aria-labelledby="lmHeading">'
     +'<div class="lm-intro"><span class="section-label">ASSISTA E ESCUTE · 03 MINUTOS</span>'
     +'<h2 id="lmHeading">O inconsciente em movimento.</h2>'
     +'<p>Uma introdução visual à relação entre fala, significantes e inconsciente. Assista antes de avançar para a leitura.</p></div>'
     +'<div class="lm-stage lm-type-question" id="lmStage" role="img" aria-label="Animação conceitual sobre o inconsciente e a linguagem">'
     +'<div class="lm-top"><span>FORMAÇÃO LACANIANA</span><span>03.5 / LINGUAGEM E INCONSCIENTE</span></div>'
     +'<div class="lm-orbit lm-orbit-a" aria-hidden="true"></div><div class="lm-orbit lm-orbit-b" aria-hidden="true"></div>'
     +'<div class="lm-content" id="lmContent"></div><div class="lm-bottom"><span>JACQUES LACAN · UMA INTRODUÇÃO</span><span class="lm-scene-count" id="lmSceneCount">01 / 57</span></div></div>'
     +'<div class="lm-controls"><button class="lm-play" type="button" id="lmPlay" aria-label="Iniciar animação">▶ <span>Reproduzir</span></button>'
     +'<label class="lm-seek-label" for="lmSeek">Posição da narração</label><input type="range" id="lmSeek" min="0" max="'+TOTAL+'" step=".1" value="0" aria-label="Avançar ou voltar na animação">'
     +'<span class="lm-clock" id="lmClock">0:00 / 3:02</span></div>'
     +'<div class="lm-audio-row"><p class="lm-status" id="lmStatus" role="status">Prévia visual disponível. Para ouvir a narração, selecione o arquivo ElevenLabs.</p>'
     +'<label class="lm-file-label">Selecionar áudio ElevenLabs <input type="file" id="lmFile" accept="audio/*,.mp3,.m4a" aria-label="Selecionar arquivo de narração"></label></div>'
     +'<p class="lm-disclaimer">As imagens e palavras ilustram conceitos; nenhum lapso tem significado universal. O áudio selecionado fica apenas neste dispositivo, não é enviado ao site.</p>'
     +'<audio id="lmAudio" preload="metadata"></audio></section>';
  };
  function mount(article,lesson){
    cleanup();
    if(lesson.id!=="3.5")return;
    const root=article.querySelector("#lacanMotion");
    if(!root)return;
    const stage=root.querySelector("#lmStage"), content=root.querySelector("#lmContent");
    const seek=root.querySelector("#lmSeek"), clock=root.querySelector("#lmClock");
    const audio=root.querySelector("#lmAudio"), play=root.querySelector("#lmPlay");
    const status=root.querySelector("#lmStatus"), file=root.querySelector("#lmFile");
    const count=root.querySelector("#lmSceneCount");
    let current=0,playing=false,hasAudio=false,frame=0,lastStamp=0,objectUrl="",scene=-1,demo=false,dead=false;
    function setScene(t){
      const visualTime=Math.max(0,t+VISUAL_LEAD_SECONDS);
      let i=0; for(let k=1;k<cues.length;k++){if(visualTime>=cues[k].at)i=k;else break;}
      if(i===scene)return;
      scene=i;const cue=cues[i];
      stage.className="lm-stage lm-type-"+cue.type;
      let decor="";
      if(cue.type==="chain")decor='<div class="lm-chain" aria-hidden="true"><span>S₁</span><i></i><span>S₂</span><i></i><span>S₃</span></div>';
      else if(cue.type==="replace"){
        const metaphor=cue.title.toLowerCase().includes("metáfora");
        decor=metaphor?'<div class="lm-replace" aria-hidden="true"><span>S₁</span><b>→</b><span>S₂</span></div>':'<div class="lm-replace" aria-hidden="true"><span>chefe</span><b>→</b><span>pai</span></div>';
      }
      else if(cue.type==="words")decor='<div class="lm-fragments" aria-hidden="true"><span>palavra</span><span>sentido</span><span>fala</span></div>';
      else if(cue.type==="lacan"||cue.type==="freud")decor='<div class="lm-portrait" aria-hidden="true"></div>';
      else if(["basement","vault","speech","silence","origin","world","people","book"].includes(cue.type))decor=icon(cue.type);
      content.innerHTML='<div class="lm-scene"><div class="lm-scene-visual">'+decor+'</div><h3>'+escapeText(cue.title)+'</h3>'+(cue.sub?'<p class="lm-caption">'+escapeText(cue.sub)+'</p>':'')+'</div>';
      count.textContent=String(i+1).padStart(2,"0")+" / "+cues.length;
      stage.setAttribute("aria-label",cue.title+(cue.sub?". "+cue.sub:""));
    }
    function update(t){
      current=Math.max(0,Math.min(TOTAL,t));setScene(current);
      seek.value=current.toFixed(2);seek.style.setProperty("--lm-pct",(100*current/TOTAL).toFixed(2)+"%");
      clock.textContent=format(current)+" / "+format(TOTAL);
    }
    function setButton(){play.innerHTML=(playing?"❚❚ <span>Pausar</span>":"▶ <span>"+(hasAudio?"Reproduzir":"Prévia silenciosa")+"</span>");play.setAttribute("aria-label",playing?"Pausar animação":"Iniciar animação");}
    function tick(stamp){
      if(!playing||dead)return;
      if(demo){if(lastStamp)current+=(stamp-lastStamp)/1000;lastStamp=stamp;update(current);if(current>=TOTAL){pause();return;}}
      else update(audio.currentTime||0);
      frame=requestAnimationFrame(tick);
    }
    function pause(){playing=false;demo=false;lastStamp=0;audio.pause();cancelAnimationFrame(frame);setButton();}
    function attach(blob,label){
      if(objectUrl)URL.revokeObjectURL(objectUrl);
      objectUrl=URL.createObjectURL(blob);audio.src=objectUrl;audio.load();hasAudio=true;
      status.textContent=label;pause();update(0);
    }
    function start(){
      if(playing){pause();return;}
      if(current>=TOTAL-0.15)update(0);
      if(hasAudio){
        audio.currentTime=current;
        const attempt=audio.play();
        if(attempt && typeof attempt.then==="function")attempt.then(()=>{if(dead)return;playing=true;demo=false;lastStamp=0;setButton();frame=requestAnimationFrame(tick);}).catch(()=>{status.textContent="Não foi possível reproduzir este áudio. Confira o arquivo ou toque novamente.";});
      }else{playing=true;demo=true;lastStamp=0;setButton();frame=requestAnimationFrame(tick);}
    }
    play.addEventListener("click",start);
    seek.addEventListener("input",()=>{const t=Number(seek.value)||0;update(t);if(hasAudio)audio.currentTime=t;lastStamp=0;});
    audio.addEventListener("ended",()=>{pause();update(TOTAL);});
    audio.addEventListener("error",()=>{if(!dead&&hasAudio)status.textContent="Falha ao abrir o áudio. Selecione outro arquivo.";});
    file.addEventListener("change",async()=>{
      const selected=file.files?.[0];if(!selected)return;
      if(!selected.type.startsWith("audio/")&&!/\.(mp3|m4a|aac|wav|ogg)$/i.test(selected.name)){status.textContent="Selecione um arquivo de áudio válido.";return;}
      attach(selected,"Narração carregada. Toque em Reproduzir para assistir com áudio.");
      try{await fileStore("put",selected);if(!dead)status.textContent="Narração pronta e guardada neste navegador para as próximas visitas.";}
      catch{if(!dead)status.textContent="Narração pronta. O navegador não permitiu salvá-la para outra visita.";}
    });
    async function restore(){
      // Se o arquivo tiver sido publicado em assets/, ele tem prioridade sobre a cópia local.
      try{
        const response=await fetch(FILE,{method:"HEAD"});
        if(response.ok){
          if(dead)return;audio.src=FILE;hasAudio=true;status.textContent="Narração pronta para acompanhar as cenas.";setButton();return;
        }
      }catch{}
      try{const saved=await fileStore("get");if(saved instanceof Blob && saved.size && !dead)attach(saved,"Narração recuperada deste dispositivo. Toque em Reproduzir.");}
      catch{}
      if(!dead)setButton();
    }
    document.addEventListener("visibilitychange",onVisibility);
    function onVisibility(){if(document.hidden&&demo)pause();}
    cleanup=()=>{
      dead=true;pause();document.removeEventListener("visibilitychange",onVisibility);
      if(objectUrl)URL.revokeObjectURL(objectUrl);
      audio.removeAttribute("src");audio.load();
      cleanup=()=>{};
    };
    update(0);setButton();restore();
  }
  window.LACAN_MOTION={render,mount,unmount:()=>cleanup()};
})();
