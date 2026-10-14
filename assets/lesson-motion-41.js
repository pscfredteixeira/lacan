/* Formação Lacaniana — aula 4.1. O problema da imagem corporal.
 * Cenas vinculadas à reprodução real da narração (Daniel, 4m02s), não a um relógio independente.
 */
(() => {
  "use strict";
  const LESSON="4.1", FILE="assets/imagem-corporal.mp3", DURATION=242.103;
  // Entradas aferidas com transcrição palavra a palavra do áudio Daniel (2026-10-14).
  // Cena atual calculada sempre por audio.currentTime, inclusive ao avançar ou voltar.
  const scenes=[
    [0,"photo","Você já se olhou em uma fotografia?"],
    [9.7,"question","É uma sensação curiosa."],
    [12.92,"body","Estamos olhando para o próprio corpo."],
    [16.96,"contrast","Ver um corpo é diferente de viver nele."],
    [23.4,"contrast","Essa diferença nos ajuda a compreender uma ideia importante."],
    [30.34,"lacan","Jacques Lacan."],
    [32.34,"walk","Imagine uma situação simples."],
    [34.48,"walk","Você está caminhando pela rua."],
    [38.26,"walk","Sente o chão sob os pés."],
    [40.04,"walk","Movimenta os braços."],
    [41.46,"walk","Ajusta o equilíbrio."],
    [44,"body","Seu corpo está em movimento."],
    [50.74,"photo","Alguém tira uma fotografia."],
    [56.28,"photo","A fotografia mostra o corpo inteiro."],
    [59.56,"body","Rosto, braços, pernas e postura."],
    [64.58,"contrast","Mas ela não mostra o que você sentia."],
    [68.76,"body","Não revela o esforço dos músculos."],
    [71.16,"walk","As sensações do movimento e do equilíbrio."],
    [75.92,"contrast","Duas experiências diferentes."],
    [79.62,"body","De um lado, o corpo vivido."],
    [82.26,"photo","Do outro, a imagem do corpo."],
    [85.24,"lacan","Essa diferença interessa a Lacan."],
    [89.62,"child","Uma criança aprendendo a andar."],
    [94.52,"photo","Uma fotografia da criança."],
    [97.34,"shape","Uma figura inteira."],
    [99.98,"shape","Cabeça, braços, pernas e tronco."],
    [107.2,"child","Mas caminhar ainda pode ser difícil."],
    [111.96,"child","Ela perde o equilíbrio e precisa de apoio."],
    [119.56,"question","Percebe a diferença?"],
    [121.58,"contrast","A imagem apresenta um corpo inteiro."],
    [125.04,"child","Os movimentos ainda estão em desenvolvimento."],
    [129.28,"shape","Lacan se interessa pela unidade da imagem."],
    [134.58,"gestalt","Uma ideia utilizada por Lacan."],
    [138.32,"gestalt","Gestalt."],
    [140.14,"gestalt","Uma palavra alemã."],
    [145.16,"gestalt","Uma forma organizada, percebida como um todo."],
    [149.36,"question","Por que isso importa para a psicanálise?"],
    [153.06,"lacan","Porque Lacan propõe..."],
    [155.3,"shape","A imagem de unidade participa da ideia de quem somos."],
    [162.48,"body","Em outras palavras..."],
    [164.32,"body","Nossa percepção envolve sensações do corpo."],
    [171.24,"photo","Também imagens que encontramos fora de nós."],
    [176.74,"question","Uma questão fundamental."],
    [180.18,"mirror","Uma criança diante de um espelho."],
    [183.26,"child","A coordenação motora ainda se desenvolve."],
    [187.2,"mirror","Uma imagem organizada de seu próprio corpo."],
    [193.26,"lacan","Para Lacan..."],
    [194.76,"shape","A imagem oferece uma unidade antecipada."],
    [200.2,"question","Mas atenção."],
    [201.74,"theory","Estamos falando de uma proposta teórica."],
    [204.22,"child","Não sabemos exatamente o que a criança sente."],
    [212.86,"lacan","A imagem corporal e a formação do eu."],
    [219.96,"question","Uma pergunta fascinante."],
    [224.2,"mirror","A imagem participa da formação do eu..."],
    [230.16,"contrast","Até que ponto nosso eu depende de algo fora de nós?"],
    [236.38,"mirror","Essa questão nos leva à próxima aula."],
    [240.6,"mirror","O estádio do espelho."]
  ];
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const format=s=>{const n=Math.floor(Math.max(0,s));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  // Ilustrações editoriais próprias, preenchidas e anatômicas — sem bonecos de palito.
  // Formas com contorno violeta e volumes em bege/lavanda, iguais à identidade da aula.
  const people={
    walk:'<ellipse cx="90" cy="157" rx="45" ry="5" fill="#bca9c6" opacity=".23"/>'+
      '<path d="M80 48C76 45 73 40 74 32c1-12 8-18 19-17 9 1 15 9 13 20-2 10-9 16-17 15Z" fill="#e0c3b3" stroke="#755f82" stroke-width="2"/>'+
      '<path d="M75 32c0-15 7-24 20-24 12 0 19 12 14 23-6-2-11-9-13-13-3 8-11 12-21 14Z" fill="#564765"/>'+
      '<path d="M83 49c-12 1-18 8-19 20l-3 32 39 2 4-33c1-13-6-20-18-21Z" fill="#8c76a6" stroke="#675275" stroke-width="2"/>'+
      '<path d="M71 62 56 85 41 92M100 64l16 18 17 2" stroke="#e0c3b3" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M42 92 35 99M133 84l9 10" stroke="#d5b5a2" stroke-width="7" stroke-linecap="round"/>'+
      '<path d="M61 98h40l-4 13-17 14-20 21" stroke="#64546f" stroke-width="17" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M84 111 112 132 127 150" stroke="#64546f" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M52 147 66 149 61 157 41 157q-5-3 11-10ZM121 147l13-4 13 14h-25Z" fill="#514257"/>'+
      '<path d="m84 66-3 23m-10 5h22" stroke="#eee2eb" stroke-width="2" opacity=".8"/>',
    body:'<ellipse cx="90" cy="158" rx="45" ry="4" fill="#bca9c6" opacity=".26"/>'+
      '<path d="M74 34c0-13 7-22 17-22s18 10 17 23c-1 12-8 20-17 20-10 0-17-9-17-21Z" fill="#dec1b2" stroke="#806887" stroke-width="2"/>'+
      '<path d="M73 32c-2-16 5-25 18-25 12 0 19 8 18 25l-9-11-16-1-11 12Z" fill="#5c4c68"/>'+
      '<path d="M80 54Q63 55 61 70L59 105Q90 116 121 105l-3-34q-2-16-19-17Z" fill="#967fac" stroke="#675479" stroke-width="2"/>'+
      '<path d="M65 68 52 97l-6 23M114 69l13 28 7 23" stroke="#ddbead" stroke-width="12" fill="none" stroke-linecap="round"/>'+
      '<path d="M78 112 75 153M101 112l6 41" stroke="#665572" stroke-width="18" fill="none" stroke-linecap="round"/>'+
      '<path d="M62 155h26l-2 6H59q-4-3 3-6Zm39 0h25l6 6h-28Z" fill="#514258"/>'+
      '<path d="M90 62v36m-22 8h44" stroke="#e7d9e9" stroke-width="2" opacity=".75"/>',
    child:'<ellipse cx="90" cy="156" rx="52" ry="5" fill="#bca9c6" opacity=".24"/>'+
      '<path d="M123 22q14-12 27-2M140 20l-4 44" stroke="#beadcb" stroke-width="4" fill="none" stroke-linecap="round"/>'+
      '<path d="M66 46Q62 30 74 25c12-4 23 5 22 18-1 14-11 23-21 19-6-3-9-8-9-16Z" fill="#e1c6b5" stroke="#7c6889" stroke-width="2"/>'+
      '<path d="M65 40q-2-18 16-18c12 0 17 9 15 19l-7-10q-11 13-24 9Z" fill="#584966"/>'+
      '<path d="M66 65Q48 69 50 89l1 27q22 9 46 0l1-27q-1-20-21-24Z" fill="#a28ab1" stroke="#6b5678" stroke-width="2"/>'+
      '<path d="M55 78 38 97m56-20 19-13 22-1" stroke="#dec3b4" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="m62 117-8 24-12 13M85 117l15 22 16 15" stroke="#675674" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<path d="M38 149q15-2 17 6l-26 2q-2-6 9-8ZM111 148q18-3 22 8h-26Z" fill="#554665"/>'+
      '<circle cx="140" cy="59" r="5" fill="#d8b9a7"/>',
    shape:'<circle cx="90" cy="83" r="73" fill="#f5eee5" stroke="#c9b9d0" stroke-width="2" stroke-dasharray="3 6"/>'+
      '<path d="M78 40c-1-12 5-19 14-19s15 9 14 20c-1 9-6 14-14 14s-14-6-14-15Z" fill="#ddc0b0" stroke="#755f82" stroke-width="2"/>'+
      '<path d="M78 34q1-16 14-16 15 0 15 17l-8-8-21 7Z" fill="#584969"/>'+
      '<path d="M81 54Q65 56 65 70l-2 33h55l-2-33q-1-14-20-16Z" fill="#a18aad" stroke="#725a83" stroke-width="2"/>'+
      '<path d="M68 70 48 104m66-34 19 34" stroke="#ddc0b0" stroke-width="10" stroke-linecap="round"/>'+
      '<path d="m77 105-5 37m29-37 6 37" stroke="#6a597b" stroke-width="17" stroke-linecap="round"/>'+
      '<path d="M62 143h22v7H59ZM100 143h20l7 7h-25Z" fill="#554665"/>'
  };
  const paths={
    photo:'<rect x="12" y="18" width="76" height="64" rx="2"/><circle cx="63" cy="38" r="9"/><path d="M17 73 39 50l18 18 13-13 16 17"/>',
    mirror:'<rect x="25" y="8" width="50" height="84" rx="21"/><rect x="31" y="14" width="38" height="72" rx="17"/><circle cx="50" cy="36" r="9"/><path d="M36 71V62q0-14 14-14t14 14v9M22 93h56"/>',
    gestalt:'<circle cx="50" cy="50" r="39"/><path d="M27 50a23 23 0 0 1 46 0 23 23 0 0 1-46 0M50 26v48M26 50h48"/>',
    contrast:'<rect x="13" y="17" width="29" height="60" rx="3"/><circle cx="27" cy="33" r="7"/><path d="M19 59q0-17 8-17t8 17M51 48h13m-6-6 6 6-6 6"/><circle cx="81" cy="36" r="9"/><path d="M81 46q-12 0-12 15v17h24V61q0-15-12-15Z"/>',
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
          (people[kind]?'<svg class="lm41-human" viewBox="0 0 180 180" aria-hidden="true">'+people[kind]+'</svg>':
          '<svg class="lm41-symbol" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[kind]||paths.question)+'</svg>');
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
