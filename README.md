# Formação Lacaniana Interativa

Plataforma de estudo progressivo do pensamento de Jacques Lacan, em português. Projeto editorial mobile-first, com fundo bege, tons de lavanda e foco em leitura confortável.

## Estado do projeto

**Sprint 1 — concluído:** página inicial, matriz de 18 módulos e 108 aulas planejadas, busca, filtros, detalhes dos módulos e ajuste de fonte.

**Sprint 2 — primeira entrega publicada no repositório:** seis aulas introdutórias, cada uma com pergunta inicial, explicações por tópicos, exemplo, síntese, fontes e avaliação de três fases (reconhecimento, compreensão e aplicação). Também há um caderno pessoal e indicadores de progresso.

**Sprint 3 — publicado no repositório:** O Arquivo de Lacan, laboratório histórico de dez documentos, com exploração de fichas por período, linha cronológica, três investigações (reordenação, datas e versões, leitura crítica), feedback conceitual e progresso local. Integrado à página inicial e às aulas 1.1 e 1.6. As referências estão no próprio laboratório.

**Sprint 4 — publicado no repositório:** Laboratório do Estádio do Espelho (`espelho.html`). Contém três movimentos: comparar forma especular e coordenação, explorar imagem/identificação/alienação/alteridade e resolver uma investigação conceitual com três fases e feedback fundamentado. Diagrama SVG responsivo, botões para toque e teclado, ajuste de fonte e conclusão salva localmente. Integrado à página inicial e ao modal do módulo 4, sem marcar as aulas ainda não redigidas como concluídas.

**Sprint 5 — enviado ao repositório:** Laboratório dos Significantes (`significantes.html`). Três mesas de aprendizagem: montagem de uma narrativa com escolha de palavras e comparação de versões; classificação explicada de operações de substituição e conexão em quatro exemplos; avaliação progressiva de reconhecimento, compreensão e aplicação crítica. A interface funciona sem arrastar, com botões grandes e progresso local nos dossiês e na avaliação. A atividade evita qualquer promessa de interpretação clínica automática.

**Sprint 6 — publicado no repositório:** Módulo 3, *Linguagem e inconsciente*, com seis aulas de leitura (3.1 a 3.6), desenvolvimento teórico, exemplos delimitados, bibliografia, conceitos em foco expansíveis, perguntas de reflexão, dois cadernos de anotações por aula e avaliação em três fases. O Ateliê dos Significantes é acessível das aulas 3.2, 3.3, 3.4 e 3.6, e o módulo completo pode ser aberto do catálogo e da página inicial. Introduzido um leitor modular independente (`assets/reader.js`) para facilitar novos módulos sem aumentar arquivos gigantescos.

**Próximos sprints:** desenvolver o Módulo 2 (*Freud: fundamentos necessários*), aprofundar verificações de bibliografia primária e testes de acessibilidade e de aprendizagem com estudantes.

## Acessar

Site do GitHub Pages, quando a publicação pela branch `main` estiver ativa: https://pscfredteixeira.github.io/lacan/

- Página inicial: `index.html`
- Primeira aula: `modulo-1.html?aula=1.1`
- Laboratório 01: `arquivo.html`
- Laboratório 02: `espelho.html`
- Laboratório 03: `significantes.html`
- Seis aulas do Módulo 3: `modulo-3.html?aula=3.1`
- Dados dos 18 módulos: `assets/course-data.js`
- Conteúdo do módulo 1: `assets/module-01-content.js`
- Navegação e avaliações: `assets/lessons.js`
- Arquivo histórico: `assets/archive-data.js`, `assets/archive.js`, `assets/archive.css`
- Espelho: `assets/mirror-data.js`, `assets/mirror.js`, `assets/mirror.css`
- Significantes: `assets/significantes-data.js`, `assets/significantes.js`, `assets/significantes.css`
- Leitor reutilizável do Módulo 3: `assets/reader.js`, `assets/reader.css`, `assets/module-03-content.js`
- Sistema visual: `assets/styles.css`, `assets/theme.css`, `assets/lessons.css`

## Limitações desta versão

- O progresso e as anotações ficam **somente no navegador utilizado**, via localStorage. Não há login, sincronização entre dispositivos ou backup automático.
- A conclusão de uma avaliação não substitui leitura integral das obras de Lacan, discussão teórica ou formação clínica.
- Os Módulos 1 e 3 oferecem atualmente **12 aulas com conteúdos desenvolvidos**. A publicação é pedagógica e continua sujeita a revisão bibliográfica e aprofundamento editorial.
- Os outros 16 módulos têm títulos, descrições e objetivos planejados; **ainda não têm aulas integrais publicadas**.
- As aulas publicadas contêm três questões por aula. Os três laboratórios atuais são experiências conceituais adicionais e não substituem a formação teórica nem a leitura das fontes.
- O Módulo 2 aparece como pré-requisito na matriz pedagógica, mas ainda não está publicado; o Módulo 3 pode ser lido de maneira independente, com explicações introdutórias.
- O laboratório do espelho **não simula a vida mental de uma criança** e não serve como prova empírica da teoria. Seu foco é exercitar distinções conceituais presentes no texto de 1949.

## Publicação

O site é estático e compatível com GitHub Pages. Em **Settings → Pages**, selecionar **Deploy from a branch → main → /(root)**. Após cada atualização na branch `main`, o GitHub Pages deve republicar o conteúdo automaticamente.

---
Projeto pedagógico em evolução.