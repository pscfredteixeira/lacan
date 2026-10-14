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
  // Instrumento redesenhado a partir da anatomia de um violino verdadeiro.
  // Silhueta de ampulheta, voluta e cravelhas, braço longo, aberturas em f e arco independente.
  // Violino preservado e reduzido a 47%; posicionado no ombro (pivô 123,90).
  const violin="<g class=\"lm43-violin\" aria-hidden=\"true\"><g transform=\"translate(66 43) scale(.47)\">\n<g transform=\"translate(122 99) rotate(-92) scale(.83)\">\n<defs><linearGradient id=\"lm43Varnish\" x1=\"0\" y1=\"0\" x2=\".8\" y2=\"1\"><stop stop-color=\"#eda761\"/><stop offset=\".42\" stop-color=\"#da8648\"/><stop offset=\"1\" stop-color=\"#ad5b38\"/></linearGradient></defs>\n<path d=\"M0-30 C-12-31-26-26-27-11 C-28 0-21 8-18 13 C-16 17-16 22-23 25 C-28 25-28 20-33 23 C-34 29-29 34-29 40 C-39 53-40 72-28 84 C-18 96-5 98 0 98 C5 98 18 96 28 84 C40 72 39 53 29 40 C29 34 34 29 33 23 C28 20 28 25 23 25 C16 22 16 17 18 13 C21 8 28 0 27-11 C26-26 12-31 0-30Z\" fill=\"#763f2f\" stroke=\"#553930\" stroke-width=\"2.4\"/>\n<path d=\"M0-26 C-12-27-23-24-23-10 C-24 1-17 8-15 14 C-14 23-19 29-27 29 C-26 33-24 35-25 41 C-36 53-36 70-25 81 C-13 93 13 93 25 81 C36 70 36 53 25 41 C24 35 26 33 27 29 C19 29 14 23 15 14 C17 8 24 1 23-10 C23-24 12-27 0-26Z\" fill=\"url(#lm43Varnish)\" stroke=\"#eeb57a\" stroke-width=\"1.2\"/>\n<path d=\"M0-23 C-12-24-20-21-20-9 C-20 1-13 9-12 14 C-11 23-16 31-23 32 C-22 37-20 39-22 43 C-31 54-32 68-21 78 C-10 88 10 88 21 78 C32 68 31 54 22 43 C20 39 22 37 23 32 C16 31 11 23 12 14 C13 9 20 1 20-9 C20-21 12-24 0-23Z\" fill=\"none\" stroke=\"#713f33\" stroke-width=\"1\" opacity=\".83\"/>\n<path d=\"M-17-18Q-26-3-17 11M-26 48Q-33 68-18 82\" fill=\"none\" stroke=\"#ffd9a1\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\".44\"/>\n<path d=\"M-5-34 L-5-93 Q-5-101-1-102 L1-102 Q5-101 5-93 L5-34Z\" fill=\"#8f5b40\" stroke=\"#50392f\" stroke-width=\"1.7\"/>\n<path d=\"M-8-99 C-13-105-11-112-4-115 C-1-121 12-118 11-109 C10-101 0-101 0-109 C0-113 5-112 5-109\" fill=\"none\" stroke=\"#855238\" stroke-width=\"5.4\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/>\n<path d=\"M-3-92 H-18 M3-92 H18 M-3-82 H-18 M3-82 H18\" stroke=\"#5f4338\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n<circle cx=\"-17\" cy=\"-92\" r=\"3.5\" fill=\"#413538\"/><circle cx=\"17\" cy=\"-92\" r=\"3.5\" fill=\"#413538\"/>\n<circle cx=\"-17\" cy=\"-82\" r=\"3.5\" fill=\"#413538\"/><circle cx=\"17\" cy=\"-82\" r=\"3.5\" fill=\"#413538\"/>\n<path d=\"M-6-76 L-9 19 Q0 21 9 19 L6-76Z\" fill=\"#322b32\" stroke=\"#6c4b43\" stroke-width=\"1.1\"/>\n<path d=\"M-5-75L-7 17\" stroke=\"#77675d\" stroke-width=\"1.1\" opacity=\".5\"/>\n<path d=\"M-17 27 C-23 19-20 15-15 15 C-12 15-11 19-14 20 C-17 20-17 17-18 17 C-20 26-10 29-13 40 C-13 49-20 52-18 56 C-17 60-12 57-12 55\" fill=\"none\" stroke=\"#4f342d\" stroke-width=\"3.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M17 27 C23 19 20 15 15 15 C12 15 11 19 14 20 C17 20 17 17 18 17 C20 26 10 29 13 40 C13 49 20 52 18 56 C17 60 12 57 12 55\" fill=\"none\" stroke=\"#4f342d\" stroke-width=\"3.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M-17 42Q0 36 17 42L15 47Q0 43-15 47Z\" fill=\"#f1d5ae\" stroke=\"#a87650\" stroke-width=\"1.4\"/>\n<path d=\"M-5 52 L-10 76 Q0 85 10 76 L5 52Z\" fill=\"#372c31\" stroke=\"#4b3334\" stroke-width=\"1.2\"/>\n<path d=\"M-10 76Q0 87 10 76\" fill=\"none\" stroke=\"#a98c73\" stroke-width=\".9\"/>\n<path d=\"M-3.8-79 L-3.8 69 M-1.25-79 L-1.25 69 M1.25-79 L1.25 69 M3.8-79 L3.8 69\" stroke=\"#ffedc9\" stroke-width=\".88\" opacity=\".95\"/>\n<path d=\"M-18 81Q-33 74-35 84Q-35 91-26 94L-8 92Q-6 89-15 84Z\" fill=\"#3e3032\" stroke=\"#2f2a2e\" stroke-width=\"1.1\"/>\n</g>\n<g class=\"lm43-violin-bow\">\n<path d=\"M92 143 L233 61\" stroke=\"#6a4a42\" stroke-width=\"3.6\" stroke-linecap=\"round\"/>\n<path d=\"M91 139 L231 57\" stroke=\"#fff1df\" stroke-width=\"1.7\" stroke-linecap=\"round\"/>\n<rect x=\"86\" y=\"138\" width=\"18\" height=\"8\" rx=\"2\" transform=\"rotate(-30 86 138)\" fill=\"#493c40\" stroke=\"#a58a7a\" stroke-width=\"1\"/>\n<path d=\"M230 57l6 5\" stroke=\"#ab835e\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n</g></g></g>";
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
