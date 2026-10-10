# Formação Lacaniana Interativa

Plataforma de estudo progressivo do pensamento de Jacques Lacan, em português. Projeto editorial mobile-first, com fundo bege, tons de lavanda e foco em leitura confortável.

## Estado do projeto

**Sprint 1 — concluído:** página inicial, matriz de 18 módulos e 108 aulas planejadas, busca, filtros, detalhes dos módulos e ajuste de fonte.

**Sprint 2 — primeira entrega publicada no repositório:** seis aulas introdutórias, cada uma com pergunta inicial, explicações por tópicos, exemplo, síntese, fontes e avaliação de três fases (reconhecimento, compreensão e aplicação). Também há um caderno pessoal e indicadores de progresso.

**Próximos sprints:** aprofundar a revisão bibliográfica, desenvolver experiências interativas próprias (não apenas quizzes), continuar os demais módulos e melhorar testes de usabilidade/acessibilidade.

## Acessar

Site do GitHub Pages, quando a publicação pela branch `main` estiver ativa: https://pscfredteixeira.github.io/lacan/

- Página inicial: `index.html`
- Primeira aula: `modulo-1.html?aula=1.1`
- Dados dos 18 módulos: `assets/course-data.js`
- Conteúdo do módulo 1: `assets/module-01-content.js`
- Navegação e avaliações: `assets/lessons.js`
- Sistema visual: `assets/styles.css`, `assets/theme.css`, `assets/lessons.css`

## Limitações desta versão

- O progresso e as anotações ficam **somente no navegador utilizado**, via localStorage. Não há login, sincronização entre dispositivos ou backup automático.
- A conclusão de uma avaliação não substitui leitura integral das obras de Lacan, discussão teórica ou formação clínica.
- As seis aulas constituem a primeira publicação pedagógica, ainda sujeita a revisão bibliográfica e aprofundamento editorial.
- Os outros 17 módulos têm títulos, descrições e objetivos planejados; **não têm aulas integrais publicadas**.
- O primeiro conjunto de avaliações contém três questões por aula. Jogos e simulações conceituais serão desenvolvidos separadamente.

## Publicação

O site é estático e compatível com GitHub Pages. Em **Settings → Pages**, selecionar **Deploy from a branch → main → /(root)**. Após cada atualização na branch `main`, o GitHub Pages deve republicar o conteúdo automaticamente.

---
Projeto pedagógico em evolução.