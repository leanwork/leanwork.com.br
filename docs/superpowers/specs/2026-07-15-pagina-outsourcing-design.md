# Página dedicada de Outsourcing AI-Native — Design

## Contexto

O site institucional (`index.html`) tem uma seção `#outsourcing` resumindo o serviço de Outsourcing AI-Native. Existe um template de referência em `templates/pagina-outsourcing/Landing Outsourcing AI-Native.dc.html` — export de uma ferramenta de design, com conteúdo rico (perfis, planos, comparação de squad) mas visual próprio (tema escuro, verde `#25D366`, fonte Poppins, CTA via WhatsApp) desalinhado do design system atual do site.

Objetivo: criar `outsourcing.html`, uma página dedicada com o conteúdo do template, mas adaptada ao design system existente do site (tokens de `css/style.css`, tema claro, Figtree, CTA por e-mail), e linkada a partir da home.

## Estrutura e roteamento

- Novo arquivo `outsourcing.html` na raiz do projeto, mesmo nível de `index.html`.
- Reaproveita `css/style.css` (adicionando novas classes ao final do arquivo) e `js/main.js` (menu mobile) sem alterações no JS.
- **Header**: mesmo markup/classes de `.site-header`/`.nav` de `index.html`. Logo aponta para `index.html`. Links do menu apontam para as âncoras da home (`index.html#problemas`, `index.html#plataforma`, `index.html#leanapp`, `index.html#como`). O item de menu "Outsourcing" aponta para `outsourcing.html#topo` (âncora local, já que estamos na própria página).
- **Footer**: idêntico ao `.site-footer` de `index.html`, sem alterações.
- CTAs de contato usam `mailto:comercial@leanwork.com.br?subject=...` com assuntos específicos ao contexto (ex.: "Outsourcing AI-Native — montar squad"). Sem WhatsApp, sem botão flutuante.
- Sem cor de acento: paleta estritamente preto/branco/cinza (tokens `--c-black`, `--c-white`, `--c-bg-light`, `--c-text-body`, `--c-text-eyebrow`, `--c-border`), igual ao resto do site.

## Seções (em ordem)

### 1. Hero (`.hero`, fundo preto — reaproveita classes existentes)
- Eyebrow: "Outsourcing · Engenharia de Software AI-Native"
- Título: "Times de engenharia potencializados por IA, dedicados ao seu produto"
- Subtítulo: mantém a mensagem do template (squads menores, alocação mensal, supervisão técnica)
- 2 CTAs: `.btn--light` (mailto, assunto "montar squad") + `.btn--outline` (âncora `#perfis`, "Ver perfis disponíveis")
- Stats row reaproveitando `.stats-row`/`.stat-item`: "4 = 6–7" (squad equivale a time tradicional), "160h/mês" (dedicação full-time), "15 dias" (onboarding), "100%" (código com revisão humana e testes)

### 2. Por que AI-native (`#por-que`, fundo branco)
- `.section-eyebrow` + `.section-title` + `.section-text` de intro
- Grid de 4 cards (novo `.why-ai-grid`/`.why-ai-item`, mesma estética de `.why-item`): Engenharia com IA, Full-stack por padrão, Squads enxutos, Qualidade auditável
- Bloco comparativo "time tradicional (6–7 pessoas) vs squad AI-native Leanwork (4 pessoas)" — novo `.compare-row` com dois `.compare-card`, sem cor de destaque (usa peso de fonte/borda para diferenciar o squad Leanwork)

### 3. Perfis disponíveis (`#perfis`, fundo `--c-bg-light`)
- `.section-eyebrow` + `.section-title` + `.section-text`
- Grid 3 colunas (novo `.perfis-grid`/`.perfil-card`) com os 9 perfis do template: Tech Lead/Arquiteto de Soluções, AI Engineer, Software Engineer (full-stack), Mobile Engineer, Engenheiro de Dados, Cloud/Platform Engineer, Product Engineer, Quality Engineer, Product Designer — mesmos textos do template, traduzidos/mantidos em pt-BR

### 4. Como funciona (`#como-funciona`, fundo branco)
- Reaproveita padrão `.steps-grid`/`.step-item` com os 4 passos do template: Monte seu time, Alocação mensal, Gestão compartilhada, Onboarding em 15 dias
- Abaixo, grid de 3 planos (novo `.planos-grid`/`.plano-card`): Mensal avulso, Contrato 6 meses, Contrato 12 meses (com selo "melhor condição" via `.plano-card--destaque`, sem cor — usa borda mais forte + fundo levemente diferenciado). Nota final: "Valores sob consulta — solicite uma proposta personalizada."

### 5. Squad exemplo (`#squad`, fundo `--c-bg-light`)
- Duas colunas: texto (título, descrição, CTA mailto "Solicitar proposta personalizada") + card de composição (novo `.squad-exemplo`/`.squad-item`) listando 1× Tech Lead, 2× Software Engineer, 1× AI Engineer, com total "4 profissionais"

### 6. CTA final
- Reaproveita `.cta-final` exatamente como em `index.html`, com título/texto adaptados ao contexto de outsourcing e CTA mailto.

## Responsivo

Segue os mesmos breakpoints já usados no site (`max-width:1099px` e `max-width:767px`), colapsando grids de N colunas para 1 coluna e ajustando paddings de seção (110px → 80px → 56px), consistente com os padrões já existentes em `css/style.css`.

## Mudança na home (`index.html`)

Na seção `#outsourcing` existente, ao lado do botão `.btn.btn--light.service-solution-cta` ("Montar um squad AI-native"), adicionar um link secundário de texto "Saiba mais →" apontando para `outsourcing.html`, sem estilo de botão (link simples, menor destaque visual que o CTA de e-mail).

## Fora de escopo

- Sem alterações em `js/main.js` (o menu mobile já funciona via classe `.nav-toggle`/`.nav-links`, reaproveitado sem mudanças).
- Sem WhatsApp, sem botão flutuante, sem cor de acento verde.
- Não remove nem reescreve a seção `#outsourcing` já existente na home — só adiciona o link.
- Não usa os assets de `templates/pagina-outsourcing/` (logo invertido para tema escuro, screenshots, PDF de proposta) — usa os assets já existentes em `assets/` (logo e favicon do site).
