/* Curso Lacan · Aula 4.3.
 * Motion editorial acompanhado por narração real (130.32s).
 * Mudanças de cena medidas pelas palavras da gravação, sem timers independentes.
 */
(() => {
  "use strict";
  const ID="4.3", FILE="assets/eu-ideal-ideal-do-eu-43.mp3", DURATION=130.32;
  const cues=[
    [0,"musician","Imagine uma jovem violinista."],
    [2.46,"spotlight","Sob o calor dourado dos holofotes."],
    [4.9,"violin","O arco desliza com precisão."],
    [8.52,"notes","Cada nota ecoa diante da plateia."],
    [14.04,"score","Na penumbra, não há apenas uma partitura."],
    [18.52,"mirror","Uma versão irretocável de si mesma."],
    [21.48,"ideal","Forte. Soberana. Completa."],
    [24.94,"question","Uma miragem fascinante para a psicanálise."],
    [29.48,"ideal","Eu ideal."],
    [30.98,"mirror","A imagem em que desejamos nos reconhecer."],
    [34.98,"ideal","Uma promessa imaginária de completude."],
    [38.24,"question","Contudo..."],
    [40.54,"gaze","Vamos desacelerar o olhar."],
    [43.88,"question","Por que essa imagem é tão preciosa?"],
    [48.48,"mirror","A resposta não repousa no reflexo."],
    [50.84,"history","Mas naquilo que o antecede."],
    [52.32,"history","Muito antes da primeira nota..."],
    [56.76,"history","Expectativas silenciosas."],
    [59.4,"teacher","Elogios de mestres."],
    [61.2,"family","Ambições familiares."],
    [62.96,"words","Discursos herdados."],
    [64.52,"words","Disciplina. Mérito. Valor."],
    [68.58,"lacan","Jacques Lacan."],
    [70.08,"contrast","Uma distinção sutil."],
    [73.44,"ideal","Eu ideal."],
    [74.36,"musician","A imagem admirável no palco."],
    [77.62,"mirror","O imaginário."],
    [79.24,"symbolic","Ideal do eu."],
    [80.74,"gaze","O ponto invisível a partir do qual a cena é julgada."],
    [85.02,"symbolic","A ordem do simbólico."],
    [86.6,"gaze","O lugar do Outro."],
    [87.96,"words","A linguagem e as expectativas."],
    [91.52,"value","O que vemos parece digno de amor?"],
    [95.24,"ideal","O eu ideal responde..."],
    [97.58,"mirror","Que imagem de mim parece impecável?"],
    [100.5,"symbolic","O ideal do eu pergunta..."],
    [102.7,"gaze","A partir de que olhar essa imagem ganha valor?"],
    [105.94,"mirror","Quando nos olhamos no espelho..."],
    [109.04,"question","Quem dita o valor do que vemos?"],
    [112.28,"ideal","O eu ideal."],
    [113.32,"portrait","O retrato que sustentamos."],
    [117.18,"symbolic","O ideal do eu."],
    [118.78,"lens","A lente que decide o aplauso."],
    [121.76,"tension","Entre a figura e o olhar que julga."],
    [123.38,"portrait","A figura que projetamos."],
    [125.28,"gaze","O tribunal pelo qual nos julgamos."],
    [128.8,"final","Nossa própria identidade."]
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const mmss=t=>{const n=Math.max(0,Math.floor(t));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  // All artwork is native SVG with the same warm paper, violet and muted gold palette.
  const defs='<defs><linearGradient id="lm43Lavender" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bba2cc"/><stop offset="1" stop-color="#685578"/></linearGradient><linearGradient id="lm43Linen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff8ed"/><stop offset="1" stop-color="#e6d7e9"/></linearGradient><linearGradient id="lm43Gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7e8b5"/><stop offset="1" stop-color="#d8b879"/></linearGradient></defs>';
  const bg='<ellipse cx="150" cy="167" rx="111" ry="5" fill="#a995b4" opacity=".22"/>';
  // Ilustração infantil: vestido lavanda, laço, olhos expressivos e sorriso.
  const person="<g class='lm43-girl'>\n<ellipse cx='133' cy='166' rx='41' ry='3.5' fill='#9077a0' opacity='.16'/>\n<path d='M112 125l-4 29 15 1 7-24m9-1 6 25 15-2-7-27' fill='#e9c8b8' stroke='#a18a95' stroke-width='1.5'/>\n<path d='M108 145h16v11h-16zm38 0h15v11h-15z' fill='#fff8ef'/>\n<path d='M109 155q-10-2-18 8-2 5 4 5h29q5-1 3-6l-3-7Zm37 0 14-2q13 1 18 12 0 3-4 3h-30q-4-4 2-13Z' fill='#726082' stroke='#5b4b6b' stroke-width='1.7'/>\n<path d='M94 164h31m21 0h29' fill='none' stroke='#e5d9eb' stroke-width='2'/>\n<path d='M117 76q-17 2-20 17l-8 40q41 21 80 0l-9-40q-4-15-19-17Z' fill='#ac91bf' stroke='#745e87' stroke-width='2.3'/>\n<path d='M97 125q35 13 67 1l5 7q-39 21-80 0Z' fill='#c9b2d5'/>\n<path d='M121 78q11 8 20 0l5 8-14 10-16-10Z' fill='#fcf5ed' stroke='#9475a6' stroke-width='1.3'/>\n<path d='M130 97v28' stroke='#ddc8e7' stroke-width='1.8'/>\n<circle cx='131' cy='107' r='2.2' fill='#f7eee7'/><circle cx='131' cy='117' r='2.2' fill='#f7eee7'/>\n<path d='M102 93q-7 14-18 20m70-19q12 11 22 12' stroke='#e9c7b7' stroke-width='11' stroke-linecap='round' fill='none'/>\n<path d='M84 112q-5 4-8 0m101-6q6 2 7-3' stroke='#e9c7b7' stroke-width='8' stroke-linecap='round' fill='none'/>\n<path d='M101 51q-8-24 8-39 16-14 38-5 23 10 19 34l-3 31q-8 12-21 6h-31q-14-1-10-27Z' fill='#62506e' stroke='#554260' stroke-width='1.5'/>\n<path d='M106 39q0-25 26-28 26 1 27 29l-2 18q-7 18-25 20-20-2-26-20Z' fill='#f3d8ca' stroke='#a67f8a' stroke-width='1.7'/>\n<path d='M106 42q-6-17 9-28 14-10 30-3 14 6 14 24l-4 8q-4-15-14-18-10 12-22 12-7 0-13 5Z' fill='#62506e'/>\n<path d='M105 40q-8 12-3 24 2 7 7 8m47-30q7 11 3 22-2 7-8 9' fill='#62506e'/>\n<path d='M108 22q-16-10-16 2 0 9 15 5m6-6q16-11 17 0 0 10-17 6' fill='#c5a1d4' stroke='#8e6c9d' stroke-width='1.6'/>\n<circle cx='110' cy='26' r='4' fill='#9372a6'/>\n<path d='M116 44q5-4 12-1m13 0q5-3 10 1' stroke='#816374' stroke-width='1.7' fill='none' stroke-linecap='round'/>\n<ellipse cx='122' cy='49' rx='4.6' ry='6.2' fill='#443d55'/><ellipse cx='145' cy='49' rx='4.6' ry='6.2' fill='#443d55'/>\n<circle cx='123' cy='47' r='1.8' fill='#fffdf8'/><circle cx='146' cy='47' r='1.8' fill='#fffdf8'/>\n<ellipse cx='113' cy='58' rx='7' ry='4.1' fill='#dd9b9e' opacity='.62'/><ellipse cx='153' cy='58' rx='7' ry='4.1' fill='#dd9b9e' opacity='.62'/>\n<path d='M131 54q1 2 3 0' fill='none' stroke='#b99593' stroke-width='1.3' stroke-linecap='round'/>\n<path d='M126 62q7 8 15 0' stroke='#ad7780' stroke-width='2.4' stroke-linecap='round' fill='none'/>\n</g>";
  // Violino anatômico em miniatura: corpo de madeira com cintura, 4 cordas,
  // cravelhas, cavalete e arco posicionado junto à mão direita.
  const violin="<g class='lm43-violin' aria-hidden='true'><g transform='translate(147 79) rotate(-108)'><path d='M0-48C-7-44-13-45-19-40C-32-34-31-18-20-11C-15-8-14-4-20 2C-34 11-36 35-19 46C-7 55 7 55 19 46C36 35 34 11 20 2C14-4 15-8 20-11C31-18 32-34 19-40C13-45 7-44 0-48Z' fill='#8b583d' stroke='#613e31' stroke-width='2.6'/><path d='M0-44C-9-42-19-44-23-30C-25-24-22-17-16-12C-13-8-12-2-17 4C-28 15-29 34-14 42C-5 47 5 47 14 42C29 34 28 15 17 4C12-2 13-8 16-12C22-17 25-24 23-30C19-44 9-42 0-44Z' fill='#c98953' stroke='#a96a46' stroke-width='1.2'/><path d='M-16-36Q-26-28-15-16m31-20Q26-28 15-16M-22 17Q-27 37-12 42m34-25Q27 37 12 42' stroke='#ecc091' stroke-width='2' fill='none' stroke-linecap='round'/><path d='M-8-48V-93Q-8-97-4-97H4Q8-97 8-93V-48' fill='#75533f' stroke='#5c3c33' stroke-width='1.5'/><path d='M-6-94H6L4 0H-4Z' fill='#3d3035' stroke='#5c4240' stroke-width='1.2'/><path d='M-5-99Q-11-108-6-114Q0-122 6-115Q12-109 4-105Q-1-101-2-106Q-3-110 1-110' stroke='#654537' stroke-width='5.5' fill='none' stroke-linecap='round'/><path d='M-10-104h-9m29 0h9m-24-7h-10m20 0h10' stroke='#6e5140' stroke-width='3' stroke-linecap='round'/><circle cx='-19' cy='-104' r='3' fill='#4c3935'/><circle cx='19' cy='-104' r='3' fill='#4c3935'/><path d='M-10 1Q-14-12-17-13m27 14Q14-12 17-13' stroke='#704635' stroke-width='2.3' fill='none' stroke-linecap='round'/><path d='M-16-14Q-22-7-17 0Q-13 5-17 11m33-25Q22-7 17 0Q13 5 17 11' stroke='#6b422e' stroke-width='2.9' fill='none' stroke-linecap='round'/><path d='M-12-7q4 4 1 9m23-9q-4 4-1 9' stroke='#9c6846' stroke-width='1.6' fill='none'/><path d='M-16 13Q0 8 16 13L13 17Q0 14-13 17Z' fill='#eed9b7' stroke='#9f7750' stroke-width='1.3'/><path d='M-5 19L-7 35Q0 39 7 35L5 19Z' fill='#4f3935' stroke='#523c35' stroke-width='1'/><circle cx='0' cy='39' r='2.4' fill='#a17b5f'/><path d='M-11 42Q-20 44-21 37Q-20 28-11 30L-4 37Q-3 41-11 42Z' fill='#4c3635' stroke='#342c31' stroke-width='1.2'/><path d='M-2-96L-2 36M-0.7-96L-0.7 36M0.7-96L0.7 36M2-96L2 36' stroke='#f9edcf' stroke-width='.68' opacity='.94'/></g><path d='M86 107Q91 100 98 100' fill='none' stroke='#e9c7b7' stroke-width='5.5' stroke-linecap='round'/><g class='lm43-violin-bow'><path d='M178 104L102 28' stroke='#71514a' stroke-width='3.5' stroke-linecap='round'/><path d='M175 108L99 32' stroke='#ffefe1' stroke-width='1.75' stroke-linecap='round'/><path d='M176 101L184 109' stroke='#584455' stroke-width='5' stroke-linecap='round'/><path d='M98 27L103 32' stroke='#d0b68b' stroke-width='3' stroke-linecap='round'/></g></g>";
  const curtain='<path d="M52 12Q38 54 49 138M244 11q20 56 5 125" stroke="#d1bfd7" stroke-width="9" fill="none" stroke-linecap="round" opacity=".34"/>';
  const stage=curtain+'<path d="M70 167h160M92 144h119" stroke="#bfa9c7" stroke-width="2"/>'+
    '<path d="M64 10 115 124 169 124 232 10" fill="#e7d6b0" opacity=".12"/>'+
    '<path d="M80 10 135 152 174 152 209 10" fill="#f7eabf" opacity=".25"/>';
  const mirror='<rect x="187" y="12" width="73" height="134" rx="24" fill="#d7c3e0" stroke="#796184" stroke-width="3"/>'+
    '<rect x="195" y="20" width="57" height="118" rx="18" fill="url(#lm43Linen)" stroke="#b8a2bf" stroke-width="1.5"/>'+
    '<path d="M201 70 240 29m-29 61 39-43" stroke="#fffdfa" stroke-width="5" opacity=".5"/>';
  // Representação do olhar: um único olho, sem boca.
  const eyes="<g class='lm43-single-eye'>\n<path d='M54 83Q103 26 150 26Q198 26 246 83Q199 141 150 141Q101 141 54 83Z' fill='#fffaf2' stroke='#896c9d' stroke-width='4' stroke-linejoin='round'/>\n<circle cx='150' cy='83' r='42' fill='#c6a9d5' stroke='#916da7' stroke-width='2.7'/>\n<circle cx='150' cy='83' r='25' fill='#76628f'/>\n<circle cx='150' cy='83' r='13' fill='#423b54'/>\n<ellipse cx='137' cy='65' rx='10' ry='12' fill='#fffdf9' opacity='.93'/>\n<circle cx='165' cy='100' r='5' fill='#f9f2fb' opacity='.7'/>\n<path d='M72 62Q97 39 122 32m106 30q-27-23-49-30' stroke='#af94bd' stroke-width='2.4' fill='none' stroke-linecap='round'/>\n</g>";
  const book='<rect x="81" y="22" width="141" height="122" rx="5" fill="#f7f0e9" stroke="#b79fc5" stroke-width="3"/>'+
   '<path d="M100 44h102m-102 19h91m-91 19h102m-102 19h85" stroke="#ab95b8" stroke-width="2.6" stroke-linecap="round"/>';
  function drawing(type){
    if(type==="lacan")return '<div class="lm43-portrait" aria-hidden="true"></div>';
    const head='<svg class="lm43-svg" viewBox="0 0 300 172" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+defs+bg;
    const end='</svg>';
    if(["musician","violin","spotlight","ideal","notes"].includes(type)){
      const noteMarks=type==="notes"?'<text x="42" y="71" font-size="35" fill="#8f75a4">♫</text><text x="220" y="84" font-size="28" fill="#9c80ae">♪</text><text x="65" y="131" font-size="23" fill="#baa3c6">♬</text>':"";
      return head+stage+person+violin+noteMarks+end;
    }
    if(type==="score")return head+book+'<path d="M100 78q22-18 44 0t43 0" stroke="#926fa6" stroke-width="3" fill="none"/>'+
        '<text x="113" y="120" font-family="serif" font-size="26" fill="#876b99">♪ ♫</text>'+end;
    if(["mirror","portrait","final"].includes(type)){
      return head+'<rect x="39" y="28" width="99" height="130" rx="5" fill="#f8f1e8" stroke="#bda6c8" stroke-width="4"/>'+
        '<g transform="translate(-33 6) scale(.72 .92)">'+person+'</g>'+mirror+
        '<g transform="translate(120 12) scale(.72 .80)" opacity=".65">'+person+'</g>'+end;
    }
    if(type==="gaze")return head+eyes+end;
    if(type==="value")return head+eyes+end;
    if(type==="teacher"||type==="family"||type==="history"||type==="words"){
      const labels=type==="family"?["FAMÍLIA","EXPECTATIVAS","ORGULHO"]:type==="teacher"?["MESTRES","ELOGIOS","RECONHECIMENTO"]:type==="history"?["ANTES","HISTÓRIA","EXPECTATIVAS"]:["DISCIPLINA","MÉRITO","VALOR"];
      return head+book+labels.map((v,i)=>'<text x="151" y="'+(60+i*27)+'" font-family="Georgia" text-anchor="middle" fill="#6d557e" font-size="'+(v.length>11?11:14)+'">'+v+'</text>').join("")+end;
    }
    if(type==="symbolic")return head+
      '<circle cx="150" cy="82" r="56" fill="#f9f3e8" stroke="#b29abd" stroke-width="3"/>'+
      '<circle cx="150" cy="82" r="25" fill="#d8c3e3" stroke="#856b99" stroke-width="2"/>'+
      '<circle cx="65" cy="30" r="17" fill="#efe1ec" stroke="#9479a6" stroke-width="2"/>'+
      '<circle cx="246" cy="40" r="17" fill="#efe1ec" stroke="#9479a6" stroke-width="2"/>'+
      '<circle cx="228" cy="146" r="17" fill="#efe1ec" stroke="#9479a6" stroke-width="2"/>'+
      '<path d="M83 40 129 68m45-1 54-22m-54 31 43 57" stroke="#b89fc7" stroke-width="2"/>'+
      '<text x="150" y="89" text-anchor="middle" font-family="Georgia" font-size="18" fill="#634d76">EU</text>'+end;
    if(type==="lens")return head+'<circle cx="140" cy="79" r="46" fill="#f8f1e5" stroke="#8f75a6" stroke-width="8"/>'+
      '<circle cx="140" cy="79" r="32" fill="#e7d8ed" opacity=".7"/><path d="m169 112 50 46" stroke="#8c7499" stroke-width="12" stroke-linecap="round"/>'+
      '<text x="139" y="91" text-anchor="middle" fill="#745985" font-size="29">★</text>'+end;
    if(type==="tension"||type==="contrast")return head+
      '<rect x="32" y="28" width="104" height="118" rx="3" fill="#faf2e8" stroke="#b6a1c0" stroke-width="3"/>'+
      '<circle cx="86" cy="63" r="18" fill="#e3c3b2"/><path d="M54 131q0-48 32-48t32 48" fill="#977ea8"/>'+
      '<path d="M147 87h30m-9-10 9 10-9 10" stroke="#a48aad" stroke-width="2.5" fill="none"/>'+
      '<circle cx="230" cy="82" r="40" stroke="#a68cb5" stroke-width="3" fill="#f4e9ed"/>'+
      '<path d="M207 82q23-24 46 0-23 24-46 0Z" fill="#faf4ea" stroke="#9278a7" stroke-width="2.5"/>'+
      '<circle cx="230" cy="82" r="9" fill="#665075"/>'+end;
    return head+'<circle cx="150" cy="84" r="58" fill="#f8f1e8" stroke="#b7a1c5" stroke-width="3"/>'+
      '<text x="150" y="117" font-family="Georgia" fill="#816691" text-anchor="middle" font-size="90">?</text>'+end;
  }
  let dispose=()=>{};
  function render(lesson){
    if(lesson.id!==ID)return "";
    return '<section class="lm-wrap" id="lacanMotion43" aria-labelledby="lm43Title">'+
      '<div class="lm-intro"><span class="section-label">NARRAÇÃO ILUSTRADA · 2 MIN 10 SEG</span>'+
      '<h2 id="lm43Title">Eu ideal e ideal do eu.</h2>'+
      '<p>Como uma imagem admirada e o ponto de onde ela recebe valor participam da formação do eu.</p></div>'+
      '<div class="lm-stage lm43-stage-musician" id="lm43Stage" role="img" aria-label="Animação conceitual sobre eu ideal e ideal do eu">'+
      '<div class="lm-top"><span>FORMAÇÃO LACANIANA</span><span>MÓDULO 04 · AULA 4.3</span></div>'+
      '<div class="lm43-content" id="lm43Content"></div>'+
      '<div class="lm-bottom"><span>IMAGEM · OLHAR · RECONHECIMENTO</span><span id="lm43Count">01 / '+cues.length+'</span></div></div>'+
      '<div class="lm-controls"><button class="lm-play" type="button" id="lm43Play" aria-label="Reproduzir">▶ <span>Reproduzir</span></button>'+
      '<label class="lm-seek-label" for="lm43Seek">Posição do vídeo</label>'+
      '<input type="range" id="lm43Seek" min="0" max="'+DURATION+'" step=".05" value="0" aria-label="Avançar ou voltar a narração">'+
      '<span class="lm-clock" id="lm43Clock">0:00 / 2:10</span></div>'+
      '<div class="lm43-fallback" id="lm43Fallback" hidden><span id="lm43Message" role="status">Áudio temporariamente indisponível.</span>'+
      '<label class="lm-file-label">Carregar narração <input type="file" id="lm43Upload" accept="audio/*,.mp3,.wav,.m4a"></label></div>'+
      '<audio id="lm43Audio" preload="metadata"></audio></section>';
  }
  function mount(article,lesson){
    dispose();if(lesson.id!==ID)return;
    const root=article.querySelector("#lacanMotion43");if(!root)return;
    const el=id=>root.querySelector("#"+id);
    const stage=el("lm43Stage"),body=el("lm43Content"),counter=el("lm43Count"),seek=el("lm43Seek"),clock=el("lm43Clock"),
          play=el("lm43Play"),audio=el("lm43Audio"),fallback=el("lm43Fallback"),message=el("lm43Message"),upload=el("lm43Upload");
    let time=0,index=-1,playing=false,raf=0,disposed=false,objectUrl="";
    function paint(t){
      time=Math.max(0,Math.min(DURATION,t));
      let n=0;for(let i=1;i<cues.length;i++){if(time+.06>=cues[i][0])n=i;else break;}
      if(index!==n){
        index=n;const [,kind,title]=cues[n];
        const theme=["musician","spotlight","violin","notes","score"].includes(kind)?"musician":
          ["mirror","ideal","portrait","final"].includes(kind)?"mirror":
          ["teacher","family","history","words","value"].includes(kind)?"value":
          ["symbolic","gaze","lens"].includes(kind)?"symbolic":kind==="tension"?"rivalry":"question";
        stage.className="lm-stage lm43-stage-"+theme;
        body.innerHTML='<div class="lm43-scene"><div class="lm43-art">'+drawing(kind)+'</div><h3>'+esc(title)+'</h3></div>';
        counter.textContent=String(index+1).padStart(2,"0")+" / "+cues.length;
        stage.setAttribute("aria-label",title);
      }
      seek.value=time.toFixed(2);seek.style.setProperty("--lm-pct",(time*100/DURATION)+"%");
      clock.textContent=mmss(time)+" / "+mmss(DURATION);
    }
    function updateButton(){play.innerHTML=playing?'❚❚ <span>Pausar</span>':'▶ <span>Reproduzir</span>';play.setAttribute("aria-label",playing?"Pausar":"Reproduzir");}
    function pause(){playing=false;cancelAnimationFrame(raf);audio.pause();updateButton();}
    function loop(){
      if(disposed||!playing)return;
      paint(audio.currentTime||0);
      raf=requestAnimationFrame(loop);
    }
    function start(){
      if(playing){pause();return;}
      if(time>=DURATION-.15)paint(0);
      audio.currentTime=time;
      Promise.resolve(audio.play()).then(()=>{if(disposed)return;playing=true;updateButton();raf=requestAnimationFrame(loop);})
       .catch(()=>{if(disposed)return;fallback.hidden=false;message.textContent="Não consegui iniciar a narração. Selecione o arquivo WAV ou MP3.";pause();});
    }
    play.addEventListener("click",start);
    seek.addEventListener("input",()=>{paint(Number(seek.value)||0);if(!Number.isNaN(audio.duration))audio.currentTime=time;});
    audio.addEventListener("timeupdate",()=>{if(!disposed)paint(audio.currentTime||0);});
    audio.addEventListener("ended",()=>{pause();paint(DURATION);});
    audio.addEventListener("error",()=>{if(!disposed){fallback.hidden=false;message.textContent="Falha ao abrir a narração. Escolha o arquivo original.";}});
    upload.addEventListener("change",()=>{const f=upload.files?.[0];if(!f)return;
      if(!f.type.startsWith("audio/")&&!/\.(wav|mp3|m4a|ogg)$/i.test(f.name)){message.textContent="Selecione um arquivo de áudio válido.";return;}
      if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(f);
      pause();audio.src=objectUrl;audio.load();fallback.hidden=true;paint(0);
    });
    audio.src=FILE;audio.load();
    dispose=()=>{disposed=true;pause();if(objectUrl)URL.revokeObjectURL(objectUrl);audio.removeAttribute("src");audio.load();dispose=()=>{};};
    paint(0);updateButton();
  }
  window.LACAN_MOTION_43={render,mount,unmount:()=>dispose()};
})();
