# Página dedicada de Outsourcing AI-Native — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar `outsourcing.html`, uma landing page dedicada ao serviço de Outsourcing AI-Native, com o conteúdo do template `templates/pagina-outsourcing/Landing Outsourcing AI-Native.dc.html` adaptado ao design system existente do site (tokens de `css/style.css`, tema claro, Figtree, CTAs por e-mail), e linkada a partir da seção `#outsourcing` da home.

**Architecture:** Site estático sem build step. A nova página reaproveita `css/style.css` (append de novas classes ao final do arquivo) e `js/main.js` (sem alterações). Header e footer são copiados de `index.html` com ajustes de href. Não há framework de testes no projeto — a verificação de cada task é visual, via Playwright MCP (navegar, screenshot, checar console), seguindo o padrão já usado no histórico do projeto ("Fix QA issues found in full-page responsive pass").

**Tech Stack:** HTML5, CSS puro (custom properties), JS vanilla (`js/main.js`, sem alterações), Playwright MCP para verificação visual.

## Global Constraints

- Sem cor de acento — paleta estritamente `--c-black`/`--c-white`/`--c-bg-light`/`--c-text-body`/`--c-text-eyebrow`/`--c-border`, igual ao resto do site.
- Sem WhatsApp, sem botão flutuante. Todos os CTAs usam `mailto:comercial@leanwork.com.br?subject=...`.
- Fonte: Figtree (já carregada via Google Fonts em `index.html`; repetir o mesmo `<link>` em `outsourcing.html`).
- Breakpoints: `max-width:1099px` e `max-width:767px`, mesmos valores de padding usados no restante de `css/style.css` (110px → 80px → 56px em seções grandes).
- Não modificar `js/main.js`.
- Não usar assets de `templates/pagina-outsourcing/` — usar `assets/logo.png` e `assets/favicon.png` já existentes.
- Copy em pt-BR, tom consistente com o resto do site (institucional, direto, sem jargão de growth/vendas agressivo).

---

## File Structure

- **Create:** `outsourcing.html` — nova página, raiz do projeto.
- **Modify:** `css/style.css` — append de novas classes ao final do arquivo (não altera nada existente).
- **Modify:** `index.html:179-189` — adiciona link "Saiba mais →" na seção `#outsourcing`.

---

### Task 1: Scaffold de `outsourcing.html` (head, header, footer)

**Files:**
- Create: `outsourcing.html`

**Interfaces:**
- Produces: arquivo `outsourcing.html` com `<head>`, `<header class="site-header">`, `<main>` vazio (com comentários marcando cada seção futura), `<footer class="site-footer">`, `<script src="js/main.js" defer>`. Tasks seguintes preenchem o `<main>`.

- [ ] **Step 1: Criar o arquivo com head, header e footer**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Outsourcing AI-Native — Leanwork Group</title>
<meta name="description" content="Squads de engenharia AI-native da Leanwork: profissionais dedicados que operam com agentes de IA em todo o ciclo de desenvolvimento, sob supervisão técnica rigorosa.">
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="site-header">
  <div class="container nav">
    <a href="index.html" class="nav-logo"><img src="assets/logo.png" alt="Leanwork Group"></a>
    <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav-links">
      <a href="index.html#problemas" class="nav-link">Problemas que resolvemos</a>
      <a href="index.html#plataforma" class="nav-link">Plataforma Enterprise</a>
      <a href="index.html#leanapp" class="nav-link">Lean App</a>
      <a href="outsourcing.html#topo" class="nav-link">Outsourcing</a>
      <a href="index.html#como" class="nav-link">Como trabalhamos</a>
      <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="nav-link nav-cta btn btn--dark">Fale com a gente</a>
    </nav>
  </div>
</header>
<main>
<!-- HERO -->
<!-- POR QUE AI-NATIVE -->
<!-- PERFIS -->
<!-- COMO FUNCIONA -->
<!-- SQUAD EXEMPLO -->
<!-- CTA FINAL -->
</main>

