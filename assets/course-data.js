/* Formação Lacaniana • Sprint 1
   Matriz curricular: 18 módulos, 108 aulas planejadas.
   Conteúdo integral das aulas será desenvolvido nos próximos sprints. */
window.LACAN_COURSE = {
  title: "Formação Lacaniana Interativa",
  subtitle: "O pensamento de Jacques Lacan, passo a passo.",
  totalModules: 18,
  totalLessons: 108,
  cycles: [
    { id: 1, eyebrow: "Ciclo I · Fundamentos", title: "Aprender a linguagem de Lacan", description: "De Freud à constituição do sujeito: os conceitos que sustentam todo o percurso.", range: "Módulos 01—06", mood: "base" },
    { id: 2, eyebrow: "Ciclo II · Articulações", title: "Pensar a teoria e a clínica", description: "O que muda quando o desejo, o fantasma e os conceitos fundamentais entram em relação.", range: "Módulos 07—13", mood: "middle" },
    { id: 3, eyebrow: "Ciclo III · Formalizações", title: "Percorrer o último ensino", description: "Gozo, discursos, sexuação, topologia e sinthoma, sem atalhos conceituais.", range: "Módulos 14—18", mood: "advanced" }
  ],
  modules: [
    {
      id: 1, cycle: 1, level: "Introdução", title: "Entrando no universo de Lacan",
      description: "O contexto de Lacan, seu retorno a Freud e um método de leitura para estudar sem se perder.",
      outcome: "Situar a obra de Lacan no tempo e reconhecer os problemas que atravessam seu ensino.",
      prereqs: "Nenhum — ponto de partida da formação.",
      lessons: [
        ["Quem foi Jacques Lacan?", "Percurso intelectual, clínica e principais momentos de sua produção."],
        ["Por que Lacan retorna a Freud?", "O sentido do retorno a Freud e suas consequências."],
        ["Lacan e os debates de sua época", "As associações, a duração das sessões e a continuidade de seu ensino."],
        ["Os interlocutores de Lacan", "Filosofia, linguística, antropologia e psiquiatria."],
        ["Como ler um texto lacaniano?", "Estratégias para atravessar dificuldades conceituais."],
        ["O pensamento lacaniano em movimento", "Continuidades, rupturas e revisões de conceitos."]
      ]
    },
    {
      id: 2, cycle: 1, level: "Introdução", title: "Freud: fundamentos necessários",
      description: "Uma base freudiana para que o retorno a Freud faça sentido, sem exigir estudo anterior.",
      outcome: "Compreender as referências freudianas indispensáveis para começar a ler Lacan.",
      prereqs: "Módulo 01",
      lessons: [
        ["A descoberta do inconsciente", "O inconsciente freudiano e a crítica da centralidade da consciência."],
        ["Sonhos e formações do inconsciente", "Sonhos, atos falhos e chistes como problemas de leitura."],
        ["Recalque e conflito psíquico", "Defesa, recalque e retorno do recalcado."],
        ["Pulsão e repetição", "A diferença entre instinto, pulsão e repetição."],
        ["Narcisismo, identificação e Édipo", "Referências que serão retomadas e transformadas por Lacan."],
        ["Transferência e método analítico", "Associação livre, transferência e escuta em Freud."]
      ]
    },
    {
      id: 3, cycle: 1, level: "Introdução · Intermediário", title: "Linguagem e inconsciente",
      description: "Significante, cadeia significante, metáfora e metonímia, em uma sequência acessível.",
      outcome: "Explicar por que a linguagem ocupa uma posição decisiva no ensino de Lacan.",
      prereqs: "Módulo 02",
      lessons: [
        ["A fala não é apenas comunicação", "O que a fala pode revelar além da intenção consciente."],
        ["Significante e significado", "De Saussure às transformações operadas por Lacan."],
        ["A cadeia significante", "Relações entre significantes e produção de sentido."],
        ["Metáfora e metonímia", "Substituição e deslocamento como operações a distinguir."],
        ["O inconsciente estruturado como uma linguagem", "Alcance e limites dessa formulação."],
        ["Laboratório das formações do inconsciente", "Uma primeira investigação guiada de mecanismos e relações."]
      ]
    },
    {
      id: 4, cycle: 1, level: "Introdução · Intermediário", title: "Espelho e formação do eu",
      description: "Da imagem corporal à identificação, passando pelo narcisismo e a relação especular.",
      outcome: "Distinguir o eu imaginário do sujeito do inconsciente.",
      prereqs: "Módulos 02 e 03",
      lessons: [
        ["O problema da imagem corporal", "A unidade imaginária como problema teórico."],
        ["O estádio do espelho", "Identificação e formação do eu."],
        ["Eu ideal e ideal do eu", "Uma distinção fundamental introduzida progressivamente."],
        ["Narcisismo e agressividade", "Rivalidade, identificação e relação especular."],
        ["O pequeno outro", "A alteridade no registro imaginário."],
        ["Por que o eu não é o sujeito?", "Uma síntese que prepara as próximas aulas."]
      ]
    },
    {
      id: 5, cycle: 1, level: "Intermediário", title: "Grande Outro e sujeito",
      description: "A ordem simbólica, o sujeito dividido e a diferença entre o Outro e uma pessoa concreta.",
      outcome: "Diferenciar pequeno outro e grande Outro e iniciar a leitura do sujeito barrado.",
      prereqs: "Módulos 03 e 04",
      lessons: [
        ["O que é o grande Outro?", "O Outro como lugar relacionado à linguagem e à ordem simbólica."],
        ["Outro e ordem simbólica", "O que precede o sujeito e o inscreve em relações simbólicas."],
        ["O sujeito dividido", "Introdução à escrita do sujeito barrado."],
        ["S1, S2 e representação do sujeito", "Relações significantes na formulação do sujeito."],
        ["O ponto de basta", "Estabilização retroativa do sentido e seus limites."],
        ["A falta no Outro", "A incompletude do Outro como questão teórica."]
      ]
    },
    {
      id: 6, cycle: 1, level: "Intermediário", title: "Necessidade, demanda e desejo",
      description: "Três conceitos que parecem próximos, mas desempenham funções diferentes.",
      outcome: "Articular necessidade, demanda, desejo e falta, sem confundi-los.",
      prereqs: "Módulo 05",
      lessons: [
        ["Da necessidade à demanda", "A necessidade transformada pela articulação na linguagem."],
        ["A dimensão do amor na demanda", "Demandar também implica uma relação ao Outro."],
        ["O desejo não é a necessidade", "Por que desejar não se reduz a satisfazer necessidades."],
        ["O desejo do Outro", "Ambiguidades e consequências de uma formulação decisiva."],
        ["A falta e a constituição do desejo", "Relações entre falta, sujeito dividido e Outro."],
        ["O enigma do desejo", "Integração conceitual e preparação para o fantasma."]
      ]
    },
    {
      id: 7, cycle: 2, level: "Intermediário", title: "Édipo, falo e função paterna",
      description: "Da elaboração freudiana à metáfora paterna e às transformações da função do pai.",
      outcome: "Diferenciar pessoa, função simbólica e formulação teórica da metáfora paterna.",
      prereqs: "Módulos 05 e 06",
      lessons: [
        ["O Édipo freudiano", "O ponto de partida de Freud e o problema que Lacan retoma."],
        ["O falo como significante", "Por que o falo não se reduz a um órgão anatômico."],
        ["A metáfora paterna", "Construção e função de uma articulação formal."],
        ["Nome-do-Pai e função simbólica", "Função, pessoa e figuras familiares não são sinônimos."],
        ["Castração e falta", "Lei, falta e desejo em suas relações conceituais."],
        ["Transformações da função paterna", "Abertura para a pluralização e os desenvolvimentos posteriores."]
      ]
    },
    {
      id: 8, cycle: 2, level: "Intermediário", title: "Real, Simbólico e Imaginário",
      description: "Os três registros e a história de suas articulações no ensino de Lacan.",
      outcome: "Distinguir os registros sem tratá-los como categorias rígidas ou independentes.",
      prereqs: "Módulos 04 a 07",
      lessons: [
        ["Introdução aos três registros", "O problema que RSI procura abordar."],
        ["O Imaginário", "Imagem, identificação e relações especulares."],
        ["O Simbólico", "Significantes, lei e relações estruturais."],
        ["O Real não é a realidade", "O Real e os limites das interpretações imediatas."],
        ["Articulações entre registros", "Pensar relações, não separar o pensamento em caixas."],
        ["As transformações de RSI", "Os registros em diferentes momentos do ensino."]
      ]
    },
    {
      id: 9, cycle: 2, level: "Intermediário", title: "Estruturas clínicas",
      description: "Neurose, psicose e perversão como problemas teóricos, sem automatizar diagnósticos.",
      outcome: "Compreender mecanismos psíquicos e os limites das classificações clínicas.",
      prereqs: "Módulos 07 e 08",
      lessons: [
        ["O problema da estrutura clínica", "Estrutura, manifestação e descrição comportamental."],
        ["Neurose e recalque", "Recalque e consequências teóricas."],
        ["Histeria e neurose obsessiva", "Diferenciações na tradição freudiana e lacaniana."],
        ["Psicose e foraclusão", "A construção lacaniana a partir dos textos."],
        ["Perversão e desmentido", "O percurso histórico e os problemas dessa categoria."],
        ["Limites das classificações", "Debates, divergências e uso responsável dos conceitos."]
      ]
    },
    {
      id: 10, cycle: 2, level: "Intermediário", title: "Fantasma, objeto a e angústia",
      description: "As relações entre o sujeito, a causa do desejo e a estrutura do fantasma.",
      outcome: "Distinguir objeto desejado, objeto a, fantasma e angústia.",
      prereqs: "Módulos 05, 06 e 08",
      lessons: [
        ["Por que o desejo exige uma articulação fantasmática?", "O problema que a fantasia permite formular."],
        ["A fantasia fundamental", "Além do devaneio e da imaginação cotidiana."],
        ["O objeto a", "Objeto e causa do desejo não são equivalentes."],
        ["O olhar e a voz", "Dimensões do objeto a."],
        ["A angústia", "Relações com a falta e o objeto."],
        ["Transformações do objeto a", "Diferentes elaborações ao longo do ensino."]
      ]
    },
    {
      id: 11, cycle: 2, level: "Intermediário · Avançado", title: "O grafo do desejo",
      description: "Um percurso por camadas para compreender as funções e as relações do grafo.",
      outcome: "Reconstruir os elementos principais do grafo e sua lógica.",
      prereqs: "Módulos 05, 06 e 10",
      lessons: [
        ["Por que construir um grafo?", "Os limites e a finalidade de uma formalização."],
        ["A primeira estrutura do grafo", "Elementos iniciais em sua articulação."],
        ["Mensagem e Outro", "Produção de sentido e campo do Outro."],
        ["O segundo nível do grafo", "Demanda, desejo e cadeia inconsciente."],
        ["Fantasma e desejo no grafo", "Articular a escrita do fantasma ao grafo."],
        ["Reconstrução integral do grafo", "Retomar o processo até alcançar a estrutura completa."]
      ]
    },
    {
      id: 12, cycle: 2, level: "Intermediário · Avançado", title: "Os quatro conceitos fundamentais",
      description: "O inconsciente, a repetição, a transferência e a pulsão no Seminário 11.",
      outcome: "Pensar os quatro conceitos em relação, incluindo alienação e separação.",
      prereqs: "Módulos 03 a 11",
      lessons: [
        ["O contexto do Seminário 11", "O momento institucional e intelectual de sua elaboração."],
        ["O inconsciente", "Abertura, fechamento e temporalidade."],
        ["Repetição, autômaton e tiquê", "Insistência significante e encontro com o Real."],
        ["A pulsão", "Circuito, objetos e diferença em relação ao instinto."],
        ["A transferência", "O sujeito suposto saber e suas consequências."],
        ["Alienação e separação", "Nova abordagem da constituição do sujeito."]
      ]
    },
    {
      id: 13, cycle: 2, level: "Avançado", title: "Ética e direção do tratamento",
      description: "Questões do desejo do analista, transferência, interpretação e responsabilidade.",
      outcome: "Identificar problemas éticos e técnicos sem converter teoria em instrução clínica automática.",
      prereqs: "Módulos 09, 10 e 12",
      lessons: [
        ["A ética da psicanálise", "Os problemas trabalhados no Seminário 7."],
        ["Demanda e direção do tratamento", "Diferenças entre responder à demanda e conduzir a análise."],
        ["Interpretação, corte e escansão", "Conceitos e controvérsias da interpretação."],
        ["O desejo do analista", "Uma função teórica na direção do tratamento."],
        ["O ato analítico", "Relações com transferência e formação do analista."],
        ["Ética, responsabilidade e limites clínicos", "Delimitar a formação teórica e a prática profissional."]
      ]
    },
    {
      id: 14, cycle: 3, level: "Avançado", title: "Gozo, repetição e mais-de-gozar",
      description: "A satisfação pulsional para além de uma simples teoria do prazer.",
      outcome: "Explicar as relações entre gozo, corpo, repetição e sintoma.",
      prereqs: "Módulos 10, 12 e 13",
      lessons: [
        ["Prazer e gozo", "Por que os conceitos não são equivalentes."],
        ["Corpo e satisfação pulsional", "A dimensão pulsional do gozo."],
        ["Repetição e satisfação", "Reexaminar a repetição sob uma nova perspectiva."],
        ["Das Ding e os limites da satisfação", "Retomar a Coisa e a ética."],
        ["O mais-de-gozar", "Conceito e relação com os discursos."],
        ["Sintoma e modalidades de satisfação", "Preparação para as reformulações tardias."]
      ]
    },
    {
      id: 15, cycle: 3, level: "Avançado", title: "Os quatro discursos",
      description: "Agente, Outro, verdade e produção nas articulações do laço social.",
      outcome: "Reconstruir as quatro escritas e compreender por que discurso não significa personalidade.",
      prereqs: "Módulos 05, 12 e 14",
      lessons: [
        ["O que é um discurso em Lacan?", "Posições, termos e relações com o laço social."],
        ["O discurso do mestre", "A disposição dos termos e seu problema."],
        ["O discurso universitário", "A organização e as consequências dessa escrita."],
        ["O discurso da histérica", "Saber, verdade e posições."],
        ["O discurso do analista", "Termos e lugares nessa formalização."],
        ["Rotações, impossibilidades e discurso capitalista", "Integração e problemas abertos."]
      ]
    },
    {
      id: 16, cycle: 3, level: "Avançado", title: "Sexuação, lógica e não-todo",
      description: "A função fálica e as fórmulas da sexuação, com cuidado lógico e histórico.",
      outcome: "Iniciar a leitura das fórmulas sem confundi-las com classificações biológicas.",
      prereqs: "Módulos 07, 14 e 15",
      lessons: [
        ["Por que Lacan utiliza a lógica?", "Funções e quantificadores como preparação."],
        ["A função fálica", "Retomada e formalização de conceitos anteriores."],
        ["As fórmulas da sexuação", "Introdução gradual às diferentes escritas."],
        ["A lógica do não-todo", "Problemas lógicos sem reduções quantitativas."],
        ["A inexistência da relação sexual", "Sentido e alcance dessa proposição."],
        ["Sexuação e debates contemporâneos", "Anatomia, gênero e leituras críticas."]
      ]
    },
    {
      id: 17, cycle: 3, level: "Avançado", title: "Letra, lalangue e topologia",
      description: "Do significante às reformulações tardias: escrita, corpo e modelos topológicos.",
      outcome: "Reconhecer as questões que preparam a leitura dos nós e do sinthoma.",
      prereqs: "Módulos 08, 14 e 16",
      lessons: [
        ["Da linguagem à letra", "Escrita, significante e gozo em transformação."],
        ["Lalangue", "O problema teórico de lalangue."],
        ["Parlêtre", "O ser falante e suas consequências."],
        ["Por que Lacan utiliza a topologia?", "Motivações e limites das representações."],
        ["A banda de Möbius", "Propriedades relevantes e usos teóricos."],
        ["Do espaço ao nó", "Preparação para os enlaces borromeanos."]
      ]
    },
    {
      id: 18, cycle: 3, level: "Avançado", title: "Nós borromeanos e sinthoma",
      description: "RSI, amarrações, Joyce e os problemas do último ensino de Lacan.",
      outcome: "Ler as questões centrais do último ensino reconhecendo seus limites e debates.",
      prereqs: "Módulos 14 a 17",
      lessons: [
        ["O nó borromeano", "Propriedades do enlace e emprego conceitual por Lacan."],
        ["RSI e as formas de amarração", "Os registros e as relações de enlace."],
        ["O quarto elo", "A função de um quarto componente em diferentes construções."],
        ["Joyce e o sinthoma", "Elaborações do Seminário 23 e seus limites."],
        ["Sintoma, sinthoma e fim de análise", "Comparar formulações e problemas abertos."],
        ["Laboratório final: teoria em movimento", "Integração crítica de todo o percurso."]
      ]
    }
  ]
};