/* Sprint 4 — Laboratório do Estádio do Espelho.
   Estrutura didática, não simulação psicológica de um bebê.
   Fonte principal: Lacan, "Le stade du miroir comme formateur de la fonction du Je"
   (apresentado em Zurique em 1949; publicado na Revue française de psychanalyse
   vol. 13, nº 4, pp. 449–455; posteriormente em Écrits).
   Referência de catalogação: https://catalogue.bnf.fr/ark:/12148/cb42795366s
*/
window.LACAN_MIRROR = {
  title:"Laboratório do Estádio do Espelho",
  sources:[
    {label:"Jacques Lacan, O estádio do espelho como formador da função do eu (1949), em Escritos",url:"https://catalogue.bnf.fr/ark:/12148/cb42795366s",note:"Registro da publicação original na Bibliothèque nationale de France."},
    {label:"Bibliothèque Sigmund Freud · Registro do artigo de 1949",url:"https://bsf.spp.asso.fr/index.php?id=13781&lvl=notice_display",note:"Dados bibliográficos do artigo na Revue française de psychanalyse."},
    {label:"Stanford Encyclopedia of Philosophy · Jacques Lacan",url:"https://plato.stanford.edu/entries/lacan/",note:"Panorama crítico e contextualização histórica."}
  ],
  modes:[
    {id:"motricidade",tag:"01 · Experiência e coordenação",title:"O corpo vivido não é uma imagem acabada",
      text:"Em sua construção teórica, Lacan destaca uma discordância entre a insuficiência motora da criança e a forma global que uma imagem pode oferecer. Não se trata de medir sensações reais por um desenho.",
      focus:"Coordenação em desenvolvimento",insight:"A imagem não é uma fotografia do grau de domínio motor da criança."},
    {id:"imagem",tag:"02 · Forma visual",title:"A imagem apresenta uma unidade",
      text:"A figura especular apresenta uma forma organizada, reconhecível e total. A unidade pode ser tomada como uma antecipação de domínio que ainda não corresponde à experiência motora.",
      focus:"Forma totalizante",insight:"A unidade da imagem não significa que o eu já fosse uma identidade interior pronta."},
    {id:"tensao",tag:"03 · O descompasso",title:"A tensão entre dois planos",
      text:"Compare os dois planos ao mesmo tempo. A força da formulação lacaniana está justamente na distância entre a unidade assumida pela imagem e a condição de imaturidade motora.",
      focus:"Antecipação ≠ domínio efetivo",insight:"A identificação não elimina o descompasso: uma forma de unidade é assumida em uma relação alienante."}
  ],
  relations:[
    {id:"imagem",label:"A forma que se apresenta",badge:"FORMA",title:"Uma imagem de unidade",
      description:"A imagem especular reúne o corpo em uma Gestalt: uma forma total que se oferece à identificação. É um recurso decisivo para a elaboração lacaniana do eu."},
    {id:"identificacao",label:"A identificação",badge:"OPERAÇÃO",title:"Assumir uma imagem",
      description:"Não se trata apenas de enxergar um reflexo. A identificação envolve uma transformação descrita por Lacan quando uma imagem é assumida. A forma pode antecipar uma unidade ainda não vivida como domínio motor."},
    {id:"alienacao",label:"Uma unidade fora de si",badge:"CONSEQUÊNCIA",title:"O caráter alienante da formação do eu",
      description:"A imagem dá suporte à constituição do eu, mas é uma forma exterior. A unidade que ela organiza não demonstra uma identidade transparente e autossuficiente."},
    {id:"alteridade",label:"A relação com o outro",badge:"ARTICULAÇÃO",title:"A alteridade não é um detalhe",
      description:"O registro imaginário envolve relações de identificação e rivalidade. Em momentos posteriores, Lacan articula essas relações com funções simbólicas. Não reduza o grande Outro a uma pessoa diante do espelho."}
  ],
  trials:[
    {phase:"01 / RECONHECER",title:"O que a imagem oferece?",
      prompt:"Considere o contraste entre uma coordenação motora ainda em desenvolvimento e a forma unificada que a imagem apresenta. Qual formulação expressa melhor o problema?",
      options:[
        {text:"A imagem prova que a criança já possui domínio motor completo.",ok:false,why:"A proposta destaca justamente o descompasso entre uma forma de unidade e a insuficiência motora."},
        {text:"A imagem pode fornecer uma unidade antecipada que participa da identificação.",ok:true,why:"A forma especular oferece a unidade que será assumida na identificação, sem coincidir com o domínio motor efetivo."},
        {text:"A imagem é irrelevante; a formação do eu depende apenas da maturação do corpo.",ok:false,why:"Na elaboração lacaniana, a imagem desempenha uma função constitutiva. A maturação biológica, isoladamente, não descreve o problema teórico."}
      ]},
    {phase:"02 / COMPREENDER",title:"Reconhecimento é autoconhecimento?",
      prompt:"Uma estudante diz: ‘No espelho, a criança finalmente descobre quem ela realmente é’. Como você responderia?",
      options:[
        {text:"Sim. A identificação revela uma identidade interior definitiva.",ok:false,why:"Esse é um equívoco importante: a imagem participa da formação do eu, mas não garante acesso a uma essência interior."},
        {text:"Não. A identificação com uma forma exterior participa da constituição do eu e possui uma dimensão alienante.",ok:true,why:"A identificação é constitutiva, não uma simples confirmação de algo que estaria pronto antes dela."},
        {text:"Não. Porque, para Lacan, o eu não tem qualquer relação com as imagens.",ok:false,why:"A função da imagem é central para o estádio do espelho; negá-la elimina o problema em vez de esclarecê-lo."}
      ]},
    {phase:"03 / APLICAR CRITICAMENTE",title:"Quando a metáfora engana",
      prompt:"Um vídeo afirma: ‘O estádio do espelho é apenas a fase em que um bebê reconhece o próprio rosto no vidro’. Qual crítica é mais rigorosa?",
      options:[
        {text:"O ponto central não é um teste de reconhecimento facial: Lacan formula uma identificação imaginária e uma antecipação de unidade.",ok:true,why:"A cena do espelho permite formular a identificação, a unidade antecipada e o caráter alienante da formação do eu. Não é um teste simples de autorreconhecimento."},
        {text:"A afirmação está completa, porque a teoria consiste em saber a idade exata do reconhecimento facial.",ok:false,why:"A teoria não se esgota no comportamento observável nem em identificar a idade de reconhecimento no espelho."},
        {text:"A afirmação só erra porque o grande Outro é obrigatoriamente a mãe que segura o bebê.",ok:false,why:"Isso confundiria uma pessoa empírica com uma função conceitual. O grande Outro não equivale automaticamente à mãe ou a outro indivíduo."}
      ]}
  ],
  concepts:[
    {name:"Eu / moi",desc:"Instância cuja constituição é pensada a partir de identificações, particularmente imaginárias; não é sinônimo simples do sujeito do inconsciente."},
    {name:"Imago",desc:"Termo utilizado por Lacan para indicar a imagem em sua função formadora; não equivale apenas a uma fotografia ou reflexo físico."},
    {name:"Eu ideal",desc:"Forma ideal de unidade ligada à identificação especular. Não confundir automaticamente com o ideal do eu, cuja articulação será aprofundada depois."},
    {name:"Alienação",desc:"Aqui, diz respeito ao caráter exterior e identificatório da unidade assumida. Não substitui a formalização posterior da alienação no Seminário 11."}
  ]
};