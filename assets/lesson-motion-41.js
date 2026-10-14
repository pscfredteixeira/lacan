/* Formação Lacaniana — aula 4.1. O problema da imagem corporal.
 * Cenas vinculadas à reprodução real da narração (Daniel, 4m02s), não a um relógio independente.
 */
(() => {
  "use strict";
  const LESSON="4.1", FILE="assets/imagem-corporal.mp3", DURATION=242.103;
  // Entradas alinhadas às pausas da nova narração.
  const scenes=[
    [0,"photo","Uma fotografia de você"],
    [9.86,"question","É uma sensação curiosa."],
    [11.98,"body","Estamos olhando para o nosso próprio corpo."],
    [16.18,"contrast","Ver um corpo ≠ viver em um corpo"],
    [23.76,"lacan","Jacques Lacan"],
    [30.8,"walk","Imagine uma situação simples."],
    [37.04,"walk","Você sente o chão sob os pés."],
    [44.1,"body","Seu corpo está em movimento."],
    [49.27,"photo","Alguém tira uma fotografia."],
    [54.91,"photo","A fotografia mostra seu corpo inteiro."],
    [61.9,"contrast","Mas ela não mostra o que você sentia."],
    [65.56,"walk","O esforço dos músculos. O equilíbrio."],
    [73.62,"contrast","Duas experiências diferentes."],
    [77.58,"body","O corpo vivido."],
    [80.93,"photo","A imagem do corpo."],
    [83.52,"lacan","A diferença interessa a Lacan."],
    [87.66,"child","Uma criança aprendendo a andar."],
    [92.42,"photo","Uma fotografia mostra uma figura inteira."],
    [97.58,"shape","Cabeça, braços, pernas e tronco."],
    [103.63,"child","Mas caminhar ainda é difícil."],
    [108.79,"walk","Ela pode perder o equilíbrio."],
    [119.74,"question","Percebe a diferença?"],
    [121.61,"contrast","Uma imagem inteira."],
    [127.77,"shape","A unidade que a imagem oferece."],
    [132.84,"gestalt","Gestalt"],
    [138.95,"shape","Uma forma organizada, percebida como um todo."],
    [147.39,"question","Por que isso importa para a psicanálise?"],
    [153.4,"lacan","A imagem participa da ideia de quem somos."],
    [160.45,"body","Não somos apenas o corpo que sentimos."],
    [168.97,"photo","Também encontramos imagens fora de nós."],
    [174.35,"question","Uma questão fundamental."],
    [177.71,"mirror","Uma criança diante do espelho."],
    [181.84,"child","A coordenação ainda se desenvolve."],
    [187.59,"mirror","Uma imagem organizada de seu corpo."],
    [193.4,"shape","A imagem oferece unidade."],
    [200.3,"question","Mas atenção."],
    [201.81,"theory","Estamos falando de uma proposta teórica."],
    [206.35,"child","Não sabemos exatamente o que uma criança sente."],
    [213.11,"lacan","Imagem corporal e formação do eu."],
    [220.14,"question","Uma pergunta fascinante."],
    [224.28,"mirror","A imagem que temos de nós mesmos..."],
    [230.44,"contrast","Até que ponto o eu depende de algo fora de nós?"],
    [236.61,"mirror","Na próxima aula..."],
    [240.62,"mirror","O estádio do espelho."]
  ];
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const format=s=>{const n=Math.floor(Math.max(0,s));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  const paths={
    photo:'<rect x="12" y="18" width="76" height="64" rx="2"/><circle cx="63" cy="38" r="9"/><path d="M17 73 39 50l18 18 13-13 16 17"/>',
    walk:'<path d="m24 82 15-16 11-16-1-15-12 7-14 17M49 35l20 9 10 20M50 50l16 12-4 24M49 36l-3-13"/><circle cx="52" cy="14" r="9"/>',
    body:'<circle cx="50" cy="18" r="10"/><path d="M50 29v37m0-26L25 59m25-19 25 19M50 66 31 87m19-21 19 21"/>',
    child:'<circle cx="51" cy="20" r="11"/><path d="M51 32v29M51 40 34 55m17-15 14 17M51 61 36 79m15-18 18 20M17 37v47m66-47v47"/><path d="M18 38q15-14 26-2M58 37q10-10 24 0"/>',
    mirror:'<rect x="25" y="8" width="50" height="84" rx="21"/><rect x="31" y="14" width="38" height="72" rx="17"/><circle cx="50" cy="36" r="9"/><path d="M36 71V62q0-14 14-14t14 14v9M22 93h56"/>',
    shape:'<circle cx="50" cy="16" r="10"/><path d="M50 27v38m0-28-25 18m25-18 25 18M50 65 31 86m19-21 19 21"/><circle cx="50" cy="50" r="43" stroke-dasharray="3 8"/>',
    gestalt:'<circle cx="50" cy="50" r="39"/><path d="M27 50a23 23 0 0 1 46 0 23 23 0 0 1-46 0M50 26v48M26 50h48"/>',
    contrast:'<rect x="12" y="23" width="32" height="55" rx="3"/><circle cx="28" cy="39" r="8"/><path d="M20 62q0-14 8-14t8 14"/><path d="M52 50h13m-7-6 7 6-7 6"/><circle cx="78" cy="36" r="8"/><path d="M78 44v28m0-18-11 8m11-8 11 8m-11 10-8 13m8-13 8 13"/>',
    question:'<path d="M33 34q0-18 18-18t18 17c0 13-18 12-18 28M51 74v5"/>',
    theory:'<path d="M20 20h60v61H20zM32 36h36M32 49h29M32 62h22M23 17V10h54v7"/>'
  };
  let unmount=()=>{};
  const render=lesson=>{
    if(lesson.id!==LESSON)return "";
    return '<section class="lm-wrap lm41-wrap" id="lacanMotion41" aria-labelledby="lm41Heading">'
    +'<div class="lm-intro"><span class="section-label">VÍDEO INTRODUTÓRIO · 4 MINUTOS</span><h2 id="lm41Heading">O problema da imagem corporal.</h2><p>O corpo que sentimos e a imagem que vemos: uma preparação para o estádio do espelho.</p></div>'
    +'<div class="lm-stage lm41-stage" id="lm41Stage" role="img" aria-label="Animação sobre corpo vivido e imagem corporal">'
    +'<div class="lm-top"><span>FORMAÇÃO LACANIANA</span><span>MÓDULO 04 · AULA 4.1</span></div>'
    +'<div class="lm41-body" id="lm41Body"></div>'
    +'<div class="lm-bottom"><span>O PROBLEMA DA IMAGEM CORPORAL</span><span id="lm41Count">01 / '+scenes.length+'</span></div></div>'
    +'<div class="lm-controls"><button class="lm-play" id="lm41Play" type="button" aria-label="Reproduzir narração">▶ <span>Reproduzir</span></button>'
    +'<label class="lm-seek-label" for="lm41Seek">Posição do vídeo</label>'
    +'<input type="range" min="0" max="'+DURATION+'" step=".1" value="0" id="lm41Seek" aria-label="Avançar ou voltar no vídeo">'
    +'<span class="lm-clock" id="lm41Clock">0:00 / '+format(DURATION)+'</span></div>'
    +'<div class="lm41-fallback" id="lm41Fallback" hidden><span id="lm41Message" role="status">Narração indisponível neste momento.</span>'
    +'<label class="lm-file-label">Carregar narração <input type="file" id="lm41File" accept="audio/*,.mp3,.m4a" aria-label="Selecionar MP3"></label></div>'
    +'<audio id="lm41Audio" preload="metadata"></audio></section>';
  };
  function mount(article,lesson){
    unmount();if(lesson.id!==LESSON)return;
    const root=article.querySelector("#lacanMotion41");if(!root)return;
    const get=id=>root.querySelector("#"+id);
    const stage=get("lm41Stage"),body=get("lm41Body"),counter=get("lm41Count");
    const audio=get("lm41Audio"),button=get("lm41Play"),seek=get("lm41Seek"),clock=get("lm41Clock");
    const fallback=get("lm41Fallback"),message=get("lm41Message"),input=get("lm41File");
    let time=0,index=-1,playing=false,silent=false,ready=false,frame=0,stamp=0,objectUrl="",disposed=false;
    function draw(t){
      time=Math.min(DURATION,Math.max(0,t));
      let chosen=0;
      for(let i=1;i<scenes.length;i++){if(time+.12>=scenes[i][0])chosen=i;else break;}
      if(chosen!==index){
        index=chosen;const [,kind,title]=scenes[chosen];
        stage.className="lm-stage lm41-stage lm41-kind-"+kind;
        const art=kind==="lacan"?'<div class="lm41-portrait" aria-hidden="true"></div>':
          '<svg class="lm41-symbol" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[kind]||paths.question)+'</svg>';
        body.innerHTML='<div class="lm41-scene"><div class="lm41-visual">'+art+'</div><h3>'+escape(title)+'</h3></div>';
        counter.textContent=String(index+1).padStart(2,"0")+" / "+scenes.length;
        stage.setAttribute("aria-label",title);
      }
      seek.value=time.toFixed(2);
      seek.style.setProperty("--lm-pct",(time*100/DURATION)+"%");
      clock.textContent=format(time)+" / "+format(DURATION);
    }
    function setButton(){
      button.innerHTML=playing?'❚❚ <span>Pausar</span>':'▶ <span>'+(ready?"Reproduzir":"Prévia sem áudio")+'</span>';
      button.setAttribute("aria-label",playing?"Pausar":"Reproduzir vídeo");
    }
    function stop(){
      playing=false;silent=false;stamp=0;audio.pause();cancelAnimationFrame(frame);setButton();
    }
    function tick(now){
      if(!playing||disposed)return;
      if(silent){if(stamp)time+=(now-stamp)/1000;stamp=now;draw(time);if(time>=DURATION){stop();return;}}
      else draw(audio.currentTime||0);
      frame=requestAnimationFrame(tick);
    }
    function assign(src){
      if(disposed)return;
      stop();audio.src=src;audio.load();ready=true;fallback.hidden=true;
      draw(0);setButton();
    }
    function playPause(){
      if(playing){stop();return;}
      if(time>=DURATION-.2)draw(0);
      if(!ready){playing=true;silent=true;stamp=0;setButton();frame=requestAnimationFrame(tick);return;}
      audio.currentTime=time;
      Promise.resolve(audio.play()).then(()=>{if(disposed)return;playing=true;silent=false;setButton();frame=requestAnimationFrame(tick);}).catch(()=>{
        if(disposed)return;
        fallback.hidden=false;message.textContent="Não foi possível reproduzir o MP3. Selecione a narração para continuar.";
        stop();
      });
    }
    button.addEventListener("click",playPause);
    seek.addEventListener("input",()=>{draw(Number(seek.value)||0);if(ready)audio.currentTime=time;stamp=0;});
    audio.addEventListener("ended",()=>{stop();draw(DURATION);});
    audio.addEventListener("error",()=>{if(!disposed){fallback.hidden=false;message.textContent="Falha ao carregar a narração. Você pode escolher o MP3.";}});
    input.addEventListener("change",()=>{
      const f=input.files?.[0];if(!f)return;
      if(!f.type.startsWith("audio/")&&!/\.(mp3|m4a|wav|ogg)$/i.test(f.name)){message.textContent="Selecione um arquivo de áudio válido.";return;}
      if(objectUrl)URL.revokeObjectURL(objectUrl);
      objectUrl=URL.createObjectURL(f);assign(objectUrl);
    });
    async function load(){
      try{
        const response=await fetch(FILE,{method:"HEAD",cache:"no-store"});
        if(response.ok&&!disposed){assign(FILE);return;}
      }catch{}
      if(!disposed){fallback.hidden=false;message.textContent="O áudio ainda não chegou ao site. Você pode carregar o MP3 ou assistir à prévia visual.";setButton();}
    }
    function visibility(){if(document.hidden&&silent)stop();}
    document.addEventListener("visibilitychange",visibility);
    unmount=()=>{
      disposed=true;stop();document.removeEventListener("visibilitychange",visibility);
      if(objectUrl)URL.revokeObjectURL(objectUrl);
      audio.removeAttribute("src");audio.load();unmount=()=>{};
    };
    draw(0);setButton();load();
  }
  window.LACAN_MOTION_41={render,mount,unmount:()=>unmount()};
})();
