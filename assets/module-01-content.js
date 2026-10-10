/* Sprint 2 • Módulo 1: seis aulas orientadas, com revisão pedagógica necessária antes da certificação. */
window.LACAN_LESSONS = [
{
  id: "1.1", title: "Quem foi Jacques Lacan?", subtitle: "Uma trajetória intelectual, clínica e institucional", duration: "35–50 min",
  question: "O que muda quando um psiquiatra decide reler Freud através da linguagem?",
  introduction: "Jacques Lacan não começou sua trajetória como autor de um sistema teórico pronto. Sua formação em psiquiatria, seus encontros com a psicanálise e seus debates com a filosofia e as ciências humanas ajudam a compreender por que seus conceitos foram se transformando.",
  sections: [
    { title: "Um psiquiatra em formação", paragraphs: [
      "Jacques Lacan nasceu em Paris em 1901 e morreu em 1981. Formou-se em medicina e psiquiatria, trabalhando em um período no qual a compreensão das psicoses era objeto de grandes debates. Em 1932, apresentou sua tese <em>Da psicose paranoica em suas relações com a personalidade</em>. A tese não deve ser lida como se contivesse toda a teoria posterior, mas permite reconhecer um problema que atravessaria sua obra: como compreender a experiência subjetiva para além da mera descrição de sintomas?",
      "Ao estudar Lacan, é importante evitar duas simplificações: imaginá-lo exclusivamente como filósofo ou reduzir sua obra a uma técnica psiquiátrica. Seu trabalho atravessa campos diferentes, mas permanece fortemente ligado a questões formuladas pela experiência psicanalítica." ] },
    { title: "A imagem, a identificação e o espelho", paragraphs: [
      "Em 1936, Lacan apresentou uma primeira versão da teoria do estádio do espelho num congresso em Marienbad. O texto dessa apresentação não foi preservado em sua forma original. A formulação de 1949, apresentada em Zurique e posteriormente incluída em <em>Escritos</em>, é uma referência fundamental.",
      "Por que essa diferença de datas importa? Porque estudar a trajetória de um conceito exige distinguir o momento de sua apresentação, a versão textual preservada e sua edição posterior. O estádio do espelho será aprofundado no quarto módulo, quando poderemos perguntar por que a formação do eu envolve uma identificação com uma imagem." ] },
    { title: "O ensino oral e o retorno a Freud", paragraphs: [
      "Em 1953, Lacan apresentou o texto conhecido como <em>Função e campo da fala e da linguagem em psicanálise</em>, associado ao Congresso de Roma. Também iniciou o primeiro ciclo anual de seu Seminário, dedicado aos escritos técnicos de Freud no ano letivo de 1953–1954. A fala e a linguagem ganham destaque em sua releitura da psicanálise.",
      "O Seminário não era simplesmente uma sucessão de livros escritos de antemão. Tratava-se de um ensino oral que mais tarde recebeu diferentes processos de transcrição, estabelecimento e publicação. Isso explica por que a data de uma aula e a data de publicação do volume correspondente nem sempre coincidem." ] },
    { title: "Rupturas institucionais e últimos desenvolvimentos", paragraphs: [
      "A trajetória de Lacan também inclui conflitos com instituições psicanalíticas. Em 1963, sua posição como analista didata tornou-se um ponto decisivo nas negociações entre a Sociedade Francesa de Psicanálise e a Associação Psicanalítica Internacional. Em 1964, Lacan passou a ensinar na École Normale Supérieure e fundou a Escola Freudiana de Paris. Em 1966, publicou <em>Escritos</em>, coletânea que reuniu textos de diferentes períodos.",
      "Nas décadas seguintes, seu pensamento avançou por questões do gozo, dos discursos, da sexuação, da letra e da topologia. Lacan dissolveu sua escola em 1980 e morreu em 1981. Esse percurso não é a evolução simples de uma teoria errada para uma teoria correta: envolve continuidades, deslocamentos, problemas não resolvidos e debates de interpretação." ] }
  ],
  example: { title: "Uma linha do tempo não é uma teoria", text: "Considere três datas: 1932 (tese sobre paranoia), 1953 (Congresso de Roma e começo dos seminários anuais) e 1966 (publicação de Escritos). Elas ajudam a situar acontecimentos, mas não autorizam dizer que todos os conceitos de uma mesma década significavam exatamente a mesma coisa." },
  takeaway: "Lacan foi psiquiatra e psicanalista, teve um ensino principalmente oral e reformulou conceitos ao longo de décadas. Ler sua obra exige atenção tanto aos problemas clínicos e teóricos quanto à história dos textos.",
  references: ["Lacan, J. <em>Da psicose paranoica em suas relações com a personalidade</em> (tese de 1932).", "Lacan, J. <em>Função e campo da fala e da linguagem em psicanálise</em> (1953), em <em>Escritos</em>.", "Lacan, J. <em>O Seminário, livro 1: Os escritos técnicos de Freud</em> (ensino de 1953–1954).", "Johnston, A. «Jacques Lacan», <em>Stanford Encyclopedia of Philosophy</em> (revisão de 2026)."],
  quiz: [
    {phase:"Reconhecimento",prompt:"Qual afirmação descreve corretamente um aspecto da trajetória de Lacan?",options:["A sua obra foi organizada de uma só vez, como um sistema fechado.","Ele começou na psiquiatria e desenvolveu um ensino psicanalítico ao longo de décadas.","A publicação de Escritos ocorreu antes de sua tese médica."],correct:1,explanation:"A formação em psiquiatria antecede seu ensino anual de seminários. A obra não surgiu como sistema completo e foi transformada ao longo do tempo."},
    {phase:"Compreensão",prompt:"Por que distinguir 1936, 1949 e 1966 ao estudar o estádio do espelho?",options:["Porque a apresentação inicial, uma formulação preservada e uma publicação editorial são acontecimentos diferentes.","Porque Lacan abandonou integralmente a teoria em 1949.","Porque todas as versões são textos idênticos."],correct:0,explanation:"A história dos conceitos depende das versões e das condições de publicação. Não é adequado tratar uma apresentação perdida e uma versão publicada como textos idênticos."},
    {phase:"Aplicação",prompt:"Um colega afirma: «Se uma ideia está em Escritos, ela foi formulada em 1966». Qual resposta é mais rigorosa?",options:["Sim, a data da coletânea equivale à de todos os textos.","Não importa saber datas para estudar conceitos.","Não: a coletânea de 1966 reúne textos elaborados em momentos anteriores, cujas datas devem ser verificadas."],correct:2,explanation:"A publicação de uma coletânea não apaga a história de elaboração de seus textos. Distinguir datas evita leituras anacrônicas."}
  ]
},
{
  id:"1.2",title:"Por que Lacan retorna a Freud?",subtitle:"Reler não é simplesmente repetir",duration:"35–50 min",
  question:"O que significa retornar a um autor quando o objetivo é desenvolver novas formulações?",
  introduction:"A expressão «retorno a Freud» é central no primeiro período do ensino de Lacan, mas ela não significa simplesmente defender cada frase de Freud como verdade definitiva. É um programa de leitura e uma tomada de posição sobre a prática psicanalítica.",
  sections:[
    {title:"O problema do retorno",paragraphs:[
      "Lacan encontrava uma psicanálise já institucionalizada, atravessada por divergências sobre técnica e sobre os objetivos do tratamento. Uma das tendências com as quais debateu foi a chamada psicologia do eu, especialmente quando a direção da análise era pensada em termos de fortalecimento adaptativo do ego.",
      "Sua pergunta era outra: o que ocorre com o desejo, os sintomas e os efeitos do inconsciente quando damos à fala do sujeito uma posição central? O retorno a Freud procurava recuperar problemas que Lacan considerava obscurecidos em algumas leituras de sua época. Isso não significa que todos os analistas contemporâneos a ele pensassem da mesma maneira." ]},
    {title:"O inconsciente não se esgota no eu",paragraphs:[
      "Para começar a compreender a crítica lacaniana, considere a diferença entre aquilo que uma pessoa pretende dizer e aquilo que pode aparecer em um lapso, um sonho ou um sintoma. Não se trata de assumir que qualquer erro de fala tem um significado oculto determinado. Trata-se de reconhecer que Freud construiu uma teoria na qual a vida psíquica não coincide com a transparência da consciência.",
      "Lacan retoma essa abertura e investiga as relações entre fala, linguagem e inconsciente. O sujeito que aparece nessa leitura não se reduz à autoimagem consciente que alguém produz sobre si mesmo." ]},
    {title:"O papel da fala e da linguagem",paragraphs:[
      "No texto <em>Função e campo da fala e da linguagem em psicanálise</em>, apresentado em 1953, Lacan atribui centralidade à fala no trabalho analítico. Isso exige investigar não apenas conteúdos transmitidos, mas também endereçamento, repetição, deslocamentos e relações entre significantes.",
      "Atenção a uma diferença importante: não basta afirmar que «falar cura» ou que «tudo é linguagem». A questão está ligada à especificidade da experiência analítica e à maneira como Lacan recoloca seus problemas." ]},
    {title:"Retornar e transformar",paragraphs:[
      "O retorno não é um compromisso de imobilidade. No desenvolvimento posterior, Lacan introduz formalizações e conceitos que não aparecem em Freud com o mesmo estatuto, como certas construções do objeto <em>a</em>, dos discursos ou dos nós borromeanos.",
      "Por isso, perguntar o que Lacan encontra em Freud precisa vir acompanhado de outra pergunta: o que Lacan altera ao reler Freud? A formação acompanhará ambas, sem reduzir uma obra à outra." ]}
  ],
  example:{title:"Um exemplo de leitura",text:"Ao encontrar um ato falho em um texto de Freud, a pergunta produtiva não é «qual palavra significa o quê?», mas «qual problema clínico e teórico o exemplo procura abordar?». Só depois faz sentido verificar como Lacan relê esse problema."},
  takeaway:"O retorno a Freud é um trabalho de releitura crítica, ligado à fala, à linguagem e à especificidade do inconsciente; não um convite à repetição literal.",
  references:["Lacan, J. <em>Função e campo da fala e da linguagem em psicanálise</em> (1953), em <em>Escritos</em>.","Lacan, J. <em>O Seminário, livro 1: Os escritos técnicos de Freud</em>.","Freud, S. <em>A interpretação dos sonhos</em> (1900)."],
  quiz:[
    {phase:"Reconhecimento",prompt:"O que caracteriza melhor o «retorno a Freud» no ensino de Lacan?",options:["Uma releitura que procura reabrir problemas da experiência analítica.","A repetição literal de todas as formulações freudianas.","A rejeição completa da psicanálise freudiana."],correct:0,explanation:"Retornar significa reler criticamente e reorientar questões. As formulações lacanianas também introduzem transformações."},
    {phase:"Compreensão",prompt:"Por que não basta identificar a psicanálise com o fortalecimento do eu?",options:["Porque o eu é inexistente em qualquer teoria psicológica.","Porque a questão do inconsciente não coincide com a autoimagem e com o controle consciente.","Porque a psicanálise não estuda conflitos psíquicos."],correct:1,explanation:"Na perspectiva discutida, a experiência analítica não se reduz à adaptação do eu. É preciso considerar formações do inconsciente e os efeitos da fala."},
    {phase:"Aplicação",prompt:"Alguém afirma que Lacan apenas traduziu Freud para palavras novas. Como responder?",options:["Concordar: os conceitos posteriores são idênticos aos de Freud.","Rejeitar qualquer relação entre Lacan e Freud.","Mostrar que Lacan relê Freud, mas também desenvolve conceitos e formalizações próprias."],correct:2,explanation:"A relação inclui continuidade e transformação. Ignorar uma dessas dimensões empobrece a leitura."}
  ]
},
{
  id:"1.3",title:"A psicanálise francesa do século XX",subtitle:"Instituições, conflitos e condições de ensino",duration:"35–50 min",
  question:"Por que compreender a história das instituições ajuda a ler uma teoria?",
  introduction:"A obra de Lacan não se desenvolveu fora do mundo. Congressos, sociedades de psicanálise, debates sobre formação e controvérsias técnicas participaram de seu contexto. Conhecer essa história ajuda a localizar problemas, mas não substitui a análise dos conceitos.",
  sections:[
    {title:"O ambiente psicanalítico francês",paragraphs:[
      "A psicanálise francesa cresceu em diálogo e tensão com a medicina, a psiquiatria e correntes intelectuais do século XX. A Sociedade Psicanalítica de Paris foi uma instituição decisiva nesse percurso. Lacan trabalhou em um campo no qual as perguntas sobre quem poderia formar analistas, como organizar uma cura e quais leituras de Freud privilegiar tinham consequências institucionais.",
      "Isso não significa que as posições pudessem ser divididas facilmente entre «fiéis a Freud» e «infiéis a Freud». Existiam divergências reais e múltiplas orientações clínicas." ]},
    {title:"A ruptura de 1953",paragraphs:[
      "Em 1953, conflitos no movimento psicanalítico francês levaram à saída de um grupo da Sociedade Psicanalítica de Paris e à criação da Sociedade Francesa de Psicanálise (SFP). Lacan participou desse novo contexto institucional.",
      "O mesmo ano marca o Congresso de Roma, ligado à formulação de seu programa sobre fala e linguagem, e o início de seus seminários anuais. As coincidências históricas são relevantes, mas não demonstram que um evento explique sozinho o conteúdo de uma teoria." ]},
    {title:"1963–1964: um deslocamento importante",paragraphs:[
      "Nas negociações de reconhecimento da SFP pela Associação Psicanalítica Internacional (IPA), a posição de Lacan como analista didata tornou-se objeto de objeção. Suas sessões de duração variável estavam entre os principais pontos de controvérsia. Em 1963, ele deixou de ocupar a posição requerida para a formação de analistas no reconhecimento institucional em disputa.",
      "Em 1964, Lacan transferiu o Seminário para a École Normale Supérieure e criou a Escola Freudiana de Paris. É nesse contexto que apresentou o Seminário 11, dedicado aos quatro conceitos fundamentais da psicanálise. Não é suficiente resumir esse episódio à ideia de que «a psicanálise expulsou Lacan»: as instituições e os acontecimentos precisam ser nomeados com precisão." ]},
    {title:"Debate institucional não é refutação conceitual",paragraphs:[
      "Uma controvérsia sobre sessões, formação ou reconhecimento institucional não resolve automaticamente o valor teórico de um conceito. Da mesma forma, a notoriedade de um autor não comprova sua consistência.",
      "No estudo, vamos diferenciar três tipos de pergunta: «O que aconteceu historicamente?», «Que posição teórica estava em discussão?» e «Como avaliar os argumentos?». Essa separação protege o estudante contra leituras biográficas simplistas." ]}
  ],
  example:{title:"Um documento e três perguntas",text:"Você encontra um texto de 1964 em que Lacan comenta sua situação institucional. Primeiro, situe os acontecimentos; depois, identifique o argumento construído pelo autor; por fim, diferencie os fatos verificáveis de sua interpretação do conflito."},
  takeaway:"A história institucional ilumina os contextos do ensino de Lacan, mas deve ser distinguida da avaliação dos argumentos teóricos e clínicos.",
  references:["Lacan, J. <em>O Seminário, livro 11: Os quatro conceitos fundamentais da psicanálise</em> (ensino de 1964).","Lacan, J. <em>Função e campo da fala e da linguagem em psicanálise</em> (1953).","Johnston, A. «Jacques Lacan», <em>Stanford Encyclopedia of Philosophy</em>."],
  quiz:[
    {phase:"Reconhecimento",prompt:"Em qual contexto Lacan passou a ensinar na École Normale Supérieure?",options:["Após sua tese de 1932.","Após os conflitos institucionais de 1963, a partir de 1964.","Somente depois da publicação dos últimos seminários."],correct:1,explanation:"O deslocamento do ensino para a École Normale Supérieure aconteceu em 1964, após um período de controvérsia institucional."},
    {phase:"Compreensão",prompt:"Qual distinção é importante ao estudar um conflito institucional?",options:["Separar acontecimentos verificáveis, interpretações dos envolvidos e argumentos teóricos.","Tomar a versão do autor como descrição exaustiva.","Ignorar datas e nomes para evitar complexidade."],correct:0,explanation:"História, interpretação e argumento não são o mesmo tipo de afirmação. A distinção torna a leitura mais precisa."},
    {phase:"Aplicação",prompt:"Uma colega diz que uma controvérsia sobre a duração das sessões prova que toda a teoria de Lacan estava errada. O que observar?",options:["Que toda controvérsia institucional prova uma teoria.","Que a fama do autor elimina qualquer problema institucional.","Que uma controvérsia institucional não substitui o exame dos conceitos e argumentos."],correct:2,explanation:"Debates clínicos e institucionais são relevantes, mas não autorizam uma conclusão automática sobre toda uma obra."}
  ]
},
{
  id:"1.4",title:"Os interlocutores de Lacan",subtitle:"Filosofia, linguística, antropologia e clínica",duration:"40–55 min",
  question:"Como estudar as influências de um autor sem transformar sua obra numa colagem?",
  introduction:"Lacan dialogou com autores de disciplinas diferentes. Conhecer esses interlocutores ajuda a compreender seu vocabulário, desde que uma distinção permaneça clara: apropriar-se de um conceito não é utilizá-lo exatamente no sentido do autor de origem.",
  sections:[
    {title:"Freud: o interlocutor permanente",paragraphs:[
      "Freud permanece central no percurso lacaniano. A interpretação dos sonhos, as formações do inconsciente, o narcisismo, a pulsão e a transferência não aparecem como referências ornamentais: são problemas aos quais Lacan retorna de formas diversas.",
      "Ao ler uma passagem lacaniana, pergunte primeiro qual problema freudiano está em jogo. Em seguida, investigue se Lacan está retomando, deslocando ou criticando uma formulação. A resposta pode variar conforme o momento de seu ensino." ]},
    {title:"Saussure e Jakobson: o problema da linguagem",paragraphs:[
      "A linguística de Ferdinand de Saussure forneceu distinções importantes, especialmente entre significante e significado. Lacan as retoma, mas não mantém simplesmente sua organização original. Roman Jakobson também foi um interlocutor relevante para relações como metáfora e metonímia.",
      "Uma cautela fundamental: dizer que Lacan se inspira na linguística não significa que a teoria psicanalítica seja idêntica a uma teoria científica da linguagem. A formação estudará tanto a apropriação quanto seus limites." ]},
    {title:"Lévi-Strauss e Kojève: estruturas e reconhecimento",paragraphs:[
      "A antropologia estrutural de Claude Lévi-Strauss contribuiu para os debates sobre parentesco, troca e ordem simbólica que atravessavam o ambiente intelectual de Lacan. As leituras de Hegel realizadas por Alexandre Kojève também participam do contexto de problemas como desejo, alteridade e reconhecimento.",
      "Isso não autoriza uma tradução direta: «desejo em Hegel = desejo em Lacan». É preciso verificar as transformações de cada noção e evitar apagar as diferenças entre os projetos dos autores." ]},
    {title:"Da interlocução à elaboração própria",paragraphs:[
      "O ensino de Lacan também dialoga com matemática, lógica e topologia, principalmente em seus desenvolvimentos posteriores. Essas ferramentas aparecem em situações precisas e não devem ser tratadas como provas automáticas de uma teoria clínica.",
      "O método de leitura recomendado será sempre: localizar o problema, reconhecer a referência, identificar a transformação lacaniana e examinar as consequências. Uma boa comparação mostra tanto semelhanças quanto diferenças." ]}
  ],
  example:{title:"Um empréstimo conceitual",text:"Se um texto de Lacan utiliza «significante», não basta procurar a definição de Saussure e encerrá-la como explicação. É preciso perguntar como Lacan reorganiza a relação significante/significado e por que isso interessa à psicanálise."},
  takeaway:"Os interlocutores de Lacan são indispensáveis, mas suas ideias não passam intactas para o ensino lacaniano. A relação entre origem e transformação deve ser examinada caso a caso.",
  references:["Lacan, J. <em>A instância da letra no inconsciente ou a razão desde Freud</em> (1957), em <em>Escritos</em>.","Saussure, F. de. <em>Curso de linguística geral</em> (edição póstuma de 1916).","Jakobson, R. <em>Dois aspectos da linguagem e dois tipos de afasia</em>.","Johnston, A. «Jacques Lacan», <em>Stanford Encyclopedia of Philosophy</em>."],
  quiz:[
    {phase:"Reconhecimento",prompt:"Qual autor está associado à distinção linguística entre significante e significado?",options:["Ferdinand de Saussure.","Sigmund Freud.","Alexandre Kojève."],correct:0,explanation:"Saussure é referência central dessa distinção linguística, que Lacan retoma e transforma."},
    {phase:"Compreensão",prompt:"Por que reconhecer uma influência não resolve a leitura de Lacan?",options:["Porque os interlocutores não têm nenhuma importância.","Porque apropriações podem modificar o sentido e a função de uma ideia.","Porque todos os termos mantêm definições idênticas em todas as disciplinas."],correct:1,explanation:"Uma referência pode ser reelaborada. É preciso observar o problema e a função que o conceito adquire no novo contexto."},
    {phase:"Aplicação",prompt:"Você lê que «desejo» aparece em Hegel e em Lacan. Qual é o melhor procedimento?",options:["Concluir que os dois usos são idênticos.","Ignorar Hegel para não dificultar o estudo.","Comparar os contextos e verificar aproximações e diferenças conceituais."],correct:2,explanation:"Uma aproximação produtiva não apaga divergências. O estudo exige exame das fontes e da transformação conceitual."}
  ]
},
{
  id:"1.5",title:"Como ler um texto lacaniano?",subtitle:"Um método para ler sem fingir compreensão",duration:"35–50 min",
  question:"O que fazer quando um parágrafo parece incompreensível — sem recorrer apenas à memorização?",
  introduction:"A dificuldade de Lacan não precisa ser escondida. É possível construir um método de leitura que preserve o rigor, reconheça os limites do que foi compreendido e permita voltar ao texto com melhores perguntas.",
  sections:[
    {title:"Comece pela pergunta, não pelo verbete",paragraphs:[
      "Antes de buscar uma definição, tente responder: «Que problema este trecho procura enfrentar?». Uma formulação sobre o sujeito pode estar discutindo o eu, a linguagem, a divisão subjetiva ou um problema clínico. O mesmo termo não aparece necessariamente com o mesmo alcance em todos os períodos.",
      "Faça uma primeira leitura sem pretender traduzir cada frase. Identifique as palavras que se repetem, a questão central e o argumento que parece estar sendo construído. Registre o que você ainda não compreende." ]},
    {title:"Situe a passagem",paragraphs:[
      "Anote o título, a data de apresentação do texto ou da aula e a edição consultada. <em>Escritos</em> foi publicado como coletânea em 1966, mas reúne trabalhos anteriores. Já os seminários foram ensinados oralmente e publicados em momentos posteriores.",
      "A data ajuda a investigar se o conceito estava em elaboração, sendo reformulado ou sendo revisitado. Não se trata de converter décadas em caixas rígidas, mas de evitar que um conceito posterior seja projetado automaticamente em textos anteriores." ]},
    {title:"Diferencie três níveis de leitura",paragraphs:[
      "O primeiro nível é a <strong>formulação primária</strong>: o que está efetivamente no texto de Lacan. O segundo é a <strong>interpretação de um comentador</strong>: uma leitura que organiza, explica ou critica a formulação. O terceiro é a <strong>analogia pedagógica</strong>: um exemplo construído para facilitar a compreensão.",
      "Os três níveis podem ser úteis, mas não são intercambiáveis. Uma analogia clara não substitui a leitura da fonte; uma interpretação brilhante não deve ser apresentada como uma citação literal de Lacan." ]},
    {title:"Construa um caderno de questões",paragraphs:[
      "Depois de cada trecho, escreva quatro linhas: «Qual pergunta está em jogo?», «Qual tese aparece?», «Com quais conceitos ela se relaciona?» e «O que ainda não consigo explicar?». Em seguida, reformule o problema em português simples sem reduzir sua complexidade.",
      "Voltar a um trecho depois de outros estudos faz parte do método. A impressão de compreender tudo imediatamente costuma ser menos útil do que identificar com precisão o que permanece difícil." ]}
  ],
  example:{title:"Uma leitura que precisa de cuidado",text:"Você encontra a frase «o inconsciente é estruturado como uma linguagem». Uma leitura apressada seria: «o inconsciente é um idioma». Uma pergunta melhor é: «o que Lacan procura demonstrar ao relacionar inconsciente e estrutura da linguagem?». Os próximos módulos desenvolverão a resposta."},
  takeaway:"Ler Lacan exige contextualizar passagens, distinguir fonte e comentário, reconhecer analogias e construir perguntas que possam ser retomadas.",
  references:["Lacan, J. <em>Escritos</em> (coletânea publicada em francês em 1966).","Lacan, J. <em>O Seminário, livro 1: Os escritos técnicos de Freud</em>.","Johnston, A. «Jacques Lacan», <em>Stanford Encyclopedia of Philosophy</em>."],
  quiz:[
    {phase:"Reconhecimento",prompt:"Ao estudar uma passagem difícil, qual atitude é recomendada?",options:["Decorar uma frase sem verificar seu contexto.","Localizar o problema teórico, a data e as relações conceituais.","Tratar exemplos didáticos como citações literais."],correct:1,explanation:"Uma leitura rigorosa precisa identificar o problema e o contexto antes de fixar definições."},
    {phase:"Compreensão",prompt:"Por que distinguir fonte primária, comentário e analogia?",options:["Porque desempenham funções diferentes e não têm o mesmo estatuto de evidência.","Porque nenhum comentário pode ser útil.","Porque uma analogia substitui o texto de Lacan."],correct:0,explanation:"O texto de Lacan, sua interpretação e um exemplo didático são recursos distintos. Misturá-los produz falsas atribuições."},
    {phase:"Aplicação",prompt:"Um vídeo afirma: «Lacan escreveu que o grande Outro é a sociedade», sem referência. Como estudar essa afirmação?",options:["Aceitar a frase porque parece didática.","Rejeitar qualquer estudo do grande Outro.","Pedir a fonte, situar a passagem e examinar se a frase é citação, interpretação ou analogia."],correct:2,explanation:"A verificação de origem e contexto é decisiva, sobretudo em conceitos que frequentemente recebem definições simplificadas."}
  ]
},
{
  id:"1.6",title:"O pensamento lacaniano em movimento",subtitle:"Períodos, retornos e transformações",duration:"40–55 min",
  question:"Como acompanhar a transformação de um pensamento sem dividir sua história em compartimentos?",
  introduction:"Muitas apresentações do ensino de Lacan distinguem períodos. Essa divisão pode orientar os estudos, mas também pode produzir um problema: a falsa ideia de que Lacan abandonou completamente um conjunto de conceitos sempre que passou a formular outros.",
  sections:[
    {title:"O valor e o limite das periodizações",paragraphs:[
      "É comum falar em um primeiro momento no qual ganham destaque o estádio do espelho e o Imaginário; em uma fase de elaboração da linguagem e do Simbólico; e em desdobramentos posteriores ligados ao Real, ao gozo e à topologia. Esse esquema é uma ferramenta de estudo, não uma lei histórica.",
      "O interesse pelo Real, por exemplo, não começa apenas quando aparecem os nós. E questões imaginárias continuam a ter relevância após os anos 1950. O desafio é reconhecer mudanças de prioridade, de formulação e de articulação, sem supor que cada fase apague a anterior." ]},
    {title:"Um conceito que retorna",paragraphs:[
      "Considere a noção de sujeito. Ao longo da formação, ela se relacionará com a diferença entre eu e sujeito, com os efeitos do significante, com a divisão subjetiva, com alienação e separação, com os discursos e, posteriormente, com o <em>parlêtre</em>.",
      "Cada passagem acrescenta um problema. Uma definição dada no início não será simplesmente repetida: ela poderá mostrar-se insuficiente para responder a uma questão posterior. A insuficiência é uma oportunidade de aprofundamento, não um fracasso do estudo." ]},
    {title:"O que significa uma reformulação?",paragraphs:[
      "Uma reformulação não consiste apenas em escolher novas palavras para dizer a mesma coisa. Pode envolver uma mudança na função de um conceito, no problema privilegiado ou nas relações com outras formalizações.",
      "O estudo do sintoma, por exemplo, permitirá mais tarde comparar formulações ligadas ao inconsciente e à interpretação com desenvolvimentos do último ensino em torno do <em>sinthoma</em>. Esse contraste precisará ser construído pelos textos, não presumido antecipadamente." ]},
    {title:"O método da espiral",paragraphs:[
      "Este curso utiliza uma progressão em espiral: o estudante encontra uma primeira apresentação de um conceito, aprende a utilizá-lo em relações simples e volta a ele diante de problemas mais difíceis. Isso permite aprofundar sem simular que todo o edifício teórico esteja pronto desde a primeira aula.",
      "Ao final de cada módulo, você poderá revisitar as perguntas anteriores. O objetivo é formar uma leitura que resista a respostas fáceis e reconheça a complexidade de uma obra em transformação." ]}
  ],
  example:{title:"O mapa com datas",text:"Imagine um mapa em que «Real», «Simbólico» e «Imaginário» aparecem desde cedo e, mais adiante, recebem novas relações. Ele não deve sugerir que três definições eternas explicam tudo, mas registrar mudanças, tensões e novas formulações."},
  takeaway:"A história do ensino de Lacan envolve permanências e deslocamentos. Periodizar ajuda a estudar desde que nenhuma divisão seja tratada como definitiva.",
  references:["Lacan, J. <em>O Seminário, livro 11: Os quatro conceitos fundamentais da psicanálise</em>.","Lacan, J. <em>O Seminário, livro 20: Mais, ainda</em>.","Lacan, J. <em>O Seminário, livro 23: O sinthoma</em>.","Johnston, A. «Jacques Lacan», <em>Stanford Encyclopedia of Philosophy</em>."],
  quiz:[
    {phase:"Reconhecimento",prompt:"Qual afirmação sobre os períodos de Lacan é mais adequada?",options:["Uma divisão em períodos ajuda a estudar, mas não elimina continuidades entre eles.","Cada fase invalida inteiramente a anterior.","O ensino não sofreu nenhuma transformação."],correct:0,explanation:"Há mudanças e continuidades. A periodização é útil como ferramenta e problemática quando vira uma regra rígida."},
    {phase:"Compreensão",prompt:"O que é importante investigar em uma reformulação conceitual?",options:["Apenas se a palavra usada mudou.","Se houve mudança de problema, função ou articulação do conceito.","Somente a década em que o autor escreveu."],correct:1,explanation:"Uma reformulação pode alterar relações e problemas teóricos, mesmo quando o termo permanece."},
    {phase:"Aplicação",prompt:"Um resumo afirma: «No último Lacan, o Simbólico deixa de existir». Qual atitude é mais rigorosa?",options:["Aceitar porque toda periodização precisa eliminar uma fase.","Trocar «Simbólico» por «Real» em todos os textos.","Examinar as novas articulações dos registros sem concluir que o Simbólico foi simplesmente apagado."],correct:2,explanation:"A questão são as transformações na articulação dos registros, não uma substituição mecânica de um termo por outro."}
  ]
}
];