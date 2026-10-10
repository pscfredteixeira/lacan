# Formação Lacaniana Interativa

Plataforma de estudo progressivo do pensamento de Jacques Lacan, em português. Projeto editorial mobile-first, com fundo bege, tons de lavanda e foco em leitura confortável.

## Estado do projeto

**Sprint 1 — concluído:** página inicial, matriz de 18 módulos e 108 aulas planejadas, busca, filtros, detalhes dos módulos e ajuste de fonte.

**Sprint 2 — primeira entrega publicada no repositório:** seis aulas introdutórias, cada uma com pergunta inicial, explicações por tópicos, exemplo, síntese, fontes e avaliação de três fases (reconhecimento, compreensão e aplicação). Também há um caderno pessoal e indicadores de progresso.

**Sprint 3 — publicado no repositório:** O Arquivo de Lacan, laboratório histórico de dez documentos, com exploração de fichas por período, linha cronológica, três investigações (reordenação, datas e versões, leitura crítica), feedback conceitual e progresso local. Integrado à página inicial e às aulas 1.1 e 1.6. As referências estão no próprio laboratório.

**Próximos sprints:** aprimorar revisão bibliográfica e acessibilidade, acrescentar simulações conceituais (por exemplo, estádio do espelho e laboratório de significantes), continuar os demais módulos e realizar testes com estudantes.

## Acessar

Site do GitHub Pages, quando a publicação pela branch `main` estiver ativa: https://pscfredteixeira.github.io/lacan/

- Página inicial: `index.html`
- Primeira aula: `modulo-1.html?aula=1.1`
- Laboratório 01: `arquivo.html`
- Dados dos 18 módulos: `assets/course-data.js`
- Conteúdo do módulo 1: `assets/module-01-content.js`
- Navegação e avaliações: `assets/lessons.js`
- Arquivo histórico: `assets/archive-data.js`, `assets/archive.js`, `assets/archive.css`
- Sistema visual: `assets/styles.css`, `assets/theme.css`, `assets/lessons.css`

## Limitações desta versão

- O progresso e as anotações ficam **somente no navegador utilizado**, via localStorage. Não há login, sincronização entre dispositivos ou backup automático.
- A conclusão de uma avaliação não substitui leitura integral das obras de Lacan, discussão teórica ou formação clínica.
- As seis aulas constituem a primeira publicação pedagógica, ainda sujeita a revisão bibliográfica e aprofundamento editorial.
- Os outros 17 módulos têm títulos, descrições e objetivos planejados; **não têm aulas integrais publicadas**.
- O primeiro conjunto de avaliações contém três questões por aula. O laboratório histórico é uma experiência de aprendizagem adicional; simulações de conceitos como o estádio do espelho e o significante serão desenvolvidas em sprints posteriores.

## Publicação

O site é estático e compatível com GitHub Pages. Em **Settings → Pages**, selecionar **Deploy from a branch → main → /(root)**. Após cada atualização na branch `main`, o GitHub Pages deve republicar o conteúdo automaticamente.

---
Projeto pedagógico em evolução.