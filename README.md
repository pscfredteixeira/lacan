# Formação Lacaniana Interativa

Plataforma de estudo progressivo do pensamento de Jacques Lacan, em português. Projeto editorial mobile-first, com fundo bege, tons de lavanda e foco em leitura confortável.

## Estado do projeto

**Sprint 1 — concluído:** página inicial, matriz de 18 módulos e 108 aulas planejadas, busca, filtros, detalhes dos módulos e ajuste de fonte.

**Sprint 2 — primeira entrega publicada no repositório:** seis aulas introdutórias, cada uma com pergunta inicial, explicações por tópicos, exemplo, síntese, fontes e avaliação de três fases (reconhecimento, compreensão e aplicação). Também há um caderno pessoal e indicadores de progresso.

**Sprint 3 — publicado no repositório:** O Arquivo de Lacan, laboratório histórico de dez documentos, com exploração de fichas por período, linha cronológica, três investigações (reordenação, datas e versões, leitura crítica), feedback conceitual e progresso local. Integrado à página inicial e às aulas 1.1 e 1.6. As referências estão no próprio laboratório.

**Sprint 4 — publicado no repositório:** Laboratório do Estádio do Espelho (`espelho.html`). Contém três movimentos: comparar forma especular e coordenação, explorar imagem/identificação/alienação/alteridade e resolver uma investigação conceitual com três fases e feedback fundamentado. Diagrama SVG responsivo, botões para toque e teclado, ajuste de fonte e conclusão salva localmente. Integrado à página inicial e ao modal do módulo 4, sem marcar as aulas ainda não redigidas como concluídas.

**Próximos sprints:** ampliar a pesquisa e revisão bibliográfica, criar o Laboratório dos Significantes, produzir aulas do módulo 4 e aplicar testes com estudantes reais.

## Acessar

Site do GitHub Pages, quando a publicação pela branch `main` estiver ativa: https://pscfredteixeira.github.io/lacan/

- Página inicial: `index.html`
- Primeira aula: `modulo-1.html?aula=1.1`
- Laboratório 01: `arquivo.html`
- Laboratório 02: `espelho.html`
- Dados dos 18 módulos: `assets/course-data.js`
- Conteúdo do módulo 1: `assets/module-01-content.js`
- Navegação e avaliações: `assets/lessons.js`
- Arquivo histórico: `assets/archive-data.js`, `assets/archive.js`, `assets/archive.css`
- Espelho: `assets/mirror-data.js`, `assets/mirror.js`, `assets/mirror.css`
- Sistema visual: `assets/styles.css`, `assets/theme.css`, `assets/lessons.css`

## Limitações desta versão

- O progresso e as anotações ficam **somente no navegador utilizado**, via localStorage. Não há login, sincronização entre dispositivos ou backup automático.
- A conclusão de uma avaliação não substitui leitura integral das obras de Lacan, discussão teórica ou formação clínica.
- As seis aulas constituem a primeira publicação pedagógica, ainda sujeita a revisão bibliográfica e aprofundamento editorial.
- Os outros 17 módulos têm títulos, descrições e objetivos planejados; **não têm aulas integrais publicadas**.
- O primeiro conjunto de avaliações contém três questões por aula. Os laboratórios de Arquivo e Estádio do Espelho são experiências conceituais adicionais; o Laboratório dos Significantes ainda será desenvolvido.
- O laboratório do espelho **não simula a vida mental de uma criança** e não serve como prova empírica da teoria. Seu foco é exercitar distinções conceituais presentes no texto de 1949.

## Publicação

O site é estático e compatível com GitHub Pages. Em **Settings → Pages**, selecionar **Deploy from a branch → main → /(root)**. Após cada atualização na branch `main`, o GitHub Pages deve republicar o conteúdo automaticamente.

---
Projeto pedagógico em evolução.