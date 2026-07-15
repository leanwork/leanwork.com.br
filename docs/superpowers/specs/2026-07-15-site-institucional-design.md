# Site institucional Leanwork — design

## Contexto

O repositório contém, em `templates/site/`, um mockup exportado de uma ferramenta de design ("dc" — `x-dc`, `sc-for`, `sc-if`, `{{ }}`, `support.js`) com o conteúdo e layout aprovados para a landing page da Leanwork. Esse mockup não é publicável como está: depende de `support.js` (runtime da ferramenta de design), usa diretivas próprias (`sc-for`, `sc-if`, bindings `{{ }}`) e é fixo para desktop (`min-width:1100px`, sem media queries).

O objetivo deste projeto é implementar o site real em HTML+CSS+JS puro (sem frameworks, sem build tool), reproduzindo fielmente o conteúdo e o visual do mockup, tornando-o responsivo e pronto para deploy estático direto a partir da raiz do repositório.

`templates/site/` não é alterado — permanece como referência de design.

## Escopo

Página única (landing page) agora, com a estrutura de arquivos já preparada para receber páginas adicionais no futuro (ex.: Sobre, Contato, Blog), reaproveitando o mesmo CSS e JS.

Os uploads em `templates/site/uploads/` (brand guide, proposta comercial, playbook) são apenas material de referência interno e **não** entram no site público.

## Estrutura de arquivos

```
/index.html
/css/style.css
/js/main.js
/assets/logo.png
/assets/favicon.png
```

- Site publicável a partir da raiz do repositório (compatível com deploy estático direto — GitHub Pages, Railway, Netlify etc.).
- Páginas futuras: novos arquivos `.html` na raiz, reaproveitando `css/style.css` e `js/main.js`; header/footer duplicados manualmente em cada página (sem partials/includes, para não exigir servidor local nem build tool).

## HTML (`index.html`)

Mesmas 9 seções do mockup, na mesma ordem:

1. **Nav** — logo + 5 links de âncora (`#problemas`, `#plataforma`, `#leanapp`, `#outsourcing`, `#como`) + CTA "Fale com a gente". Ganha um botão hamburger, visível apenas em telas estreitas.
2. **Hero** (`#topo`) — headline, subtítulo, dois CTAs, três cards de resumo dos serviços.
3. **Problemas que resolvemos** (`#problemas`) — 5 itens fixos (texto abaixo).
4. **Plataforma Enterprise** (`#plataforma`) — problema + solução + 4 diferenciais + CTA.
5. **Lean App** (`#leanapp`) — solução + 4 diferenciais + CTA + problema.
6. **Outsourcing AI-Native** (`#outsourcing`) — problema + 3 métricas + solução + 4 diferenciais + CTA.
7. **Como trabalhamos** (`#como`) — headline + 4 etapas fixas (texto abaixo).
8. **Por que a Leanwork** — headline + 4 blocos + bloco "Stack" (sempre visível — o mockup tinha `mostrarStack` com default `true`).
9. **CTA final** + **Footer** (logo invertido, tagline, e-mail, copyright).

### Remoção das diretivas do mockup

- `x-dc`, `helmet`, `sc-for`, `sc-if`, `data-screen-label`, `style-hover`, `{{ }}` são removidos; o HTML final é HTML5 padrão.
- `style-hover="..."` vira `:hover` no CSS externo.
- Os estilos inline (`style="..."`) viram classes em `css/style.css`.

### Conteúdo fixo (hoje gerado por `DCLogic`/`renderVals()` no mockup)

- **E-mail de contato:** `comercial@leanwork.com.br`.
- **Mailtos** (assunto fixo por seção, sem JS):
  - Geral: `mailto:comercial@leanwork.com.br?subject=Diagn%C3%B3stico%20Leanwork`
  - Plataforma: assunto "Plataforma Enterprise — diagnóstico"
  - Lean App: assunto "Lean App — diagnóstico"
  - Outsourcing: assunto "Outsourcing AI-Native — montar squad"
