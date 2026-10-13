/* Laboratório do Espelho · edição didática alinhada ao Módulo 4 para iniciantes. Ids e salvamento preservados. */
window.LACAN_MIRROR = {
  "title": "Laboratório do Estádio do Espelho",
  "sources": [
    {
      "label": "Jacques Lacan, O estádio do espelho como formador da função do eu (1949), em Escritos",
      "url": "https://catalogue.bnf.fr/ark:/12148/cb42795366s",
      "note": "Registro da publicação original na Bibliothèque nationale de France."
    },
    {
      "label": "Bibliothèque Sigmund Freud · Registro do artigo de 1949",
      "url": "https://bsf.spp.asso.fr/index.php?id=13781&lvl=notice_display",
      "note": "Dados bibliográficos do artigo na Revue française de psychanalyse."
    },
    {
      "label": "Stanford Encyclopedia of Philosophy · Jacques Lacan",
      "url": "https://plato.stanford.edu/entries/lacan/",
      "note": "Panorama crítico e contextualização histórica."
    }
  ],
  "modes": [
    {
      "id": "motricidade",
      "tag": "01 · Experiência e coordenação",
      "title": "O corpo aprende a se movimentar",
      "text": "Lacan chama atenção para a criança que ainda está desenvolvendo seus movimentos. O desenho não mostra o que ela sente: apenas ajuda a lembrar que coordenar o corpo leva tempo.",
      "focus": "Movimentos em desenvolvimento",
      "insight": "A experiência do corpo não é a mesma coisa que ver uma imagem completa dele."
    },
    {
      "id": "imagem",
      "tag": "02 · Forma visual",
      "title": "A imagem apresenta o corpo inteiro",
      "text": "No espelho, o corpo aparece como uma figura de conjunto. A criança pode encontrar essa forma de unidade mesmo quando ainda precisa de ajuda para se movimentar.",
      "focus": "Figura de conjunto",
      "insight": "Uma imagem corporal completa não prova que os movimentos já estejam totalmente coordenados."
    },
    {
      "id": "tensao",
      "tag": "03 · O descompasso",
      "title": "Compare o movimento e a imagem",
      "text": "De um lado, a criança ainda aprende a controlar seus movimentos. De outro, a imagem apresenta um corpo inteiro. Lacan relaciona essa diferença ao modo como o eu pode se formar.",
      "focus": "Imagem inteira ≠ domínio dos movimentos",
      "insight": "A proposta de Lacan é que a imagem de unidade possa participar da formação do eu."
    }
  ],
  "relations": [
    {
      "id": "imagem",
      "label": "A imagem de um corpo inteiro",
      "badge": "FORMA",
      "title": "A figura vista como conjunto",
      "description": "O espelho oferece uma imagem organizada do corpo. Ela é importante na explicação de Lacan porque pode servir como referência para a formação do eu."
    },
    {
      "id": "identificacao",
      "label": "Identificar-se com uma imagem",
      "badge": "OPERAÇÃO",
      "title": "A imagem participa da formação do eu",
      "description": "Identificar-se é tomar uma imagem como referência. Na teoria do espelho, Lacan propõe que isso participa da maneira como o eu se constitui."
    },
    {
      "id": "alienacao",
      "label": "Uma imagem que aparece fora de nós",
      "badge": "CONSEQUÊNCIA",
      "title": "Por que Lacan fala em alienação?",
      "description": "A imagem ajuda a formar uma unidade do eu, mas aparece fora da criança. Ela não revela tudo sobre a pessoa nem comprova uma identidade interior pronta."
    },
    {
      "id": "alteridade",
      "label": "A relação com outras pessoas",
      "badge": "ARTICULAÇÃO",
      "title": "O espelho não é o mundo inteiro",
      "description": "As identificações também envolvem relações com outras pessoas. No restante do módulo veremos comparação, admiração e rivalidade entre semelhantes. A linguagem será aprofundada no Módulo 5."
    }
  ],
  "trials": [
    {
      "phase": "01 / LEMBRAR",
      "title": "O que a imagem mostra?",
      "prompt": "A criança ainda está aprendendo a coordenar os movimentos. No espelho, aparece uma figura completa de seu corpo. Qual diferença precisamos guardar?",
      "options": [
        {
          "text": "A imagem prova que a criança já domina perfeitamente seus movimentos.",
          "ok": false,
          "why": "Uma figura completa não prova domínio dos movimentos: o corpo continua em desenvolvimento."
        },
        {
          "text": "A imagem mostra um corpo inteiro, mas isso não significa que seus movimentos já sejam totalmente coordenados.",
          "ok": true,
          "why": "Essa diferença entre unidade da figura e coordenação em desenvolvimento prepara a proposta de Lacan."
        },
        {
          "text": "O espelho mostra exatamente o que a criança sente dentro do próprio corpo.",
          "ok": false,
          "why": "A imagem não é um registro direto da experiência subjetiva de um bebê."
        }
      ]
    },
    {
      "phase": "02 / ENTENDER",
      "title": "Por que a imagem importa para o eu?",
      "prompt": "Por que Lacan considera o estádio do espelho importante para a formação do eu?",
      "options": [
        {
          "text": "Porque o espelho revela uma identidade interior completamente formada desde o nascimento.",
          "ok": false,
          "why": "Na proposta de Lacan, o eu se forma por identificações, não nasce como identidade inteiramente pronta."
        },
        {
          "text": "Porque toda pessoa precisa de um espelho físico para conseguir pensar.",
          "ok": false,
          "why": "A teoria usa a cena do espelho para pensar a identificação e não exige um reflexo físico em todos os momentos."
        },
        {
          "text": "Porque identificar-se com uma imagem de conjunto pode participar da formação do eu.",
          "ok": true,
          "why": "O ponto central é a função de uma identificação com a imagem corporal na formação do eu."
        }
      ]
    },
    {
      "phase": "03 / APLICAR",
      "title": "Um desenho pode provar uma teoria?",
      "prompt": "Uma ilustração afirma: «Este desenho mostra exatamente como um bebê sente seu corpo». O que podemos responder?",
      "options": [
        {
          "text": "O desenho ajuda a entender o argumento, mas não mede o que o bebê realmente sente.",
          "ok": true,
          "why": "O laboratório apresenta comparações didáticas. Não observa diretamente a experiência psicológica de crianças reais."
        },
        {
          "text": "O desenho mostra o que o bebê sente desde que tenha sido feito por um pesquisador.",
          "ok": false,
          "why": "A autoria do desenho não transforma uma imagem didática em medição da experiência subjetiva."
        },
        {
          "text": "O desenho comprova como o eu se forma, porque a imagem corporal está completa.",
          "ok": false,
          "why": "Visualizar uma forma completa não comprova toda a teoria nem substitui uma investigação."
        }
      ]
    }
  ],
  "concepts": [
    {
      "name": "Eu",
      "desc": "Nesta teoria, formação relacionada à maneira como nos reconhecemos por meio de imagens e identificações."
    },
    {
      "name": "Imagem corporal",
      "desc": "A figura do corpo vista como conjunto, diferente da experiência de sentir e coordenar movimentos."
    },
    {
      "name": "Identificação",
      "desc": "Tomar uma imagem como referência; na proposta de Lacan, ela participa da formação do eu."
    },
    {
      "name": "Alienação",
      "desc": "Aqui, indica que a imagem na qual o eu se apoia aparece fora da criança. Não significa distração ou falta de atenção."
    }
  ]
};
