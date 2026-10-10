/* Sprint 10 · Circuito do Desejo — modelos didáticos, não interpretações clínicas. */
window.LACAN_DESEJO_LAB={
  "scenes": [
    {
      "id": "agua",
      "label": "O copo de água",
      "need": "Sede: uma exigência que pode ser atendida com água.",
      "message": "«Você pode me trazer um copo de água?»",
      "reply": "A pessoa recebe água de quem escutou o pedido.",
      "focus": "A necessidade pode ser satisfeita; a demanda é endereçada a alguém que responde.",
      "question": "O que esta cena permite afirmar com rigor?",
      "answers": [
        {
          "text": "A água pode atender à sede, enquanto pedir e receber também envolvem uma relação com alguém.",
          "correct": true,
          "why": "A cena evidencia duas dimensões, sem revelar um desejo inconsciente particular."
        },
        {
          "text": "Pedir água sempre significa que a pessoa tem medo de abandono.",
          "correct": false,
          "why": "Uma hipótese sobre abandono não decorre automaticamente do pedido."
        },
        {
          "text": "Quando o copo chega, todos os problemas da demanda e do desejo foram resolvidos.",
          "correct": false,
          "why": "Atender à necessidade não equivale a encerrar teoricamente a relação entre demanda e desejo."
        }
      ]
    },
    {
      "id": "historia",
      "label": "A história da noite",
      "need": "Há um pedido determinado por uma história para ouvir.",
      "message": "«Você conta essa história outra vez?»",
      "reply": "Uma pessoa reserva tempo para contar a história.",
      "focus": "A demanda inclui o objeto (a narrativa) e a dimensão de endereçamento a quem responde.",
      "question": "Qual leitura evita confundir um objeto com a demanda inteira?",
      "answers": [
        {
          "text": "O pedido prova um trauma oculto.",
          "correct": false,
          "why": "Uma repetição isolada não comprova um trauma nem outra explicação clínica."
        },
        {
          "text": "A história importa, e o encontro com quem a conta pode integrar a dimensão do pedido.",
          "correct": true,
          "why": "O exemplo introduz a diferença entre conteúdo solicitado e relação ao Outro."
        },
        {
          "text": "Toda solicitação de uma história é uma necessidade orgânica.",
          "correct": false,
          "why": "A demanda não se reduz à necessidade corporal que poderia estar envolvida."
        }
      ]
    },
    {
      "id": "conversa",
      "label": "O pedido de conversa",
      "need": "Não é possível inferir com segurança uma necessidade orgânica a partir desta frase.",
      "message": "«Você consegue conversar comigo depois?»",
      "reply": "A pessoa responde que poderá conversar no fim do dia.",
      "focus": "Há endereçamento e uma resposta, mas não conhecemos o desejo inconsciente de nenhuma personagem.",
      "question": "O que sabemos — e o que ainda não sabemos?",
      "answers": [
        {
          "text": "O pedido comprova uma carência afetiva determinada.",
          "correct": false,
          "why": "Essa é uma interpretação que excede os dados."
        },
        {
          "text": "O interlocutor sabe agora todo o desejo de quem pediu.",
          "correct": false,
          "why": "Uma resposta prática não fornece transparência sobre o desejo."
        },
        {
          "text": "Sabemos que uma demanda foi formulada; não podemos diagnosticar o desejo de quem a fez.",
          "correct": true,
          "why": "A cena permite identificar uma demanda sem atribuir sentido psíquico universal."
        }
      ]
    }
  ],
  "responses": [
    {
      "id": "atende",
      "label": "A solicitação foi atendida",
      "text": "A pessoa oferece o objeto pedido e permanece alguns minutos para conversar.",
      "insight": "A satisfação do objeto e a relação de presença podem coexistir. Não sabemos o desejo particular da personagem."
    },
    {
      "id": "adiada",
      "label": "A resposta será depois",
      "text": "A pessoa explica que não pode naquele momento, mas se dispõe a responder mais tarde.",
      "insight": "Uma recusa temporária não prova desamor, abandono ou estrutura clínica. A dimensão do endereçamento continua relevante."
    },
    {
      "id": "objeto",
      "label": "O objeto chegou sem conversa",
      "text": "O objeto é entregue, mas a cena não esclarece como a pessoa viveu a interação.",
      "insight": "Há atendimento material possível; isso não permite afirmar se a demanda de amor foi ou não «satisfeita» numa pessoa real."
    }
  ],
  "experiments": [
    {
      "id": "necessidade",
      "title": "O que pode satisfazer uma necessidade?",
      "stem": "Na cena, a personagem tem sede e pede água.",
      "choose": [
        "agua",
        "atende"
      ],
      "correct": "distincao",
      "options": [
        {
          "id": "igual",
          "text": "Receber água equivale necessariamente a resolver qualquer questão de desejo.",
          "correct": false,
          "why": "A satisfação orgânica não determina o desejo."
        },
        {
          "id": "distincao",
          "text": "O objeto atende uma exigência particular, mas a demanda envolve também endereçamento.",
          "correct": true,
          "why": "A distinção entre satisfação de necessidade e demanda é o ponto conceitual."
        },
        {
          "id": "diagnostico",
          "text": "O modo de pedir revela um diagnóstico por si.",
          "correct": false,
          "why": "O exemplo não é um teste clínico."
        }
      ]
    },
    {
      "id": "amor",
      "title": "Uma demanda de amor não é teste de caráter",
      "stem": "A história solicitada foi contada e depois a pessoa precisa ir embora.",
      "choose": [
        "historia",
        "adiada"
      ],
      "correct": "reconhecer",
      "options": [
        {
          "id": "reconhecer",
          "text": "A presença de quem responde pode estar em jogo; isso não autoriza concluir que houve rejeição.",
          "correct": true,
          "why": "A teoria diferencia a dimensão de endereçamento de uma interpretação clínica pronta."
        },
        {
          "id": "ausencia",
          "text": "Toda interrupção significa falta de amor.",
          "correct": false,
          "why": "É um salto injustificado de um exemplo para a intenção de alguém."
        },
        {
          "id": "pronto",
          "text": "Uma história contada encerra o desejo.",
          "correct": false,
          "why": "Desejo não é idêntico a completar o objeto da solicitação."
        }
      ]
    },
    {
      "id": "desejo",
      "title": "O desejo não cabe numa resposta automática",
      "stem": "Uma personagem pede para conversar. Recebe uma resposta positiva e a conversa acontece.",
      "choose": [
        "conversa",
        "atende"
      ],
      "correct": "limites",
      "options": [
        {
          "id": "saber",
          "text": "A resposta permite conhecer o desejo inconsciente da personagem.",
          "correct": false,
          "why": "Nenhuma resposta prática resolve por si a questão do desejo."
        },
        {
          "id": "limites",
          "text": "Podemos descrever a demanda e a resposta, mas o desejo não se deixa deduzir de modo automático.",
          "correct": true,
          "why": "A leitura conserva o limite entre teoria e inferência clínica."
        },
        {
          "id": "mensurar",
          "text": "Basta contar as mensagens para medir numericamente o desejo.",
          "correct": false,
          "why": "O desejo não é uma variável quantitativa desse tipo."
        }
      ]
    }
  ],
  "quiz": [
    {
      "phase": "Reconhecimento",
      "title": "Três funções, não três intensidades",
      "prompt": "Qual formulação distingue adequadamente os conceitos?",
      "answers": [
        {
          "text": "Necessidade, demanda e desejo são três intensidades de uma mesma vontade.",
          "correct": false,
          "why": "Na teoria, possuem funções diferentes, não apenas quantidades de intensidade."
        },
        {
          "text": "Necessidade relaciona-se à satisfação particular; demanda se dirige ao Outro; desejo não se reduz às duas.",
          "correct": true,
          "why": "A estrutura das relações impede que os conceitos virem sinônimos."
        },
        {
          "text": "Desejo significa exclusivamente querer um objeto caro.",
          "correct": false,
          "why": "Um objeto consciente não esgota a formulação lacaniana do desejo."
        }
      ]
    },
    {
      "phase": "Compreensão",
      "title": "O que a expressão «demanda de amor» aponta?",
      "prompt": "Por que a demanda pode ir além do objeto solicitado?",
      "answers": [
        {
          "text": "Porque a relação com a resposta e a presença do Outro também está em questão.",
          "correct": true,
          "why": "A dimensão de endereçamento não se esgota no atendimento material."
        },
        {
          "text": "Porque todo pedido cotidiano prova um trauma.",
          "correct": false,
          "why": "Não podemos inferir uma história psíquica de um pedido isolado."
        },
        {
          "text": "Porque todo objeto solicitado é necessariamente falso.",
          "correct": false,
          "why": "O objeto pode satisfazer uma necessidade real e continuar distinto da demanda como relação."
        }
      ]
    },
    {
      "phase": "Aplicação crítica",
      "title": "O limite é parte do conhecimento",
      "prompt": "Um colega aponta para uma mensagem e diz: «Descobri o desejo inconsciente desta pessoa». Qual resposta é rigorosa?",
      "answers": [
        {
          "text": "A mensagem basta para ler o desejo.",
          "correct": false,
          "why": "A linguagem não é um dicionário automático do inconsciente."
        },
        {
          "text": "Toda mensagem é irrelevante para a psicanálise.",
          "correct": false,
          "why": "O texto e o endereçamento podem ser interrogados sem inferências automáticas."
        },
        {
          "text": "É possível analisar relações de demanda no exemplo; não é possível concluir o desejo de alguém sem investigação.",
          "correct": true,
          "why": "A resposta distingue estudo conceitual de atribuição clínica indevida."
        }
      ]
    }
  ],
  "sources": [
    {
      "title": "Lacan · A significação do falo (1958)",
      "note": "Texto primário em Escritos; formula o eixo necessidade, demanda e desejo.",
      "url": "https://www.lacan.com/seminars1.htm"
    },
    {
      "title": "Stanford Encyclopedia of Philosophy · Jacques Lacan",
      "note": "Contextualiza a demanda de amor e o desejo como diferença em relação à necessidade.",
      "url": "https://plato.stanford.edu/entries/lacan/"
    },
    {
      "title": "SciELO · Psicanálise lacaniana e estruturalismo",
      "note": "Discussão em português sobre a tríade no Seminário 5.",
      "url": "https://www.scielo.br/j/pusp/a/sVJbQpKMJyMwpqxzB7K8pnn/"
    }
  ]
};
