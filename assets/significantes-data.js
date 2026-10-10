/* Laboratório dos Significantes · Sprint 5
   Exercícios construídos para introdução didática, não testes psicológicos.
   Referências: Lacan, "A instância da letra no inconsciente ou a razão desde Freud" (1957),
   em Escritos; Lacan, Seminário 5; Stanford Encyclopedia of Philosophy, Jacques Lacan. */
window.LACAN_SIGNIFICANTES = {
  title: "Laboratório dos Significantes",
  intro: "O sentido não está guardado intacto dentro de cada palavra. Ele se constitui por relações, diferenças e posições; para Lacan, a cadeia significante também importa ao problema do sujeito do inconsciente.",
  references: [
    {title:"Jacques Lacan · A instância da letra no inconsciente ou a razão desde Freud (1957)", url:"https://recherche-lacan.gnipl.fr/2015/07/03/les-ecrits-linstance-de-la-lettre-dans-linconscient-ou-la-raison-depuis-freud-1957/",detail:"Texto primário em francês; distingue conexão e substituição entre significantes."},
    {title:"Stanford Encyclopedia of Philosophy · Jacques Lacan",url:"https://plato.stanford.edu/entries/lacan/",detail:"Visão acadêmica sobre significante, cadeia e linguagem no retorno a Freud."},
    {title:"Internet Encyclopedia of Philosophy · Jacques Lacan",url:"https://iep.utm.edu/lacweb/",detail:"Introdução às relações entre linguagem, desejo, metáfora e metonímia."}
  ],
  slots: [
    {key:"figura", prompt:"Que imagem organiza a cena?", starting:"refúgio", choices:[
      {value:"refúgio", note:"‘Refúgio’ sugere proteção e acolhimento. A casa ganha uma direção de leitura."},
      {value:"labirinto", note:"‘Labirinto’ desloca a cena para a perda de orientação; a mesma casa participa de outro arranjo de sentido."},
      {value:"palco", note:"‘Palco’ introduz exposição e encenação. O restante da frase pode ser reinterpretado sob essa imagem."}
    ]},
    {key:"vestigio",prompt:"O que o silêncio guarda?",starting:"uma promessa",choices:[
      {value:"uma promessa",note:"‘Promessa’ aproxima o silêncio de uma expectativa ou compromisso ainda aberto."},
      {value:"uma dúvida",note:"‘Dúvida’ faz prevalecer a incerteza; o silêncio agora sustenta outra tensão."},
      {value:"um eco",note:"‘Eco’ desloca o silêncio para uma persistência, como se algo continuasse ressoando."}
    ]},
    {key:"palavra",prompt:"O que ficou escrito na carta?",starting:"VOLTA",choices:[
      {value:"VOLTA",note:"‘VOLTA’ reorienta a cena em torno da possibilidade de retorno, mas não fixa quem ou o que retorna."},
      {value:"ADEUS",note:"‘ADEUS’ produz a direção de uma despedida; o efeito global depende das palavras ao redor."},
      {value:"TALVEZ",note:"‘TALVEZ’ mantém indeterminada a resolução da cena, sem oferecer uma chave única de sentido."}
    ]}
  ],
  machineCases: [
    {id:"rocha",type:"substituicao",title:"Uma palavra ocupa outro lugar",setup:"Ao descrever alguém, a personagem diz: ‘Ela é uma rocha’.",nodes:["ela","é","uma rocha"],source:"Um termo figurado assume uma posição na frase.",result:"A substituição permite um efeito de significação associado, neste contexto, à firmeza ou à resistência.",why:"Há uma operação de substituição: ‘rocha’ funciona metaforicamente na posição de uma qualificação. Isso é um exemplo didático de linguagem; não prova um mecanismo inconsciente em uma pessoa.",note:"Metáfora não significa apenas trocar palavras por sinônimos."},
    {id:"corredor",type:"conexao",title:"Uma sequência em movimento",setup:"Ao ler ‘chave’, a personagem prossegue: ‘porta’, ‘corredor’, ‘quarto’.",nodes:["chave","porta","corredor","quarto"],source:"Os termos são ligados por relações de contiguidade construídas no exemplo.",result:"O encadeamento desloca a atenção de um termo para outro sem condensar tudo numa única palavra.",why:"A conexão entre termos é usada aqui como analogia elementar de encadeamento metonímico. Nem toda associação de palavras é, por isso, uma metonímia do desejo ou uma formação do inconsciente.",note:"Uma cadeia não é um dicionário de significados secretos."},
    {id:"farol",type:"substituicao",title:"Uma imagem muda a predicação",setup:"Ao falar de uma pessoa importante, ele diz: ‘Você é meu farol’.",nodes:["você","é","meu farol"],source:"‘Farol’ passa a operar no lugar de uma descrição literal da função dessa pessoa.",result:"A substituição possibilita uma leitura figurada de orientação e referência.",why:"A formulação permite observar uma relação metafórica. O efeito não é uma interpretação clínica da pessoa que a pronunciou.",note:"O sentido não depende apenas da palavra ‘farol’: depende também da posição e do contexto."},
    {id:"carta",type:"conexao",title:"Deslocar-se pela vizinhança",setup:"A narrativa passa por ‘carta’, ‘envelope’, ‘endereço’, ‘viagem’ e ‘chegada’.",nodes:["carta","envelope","endereço","viagem","chegada"],source:"Os termos organizam um percurso por proximidades narrativas.",result:"O percurso sustenta um encadeamento em que cada elemento remete a outro.",why:"Esta é uma demonstração didática de conexão por contiguidade. A metonímia lacaniana, sobretudo em sua relação com desejo e falta, exige elaboração muito mais rigorosa do que apenas listar palavras próximas.",note:"O desejo como metonímia é uma tese teórica, não uma regra para analisar frases isoladas."}
  ],
  quiz: [
    {phase:"Reconhecimento", title:"O que caracteriza uma cadeia?",question:"Em uma leitura orientada por Lacan, qual afirmação é mais adequada?",answers:[
      {label:"Cada significante possui um sentido único e imutável.",correct:false,explanation:"A relação entre os significantes e o contexto importa; o sentido não está definitivamente encerrado em cada termo."},
      {label:"Os efeitos de sentido dependem das relações entre significantes e de sua posição.",correct:true,explanation:"A articulação diferencial da cadeia está no centro desse primeiro problema de aprendizagem."},
      {label:"A cadeia permite descobrir automaticamente o segredo inconsciente de quem fala.",correct:false,explanation:"A cadeia significante não é um algoritmo de diagnóstico nem um decodificador universal de falas."}
    ]},
    {phase:"Compreensão",title:"Duas operações, duas ênfases",question:"Qual distinção é mais rigorosa para introduzir metáfora e metonímia no texto de 1957?",answers:[
      {label:"Metáfora diz respeito à substituição significante; metonímia, à conexão na cadeia.",correct:true,explanation:"Lacan trabalha com substituição e conexão significantes, em articulação com a condensação e o deslocamento freudianos. Isso não as reduz a truques de escrita."},
      {label:"Metáfora é sempre verdadeira; metonímia é sempre um erro de linguagem.",correct:false,explanation:"São operações estruturais e retóricas distintas, não categorias de verdadeiro e falso."},
      {label:"Ambas significam simplesmente mudar uma palavra por outra sem alterar o sentido.",correct:false,explanation:"Substituição e conexão têm relações diferentes com os efeitos de significação. Reduzi-las a uma troca neutra apaga o problema."}
    ]},
    {phase:"Aplicação crítica",title:"A interpretação tem limites",question:"Um estudante alterou três palavras de uma narrativa e afirma: ‘O programa revelou o inconsciente da personagem’. O que você faria?",answers:[
      {label:"Aceitaria: qualquer substituição verbal reproduz uma formação inconsciente.",correct:false,explanation:"Alterar palavras mostra efeitos de linguagem; não demonstra o funcionamento inconsciente de uma personagem nem autoriza interpretações clínicas."},
      {label:"Rejeitaria o estudo da linguagem, já que nenhum exemplo pode ensinar algo.",correct:false,explanation:"Exemplos e simulações podem ensinar relações conceituais, desde que seus limites sejam claros."},
      {label:"Distinguiria a analogia didática da interpretação psicanalítica e examinaria o contexto.",correct:true,explanation:"Essa distinção preserva a utilidade pedagógica do laboratório sem atribuir a ele uma capacidade diagnóstica que não tem."}
    ]}
  ]
};