- **Problemas (5 itens — número, título, texto):**
  1. Operação digital fragmentada — Plataformas, integrações e dados que não conversam entre si. Cada evolução vira um projeto de risco — e o time-to-market só aumenta.
  2. Dependência excessiva de mídia paga — Conversão baixa e jornada de compra que não retém. O crescimento só acontece enquanto você paga por ele.
  3. Tecnologia que consome sem retornar — Orçamento alto, retorno invisível para a operação. Investimento que vira despesa recorrente em vez de patrimônio digital.
  4. Falta de governança sobre a evolução digital — Decisões reativas, roadmap ditado pelo fornecedor e zero previsibilidade sobre prazos, custos e resultados.
  5. Dados que não viram decisão — Dashboards existem; decisões acionáveis, não. A operação coleta muito e aprende pouco.
- **Etapas (4 itens — número, título, texto):**
  1. Diagnóstico — Mergulho no seu contexto e objetivos: assessment técnico e de negócio, feito em conjunto com as áreas envolvidas.
  2. Prioridades e escopo — Priorização de problemas reais, avaliação consciente de complexidade, risco e escala — e métricas claras de sucesso.
  3. Execução orientada a resultado — Sprints dinâmicos com visibilidade total: planejamento, validação e adaptação contínua do plano.
  4. Acompanhamento de impacto — Governança contínua, transferência de conhecimento e transição suave — sua equipe opera e evolui com autonomia.
- Demais textos (headlines, parágrafos, cards) reproduzidos literalmente do mockup (`templates/site/Site Leanwork.dc.html`).

### Assets

- `assets/logo.png` copiado de `templates/site/assets/logo.png`.
- `assets/favicon.png` gerado a partir do logo para uso como favicon.

## CSS (`css/style.css`)

- Fonte Figtree via Google Fonts (mesmo `<link>` do mockup), pesos 300/400/600/700/800/900.
- Design tokens em `:root` (cores usadas no mockup: `#000000`, `#ffffff`, `#f4f4f4`, `#8a8a8a`, `#555555`, `#e8e8e8`, etc.), evitando repetir hex ao longo do arquivo.
- Layout base: contêiner `max-width:1240px` centralizado, paddings responsivos por breakpoint.
- Breakpoints:
  - `≥1100px`: layout igual ao mockup (referência visual).
  - `768px–1099px`: paddings reduzidos; grids de 2 colunas (Plataforma, Lean App, Outsourcing) e de 4 colunas (Como trabalhamos) colapsam para 1 coluna.
  - `<768px`: nav mostra hamburger (esconde os 5 links + CTA em linha); hero `h1` reduz de 76px para ~40px; demais headlines grandes (44–56px) reduzem proporcionalmente; paddings verticais das seções reduzidos; cards e grids empilham em 1 coluna.
- `:hover` nos links/CTAs reproduz os `style-hover` do mockup.

## JS (`js/main.js`)

Único comportamento: toggle do menu mobile.

- Botão hamburger alterna uma classe (ex. `.nav-open`) no `<header>`/`<nav>` que exibe os links em um drawer/overlay.
- Clicar em qualquer link do menu ou fora do drawer fecha o menu.
- Nenhum outro comportamento JS (sem scroll-spy, sem animações) — fora de escopo.

## Fora de escopo

- Deploy (Railway ou outro) — não faz parte deste projeto.
- Formulário de contato (mantém-se `mailto:`, como no mockup).
- Página(s) adicionais além da landing page atual.
- Qualquer alteração em `templates/site/`.

## Testes

Sem framework de teste automatizado (projeto é HTML/CSS/JS estático). Validação manual:
- Abrir `index.html` direto no navegador (sem servidor) e conferir que carrega corretamente.
- Verificar responsividade em 3 larguras: desktop (≥1100px), tablet (~800px), mobile (~375px).
- Verificar que o menu hamburger abre/fecha corretamente em mobile.
- Verificar que todos os links de âncora e `mailto:` funcionam.