<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <img src="assets/logo.png" alt="Leanwork Group" class="footer-logo">
      <span class="footer-tagline">live the experience</span>
    </div>
    <div class="footer-meta">
      <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="footer-email">comercial@leanwork.com.br</a>
      <span class="footer-copyright">© 2026 Leanwork Group</span>
    </div>
  </div>
</footer>
<script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verificar visualmente que header/footer renderizam igual à home**

Sirva a pasta (`npx serve .` ou `python -m http.server 8000`) e use o Playwright MCP:
- `browser_navigate` para `http://localhost:8000/outsourcing.html`
- `browser_take_screenshot`
- `browser_console_messages` — deve estar vazio (sem erros 404 de imagem/CSS)

Esperado: header sticky idêntico ao de `index.html` (logo, menu, botão "Fale com a gente"), footer idêntico, `<main>` vazio no meio.

- [ ] **Step 3: Commit**

```bash
git add outsourcing.html
git commit -m "Scaffold outsourcing.html with shared header and footer"
```

---

### Task 2: Seção Hero

**Files:**
- Modify: `outsourcing.html` (substitui `<!-- HERO -->` dentro de `<main>`)

**Interfaces:**
- Consumes: classes existentes `.hero`, `.hero-eyebrow`, `.hero-title`, `.hero-subtitle`, `.hero-actions`, `.btn`, `.btn--light`, `.btn--outline`, `.stats-row`, `.stat-item`, `.stat-number`, `.stat-label` (já definidas em `css/style.css`, nenhuma mudança de CSS necessária nesta task).
- Produces: seção `id="topo"` no topo da página, âncora usada pelo link "Outsourcing" do header (Task 1) e pelo botão "Ver perfis disponíveis" (âncora `#perfis`, produzida na Task 4).

- [ ] **Step 1: Substituir o comentário `<!-- HERO -->` pelo markup do hero**

```html
<section id="topo" class="hero">
  <div class="container">
    <div class="hero-eyebrow">Outsourcing · Engenharia de Software AI-Native</div>
    <h1 class="hero-title">Times de engenharia potencializados por IA, dedicados ao seu produto</h1>
    <p class="hero-subtitle">Squads menores, mais rápidos e com qualidade auditável. Alocação mensal de profissionais que operam com agentes de IA em todo o ciclo de desenvolvimento — sob supervisão técnica rigorosa.</p>
    <div class="hero-actions">
      <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="btn btn--light">Montar um squad AI-native</a>
      <a href="#perfis" class="btn btn--outline">Ver perfis disponíveis</a>
    </div>
    <div class="stats-row">
      <div class="stat-item"><div class="stat-number">4 = 6–7</div><div class="stat-label">squad AI-native equivale a um time tradicional</div></div>
      <div class="stat-item"><div class="stat-number">160h/mês</div><div class="stat-label">dedicação full-time por profissional</div></div>
      <div class="stat-item"><div class="stat-number">15 dias</div><div class="stat-label">onboarding em até 15 dias úteis após assinatura</div></div>
      <div class="stat-item"><div class="stat-number">100%</div><div class="stat-label">do código com revisão humana e testes</div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verificar visualmente**

`browser_navigate` para `outsourcing.html`, `browser_take_screenshot`. Esperado: hero em fundo preto, título/subtítulo/CTAs como no restante do site, `.stats-row` com 4 itens dividida em colunas iguais (o CSS existente de `.stat-item{flex:1}` já suporta N itens).

- [ ] **Step 3: Commit**

```bash
git add outsourcing.html
git commit -m "Add hero section to outsourcing.html"
```

---

### Task 3: Seção "Por que AI-native"

**Files:**
- Modify: `outsourcing.html` (substitui `<!-- POR QUE AI-NATIVE -->`)
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: `.container`, `.section-eyebrow`, `.section-title`, `.section-text` (existentes).
- Produces: classes novas `.why-ai-section`, `.why-ai-grid`, `.why-ai-item`, `.why-ai-item-title`, `.why-ai-item-text`, `.compare-row`, `.compare-card`, `.compare-card--leanwork`, `.compare-label`, `.compare-dots`, `.compare-dot`, `.compare-extra`, `.compare-text` — usadas apenas nesta task.

- [ ] **Step 1: Append CSS ao final de `css/style.css`**

```css
.why-ai-section .container{padding-top:110px;padding-bottom:110px}
.why-ai-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:56px}
.why-ai-item{border:1px solid var(--c-border);padding:36px}
.why-ai-item-title{margin:0;font-size:19px;font-weight:700;letter-spacing:-0.01em}
.why-ai-item-text{margin:14px 0 0;font-size:15px;line-height:1.6;color:var(--c-text-body)}

