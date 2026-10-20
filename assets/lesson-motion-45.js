/* Formação Lacaniana • Aula 4.5 — O pequeno outro.
   Relógio único: audio.currentTime. Gráficos conceituais, sem legendas. */
(()=>{
"use strict";
const LESSON="4.5",FILE="assets/pequeno-outro-45.mp3",DURATION=82.678;
const scenes=[
{at:0,variant:"opening",kicker:"Formação Lacaniana · Imaginário",title:"Quem é o <em>outro</em><br>para mim?",desc:"Admiração, identificação, rivalidade."},
{at:7.6,variant:"encounter",kicker:"01 / O encontro",title:"Admiração.<br>Identificação.<br><em>Rivalidade.</em>",desc:"Às vezes, alguém representa aquilo que gostaríamos de ser."},
{at:13,variant:"other",kicker:"02 / O conceito",title:"O pequeno<br><em>outro.</em>",desc:"O semelhante com quem nos identificamos e nos comparamos."},
{at:25.1,variant:"mirror",kicker:"03 / Estádio do espelho",title:"O eu se reconhece<br><em>fora de si.</em>",desc:"Uma imagem exterior participa de sua constituição."},
{at:35.5,variant:"paradox",kicker:"04 / O paradoxo",title:"Reconhecer-se<br>é também<br><em>alienar-se.</em>",desc:"A imagem de unidade do eu vem de fora."},
{at:43.6,variant:"imaginary",kicker:"05 / O registro imaginário",title:"Imagens.<br>Semelhanças.<br><em>Identificações.</em>",desc:"O pequeno outro participa do campo do Imaginário."},
{at:47.8,variant:"friend",kicker:"06 / Uma situação cotidiana",title:"Por que o sucesso<br>de um amigo<br><em>me incomoda?</em>",desc:"A conquista do outro pode abalar nossa imagem de nós mesmos."},
{at:63.9,variant:"compare",kicker:"07 / Uma diferença fundamental",title:"pequeno outro<br><em>≠</em> grande Outro",desc:"Semelhante e Imaginário  /  Linguagem e Simbólico."},
{at:73.6,variant:"question",kicker:"08 / Para continuar pensando",title:"Quanto do meu <em>eu</em><br>se constrói<br>através do outro?",desc:"O eu se relaciona com imagens nas quais tenta reconhecer-se."},
{at:80.8,variant:"end",kicker:"Formação Lacaniana",title:"O pequeno <em>outro.</em>",desc:"Módulo 04 · Aula 4.5"}];
const safe=(s)=>s;
const fmt=(s)=>{s=Math.floor(Math.max(0,s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");};
const el=(id)=>document.getElementById(id);
let cleanup=()=>{};
function render(lesson){
 if(lesson?.id!==LESSON)return "";
 const sceneHTML=scenes.map((s,i)=>`<section class="lm45-scene" data-variant="${s.variant}" aria-hidden="true" style="${i===0?'opacity:1;visibility:visible':''}"><div class="lm45-art"><div class="lm45-orb"></div></div><div class="lm45-copy"><div class="lm45-kicker">${safe(s.kicker)}</div><h3 class="lm45-title">${safe(s.title)}</h3><p class="lm45-desc">${safe(s.desc)}</p></div></section>`).join("");
 return `<section class="lm45" id="lacanMotion45" aria-label="Narração animada da aula 4.5"><div class="lm45-heading"><span>Narração ilustrada</span><span>1 min 23 s</span></div><div class="lm45-stage" id="lm45Stage" role="img" aria-label="Animação sobre a identificação imaginária e o pequeno outro"><div class="lm45-top"><span>FORMAÇÃO LACANIANA</span><span>MÓDULO 04 · AULA 4.5</span></div><div class="lm45-line"></div>${sceneHTML}<div class="lm45-bottom"><span>IMAGEM · IDENTIFICAÇÃO · ALTERIDADE</span><span>LACAN</span></div></div><div class="lm45-controls"><button type="button" class="lm45-play" id="lm45Play" aria-label="Reproduzir narração">▶</button><input type="range" class="lm45-seek" id="lm45Seek" min="0" max="1000" value="0" aria-label="Posição da narração"><span class="lm45-clock" id="lm45Clock">00:00 / 01:23</span></div><div class="lm45-audiohelp" id="lm45Help" hidden>Áudio ainda não disponível nesta instalação. Selecione a narração MP3 para testar nesta sessão:<input type="file" id="lm45File" accept="audio/mpeg,audio/mp3,audio/*"></div><audio id="lm45Audio" preload="metadata"></audio></section><aside class="lesson-interactive" aria-label="Mapa conceitual complementar"><span class="section-label">Experiência interativa · Aula 4.5</span><h2>O pequeno outro em seis movimentos</h2><p>Um mapa visual para explorar semelhante, identificação, imagem do eu e rivalidade. Inclui uma distinção introdutória entre pequeno outro e grande Outro.</p><a href="diagrama-pequeno-outro.html" class="action-button primary">Abrir mapa conceitual ↗</a></aside>`;
}
function mount(article,lesson){
 cleanup();
 if(lesson?.id!==LESSON)return;
 const root=article.querySelector("#lacanMotion45");if(!root)return;
 const audio=el("lm45Audio"),play=el("lm45Play"),seek=el("lm45Seek"),clock=el("lm45Clock"),file=el("lm45File"),help=el("lm45Help");
 const nodes=[...root.querySelectorAll(".lm45-scene")];
 let disposed=false,raf=0,blobURL=null,ready=false;
 const end=(i)=>i+1<scenes.length?scenes[i+1].at:DURATION;
 let timeline=null;
 if(window.gsap){
  timeline=gsap.timeline({paused:true,smoothChildTiming:false});
  gsap.set(nodes,{autoAlpha:0});
  nodes.forEach((n,i)=>{
   const start=scenes[i].at,stop=end(i),len=stop-start;
   const content=n.querySelectorAll(".lm45-kicker,.lm45-title,.lm45-desc");
   const art=n.querySelector(".lm45-art");
   timeline.set(n,{autoAlpha:1},start);
   timeline.fromTo(content,{opacity:0,y:20,filter:"blur(6px)"},{opacity:1,y:0,filter:"blur(0px)",duration:Math.min(.85,len*.4),stagger:.08,ease:"power2.out"},start+.08);
   if(art) timeline.fromTo(art,{opacity:.05,scale:.85},{opacity:.84,scale:1.03,duration:Math.min(2,len*.65),ease:"power2.out"},start+.12);
   if(i<scenes.length-1) timeline.to(n,{autoAlpha:0,duration:Math.min(.65,len*.22)},Math.max(start+.5,stop-.65));
  });
  timeline.set({}, {}, DURATION);
 }
 function draw(t){
  t=Math.min(DURATION,Math.max(0,t));
  if(timeline){timeline.pause().time(Math.min(t,DURATION-.005),false);}
  else nodes.forEach((n,i)=>{const visible=t>=scenes[i].at&&t<end(i);n.style.visibility=visible?"visible":"hidden";n.style.opacity=visible?"1":"0";});
  seek.value=String(Math.round(1000*t/DURATION));
  clock.textContent=fmt(t)+" / "+fmt(DURATION);
  play.textContent=audio.paused?"▶":"Ⅱ";
  play.setAttribute("aria-label",audio.paused?"Reproduzir narração":"Pausar narração");
 }
 function tick(){if(disposed)return;draw(audio.currentTime||0);if(!audio.paused)raf=requestAnimationFrame(tick);}
 function stop(){cancelAnimationFrame(raf);draw(audio.currentTime||0);}
 const onPlay=()=>{cancelAnimationFrame(raf);tick();};
 const onPause=()=>stop();
 audio.addEventListener("play",onPlay);audio.addEventListener("pause",onPause);audio.addEventListener("seeked",onPause);
 audio.addEventListener("ended",()=>{stop();draw(DURATION);});
 audio.addEventListener("loadedmetadata",()=>{ready=true;help.hidden=true;draw(0);});
 audio.addEventListener("error",()=>{if(!disposed){ready=false;help.hidden=false;}});
 play.addEventListener("click",async()=>{
  if(!ready){help.hidden=false;return;}
  if(audio.paused){if(audio.currentTime>=DURATION-.05)audio.currentTime=0;try{await audio.play();}catch{help.hidden=false;}}
  else audio.pause();
  draw(audio.currentTime||0);
 });
 seek.addEventListener("input",()=>{const t=Number(seek.value)*DURATION/1000;if(ready)audio.currentTime=t;draw(t);});
 function openSavedAudio(callback){
  try{
   const request=indexedDB.open("lacan-narracoes",1);
   request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains("mp3"))request.result.createObjectStore("mp3");};
   request.onsuccess=()=>{const db=request.result;callback(db);};
  }catch(e){ /* Armazenamento indisponível: continua com arquivo local. */ }
 }
 function loadBlob(f){
  if(disposed)return;
  audio.pause();
  if(blobURL)URL.revokeObjectURL(blobURL);
  blobURL=URL.createObjectURL(f);
  audio.src=blobURL;audio.load();help.hidden=true;
 }
 function restoreSavedAudio(){
  openSavedAudio(db=>{
   const tx=db.transaction("mp3","readonly");
   const q=tx.objectStore("mp3").get(LESSON);
   q.onsuccess=()=>{if(!disposed&&!ready&&q.result instanceof Blob)loadBlob(q.result);};
   tx.oncomplete=()=>db.close();
  });
 }
 function rememberAudio(f){
  openSavedAudio(db=>{
   const tx=db.transaction("mp3","readwrite");
   tx.objectStore("mp3").put(f,LESSON);
   tx.oncomplete=()=>db.close();
  });
 }
 file.addEventListener("change",()=>{const f=file.files?.[0];if(!f||!(f.type.startsWith("audio/")||/\\.mp3$/i.test(f.name)))return;loadBlob(f);rememberAudio(f);});
 audio.src=FILE;audio.load();draw(0);restoreSavedAudio();
 cleanup=()=>{disposed=true;cancelAnimationFrame(raf);audio.pause();audio.removeAttribute("src");audio.load();if(blobURL)URL.revokeObjectURL(blobURL);timeline?.kill();};
}
window.LACAN_MOTION_45={render,mount,unmount:()=>cleanup()};
})();