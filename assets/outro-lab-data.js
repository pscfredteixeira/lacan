/* O Enigma do Outro — Sprint 9. Três experimentos conceituais.
 * Concepções contextualizadas: Lacan, Seminário 2, 3, 6, 17 e Escritos.
 * Modelos pedagógicos sem capacidade de identificação/diagnóstico clínico. */
window.LACAN_OUTRO_LAB={
 rooms:[
 {id:"lugares",number:"01",title:"Quem está falando — e de onde?",subtitle:"Uma pessoa, um semelhante ou um lugar simbólico?",
 description:"Em cada cena, identifique a função que a ficha põe em primeiro plano. Pessoas concretas participam de relações simbólicas e imaginárias ao mesmo tempo; a atividade isola uma ênfase para estudo.",
 options:[{id:"empirico",label:"Pessoa concreta"},{id:"imaginario",label:"Semelhante / imaginário"},{id:"simbolico",label:"Lugar simbólico"}],
 cases:[
 {text:"Na cena, Clara está ao lado de Ana e lhe entrega uma carta. Estamos apenas identificando Clara como indivíduo presente.",correct:"empirico",why:"«Clara» nomeia a participante da cena. Sua existência não determina automaticamente a função do grande Outro."},
 {text:"Em um concurso fictício, dois candidatos se comparam e cada um toma o outro como imagem de quem gostaria de ser.",correct:"imaginario",why:"A comparação com o semelhante destaca relações de identificação e rivalidade imaginárias, sem permitir qualquer diagnóstico."},
 {text:"Duas pessoas usam um idioma que nenhuma delas inventou: suas regras e relações significantes já estavam disponíveis antes do encontro.",correct:"simbolico",why:"A língua e suas relações permitem ilustrar uma dimensão do campo simbólico. A analogia não esgota o grande Outro."},
 {text:"A narrativa apresenta o professor Rui, uma pessoa que responde uma pergunta. A ficha quer distinguir Rui de sua função teórica.",correct:"empirico",why:"É uma pessoa concreta. O fato de ensinar não faz dela a encarnação integral do Outro."},
 {text:"Uma personagem é levada a medir a própria aparência pela de um colega admirado, que funciona como semelhante idealizado.",correct:"imaginario",why:"O foco está no outro como referência especular da identificação, não na sua profissão ou posição de poder."},
 {text:"A expressão «eu prometo» adquire uma função reconhecível porque é enunciada em práticas, convenções e relações de linguagem.",correct:"simbolico",why:"A possibilidade de enunciar uma promessa envolve lugares e convenções simbólicas, para além da intenção individual."}
 ]},
 {id:"basta",number:"02",title:"O final muda o começo",subtitle:"Um experimento com a retroação do sentido",
 description:"Escolha dois finais diferentes para a mesma frase e observe como a cena inicial admite outras leituras. Isso é uma analogia da retroação, não uma demonstração completa do ponto de capiton.",
 stems:[
 {id:"carta",start:"Ela guardou a carta porque",endings:[
 {id:"preciosa",text:"a mensagem era preciosa.",why:"Guardar pode adquirir uma leitura de cuidado e conservação."},
 {id:"esconder",text:"não queria que ninguém a lesse.",why:"A mesma ação ganha a direção possível de ocultamento."},
 {id:"reler",text:"precisava relê-la no dia seguinte.",why:"A leitura passa a destacar espera e retomada."}]},
 {id:"chave",start:"Ele deixou a chave sobre a mesa porque",endings:[
 {id:"voltar",text:"esperava que ela voltasse.",why:"A chave pode funcionar como sinal de acesso e expectativa de retorno."},
 {id:"mudar",text:"já não morava naquela casa.",why:"A mesma cena passa a sugerir mudança e afastamento."},
 {id:"esquecer",text:"estava distraído.",why:"A frase pode descrever um esquecimento cotidiano, sem interpretação inconsciente automática."}]}
 ],
 mainQuestion:"O que esse contraste efetivamente demonstra?",
 conclusions:[
 {id:"diagnostico",text:"Que o programa identificou o desejo inconsciente de quem escreveu.",correct:false,why:"Um exercício de frases ficcionais não constitui interpretação clínica."},
 {id:"retroacao",text:"Que um termo posterior pode reorganizar a leitura dos termos anteriores.",correct:true,why:"A comparação ilustra retroação e efeitos de sentido. O ponto de basta em Lacan exige a leitura das articulações teóricas completas."},
 {id:"fixo",text:"Que a primeira palavra já continha um significado psicológico fixo.",correct:false,why:"Os finais diferentes tornam inadequada a suposição de que uma palavra isolada encerra todo o sentido."}
 ]},
 {id:"limites",number:"03",title:"Há garantia para tudo?",subtitle:"Sujeito, cadeia e falta no Outro",
 description:"Três perguntas para distinguir notações teóricas de pessoas concretas e evitar falsas certezas.",
 quizzes:[
 {title:"Uma palavra pode dizer tudo?",prompt:"Um personagem é chamado de «estudante». Qual formulação respeita a ideia de representação significante?",options:[
 {text:"O rótulo define para sempre seu desejo e sua identidade.",correct:false,why:"A relação significante não constitui uma biografia completa."},
 {text:"A nomeação participa de uma rede; a representação de um sujeito envolve relações entre significantes.",correct:true,why:"A construção lacaniana é relacional, não um somatório de etiquetas."},
 {text:"O uso da palavra permite calcular sua estrutura clínica.",correct:false,why:"O exemplo não fornece nenhum diagnóstico."}]},
 {title:"O que representa a barra em $?",prompt:"Qual é a leitura adequada para a escrita do sujeito barrado?",options:[
 {text:"Uma pessoa com duas personalidades.",correct:false,why:"A barra é um recurso formal da teoria do sujeito, não uma descrição de transtornos."},
 {text:"Uma pessoa cujo eu foi dividido por uma fotografia.",correct:false,why:"Isso confunde uma analogia visual com um conceito."},
 {text:"Uma não coincidência plena do sujeito consigo mesmo no campo da linguagem e do desejo.",correct:true,why:"A divisão subjetiva não equivale a uma personalidade fragmentada."}]},
 {title:"«Não há Outro do Outro» quer dizer o quê?",prompt:"Por que o grande Outro não oferece uma última resposta garantida a todas as perguntas?",options:[
 {text:"Porque não existe uma garantia simbólica absoluta exterior ao campo do Outro.",correct:true,why:"A falta no Outro indica limites da garantia; não significa que todas as afirmações sejam falsas."},
 {text:"Porque palavras não possuem usos relativamente estáveis.",correct:false,why:"A falta de garantia absoluta não elimina todas as estabilizações de sentido."},
 {text:"Porque nenhuma pessoa pode confiar em outra pessoa.",correct:false,why:"É uma tese sobre garantia simbólica, não uma regra psicológica de desconfiança."}]}
 ]}
 ],
 sources:[
 {label:"Stanford Encyclopedia of Philosophy · Jacques Lacan",url:"https://plato.stanford.edu/entries/lacan/",note:"Panorama do Simbólico, da alteridade e do sujeito barrado."},
 {label:"Lacan, Seminário 3 · A lição sobre o ponto de basta (6 de junho de 1956)",url:"https://lacanianworks.org/session-xxi-of-seminar-iii-the-quilting-point-6th-june-1956-jacques-lacan",note:"Referência à sessão do ensino oral; edição do seminário é posterior."},
 {label:"SciELO / Ágora · Não há Outro do Outro e o Seminário 6",url:"https://www.scielo.br/j/agora/a/D9gP5wXCyqWw5bLYbpwhQsR/?lang=pt",note:"Estudo em português sobre a formulação de 1959."}
 ]
};