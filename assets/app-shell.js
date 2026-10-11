/* Formação Lacaniana · navegação do aplicativo · v1
   Barra inferior em telas pequenas + menu lateral responsivo.
   Sem login, bibliotecas externas ou envio de progresso. */
(() => {
  "use strict";
  const start = () => {
    if (document.getElementById("lacanAppMenu")) return;
    const modules = [
      {number:1, title:"Conhecendo Jacques Lacan", short:"Introdução a Lacan"},
      {number:2, title:"Freud: fundamentos necessários", short:"Freud"},
      {number:3, title:"Linguagem e inconsciente", short:"Linguagem"},
      {number:4, title:"Espelho e formação do eu", short:"O espelho"},
      {number:5, title:"Grande Outro e sujeito", short:"O Outro"},
      {number:6, title:"Necessidade, demanda e desejo", short:"O desejo"}
    ];
    const labs = [
      {number:1, title:"Arquivo de Lacan", subtitle:"Uma linha do tempo histórica", href:"arquivo.html", symbol:"⌁"},
      {number:2, title:"O Estádio do Espelho", subtitle:"Imagem, eu e identificação", href:"espelho.html", symbol:"◌"},
      {number:3, title:"Ateliê dos Significantes", subtitle:"Palavras e relações", href:"significantes.html", symbol:"✳"},
      {number:4, title:"Oficina do Inconsciente", subtitle:"Investigações sobre Freud", href:"oficina-freud.html", symbol:"◈"},
      {number:5, title:"O Enigma do Outro", subtitle:"Lugares simbólicos e sujeito", href:"enigma-outro.html", symbol:"↗"},
      {number:6, title:"Circuito do Desejo", subtitle:"Necessidade e demanda", href:"circuito-desejo.html", symbol:"◇"}
    ];
    const icons = {
      home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
      book:'<path d="M12 6.5c-2.7-1.7-5.4-1.9-9-1V20c3.6-.9 6.3-.7 9 1m0-14.5c2.7-1.7 5.4-1.9 9-1V20c-3.6-.9-6.3-.7-9 1m0-14.5V21"/>',
      labs:'<path d="M9 3h6m-5 0v7l-5.6 8.5A2 2 0 0 0 6 21h12a2 2 0 0 0 1.6-2.5L14 10V3M8 15h8"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
      arrow:'<path d="M4 12h16m-7-7 7 7-7 7"/>',
      check:'<path d="m5 12 4 4L19 6"/>',
      close:'<path d="M5 5l14 14M19 5 5 19"/>',
      bookMark:'<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v20H7.5A2.5 2.5 0 0 1 5 19.5Zm0 15A2.5 2.5 0 0 1 7.5 17H20"/>'
    };
    const icon=(key)=>'<svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">'+icons[key]+'</svg>';
    const entry=(m)=>"modulo-"+m.number+".html?aula="+m.number+".1";
    const progressKey=n=>"lacan-module-"+String(n).padStart(2,"0")+"-completed";
    const storage=n=>{
      try {
        const s=JSON.parse(localStorage.getItem(progressKey(n)));
        return Array.isArray(s) ? new Set(s.filter(x=>typeof x==="string"&&new RegExp("^"+n+"\\.[1-6]$").test(x))) : new Set();
      } catch {return new Set();}
    };
    const state=()=>modules.map(m=>({...m,completed:storage(m.number)}));
    const count=rows=>rows.reduce((n,m)=>n+m.completed.size,0);
    const resume=rows=>{
      let last="";
      try{last=JSON.parse(localStorage.getItem("lacan-study-last-lesson"))||"";}catch{}
      const match=typeof last==="string"&&last.match(/^modulo-([1-6])\.html\?aula=\1\.([1-6])$/);
      if(match){
        const n=Number(match[1]),id=n+"."+match[2],found=rows.find(r=>r.number===n);
        if(found&&!found.completed.has(id)){
          return {href:last,label:"Continuar na aula "+id,detail:found.title};
        }
      }
      for (const r of rows) for (let i=1;i<=6;i++) if(!r.completed.has(r.number+"."+i)){
        return {href:"modulo-"+r.number+".html?aula="+r.number+"."+i,label:r.completed.size?"Continuar na aula "+r.number+"."+i:"Começar a aula "+r.number+"."+i,detail:r.title};
      }
      return {href:"modulo-1.html?aula=1.1",label:"Revisar as aulas",detail:"Você concluiu as 36 aulas disponíveis."};
    };
    const path=location.pathname.split("/").pop()||"index.html";
    const currentModule=Number((path.match(/^modulo-(\d+)\.html$/)||[])[1]||0);
    const currentLab=labs.find(l=>l.href===path);
    const selectedArea=currentModule?"modules":currentLab?"labs":"home";
    const esc=v=>String(v).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));
    const appButton=document.createElement("button");
    appButton.type="button";appButton.id="lacanMenuTrigger";appButton.className="lacan-menu-trigger";
    appButton.setAttribute("aria-haspopup","dialog");appButton.setAttribute("aria-expanded","false");
    appButton.setAttribute("aria-controls","lacanAppDrawer");
    appButton.innerHTML=icon("menu")+'<span>Menu</span>';
    const actions=document.querySelector(".topbar .topactions");
    if (actions)actions.append(appButton);
    else {
      const header=document.querySelector(".topbar");
      if(header)header.append(appButton);
      else document.body.prepend(appButton);
    }

    // Semântica: os quatro destinos de navegação são estáveis em todo o aplicativo.
    const bar=document.createElement("nav");
    bar.id="lacanAppBar";bar.className="lacan-app-bar";bar.setAttribute("aria-label","Navegação principal do aplicativo");
    bar.innerHTML=[
      '<a class="lacan-app-dock-item" href="index.html" data-dock="home"'+(selectedArea==="home"?' aria-current="page"':'')+'>'+icon("home")+'<span>Início</span></a>',
      '<button class="lacan-app-dock-item" type="button" data-app-section="modules" data-dock="modules"'+(selectedArea==="modules"?' aria-current="page"':'')+'>'+icon("book")+'<span>Aulas</span></button>',
      '<button class="lacan-app-dock-item" type="button" data-app-section="labs" data-dock="labs"'+(selectedArea==="labs"?' aria-current="page"':'')+'>'+icon("labs")+'<span>Laboratórios</span></button>',
      '<button class="lacan-app-dock-item" type="button" data-app-section="overview" data-dock="menu">'+icon("menu")+'<span>Menu</span></button>'
    ].join("");
    document.body.append(bar);

    const veil=document.createElement("div");
    veil.className="lacan-app-overlay";veil.id="lacanAppMenu";veil.hidden=true;
    veil.innerHTML='<div class="lacan-app-scrim" data-app-close aria-hidden="true"></div>'+
      '<section class="lacan-app-drawer" id="lacanAppDrawer" role="dialog" aria-modal="true" aria-labelledby="lacanAppTitle" tabindex="-1">'+
      '<div class="lacan-app-drawer-header"><div class="lacan-app-logo" aria-hidden="true">L<span>.</span></div>'+
      '<div class="lacan-app-drawer-brand"><span>ESTUDE NO SEU RITMO</span><strong id="lacanAppTitle">Sua formação</strong></div>'+
      '<button type="button" class="lacan-app-close" data-app-close aria-label="Fechar menu">'+icon("close")+'</button></div>'+
      '<div class="lacan-app-tabs" role="tablist" aria-label="Seções do menu">'+
      '<button role="tab" type="button" data-menu-tab="overview" aria-controls="lacanAppPanel-overview" aria-selected="true">Visão geral</button>'+
      '<button role="tab" type="button" data-menu-tab="modules" aria-controls="lacanAppPanel-modules" aria-selected="false" tabindex="-1">Aulas</button>'+
      '<button role="tab" type="button" data-menu-tab="labs" aria-controls="lacanAppPanel-labs" aria-selected="false" tabindex="-1">Laboratórios</button>'+
      '<button role="tab" type="button" data-menu-tab="progress" aria-controls="lacanAppPanel-progress" aria-selected="false" tabindex="-1">Meu progresso</button></div>'+
      '<div class="lacan-app-scroll">'+
      '<section class="lacan-app-panel" id="lacanAppPanel-overview" role="tabpanel"><div id="lacanAppOverview"></div></section>'+
      '<section class="lacan-app-panel" id="lacanAppPanel-modules" role="tabpanel" hidden><div id="lacanAppModules"></div></section>'+
      '<section class="lacan-app-panel" id="lacanAppPanel-labs" role="tabpanel" hidden><div id="lacanAppLabs"></div></section>'+
      '<section class="lacan-app-panel" id="lacanAppPanel-progress" role="tabpanel" hidden><div id="lacanAppProgress"></div></section>'+
      '</div><div class="lacan-app-drawer-footer"><span>100% gratuito</span><span>Seu progresso fica neste dispositivo</span></div></section>';
    document.body.append(veil);

    const $=id=>document.getElementById(id);
    const appPanels=["overview","modules","labs","progress"];
    const barButtons=[...bar.querySelectorAll("[data-app-section]")];
    let opener=null,lastOverflow="",activePanel="overview";
    const render=()=>{
      const rows=state(),done=count(rows),next=resume(rows);
      const percent=Math.round(done/36*100);
      const progressVisual='<div class="lacan-app-stat"><div class="lacan-app-stat-top"><span>SEU PERCURSO</span><strong>'+done+' <small>/ 36 aulas</small></strong></div>'+
        '<div class="lacan-app-meter" role="progressbar" aria-label="Aulas concluídas" aria-valuenow="'+done+'" aria-valuemin="0" aria-valuemax="36"><span style="width:'+percent+'%"></span></div>'+
        '<div class="lacan-app-stat-bottom"><span>6 módulos com aulas disponíveis</span><span>'+percent+'% concluído</span></div></div>';
      const currentNote=currentModule?'Módulo '+String(currentModule).padStart(2,"0")+' · Você está nas aulas':currentLab?"Laboratório · "+currentLab.title:"Curso gratuito · 18 módulos planejados";
      $("lacanAppOverview").innerHTML=
        '<p class="lacan-app-eyebrow">O SEU ESPAÇO DE ESTUDOS</p>'+
        '<h2 class="lacan-app-heading">O conhecimento está <em>ao seu alcance.</em></h2>'+
        '<p class="lacan-app-lead">Acesse suas aulas, experimente os laboratórios e acompanhe o que já estudou.</p>'+
        '<div class="lacan-app-context">'+icon("bookMark")+'<span>'+esc(currentNote)+'</span></div>'+
        progressVisual+
        '<a class="lacan-app-continue" href="'+esc(next.href)+'"><span class="lacan-app-continue-label">CONTINUAR ESTUDANDO<strong>'+esc(next.label)+'</strong><small>'+esc(next.detail)+'</small></span>'+icon("arrow")+'</a>'+
        '<div class="lacan-app-shortcuts">'+
          '<button type="button" data-app-goto="modules">'+icon("book")+'<span>Ver as aulas</span>'+icon("arrow")+'</button>'+
          '<button type="button" data-app-goto="labs">'+icon("labs")+'<span>Laboratórios</span>'+icon("arrow")+'</button>'+
          '<button type="button" data-app-goto="progress">'+icon("check")+'<span>Meu progresso</span>'+icon("arrow")+'</button>'+
          '<a href="instalar.html">'+icon("home")+'<span>Instalar aplicativo</span>'+icon("arrow")+'</a>'+
        '</div>';
      $("lacanAppModules").innerHTML=
        '<p class="lacan-app-eyebrow">CICLO I · FUNDAMENTOS</p>'+
        '<h2 class="lacan-app-heading">Escolha <em>uma aula.</em></h2>'+
        '<p class="lacan-app-lead">Os seis primeiros módulos têm conteúdo completo. Você pode voltar a qualquer aula.</p>'+
        '<div class="lacan-app-module-list">'+rows.map(m=>{
          const n=m.completed.size,link=entry(m);
          return '<a class="lacan-app-module '+(currentModule===m.number?"is-here":"")+'" href="'+link+'">'+
            '<span class="lacan-app-module-number">'+String(m.number).padStart(2,"0")+'</span>'+
            '<span class="lacan-app-module-copy"><strong>'+esc(m.title)+'</strong><small>'+n+' de 6 aulas concluídas</small><span class="lacan-app-module-meter"><span style="width:'+(100*n/6)+'%"></span></span></span>'+
            (n===6?'<span class="lacan-app-module-check" aria-label="Módulo concluído">'+icon("check")+'</span>':icon("arrow"))+
            '</a>';
        }).join("")+'</div>'+
        '<a class="lacan-app-planned" href="index.html#modulos">Ver também os módulos 07 a 18, ainda em preparação '+icon("arrow")+'</a>';
      $("lacanAppLabs").innerHTML=
        '<p class="lacan-app-eyebrow">APRENDER FAZENDO</p><h2 class="lacan-app-heading">Explore os <em>laboratórios.</em></h2>'+
        '<p class="lacan-app-lead">Seis experiências para rever os assuntos das aulas. Você pode experimentá-las quando chegar ao tema.</p>'+
        '<div class="lacan-app-lab-list">'+labs.map(l=>'<a class="lacan-app-lab '+(l===currentLab?"is-here":"")+'" href="'+esc(l.href)+'">'+
          '<span class="lacan-app-lab-symbol" aria-hidden="true">'+esc(l.symbol)+'</span>'+
          '<span><strong>'+esc(l.title)+'</strong><small>Módulo '+String(l.number).padStart(2,"0")+' · '+esc(l.subtitle)+'</small></span>'+
          icon("arrow")+'</a>').join("")+'</div>';
      $("lacanAppProgress").innerHTML=
        '<p class="lacan-app-eyebrow">MEU PROGRESSO</p><h2 class="lacan-app-heading">O caminho <em>que você fez.</em></h2>'+
        '<p class="lacan-app-lead">O aplicativo registra as avaliações concluídas neste navegador, sem pedir cadastro.</p>'+
        progressVisual+
        '<div class="lacan-app-progress-list">'+rows.map(m=>{
          const missing=Array.from({length:6},(_,i)=>m.number+"."+(i+1)).filter(id=>!m.completed.has(id));
          const href=missing.length?'modulo-'+m.number+'.html?aula='+missing[0]:'modulo-'+m.number+'.html?aula='+m.number+'.1';
          return '<a href="'+href+'" class="lacan-app-progress-row"><span><strong>'+String(m.number).padStart(2,"0")+' · '+esc(m.short)+'</strong><small>'+m.completed.size+' de 6 aulas</small></span><span class="lacan-app-progress-indicator">'+(m.completed.size===6?icon("check"):icon("arrow"))+'</span></a>';
        }).join("")+'</div>'+
        '<p class="lacan-app-storage-note">O progresso e as anotações ficam salvos apenas neste dispositivo. Se você limpar os dados do navegador ou trocar de aparelho, eles não serão transferidos automaticamente.</p>';
    };
    const setTab=(tab,focus=false)=>{
      if(!appPanels.includes(tab))return;
      activePanel=tab;
      veil.querySelectorAll("[data-menu-tab]").forEach(b=>{
        const on=b.dataset.menuTab===tab;
        b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1;
        if(on&&focus)b.focus();
      });
      appPanels.forEach(name=>$("lacanAppPanel-"+name).hidden=name!==tab);
      const scroll=veil.querySelector(".lacan-app-scroll");
      if(scroll)scroll.scrollTop=0;
    };
    const open=(tab="overview",origin=null)=>{
      opener=origin||document.activeElement;
      render();
      lastOverflow=document.body.style.overflow;
      document.body.style.overflow="hidden";
      veil.hidden=false;document.body.classList.add("lacan-app-is-open");
      appButton.setAttribute("aria-expanded","true");
      barButtons.forEach(b=>b.setAttribute("aria-expanded",String(b===origin)));
      setTab(tab);
      requestAnimationFrame(()=>{
        const first=veil.querySelector('[data-menu-tab][aria-selected="true"]');
        (first||$("lacanAppDrawer")).focus({preventScroll:true});
      });
    };
    const close=()=>{
      if(veil.hidden)return;
      veil.hidden=true;
      document.body.style.overflow=lastOverflow;
      document.body.classList.remove("lacan-app-is-open");
      appButton.setAttribute("aria-expanded","false");
      barButtons.forEach(b=>b.setAttribute("aria-expanded","false"));
      if(opener&&typeof opener.focus==="function")opener.focus({preventScroll:true});
    };
    appButton.addEventListener("click",()=>veil.hidden?open("overview",appButton):close());
    bar.addEventListener("click",e=>{
      const b=e.target.closest("[data-app-section]");
      if(b){open(b.dataset.appSection,b);}
    });
    veil.addEventListener("click",e=>{
      if(e.target.closest("[data-app-close]")){close();return;}
      const shortcut=e.target.closest("[data-app-goto]");
      if(shortcut){setTab(shortcut.dataset.appGoto,true);return;}
      const tab=e.target.closest("[data-menu-tab]");
      if(tab){setTab(tab.dataset.menuTab);return;}
    });
    veil.querySelector(".lacan-app-tabs").addEventListener("keydown",e=>{
      if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
      e.preventDefault();
      const old=appPanels.indexOf(activePanel);
      const i=e.key==="Home"?0:e.key==="End"?appPanels.length-1:e.key==="ArrowRight"?(old+1)%appPanels.length:(old+appPanels.length-1)%appPanels.length;
      setTab(appPanels[i],true);
    });
    document.addEventListener("keydown",e=>{
      if(veil.hidden)return;
      if(e.key==="Escape"){e.preventDefault();close();return;}
      if(e.key!=="Tab")return;
      const nodes=[...$("lacanAppDrawer").querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter(n=>!n.closest("[hidden]")&&!n.hidden);
      if(!nodes.length){e.preventDefault();$("lacanAppDrawer").focus();return;}
      const first=nodes[0],last=nodes[nodes.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      else if(!$("lacanAppDrawer").contains(document.activeElement)){e.preventDefault();first.focus();}
    });
    window.addEventListener("pageshow",()=>{if(!veil.hidden)render();});
    window.addEventListener("storage",()=>{if(!veil.hidden)render();});
    // O botão superior também pode abrir diretamente a lista via app-link em qualquer página.
    window.LacanAppMenu={open:section=>open(appPanels.includes(section)?section:"overview",appButton),close};
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();