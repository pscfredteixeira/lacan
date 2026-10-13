/* Formação Lacaniana PWA — cache revisado com a publicação v1.
 * GitHub Pages /lacan/; conteúdo de estudo armazenado para leitura sem rede.
 * Progresso e anotações continuam no localStorage, sem sincronização entre instalações.
 */
const CACHE_NAME="lacan-study-pwa-v17";
const SHELL=["index.html","instalar.html","modulo-1.html","modulo-2.html","modulo-3.html","modulo-4.html","modulo-5.html","modulo-6.html","arquivo.html","espelho.html","significantes.html","oficina-freud.html","enigma-outro.html","circuito-desejo.html","manifest.webmanifest","apple-touch-icon.png","icons/icon-32.png","icons/icon-192.png","icons/icon-512.png","icons/lacan-mark.svg","assets/app.js","assets/app-shell.js","assets/app-shell.css","assets/archive-data.js","assets/archive.css","assets/archive.js","assets/course-data.js","assets/desejo-lab-data.js","assets/desejo-lab.css","assets/desejo-lab.js","assets/freud-lab-data.js","assets/freud-lab.css","assets/freud-lab.js","assets/lesson-motion.css","assets/lesson-motion.js","assets/lessons.css","assets/lessons.js","assets/lacan-hero.css","assets/lacan-portrait-editorial.webp","assets/freud-portrait-editorial.webp","assets/mirror-data.js","assets/mirror.css","assets/mirror.js","assets/module-01-content.js","assets/module-02-content.js","assets/module-03-content.js","assets/module-04-content.js","assets/module-05-content.js","assets/module-06-content.js","assets/outro-lab-data.js","assets/outro-lab.css","assets/outro-lab.js","assets/reader.css","assets/reader.js","assets/retroacao.css","assets/retroacao.js","assets/significantes-data.js","assets/significantes.css","assets/significantes.js","assets/styles.css","assets/theme.css","assets/pwa.js"];
const SCOPE=self.registration.scope;
const HOME=new URL("index.html",SCOPE).href;
self.addEventListener("install",event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    // Um eventual arquivo ausente não invalida o registro inteiro.
    const settled=await Promise.allSettled(SHELL.map(path=>cache.add(new URL(path,SCOPE).href)));
    const essential=["index.html","manifest.webmanifest","assets/styles.css","assets/app.js","assets/course-data.js"];
    const missing=essential.filter(path=>settled[SHELL.indexOf(path)]?.status!=="fulfilled");
    if(missing.length)console.warn("[Lacan PWA] Arquivos indisponíveis para uso offline:",missing);
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith("lacan-study-pwa-")&&key!==CACHE_NAME).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL(SCOPE).pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    try{
      const response=await fetch(request);
      if(response.ok&&response.type==="basic")await cache.put(request,response.clone()).catch(()=>{});
      return response;
    }catch(err){
      const cached=await cache.match(request,{ignoreSearch:true});
      if(cached)return cached;
      if(request.mode==="navigate"){
        const home=await cache.match(HOME);
        if(home)return home;
      }
      return Response.error();
    }
  })());
});