.compare-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px}
.compare-card{border:1px solid var(--c-border);padding:32px 36px;display:flex;flex-direction:column;gap:16px}
.compare-card--leanwork{border-color:var(--c-black)}
.compare-label{font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:var(--c-text-eyebrow)}
.compare-card--leanwork .compare-label{color:var(--c-black)}
.compare-dots{display:flex;align-items:center;gap:10px}
.compare-dot{width:34px;height:34px;border-radius:50%;background:#e8e8e8;flex:none}
.compare-card--leanwork .compare-dot{background:var(--c-black)}
.compare-extra{font-size:13px;color:var(--c-text-body)}
.compare-text{font-size:14px;color:var(--c-text-body)}
.compare-card--leanwork .compare-text{color:#333333}

@media (max-width:1099px){
  .why-ai-section .container{padding-top:80px;padding-bottom:80px}
}
@media (max-width:767px){
  .why-ai-section .container{padding-top:56px;padding-bottom:56px}
  .why-ai-grid{grid-template-columns:1fr}
  .compare-row{grid-template-columns:1fr}
}
```

- [ ] **Step 2: Substituir o comentário `<!-- POR QUE AI-NATIVE -->` pelo markup**

```html
<section id="por-que" class="why-ai-section">
  <div class="container">
    <div class="section-eyebrow">Por que AI-native</div>
    <h2 class="section-title">Por que times AI-native entregam mais</h2>
    <p class="section-text">A IA não substitui a engenharia — ela multiplica a capacidade de profissionais experientes. A responsabilidade pela qualidade é nossa, não da ferramenta.</p>
    <div class="why-ai-grid">
      <div class="why-ai-item">
        <h3 class="why-ai-item-title">Engenharia com IA</h3>
        <p class="why-ai-item-text">Agentes de IA integrados ao ciclo de desenvolvimento — geração de código, testes automatizados, revisão e documentação — sob supervisão técnica rigorosa.</p>
      </div>
      <div class="why-ai-item">
        <h3 class="why-ai-item-title">Full-stack por padrão</h3>
        <p class="why-ai-item-text">Profissionais que atuam em toda a stack — back-end, front-end e integrações — eliminando a divisão tradicional entre especialidades e reduzindo handoffs.</p>
      </div>
      <div class="why-ai-item">
        <h3 class="why-ai-item-title">Squads enxutos</h3>
        <p class="why-ai-item-text">Um squad de 4 profissionais entrega capacidade equivalente à de um time tradicional de 6 a 7 pessoas — menos custo de coordenação e mais velocidade.</p>
      </div>
      <div class="why-ai-item">
        <h3 class="why-ai-item-title">Qualidade auditável</h3>
        <p class="why-ai-item-text">Todo código gerado com apoio de IA passa por revisão humana, testes automatizados e padrões de segurança acordados com o cliente.</p>
      </div>
    </div>
    <div class="compare-row">
      <div class="compare-card">
        <div class="compare-label">Time tradicional</div>
        <div class="compare-dots">
          <span class="compare-dot"></span><span class="compare-dot"></span><span class="compare-dot"></span>
          <span class="compare-dot"></span><span class="compare-dot"></span><span class="compare-dot"></span><span class="compare-dot"></span>
        </div>
        <div class="compare-text">6–7 pessoas · mais handoffs, mais coordenação</div>
      </div>
      <div class="compare-card compare-card--leanwork">
        <div class="compare-label">Squad AI-native Leanwork</div>
        <div class="compare-dots">
          <span class="compare-dot"></span><span class="compare-dot"></span><span class="compare-dot"></span><span class="compare-dot"></span>
          <span class="compare-extra">+ agentes de IA</span>
        </div>
        <div class="compare-text">4 pessoas · mesma capacidade de entrega</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verificar visualmente**

`browser_navigate` + `browser_take_screenshot` em desktop e depois `browser_resize` para 767px de largura + novo screenshot. Esperado: grid 2 colunas em desktop, 1 coluna em mobile; card "Leanwork" com borda preta (destaque sem cor).

- [ ] **Step 4: Commit**

```bash
git add outsourcing.html css/style.css
git commit -m "Add why-AI-native section to outsourcing.html"
```

---

### Task 4: Seção "Perfis disponíveis"

**Files:**
- Modify: `outsourcing.html` (substitui `<!-- PERFIS -->`)
- Modify: `css/style.css` (append)

**Interfaces:**
- Produces: classes `.perfis-section`, `.perfis-grid`, `.perfil-card`, `.perfil-title`, `.perfil-text`. Produces a âncora `id="perfis"` referenciada pelo botão "Ver perfis disponíveis" do hero (Task 2).

- [ ] **Step 1: Append CSS ao final de `css/style.css`**

```css
.perfis-section{background:var(--c-bg-light)}
.perfis-section .container{padding-top:110px;padding-bottom:110px}
.perfis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.perfil-card{border:1px solid var(--c-border);padding:30px;background:var(--c-white)}
.perfil-title{margin:0;font-size:17px;font-weight:700}
.perfil-text{margin:12px 0 0;font-size:14px;line-height:1.6;color:var(--c-text-body)}

@media (max-width:1099px){
  .perfis-section .container{padding-top:80px;padding-bottom:80px}
  .perfis-grid{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:767px){
  .perfis-section .container{padding-top:56px;padding-bottom:56px}
  .perfis-grid{grid-template-columns:1fr}
}
```

- [ ] **Step 2: Substituir o comentário `<!-- PERFIS -->` pelo markup**

```html
<section id="perfis" class="perfis-section">
  <div class="container">
    <div class="section-eyebrow">Perfis disponíveis</div>
    <h2 class="section-title">Monte seu time por perfil</h2>
    <p class="section-text">Escolha os perfis e quantidades conforme a necessidade do produto. A composição pode ser ajustada mensalmente.</p>
    <div class="perfis-grid">
      <div class="perfil-card">
        <h3 class="perfil-title">Tech Lead / Arquiteto de Soluções</h3>
        <p class="perfil-text">Lidera tecnicamente o time e desenha a arquitetura — incluindo arquitetura de agentes de IA. Responde pela qualidade da entrega.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">AI Engineer</h3>
        <p class="perfil-text">Projeta soluções com LLMs: agentes autônomos, RAG, automações inteligentes e integrações com provedores de IA.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Software Engineer (full-stack)</h3>
        <p class="perfil-text">Desenvolve de ponta a ponta — APIs, banco, interfaces e integrações — com ferramentas de IA que aceleram codificação e testes.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Mobile Engineer (iOS/Android)</h3>
        <p class="perfil-text">Constrói e mantém apps nativos ou multiplataforma: da interface à publicação e monitoramento nas lojas.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Engenheiro de Dados</h3>
        <p class="perfil-text">Pipelines, integrações, lakes e warehouses — dado confiável é pré-requisito de qualquer iniciativa de IA.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Cloud / Platform Engineer</h3>
        <p class="perfil-text">Infra como código, CI/CD, observabilidade e otimização de custos em AWS, Azure e GCP — incluindo workloads de IA.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Product Engineer (PO técnico)</h3>
        <p class="perfil-text">Traduz objetivos de negócio em backlog executável, orientando engenheiros e agentes de IA. Mede resultado por valor gerado.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Quality Engineer (QA + automação)</h3>
        <p class="perfil-text">Automação de testes, pipelines de qualidade e testes assistidos por IA. Prevenção de defeitos, não apenas detecção.</p>
      </div>
      <div class="perfil-card">
        <h3 class="perfil-title">Product Designer (UX/UI)</h3>
        <p class="perfil-text">Pesquisa, prototipa e desenha experiências centradas no usuário, usando IA para acelerar prototipação e validação.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verificar visualmente**

`browser_navigate` + screenshot em desktop (3 colunas), `browser_resize` para ~900px (2 colunas) e ~600px (1 coluna). Clicar no link "Ver perfis disponíveis" do hero via `browser_click` e confirmar que rola até esta seção (`browser_snapshot` mostrando `#perfis` no topo da viewport).

- [ ] **Step 4: Commit**

```bash
git add outsourcing.html css/style.css
git commit -m "Add profiles grid section to outsourcing.html"
```

---

### Task 5: Seção "Como funciona" + planos

**Files:**
- Modify: `outsourcing.html` (substitui `<!-- COMO FUNCIONA -->`)
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: `.steps-section`, `.steps-header`, `.steps-title`, `.steps-intro`, `.steps-grid`, `.step-item`, `.step-num`, `.step-title`, `.step-text` (existentes, reaproveitados sem alteração).
- Produces: `.planos-grid`, `.plano-card`, `.plano-card--destaque`, `.plano-badge`, `.plano-title`, `.plano-text`, `.planos-note`.

- [ ] **Step 1: Append CSS ao final de `css/style.css`**

```css
.planos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:72px}
.plano-card{border:1px solid var(--c-border);padding:34px;position:relative}
.plano-card--destaque{border-color:var(--c-black)}
.plano-badge{position:absolute;top:-13px;left:34px;background:var(--c-black);color:var(--c-white);font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;padding:5px 12px}
.plano-title{margin:0;font-size:17px;font-weight:700}
.plano-text{margin:12px 0 0;font-size:14px;line-height:1.6;color:var(--c-text-body)}
.planos-note{margin:28px 0 0;font-size:14px;color:var(--c-text-eyebrow)}

@media (max-width:1099px){
  .planos-grid{grid-template-columns:1fr;gap:20px}
}
```

- [ ] **Step 2: Substituir o comentário `<!-- COMO FUNCIONA -->` pelo markup**

```html
<section id="como-funciona" class="steps-section">
  <div class="container">
    <div class="steps-header">
      <div>
        <div class="section-eyebrow">Como funciona</div>
        <h2 class="section-title steps-title">Do diagnóstico ao squad em operação</h2>
      </div>
      <p class="steps-intro">Da composição do time ao primeiro sprint — processo simples e com prazos claros.</p>
    </div>
    <div class="steps-grid">
      <div class="step-item">
        <div class="step-num">01</div>
        <div class="step-title">Monte seu time</div>
        <div class="step-text">Escolha perfis e quantidades conforme a necessidade do produto. Composição ajustável mês a mês.</div>
      </div>
      <div class="step-item">
        <div class="step-num">02</div>
        <div class="step-title">Alocação mensal</div>
        <div class="step-text">Profissionais full-time (160h/mês) dedicados ao seu produto. Dedicação parcial também disponível.</div>
      </div>
      <div class="step-item">
        <div class="step-num">03</div>
        <div class="step-title">Gestão compartilhada</div>
        <div class="step-text">Você define as prioridades de negócio; a Leanwork garante qualidade, ritmo de entrega e reposição de profissionais.</div>
      </div>
      <div class="step-item">
        <div class="step-num">04</div>
        <div class="step-title">Onboarding em 15 dias</div>
        <div class="step-text">Contrato e NDA assinados, o time inicia em até 15 dias úteis. Remoto por padrão; híbrido sob acordo.</div>
      </div>
    </div>
    <div class="planos-grid">
      <div class="plano-card">
        <h3 class="plano-title">Mensal avulso</h3>
        <p class="plano-text">Sem fidelidade. Renovação automática mês a mês, com aviso prévio de 30 dias.</p>
      </div>
      <div class="plano-card">
        <h3 class="plano-title">Contrato 6 meses</h3>
        <p class="plano-text">Condição especial aplicada desde a primeira fatura, com previsibilidade de time e ritmo.</p>
      </div>
      <div class="plano-card plano-card--destaque">
        <div class="plano-badge">Melhor condição</div>
        <h3 class="plano-title">Contrato 12 meses</h3>
        <p class="plano-text">O melhor valor/hora da tabela, com estabilidade de longo prazo para o roadmap do produto.</p>
      </div>
    </div>
    <p class="planos-note">Valores sob consulta — solicite uma proposta personalizada para a composição do seu time.</p>
  </div>
</section>
```

- [ ] **Step 3: Verificar visualmente**

`browser_navigate` + screenshot desktop e mobile (767px). Esperado: 4 steps em linha (colapsando para 1 coluna em mobile via CSS já existente de `.steps-grid`), 3 cards de plano com o card "Contrato 12 meses" com badge "Melhor condição" e borda preta.

- [ ] **Step 4: Commit**

```bash
git add outsourcing.html css/style.css
git commit -m "Add how-it-works and pricing tiers to outsourcing.html"
```

---

### Task 6: Seção "Squad exemplo"

**Files:**
- Modify: `outsourcing.html` (substitui `<!-- SQUAD EXEMPLO -->`)
- Modify: `css/style.css` (append)

**Interfaces:**
- Produces: `.squad-exemplo-section`, `.squad-exemplo-grid`, `.squad-exemplo-cta`, `.squad-card`, `.squad-item`, `.squad-item-count`, `.squad-item-title`, `.squad-item-text`, `.squad-total`, `.squad-total-label`, `.squad-total-value`.

- [ ] **Step 1: Append CSS ao final de `css/style.css`**

```css
.squad-exemplo-section{background:var(--c-bg-light)}
.squad-exemplo-section .container{padding-top:110px;padding-bottom:110px}
.squad-exemplo-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.squad-exemplo-cta{display:inline-block;margin-top:36px;font-size:15px;padding:15px 28px}
.squad-card{border:1px solid var(--c-border);padding:40px;background:var(--c-white)}
.squad-item{display:flex;align-items:center;gap:16px;padding:18px 0;border-top:1px solid var(--c-border)}
.squad-item:first-child{border-top:none;padding-top:0}
.squad-item-count{width:40px;height:40px;border-radius:50%;background:var(--c-bg-light);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex:none}
.squad-item-title{font-size:15px;font-weight:700}
.squad-item-text{font-size:13px;color:var(--c-text-eyebrow);margin-top:2px}
.squad-total{margin-top:24px;padding-top:24px;border-top:1px solid var(--c-black);display:flex;justify-content:space-between;align-items:baseline}
.squad-total-label{font-size:14px;color:var(--c-text-body)}
.squad-total-value{font-size:15px;font-weight:700}

@media (max-width:1099px){
  .squad-exemplo-section .container{padding-top:80px;padding-bottom:80px}
  .squad-exemplo-grid{grid-template-columns:1fr;gap:40px}
}
@media (max-width:767px){
  .squad-exemplo-section .container{padding-top:56px;padding-bottom:56px}
  .squad-card{padding:28px}
}
```

- [ ] **Step 2: Substituir o comentário `<!-- SQUAD EXEMPLO -->` pelo markup**

```html
<section id="squad" class="squad-exemplo-section">
  <div class="container squad-exemplo-grid">
    <div>
      <h2 class="section-title">Exemplo de squad AI-native</h2>
      <p class="section-text">Composição sugerida para desenvolvimento contínuo de produto — capacidade de entrega equivalente a um time tradicional de 6 a 7 pessoas.</p>
      <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20proposta%20personalizada" class="btn btn--dark squad-exemplo-cta">Solicitar proposta personalizada</a>
    </div>
    <div class="squad-card">
      <div class="squad-item">
        <div class="squad-item-count">1×</div>
        <div>
          <div class="squad-item-title">Tech Lead / Arquiteto de Soluções</div>
          <div class="squad-item-text">Arquitetura, padrões e qualidade da entrega</div>
        </div>
      </div>
      <div class="squad-item">
        <div class="squad-item-count">2×</div>
        <div>
          <div class="squad-item-title">Software Engineer (full-stack)</div>
          <div class="squad-item-text">Desenvolvimento de ponta a ponta com IA</div>
        </div>
      </div>
      <div class="squad-item">
        <div class="squad-item-count">1×</div>
        <div>
          <div class="squad-item-title">AI Engineer</div>
          <div class="squad-item-text">Agentes, RAG e automações inteligentes</div>
        </div>
      </div>
      <div class="squad-total">
        <span class="squad-total-label">Total do squad</span>
        <span class="squad-total-value">4 profissionais + agentes de IA</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verificar visualmente**

`browser_navigate` + screenshot desktop (2 colunas lado a lado) e mobile 767px (1 coluna, card abaixo do texto).

- [ ] **Step 4: Commit**

```bash
git add outsourcing.html css/style.css
git commit -m "Add example squad section to outsourcing.html"
```

---

### Task 7: Seção CTA final

**Files:**
- Modify: `outsourcing.html` (substitui `<!-- CTA FINAL -->`)

**Interfaces:**
- Consumes: `.cta-final`, `.cta-final-title`, `.cta-final-text`, `.cta-final-btn`, `.btn`, `.btn--light` (existentes, sem alteração de CSS).

- [ ] **Step 1: Substituir o comentário `<!-- CTA FINAL -->` pelo markup**

```html
<section class="cta-final">
  <div class="container">
    <h2 class="cta-final-title">Monte seu time AI-native e comece em até 15 dias úteis</h2>
    <p class="cta-final-text">Todo código e documentação são propriedade sua. Sigilo garantido por NDA e política de segurança de IA acordada com você.</p>
    <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="btn btn--light cta-final-btn">Falar com a Leanwork</a>
  </div>
</section>
```

- [ ] **Step 2: Verificar visualmente**

`browser_navigate` + screenshot. Esperado: seção preta idêntica em estilo à `.cta-final` de `index.html`, com o texto adaptado ao contexto de outsourcing.

- [ ] **Step 3: Commit**

```bash
git add outsourcing.html
git commit -m "Add final CTA section to outsourcing.html"
```

---

### Task 8: Passe de responsividade e QA de página inteira

**Files:**
- Modify: `outsourcing.html` (ajustes pontuais encontrados na revisão, se houver)
- Modify: `css/style.css` (ajustes pontuais encontrados na revisão, se houver)

**Interfaces:**
- Nenhuma nova classe. Esta task é uma revisão de tudo que as Tasks 2–7 produziram.

- [ ] **Step 1: Revisão visual em 3 larguras**

Com o servidor rodando, para `outsourcing.html`:
- `browser_resize` para 1440×900 → `browser_take_screenshot` (full page)
- `browser_resize` para 1024×900 → `browser_take_screenshot` (full page)
- `browser_resize` para 375×812 → `browser_take_screenshot` (full page)

Conferir contra o spec (`docs/superpowers/specs/2026-07-15-pagina-outsourcing-design.md`): grids colapsando para 1–2 colunas nos breakpoints certos, sem overflow horizontal, sem texto cortado, paddings de seção consistentes com o resto do site.

- [ ] **Step 2: Checar links e âncoras**

Via `browser_click` em cada item do menu (`Problemas que resolvemos`, `Plataforma Enterprise`, `Lean App`, `Como trabalhamos`) confirmar que navegam para `index.html#...`. Clicar no logo e confirmar retorno a `index.html`. Clicar em "Ver perfis disponíveis" no hero e confirmar scroll até `#perfis`. Verificar `browser_console_messages` sem erros em toda a navegação.

- [ ] **Step 3: Checar CTAs de e-mail**

Inspecionar (via `browser_snapshot` ou leitura do HTML) que todos os `href="mailto:..."` da página apontam para `comercial@leanwork.com.br` com assunto coerente ao contexto (montar squad / proposta personalizada). Nenhum CTA deve referenciar WhatsApp.

- [ ] **Step 4: Corrigir eventuais problemas encontrados**

Se a revisão encontrar overflow, quebra de grid ou espaçamento inconsistente, ajustar diretamente as classes novas adicionadas nas Tasks 3–6 em `css/style.css` (não introduzir novas classes nesta task, apenas corrigir valores).

- [ ] **Step 5: Commit (se houve ajustes)**

```bash
git add outsourcing.html css/style.css
git commit -m "Fix responsive/QA issues found in outsourcing.html full-page pass"
```

---

### Task 9: Link "Saiba mais" na home

**Files:**
- Modify: `index.html:179-189`
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: estrutura existente da seção `#outsourcing` em `index.html` (bloco `.service-solution`, terminado hoje pelo link `<a class="btn btn--light service-solution-cta">`).
- Produces: `.service-solution-actions`, `.service-solution-more` — novas classes, usadas apenas aqui.

- [ ] **Step 1: Append CSS ao final de `css/style.css`**

```css
.service-solution-actions{display:flex;align-items:center;gap:20px;margin-top:28px;flex-wrap:wrap}
.service-solution-actions .service-solution-cta{margin-top:0}
.service-solution-more{font-size:14px;font-weight:600;color:var(--c-black)}
.service-solution-more:hover{color:#444444}
.service--dark .service-solution-more{color:#eeeeee}
.service--dark .service-solution-more:hover{color:var(--c-white)}
```

- [ ] **Step 2: Editar `index.html` — envolver o CTA existente e adicionar o novo link**

Localizar (linha 188 de `index.html`):

```html
        <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="btn btn--light service-solution-cta">Montar um squad AI-native</a>
```

Substituir por:

```html
        <div class="service-solution-actions">
          <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="btn btn--light service-solution-cta">Montar um squad AI-native</a>
          <a href="outsourcing.html" class="service-solution-more">Saiba mais →</a>
        </div>
```

- [ ] **Step 3: Verificar visualmente**

`browser_navigate` para `index.html`, rolar até `#outsourcing`, `browser_take_screenshot`. Esperado: botão "Montar um squad AI-native" e link de texto "Saiba mais →" lado a lado (empilhando em mobile via `flex-wrap:wrap`), texto do link legível sobre o fundo preto da seção (`service--dark`). Clicar no link via `browser_click` e confirmar navegação para `outsourcing.html`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Link outsourcing service section on the home page to outsourcing.html"
```

---

## Self-Review Notes

- **Cobertura do spec:** Hero (Task 2), Por que AI-native + comparação (Task 3), Perfis (Task 4), Como funciona + planos (Task 5), Squad exemplo (Task 6), CTA final (Task 7), responsivo (Task 8), link na home (Task 9). Header/footer/roteamento cobertos na Task 1. Todos os itens do spec `2026-07-15-pagina-outsourcing-design.md` têm task correspondente.
- **Sem placeholders:** todo HTML/CSS de cada step está completo, sem TBD.
- **Consistência de nomes:** `#perfis` (âncora) é usada de forma idêntica no `href` do hero (Task 2) e no `id` da seção de perfis (Task 4). `outsourcing.html#topo` no header (Task 1) corresponde ao `id="topo"` do hero (Task 2).
