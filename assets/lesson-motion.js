/* Motion editorial — aula 3.5. O áudio não é necessário para ver a prévia visual.
 * Para publicação definitiva, colocar assets/inconsciente-linguagem.mp3 no repositório.
 * Um arquivo escolhido pelo estudante pode ser salvo localmente via IndexedDB. */
(() => {
  "use strict";
  const TOTAL=182.204;
  const FILE="assets/inconsciente-linguagem.mp3";
  const DB="lacan-motion-narracoes";
  const KEY="inconsciente-linguagem-v1";
  const cues=[
    {at:0,type:"question",tag:"UMA PERGUNTA",title:"Por que eu disse isso?",sub:"A fala às vezes nos surpreende."},
    {at:10,type:"words",tag:"O QUE ESCAPA",title:"Palavras inesperadas",sub:"Trocas, piadas, lapsos e hesitações."},
    {at:19,type:"lacan",tag:"JACQUES LACAN",title:"Uma outra escuta da fala",sub:"O que dizemos nem sempre coincide com o que pretendíamos dizer."},
    {at:27,type:"quote",tag:"UMA FORMULAÇÃO DECISIVA",title:"O inconsciente é estruturado como uma linguagem.",sub:"Não como um idioma secreto."},
    {at:39,type:"space",tag:"ALÉM DA IMAGEM DO PORÃO",title:"Não é um depósito de segredos.",sub:"Lacan investiga relações e articulações."},
    {at:51,type:"chain",tag:"COMO FUNCIONA A LINGUAGEM",title:"O sentido nasce nas relações.",sub:"As palavras não trabalham isoladas."},
    {at:63,type:"chain",tag:"CADEIA SIGNIFICANTE",title:"Uma palavra altera a outra.",sub:"E o que fica de fora também pode importar."},
    {at:76,type:"words",tag:"SIGNIFICANTES",title:"Repetir · associar · deslocar",sub:"A posição de uma palavra produz efeitos."},
    {at:88,type:"origin",tag:"ANTES DE NASCERMOS",title:"Já existem palavras sobre nós.",sub:"Nomes, histórias, expectativas e desejos."},
    {at:103,type:"replace",tag:"UM ATO FALHO?",title:"Chefe → pai",sub:"Um engano não possui interpretação automática."},
    {at:115,type:"freud",tag:"FREUD E LACAN",title:"O sonho. O sintoma. O lapso.",sub:"Da descoberta freudiana às articulações da linguagem."},
    {at:128,type:"replace",tag:"METÁFORA",title:"Substituição",sub:"Um significante pode ocupar o lugar de outro."},
    {at:141,type:"chain",tag:"METONÍMIA",title:"Deslocamento",sub:"A significação desliza pela cadeia."},
    {at:154,type:"space",tag:"NÃO HÁ CHAVE UNIVERSAL",title:"Cada história tem suas associações.",sub:"Sem dicionário fixo dos sonhos e dos atos falhos."},
    {at:166,type:"quote",tag:"A EXPERIÊNCIA DE FALAR",title:"Nem tudo o que dizemos é controlado.",sub:"A escuta preserva a singularidade."},
    {at:176,type:"question",tag:"UMA ÚLTIMA PERGUNTA",title:"O que apareceu no que eu disse?",sub:"O inconsciente é estruturado como uma linguagem."}
  ];
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
     +'<div class="lm-content" id="lmContent"></div><div class="lm-bottom"><span>JACQUES LACAN · UMA INTRODUÇÃO</span><span class="lm-scene-count" id="lmSceneCount">01 / 16</span></div></div>'
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
      let i=0; for(let k=1;k<cues.length;k++){if(t>=cues[k].at)i=k;else break;}
      if(i===scene)return;
      scene=i;const cue=cues[i];
      stage.className="lm-stage lm-type-"+cue.type;
      const decor=cue.type==="chain"?'<div class="lm-chain" aria-hidden="true"><span>S₁</span><i></i><span>S₂</span><i></i><span>S₃</span></div>'
        :cue.type==="replace"?'<div class="lm-replace" aria-hidden="true"><span>significante</span><b>↔</b><span>significante</span></div>'
        :cue.type==="words"?'<div class="lm-fragments" aria-hidden="true"><span>palavra</span><span>sentido</span><span>fala</span></div>'
        :cue.type==="origin"?'<div class="lm-fragments" aria-hidden="true"><span>nome</span><span>história</span><span>outro</span></div>'
        :cue.type==="lacan"||cue.type==="freud"?'<div class="lm-portrait" aria-hidden="true"></div>':"";
      content.innerHTML='<div class="lm-scene" key="'+i+'"><p class="lm-tag">'+escapeText(cue.tag)+'</p><h3>'+escapeText(cue.title)+'</h3><p class="lm-caption">'+escapeText(cue.sub)+'</p>'+decor+'</div>';
      count.textContent=String(i+1).padStart(2,"0")+" / "+cues.length;
      stage.setAttribute("aria-label",cue.tag+". "+cue.title+". "+cue.sub);
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
          if(dead)return;audio.src=FILE;hasAudio=true;status.textContent="Narração disponível no curso. Toque em Reproduzir.";setButton();return;
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
