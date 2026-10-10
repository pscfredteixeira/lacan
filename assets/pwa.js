/* Instalação do aplicativo web Lacan. Sem pop-ups automáticos ou rastreamento.
 * O iPhone instala pelo menu Compartilhar do Safari.
 */
(()=>{
  "use strict";
  if(!("serviceWorker" in navigator))return;
  if(location.protocol!=="https:"&&location.hostname!=="localhost")return;
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"})
      .catch(error=>console.warn("Não foi possível preparar o cache de estudo:",error));
  });
})();
