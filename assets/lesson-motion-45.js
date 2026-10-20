/* Holacan — Aula 4.5 · O pequeno outro.
 * Novo motion contínuo, sincronizado exclusivamente por audio.currentTime.
 * Baseado na narração aprovada (134,426s). Mantém o player original.
 * Não utiliza GSAP, iframes, segundos automáticos nem legendas.
 */
(()=>{
"use strict";
const LESSON="4.5", AUDIO="assets/pequeno-outro-45-novo.mp3";
const EXPECTED=134.426122, STORAGE="4.5-narracao-134s-v2";
const times=[0,16.330,27.554,34.661,48.473,60.413,78.256,100.743,114.900,123.893,134.426];
const states=[
/* continuous state: meX, otherX, thirdOpacity, distance, mirror, echo, mesh, a, award, split, A, halo, tension */
[690,920,.40,1,0,0,0,0,0,0,0,.20,0],
[688,893,.26,.97,0,0,0,0,0,0,0,.33,.04],
[715,875,.05,.96,0,0,0,0,0,0,0,.21,.8],
[674,933,0,1.02,.76,.13,0,0,0,0,0,.20,.24],
[667,921,0,1,1,.27,0,0,0,0,0,.21,.09],
[718,820,0,1,.88,.78,.04,0,0,0,0,.20,.09],
[682,924,0,1,.20,.28,.12,.96,0,0,0,.19,.20],
[681,965,0,1,0,.05,.20,.65,.95,0,0,.29,.57],
[690,940,0,1,0,0,.95,.58,.06,0,0,.19,.08],
[707,944,0,1,0,0,.65,.80,0,1,.95,.12,0],
[723,915,0,.95,.22,.18,.04,.20,0,.12,.15,.27,0]
];
const words=[
{from:40.9,to:48.3,text:"imagem de unidade"},
{from:62.3,to:78.0,text:"pequeno outro"},
{from:103.7,to:114.5,text:"Imaginário"},
{from:116.2,to:123.7,text:"pequeno outro ≠ grande Outro"},
{from:126.1,to:130.7,text:"Quem você vê no outro?"},
{from:130.7,to:134.426,text:"E o que procura em si?"}
];
const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=t=>{const s=Math.floor(Math.max(0,t));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");};
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const lerp=(a,b,x)=>a+(b-a)*x;
let dispose=()=>{};
const art=[
'<svg class="lm45-canvas" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Duas figuras atravessam fascínio, espelho, identificação, rivalidade e distinção simbólica em transformações contínuas">',
'<defs>',
'<radialGradient id="lm45-bg" cx="65%" cy="50%" r="80%"><stop offset="0" stop-color="#ede3ef"/><stop offset="1" stop-color="#f5ece0"/></radialGradient>',
'<radialGradient id="lm45-halo-g"><stop offset="0" stop-color="#ae8dc4" stop-opacity=".32"/><stop offset="1" stop-color="#ae8dc4" stop-opacity="0"/></radialGradient>',
'<linearGradient id="lm45-glass" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d7c6e0" stop-opacity=".8"/><stop offset=".48" stop-color="#f9f3ec" stop-opacity=".48"/><stop offset="1" stop-color="#b6a0c5" stop-opacity=".8"/></linearGradient>',
'<g id="lm45-figure-form"><circle cx="0" cy="-92" r="41"/><path d="M-86 102v-24c0-44 24-67 53-88 11 9 22 13 33 13s22-4 33-13c29 21 53 44 53 88v24Z"/></g>',
'</defs>',
'<rect width="1200" height="675" fill="url(#lm45-bg)"/>',
'<circle id="lm45-halo" cx="872" cy="321" r="288" fill="url(#lm45-halo-g)"/>',
'<g class="lm45-rings" id="lm45-rings"><circle cx="842" cy="307" r="217"/><circle cx="842" cy="307" r="245" stroke-dasharray="3 12"/></g>',
'<g id="lm45-mesh" class="lm45-mesh"><path d="M693 204 862 149 1042 226 992 435 773 481 693 204 992 435 862 149 773 481 1042 226"/><circle cx="693" cy="204" r="8"/><circle cx="862" cy="149" r="8"/><circle cx="1042" cy="226" r="8"/><circle cx="992" cy="435" r="8"/><circle cx="773" cy="481" r="8"/></g>',
'<path id="lm45-arc" class="lm45-arc" d="M690 295Q804 198 920 295"/>',
'<g id="lm45-glass-panel"><rect x="797" y="96" width="195" height="437" rx="98" fill="url(#lm45-glass)" stroke="#a28ab4" stroke-width="2"/><rect x="811" y="111" width="167" height="405" rx="84" fill="none" stroke="#ad9abc" stroke-dasharray="4 10"/></g>',
'<g id="lm45-ghost" class="lm45-outline" transform="translate(902 372) scale(1.15)"><use href="#lm45-figure-form"/></g>',
'<g id="lm45-third" class="lm45-soft" transform="translate(1080 381) scale(.68)"><use href="#lm45-figure-form"/></g>',
'<g id="lm45-me" class="lm45-soft" transform="translate(690 375) scale(1.14)"><use href="#lm45-figure-form"/></g>',
'<g id="lm45-other" class="lm45-strong" transform="translate(920 375) scale(1.14)"><use href="#lm45-figure-form"/></g>',
'<g id="lm45-award"><circle cx="963" cy="164" r="65" fill="none" stroke="#977bb0" stroke-dasharray="3 9"/><path d="m963 115 13 35 38 3-29 25 9 38-31-21-32 21 10-38-30-25 38-3Z" fill="#c5a7cd" stroke="#886c9e" stroke-width="2"/></g>',
'<g id="lm45-divide"><path d="M832 165V494" stroke="#826b96" stroke-width="1.5" stroke-dasharray="4 9"/><text x="1020" y="365" font-size="105" font-style="italic" fill="#755a8b" font-family="Georgia,serif">A</text></g>',
'<text id="lm45-small-a" x="971" y="186" fill="#72568a" font-size="90" font-style="italic" font-family="Georgia,serif">a</text>',
'</svg>',
'<div class="lm45-focus" id="lm45Focus" aria-hidden="true"></div>'
].join("");
function render(lesson){
 if(lesson?.id!==LESSON)return "";
 return '<section class="lm45" id="lacanMotion45" aria-label="Narração ilustrada da aula 4.5">'+
 '<div class="lm45-heading"><span>Narração ilustrada</span><span>2 min 14 s</span></div>'+
 '<div class="lm45-stage" id="lm45Stage" role="group" aria-label="Animação conceitual sincronizada à voz">'+
 '<div class="lm45-top"><span>FORMAÇÃO LACANIANA</span><span>MÓDULO 04 · AULA 4.5</span></div>'+
 '<div class="lm45-line"></div>'+art+
 '<div class="lm45-bottom"><span>IMAGEM · IDENTIFICAÇÃO · ALTERIDADE</span><span>LACAN</span></div></div>'+
 '<div class="lm45-controls"><button type="button" class="lm45-play" id="lm45Play" aria-label="Reproduzir narração">▶</button>'+
 '<input type="range" class="lm45-seek" id="lm45Seek" min="0" max="'+EXPECTED+'" step=".01" value="0" aria-label="Posição da narração">'+
 '<span class="lm45-clock" id="lm45Clock">00:00 / 02:14</span></div>'+
 '<input id="lm45File" class="lm45-hidden-input" type="file" accept="audio/mpeg,.mp3,audio/*" aria-label="Selecionar a narração desta aula" tabindex="-1">'+
 '<span id="lm45Status" class="sr-only" role="status" aria-live="polite"></span>'+
 '<audio id="lm45Audio" preload="metadata"></audio></section>';
}
function mount(article,lesson){
 dispose();
 if(lesson?.id!==LESSON)return;
 const root=article.querySelector("#lacanMotion45");if(!root)return;
 const g=id=>root.querySelector("#"+id);
 const audio=g("lm45Audio"),play=g("lm45Play"),seek=g("lm45Seek"),clock=g("lm45Clock"),file=g("lm45File"),status=g("lm45Status"),focus=g("lm45Focus");
 const canvas=root.querySelector(".lm45-canvas");
 const stage=g("lm45Stage");
 const adaptCanvas=()=>{
  if(!canvas||!stage)return;
  const ratio=stage.clientWidth/Math.max(1,stage.clientHeight);
  canvas.setAttribute("viewBox",ratio<1.2?"455 0 585 675":"0 0 1200 675");
 };
 adaptCanvas();
 window.addEventListener("resize",adaptCanvas);
 const objects={
 me:g("lm45-me"),other:g("lm45-other"),third:g("lm45-third"),glass:g("lm45-glass-panel"),
 ghost:g("lm45-ghost"),halo:g("lm45-halo"),rings:g("lm45-rings"),arc:g("lm45-arc"),
 mesh:g("lm45-mesh"),award:g("lm45-award"),divide:g("lm45-divide"),letter:g("lm45-small-a")
 };
 let disposed=false,raf=0,ready=false,blobURL=null,promptPlay=false, duration=EXPECTED;
 const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches??false;
 const on=(target,event,fn)=>target.addEventListener(event,fn);
 function frame(t){
  t=clamp(t,0,duration);
  let index=times.length-2;
  for(let i=0;i<times.length-1;i++){if(t<times[i+1]){index=i;break;}}
  const progress=smooth((t-times[index])/(times[index+1]-times[index]));
  const a=states[index],b=states[index+1];
  const v=j=>lerp(a[j],b[j],progress);
  const meX=v(0),otherX=v(1),dist=v(3);
  objects.me.style.opacity=String(reduced?1:smooth(t/2.6));
  objects.other.style.opacity=String(reduced?1:smooth((t-1.0)/3.0));
  objects.me.setAttribute("transform","translate("+meX.toFixed(2)+" 375) scale("+(1.12*dist).toFixed(4)+")");
  objects.other.setAttribute("transform","translate("+otherX.toFixed(2)+" 375) scale("+(1.16*dist).toFixed(4)+")");
  objects.third.style.opacity=String(v(2));
  objects.glass.style.opacity=String(v(4));
  objects.ghost.style.opacity=String(v(5));
  objects.mesh.style.opacity=String(v(6));
  objects.letter.style.opacity=String(v(7));
  objects.award.style.opacity=String(v(8));
  objects.divide.style.opacity=String(v(9)*v(10));
  objects.halo.style.opacity=String(v(11)*3);
  objects.halo.setAttribute("cx",String(otherX-38+Math.sin(t*.21)*5));
  objects.halo.setAttribute("cy",String(321+Math.sin(t*.16)*7));
  objects.rings.setAttribute("transform","translate("+(Math.sin(t*.13)*6).toFixed(2)+" "+(Math.sin(t*.17)*5).toFixed(2)+")");
  objects.rings.style.opacity=String(.17+v(11)*1.2);
  objects.arc.style.opacity=String(.22+v(12)*.66);
  const mid=(meX+otherX)/2;
  objects.arc.setAttribute("d","M"+(meX+34).toFixed(1)+" 310 Q"+mid.toFixed(1)+" "+(204+v(12)*119).toFixed(1)+" "+(otherX-34).toFixed(1)+" 310");
  objects.ghost.setAttribute("transform","translate("+(otherX-v(5)*29).toFixed(1)+" 377) scale("+(1.16*dist).toFixed(3)+")");
  objects.award.setAttribute("transform","translate("+(otherX-920).toFixed(1)+" 0)");
  objects.mesh.setAttribute("transform","translate("+((meX+otherX)/2-805).toFixed(1)+" 0)");
  objects.letter.setAttribute("x",String(otherX+40));
  let message="",o=0;
  for(const w of words){
   if(t>=w.from && t<w.to){
     message=w.text;
     o=smooth((t-w.from)/1.25)*smooth((w.to-t)/.9);
     break;
   }
  }
  if(focus.dataset.value!==message){focus.textContent=message;focus.dataset.value=message;}
  focus.style.opacity=String(reduced?(o>.05?1:0):o);
  focus.classList.toggle("lm45-final",t>=126.1);
  seek.value=String(t);
  clock.textContent=fmt(t)+" / "+fmt(duration);
  play.textContent=audio.paused?"▶":"Ⅱ";
  play.setAttribute("aria-label",audio.paused?"Reproduzir narração":"Pausar narração");
 }
 function animate(){if(disposed)return;frame(audio.currentTime||0);if(!audio.paused&&!audio.ended)raf=requestAnimationFrame(animate);}
 function stop(){cancelAnimationFrame(raf);frame(audio.currentTime||0);}
 function verifyDuration(){
  const d=audio.duration;
  if(!Number.isFinite(d)||d<=0)return false;
  if(Math.abs(d-EXPECTED)>3){audio.pause();ready=false;status.textContent="A gravação selecionada não é a narração nova de 2 minutos e 14 segundos. Selecione o MP3 correto.";return false;}
  duration=d;ready=true;status.textContent="Narração carregada.";return true;
 }
 function unloadBlob(){if(blobURL){URL.revokeObjectURL(blobURL);blobURL=null;}}
 function setBlob(blob,autoPlay){
  if(disposed)return;
  audio.pause();unloadBlob();ready=false;
  blobURL=URL.createObjectURL(blob);audio.src=blobURL;
  audio.load();promptPlay=autoPlay;
  if(autoPlay){audio.play().catch(()=>{status.textContent="Narração carregada. Aperte reproduzir para ouvir.";});}
 }
 function chooseFile(){status.textContent="Selecione o MP3 de 2 minutos e 14 segundos que você enviou.";file.click();}
 function storeAudio(blob){
  try{
   const req=indexedDB.open("lacan-narracoes",1);
   req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("mp3"))req.result.createObjectStore("mp3");};
   req.onsuccess=()=>{const db=req.result;const tx=db.transaction("mp3","readwrite");tx.objectStore("mp3").put(blob,STORAGE);tx.oncomplete=()=>db.close();};
  }catch{}
 }
 function restoreAudio(){
  try{
   const req=indexedDB.open("lacan-narracoes",1);
   req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("mp3"))req.result.createObjectStore("mp3");};
   req.onsuccess=()=>{const db=req.result,tx=db.transaction("mp3","readonly"),get=tx.objectStore("mp3").get(STORAGE);
    get.onsuccess=()=>{if(!disposed&&!ready&&get.result instanceof Blob)setBlob(get.result,false);};
    tx.oncomplete=()=>db.close();
   };
  }catch{}
 }
 on(audio,"loadedmetadata",()=>{if(verifyDuration() && promptPlay && audio.paused){promptPlay=false;audio.play().catch(()=>{});}frame(audio.currentTime||0);});
 on(audio,"error",()=>{if(disposed)return;ready=false;status.textContent="O novo MP3 ainda não está publicado no site. Use o botão de reproduzir para selecioná-lo neste dispositivo.";});
 on(audio,"play",()=>{cancelAnimationFrame(raf);animate();});
 on(audio,"pause",stop);on(audio,"seeked",stop);on(audio,"ended",stop);
 on(play,"click",async()=>{
   if(!ready){chooseFile();return;}
   if(audio.paused){if(audio.currentTime>=duration-.08)audio.currentTime=0;try{await audio.play();}catch{status.textContent="Não foi possível iniciar a reprodução.";} }
   else audio.pause();
   frame(audio.currentTime||0);
 });
 on(file,"change",()=>{
  const f=file.files?.[0];if(!f)return;
  if(!f.type.startsWith("audio/")&&!/\.mp3$/i.test(f.name)){status.textContent="Selecione um MP3 válido.";return;}
  setBlob(f,true);storeAudio(f);
 });
 on(seek,"input",()=>{const t=Number(seek.value);if(ready)audio.currentTime=t;frame(t);});
 audio.src=AUDIO;audio.load();frame(0);restoreAudio();
 dispose=()=>{disposed=true;cancelAnimationFrame(raf);window.removeEventListener("resize",adaptCanvas);audio.pause();audio.removeAttribute("src");audio.load();unloadBlob();};
}
window.LACAN_MOTION_45={render,mount,unmount:()=>dispose()};
})();