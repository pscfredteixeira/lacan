/* Formação Lacaniana — Aula 4.2, O estádio do espelho.
   381 palavras alinhadas à narração original de 117,68 segundos.
   O relógio das cenas é sempre audio.currentTime. */
(() => {
  "use strict";
  const LESSON="4.2",AUDIO="assets/estadio-espelho-42.mp3",LENGTH=117.708;
  const cues=[
    [0,"mirror","Você já se olhou no espelho?"],
    [1.8,"question","Sou eu?"],
    [2.34,"question","Parece óbvio."],
    [4.5,"lacan","Jacques Lacan"],
    [5.46,"question","Essa cena abre uma pergunta."],
    [7.74,"question","Como formamos a ideia de quem somos?"],
    [10.32,"contrast","Sentir o corpo não é o mesmo que ver sua imagem."],
    [14.92,"contrast","Essa diferença será fundamental."],
    [17.28,"mirror","Uma criança diante do espelho."],
    [19.56,"child","Seu rosto, seus braços, suas pernas."],
    [22.38,"mirror","Uma figura inteira que se move com ela."],
    [25.5,"child","Seus movimentos ainda estão se desenvolvendo."],
    [28.32,"support","Ela pode precisar de apoio para ficar em pé."],
    [31.44,"contrast","O reflexo apresenta um corpo organizado."],
    [35.22,"mirror","O estádio do espelho."],
    [38.4,"question","Não é só reconhecer o próprio reflexo."],
    [41.08,"lacan","A imagem participa de algo mais importante."],
    [44.54,"identity","A formação do eu."],
    [45.6,"question","Uma palavra fundamental."],
    [47.72,"identity","Identificação."],
    [49.08,"identity","Tomar uma imagem como referência para si."],
    [53.5,"ideal","Alguém que se apresenta como quem nunca erra."],
    [56.92,"ideal","Uma imagem pode orientar o comportamento."],
    [59.34,"ideal","Mas não revela todas as dúvidas e inseguranças."],
    [61.58,"theory","Uma comparação para entender o conceito."],
    [64.16,"child","Não é a experiência de um bebê."],
    [66.42,"mirror","A imagem oferece uma unidade."],
    [68.96,"child","Seus movimentos ainda não dominam essa unidade."],
    [72.38,"identity","Identificar-se com a imagem participa da constituição do eu."],
    [76.28,"question","Uma consequência surpreendente."],
    [78.28,"inside","O eu não é uma identidade pronta dentro de nós."],
    [81.24,"outside","Ele se forma também com algo exterior."],
    [83.4,"alienation","Alienação."],
    [85.16,"question","Não significa distração."],
    [87.1,"alienation","Nem manipulação."],
    [90.32,"outside","A imagem que forma o eu vem de fora."],
    [93.46,"contrast","Nenhuma imagem representa tudo o que somos."],
    [95.86,"child","A criança também não está isolada."],
    [97.74,"support","Outras pessoas seguram, cuidam e falam com ela."],
    [101.08,"theory","Uma proposta teórica da psicanálise."],
    [105.36,"question","Não sabemos exatamente o que cada criança sente."],
    [109.4,"question","Uma pergunta instigante."],
    [112.18,"identity","Se a imagem participa da formação do eu..."],
    [114.26,"final","O que reconhecemos quando dizemos: sou eu?"]
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt=t=>{const n=Math.floor(Math.max(0,t));return Math.floor(n/60)+":"+String(n%60).padStart(2,"0");};
  const defs='<defs><linearGradient id="lm42Glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d9c9e9"/><stop offset="1" stop-color="#faf5ec"/></linearGradient></defs>';
  const kid='<g><path d="M-20 108 Q-20 130 -25 143L-5 145 0 119 9 145 27 143 20 108Z" fill="#736084"/>'+
    '<path d="M-20 67Q-19 56-8 55L8 55Q20 57 21 69L20 111Q0 120 -21 111Z" fill="#a48bb4" stroke="#715c85" stroke-width="2"/>'+
    '<path d="M-19 68-32 95M20 68 30 94" stroke="#dfbcab" stroke-width="11" stroke-linecap="round"/>'+
    '<path d="M-13 41Q-14 21 0 19Q16 20 14 41Q11 56 0 57Q-12 55-13 41Z" fill="#e6c8b7" stroke="#826b87" stroke-width="1.8"/>'+
    '<path d="M-14 39Q-18 16 1 16Q20 18 15 38L9 30Q-2 37 -14 39Z" fill="#615069"/>'+
    '<circle cx="-4" cy="42" r="1.4" fill="#645069"/><circle cx="7" cy="42" r="1.4" fill="#645069"/>'+
    '<path d="M-2 49q4 3 7-1" fill="none" stroke="#a57778" stroke-width="1.5" stroke-linecap="round"/>'+
    '<path d="M-5 143 -8 154 -31 154q-5-4 6-9Zm22 0 8 1q12 4 15 9H14Z" fill="#51455b"/></g>';
  const mirror='<rect x="160" y="7" width="76" height="140" rx="26" fill="#d9c4dd" stroke="#765d84" stroke-width="3"/>'+
    '<rect x="167" y="14" width="62" height="125" rx="20" fill="url(#lm42Glass)" stroke="#b6a0c4" stroke-width="1.5"/>'+
    '<path d="M172 60 211 20M176 82 224 33" stroke="#fffdf7" stroke-width="4" opacity=".4"/>';
  const support='<g transform="translate(164 7)"><path d="M-18 60Q-18 44 1 44Q18 44 19 61V111H-19Z" fill="#806d95"/>'+
    '<path d="M-8 111-13 145M9 111 18 145" stroke="#5a4a6b" stroke-width="15" stroke-linecap="round"/>'+
    '<path d="M-8 28q0-18 12-18Q18 10 17 28q-3 17-14 17Q-7 44-8 28Z" fill="#dfbdab" stroke="#775f7e" stroke-width="2"/>'+
    '<path d="M-10 28q-8-24 11-26 17-2 19 24L10 18l-20 10Z" fill="#594b69"/>'+
    '<path d="M-17 60-39 87-56 99" stroke="#dfbdab" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></g>';
  function artwork(type){
    if(type==="lacan")return '<div class="lm42-portrait" aria-hidden="true"></div>';
    const begin='<svg class="lm42-artwork" viewBox="0 0 270 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+defs+
      '<ellipse cx="135" cy="157" rx="105" ry="3" fill="#beadcb" opacity=".2"/>';
    const end='</svg>';
    const person='<g transform="translate(86 0)">'+kid+'</g>';
    const reflection='<g transform="translate(197 17) scale(-.82 .82)" opacity=".72">'+kid+'</g>';
    if(type==="mirror"||type==="final")return begin+mirror+reflection+person+end;
    if(type==="child")return begin+'<g transform="translate(135 0)">'+kid+'</g>'+end;
    if(type==="support")return begin+'<g transform="translate(86 0)">'+kid+'</g>'+support+end;
    if(type==="identity")return begin+'<circle cx="135" cy="78" r="69" fill="#f5efe6" stroke="#b9a3c6" stroke-width="2" stroke-dasharray="4 8"/>'+
      '<g transform="translate(135 0)">'+kid+'</g><rect x="186" y="11" width="56" height="28" rx="14" fill="#eee3ef" stroke="#9e85b0" stroke-width="2"/>'+
      '<text x="214" y="30" text-anchor="middle" fill="#675476" font-family="Georgia" font-size="15">EU</text>'+end;
    if(type==="outside"||type==="alienation")return begin+person+
      '<path d="M119 80h31m-10-9 10 9-10 9" stroke="#9f84b2" stroke-width="3" fill="none" stroke-linecap="round"/>'+mirror+reflection+end;
    if(type==="ideal")return begin+'<rect x="65" y="9" width="142" height="142" rx="6" fill="#f9f3ea" stroke="#b6a1c4" stroke-width="3"/>'+
      '<circle cx="135" cy="65" r="22" fill="#e5c7b4"/><path d="M100 132q0-43 35-43t35 43" fill="#907ba5"/>'+
      '<path d="m135 12 6 10 10 2-8 8 2 11-10-5-10 5 2-11-8-8 10-2Z" fill="#dbc38b" stroke="#ac9261"/>'+end;
    if(type==="theory")return begin+'<rect x="68" y="18" width="136" height="122" rx="4" fill="#f8f0e8" stroke="#9e87b0" stroke-width="3"/>'+
      '<path d="M85 45h99M85 60h99M85 75h89M85 90h99M85 105h73" stroke="#ae95bd" stroke-width="3" stroke-linecap="round"/>'+end;
    if(type==="inside")return begin+'<circle cx="135" cy="80" r="70" fill="#f5efe9" stroke="#aa93ba" stroke-width="3" stroke-dasharray="5 7"/>'+
      '<g transform="translate(135 0)">'+kid+'</g>'+end;
    if(type==="contrast")return begin+mirror+reflection+person+end;
    return begin+mirror+'<text x="102" y="102" fill="#77618a" font-family="Georgia" font-size="66" text-anchor="middle">?</text>'+end;
  }
  let unmount=()=>{};
  const render=lesson=>{
    if(lesson.id!==LESSON)return "";
    return '<section class="lm-wrap" id="lacanMotion42" aria-labelledby="lm42Heading">'+
      '<div class="lm-intro"><span class="section-label">VÍDEO INTRODUTÓRIO · 1 MIN 58 SEG</span>'+
      '<h2 id="lm42Heading">O estádio do espelho.</h2>'+
      '<p>Identificação, imagem corporal e formação do eu explicadas visualmente.</p></div>'+
      '<div class="lm-stage lm42-stage-mirror" id="lm42Stage" role="img" aria-label="Animação do estádio do espelho">'+
      '<div class="lm-top"><span>FORMAÇÃO LACANIANA</span><span>MÓDULO 04 · AULA 4.2</span></div>'+
      '<div class="lm42-inner" id="lm42Inner"></div>'+
      '<div class="lm-bottom"><span>IMAGEM · EU · IDENTIFICAÇÃO</span><span id="lm42Counter">01 / '+cues.length+'</span></div></div>'+
      '<div class="lm-controls"><button class="lm-play" id="lm42Play" type="button" aria-label="Iniciar narração">▶ <span>Reproduzir</span></button>'+
      '<label class="lm-seek-label" for="lm42Seek">Posição do áudio</label>'+
      '<input type="range" id="lm42Seek" min="0" max="'+LENGTH+'" step=".05" value="0" aria-label="Avançar ou voltar na narração">'+
      '<span class="lm-clock" id="lm42Clock">0:00 / 1:57</span></div>'+
      '<div class="lm42-file-row" id="lm42FileRow" hidden><span id="lm42Info" role="status">O áudio está indisponível.</span>'+
      '<label class="lm-file-label">Carregar áudio <input type="file" id="lm42File" accept="audio/*,.wav,.mp3"></label></div>'+
      '<audio id="lm42Audio" preload="metadata"></audio></section>';
  };
  function mount(article,lesson){
    unmount();if(lesson.id!==LESSON)return;
    const root=article.querySelector("#lacanMotion42");if(!root)return;
    const by=id=>root.querySelector("#"+id);
    const stage=by("lm42Stage"),inner=by("lm42Inner"),counter=by("lm42Counter"),seek=by("lm42Seek"),
      clock=by("lm42Clock"),play=by("lm42Play"),audio=by("lm42Audio"),
      fallback=by("lm42FileRow"),info=by("lm42Info"),file=by("lm42File");
    let time=0,last=-1,playing=false,preview=false,loaded=false,request=0,stamp=0,url="",disposed=false;
    function draw(t){
      time=Math.max(0,Math.min(LENGTH,t));
      let index=0;for(let i=1;i<cues.length;i++){if(time+.08>=cues[i][0])index=i;else break;}
      if(last!==index){
        last=index;const [,kind,title]=cues[index];
        const theme=["alienation","outside"].includes(kind)?"alienation":["child","support"].includes(kind)?"mirror":kind;
        stage.className="lm-stage lm42-stage-"+theme;
        inner.innerHTML='<div class="lm42-scene"><div class="lm42-illustration">'+artwork(kind)+'</div><h3>'+esc(title)+'</h3></div>';
        stage.setAttribute("aria-label",title);
        counter.textContent=String(index+1).padStart(2,"0")+" / "+cues.length;
      }
      seek.value=time.toFixed(2);seek.style.setProperty("--lm-pct",(100*time/LENGTH)+"%");
      clock.textContent=fmt(time)+" / "+fmt(LENGTH);
    }
    function button(){play.innerHTML=playing?'❚❚ <span>Pausar</span>':'▶ <span>'+(loaded?'Reproduzir':'Prévia sem áudio')+'</span>';play.setAttribute("aria-label",playing?"Pausar":"Reproduzir");}
    function stop(){playing=false;preview=false;stamp=0;audio.pause();cancelAnimationFrame(request);button();}
    function tick(now){
      if(!playing||disposed)return;
      if(preview){if(stamp)time+=(now-stamp)/1000;stamp=now;draw(time);if(time>=LENGTH){stop();return;}}
      else draw(audio.currentTime||0);
      request=requestAnimationFrame(tick);
    }
    function toggle(){
      if(playing){stop();return;}if(time>=LENGTH-.1)draw(0);
      if(!loaded){playing=true;preview=true;stamp=0;button();request=requestAnimationFrame(tick);return;}
      audio.currentTime=time;
      Promise.resolve(audio.play()).then(()=>{if(disposed)return;playing=true;preview=false;button();request=requestAnimationFrame(tick);}).catch(()=>{
        if(disposed)return;fallback.hidden=false;info.textContent="A narração não começou. Selecione o arquivo novamente.";stop();
      });
    }
    play.addEventListener("click",toggle);
    seek.addEventListener("input",()=>{draw(Number(seek.value)||0);if(loaded)audio.currentTime=time;stamp=0;});
    audio.addEventListener("ended",()=>{stop();draw(LENGTH);});
    audio.addEventListener("error",()=>{if(!disposed){fallback.hidden=false;info.textContent="Falha ao carregar a narração."; }});
    file.addEventListener("change",()=>{
      const f=file.files?.[0];if(!f)return;
      if(!f.type.startsWith("audio/")&&!/\.(wav|mp3|m4a)$/i.test(f.name)){info.textContent="Selecione um arquivo de áudio.";return;}
      if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(f);
      stop();audio.src=url;audio.load();loaded=true;fallback.hidden=true;draw(0);button();
    });
    async function load(){
      try{const resp=await fetch(AUDIO,{method:"HEAD",cache:"no-store"});
        if(resp.ok&&!disposed){audio.src=AUDIO;audio.load();loaded=true;button();return;}}
      catch{}
      if(!disposed){fallback.hidden=false;info.textContent="Áudio indisponível. Selecione o arquivo original.";button();}
    }
    function visibility(){if(document.hidden&&preview)stop();}
    document.addEventListener("visibilitychange",visibility);
    unmount=()=>{disposed=true;stop();document.removeEventListener("visibilitychange",visibility);if(url)URL.revokeObjectURL(url);audio.removeAttribute("src");audio.load();unmount=()=>{};};
    draw(0);button();load();
  }
  window.LACAN_MOTION_42={render,mount,unmount:()=>unmount()};
})();