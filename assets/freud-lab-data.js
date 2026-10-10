/* Oficina do Inconsciente • Sprint 7
   Atividades são modelos pedagógicos para estudar textos, não testes diagnósticos.
   Referências: Freud Museum London e Library of Congress (listadas na página). */
window.LACAN_FREUD_LAB={
  rooms:[
    {id:"topicas",index:"01",name:"Modelos da mente",title:"Dois mapas, perguntas diferentes",
     description:"Identifique a que formulação freudiana cada proposição corresponde. Os dois mapas não podem ser sobrepostos como se todos os nomes fossem equivalentes.",
     items:[
      {id:"a",text:"Distingue inconsciente, pré-consciente e consciente.",correct:"primeira",why:"A primeira tópica organiza sistemas e problemas de acesso e censura. Ela não é um mapa anatômico."},
      {id:"b",text:"Distingue id, eu e supereu.",correct:"segunda",why:"A segunda tópica, elaborada em O eu e o id (1923), introduz uma nova formulação das instâncias psíquicas."},
      {id:"c",text:"Inclui conteúdos que não estão conscientes agora, mas podem ser lembrados sem o mesmo tipo de resistência.",correct:"primeira",why:"O pré-consciente é distinguido do inconsciente dinâmico na primeira tópica."},
      {id:"d",text:"Permite investigar a hipótese de que uma parcela do próprio eu participa de processos inconscientes.",correct:"segunda",why:"A segunda tópica responde a dificuldades da formulação anterior e não identifica todo o eu à consciência."},
      {id:"e",text:"Descreve literalmente três órgãos localizados em regiões específicas do cérebro.",correct:"nenhuma",why:"Nenhuma tópica freudiana é um atlas anatômico de três órgãos cerebrais."},
      {id:"f",text:"Reformula conflitos entre instâncias, com o eu situado em relações com exigências do id e do supereu.",correct:"segunda",why:"A segunda tópica permite trabalhar relações conflitivas entre instâncias, não três personagens autônomos dentro de uma cabeça."}
     ]},
    {id:"sonho",index:"02",name:"O trabalho do sonho",title:"Reconheça quatro operações",
     description:"Leia cenas fictícias inventadas para o exercício. Identifique a operação freudiana que melhor introduzem. Nenhuma cena permite interpretar o sonho de uma pessoa real.",
     items:[
      {id:"a",text:"Uma figura sonhada reúne traços e lembranças associados a várias pessoas.",correct:"condensacao",why:"O exemplo sugere condensação: múltiplas cadeias participam de um elemento do conteúdo manifesto."},
      {id:"b",text:"Uma tensão ligada a um tema central surge no relato associada a um detalhe aparentemente secundário.",correct:"deslocamento",why:"O exemplo sugere deslocamento: uma mudança da ênfase ou da intensidade atribuída a elementos do sonho."},
      {id:"c",text:"Relações abstratas aparecem transformadas em situações e imagens no relato do sonho.",correct:"figurabilidade",why:"Freud discute a figurabilidade como um problema de apresentação dos pensamentos em materiais representáveis."},
      {id:"d",text:"O relato lembrado ganha continuidade narrativa e parece menos fragmentário.",correct:"revisao",why:"A elaboração secundária ajuda a conferir coesão narrativa ao sonho tal como lembrado."}
     ]},
    {id:"cronologia",index:"03",name:"Freud em movimento",title:"Uma obra que se reformula",
     description:"Reordene cinco publicações históricas. Um ano não resolve uma teoria, mas ajuda a evitar que conceitos posteriores sejam projetados sobre textos anteriores.",
     initial:["1923","1915","1900","1920","1914"],
     correct:["1900","1914","1915","1920","1923"],
     cards:[
       {id:"1900",date:"1900",title:"A interpretação dos sonhos",note:"Inconsciente e trabalho do sonho."},
       {id:"1914",date:"1914",title:"Recordar, repetir e elaborar",note:"Repetição, resistência e transferência na clínica."},
       {id:"1915",date:"1915",title:"O recalque / O inconsciente",note:"Ensaios metapsicológicos importantes."},
       {id:"1920",date:"1920",title:"Além do princípio do prazer",note:"Novo horizonte para a questão da repetição."},
       {id:"1923",date:"1923",title:"O eu e o id",note:"Reformulação tópica."}
     ]}
  ],
  choices:{
    topicas:[
      {id:"primeira",label:"Primeira tópica"},
      {id:"segunda",label:"Segunda tópica"},
      {id:"nenhuma",label:"Nenhuma das duas"}
    ],
    sonho:[
      {id:"condensacao",label:"Condensação"},
      {id:"deslocamento",label:"Deslocamento"},
      {id:"figurabilidade",label:"Figurabilidade"},
      {id:"revisao",label:"Elaboração secundária"}
    ]
  },
  sources:[
    {label:"Freud Museum London · What is the Unconscious?",url:"https://www.freud.org.uk/schools/resources/what-is-the-unconscious/"},
    {label:"Freud Museum London · The Dream-Work",url:"https://www.freud.org.uk/schools/resources/the-interpretation-of-dreams/the-dream-work/"},
    {label:"Library of Congress · The Ego and the Id (1923)",url:"https://www.loc.gov/exhibits/freud/ex/73a.html"},
    {label:"Freud, S. Recordar, repetir e elaborar (1914) · fonte primária em inglês",url:"https://marcuse.faculty.history.ucsb.edu/classes/201/articles/1914FreudRemembering.pdf"}
  ]
};