/* Formação Lacaniana, Aula 4.5. Roteiro visual contínuo baseado no áudio de 2min14s.
 * Não modifica o leitor, as notas, a avaliação ou a animação legada, preservada no histórico Git.
 */
(()=>{"use strict";
function render(lesson){
 if(lesson?.id!=="4.5")return "";
 return '<section class="lm45-reimagined" aria-label="Narração ilustrada de O pequeno outro">'+
 '<div class="lm45-reimagined-head"><span>Narração visual · O pequeno outro</span><span>2 min 14 s</span></div>'+
 '<iframe class="lm45-iframe" title="Animação sincronizada com a narração do pequeno outro" src="diagrama-pequeno-outro.html?embed=1&v=play-fix-2" loading="lazy" allow="autoplay"></iframe>'+
 '<div class="lm45-reimagined-foot">A voz conduz os movimentos. <a href="diagrama-pequeno-outro.html">Abrir esta experiência em tela própria ↗</a></div></section>';
}
window.LACAN_MOTION_45={render,mount:()=>{},unmount:()=>{}};
})();