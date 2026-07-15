# Site Institucional Leanwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, responsive HTML+CSS+JS site at the repo root that reproduces the Leanwork landing page from `templates/site/Site Leanwork.dc.html`, without the design-tool runtime (`support.js`, `x-dc`, `sc-for`, `sc-if`, `{{ }}` bindings).

**Architecture:** One `index.html`, one `css/style.css`, one `js/main.js`, plus `assets/`. Sections are appended to `index.html` one at a time, each immediately before the closing `</main>` tag, so every task's edit target is unique and unambiguous. CSS rules are appended to the end of `style.css` per task. Only the nav task touches `js/main.js` (single behavior: mobile menu toggle).

**Tech Stack:** Plain HTML5, CSS3 (custom properties, Grid, Flexbox, media queries), vanilla JS (no frameworks, no build step). Google Fonts (Figtree) loaded the same way as the original mockup.

## Global Constraints

- Do not modify anything under `templates/site/` — it stays as the design reference.
- No build tool, no framework, no npm dependencies — plain files only.
- Site must work when `index.html` is opened directly from disk (no local server required).
- Contact email is `comercial@leanwork.com.br` for every mailto link, with these exact subjects:
  - General: `Diagnóstico Leanwork`
  - Plataforma Enterprise: `Plataforma Enterprise — diagnóstico`
  - Lean App: `Lean App — diagnóstico`
  - Outsourcing: `Outsourcing AI-Native — montar squad`
- Breakpoints: `≥1100px` desktop (reference layout), `768px–1099px` tablet (2/4-col grids collapse to 1 col), `<768px` mobile (nav becomes hamburger, large headlines shrink, everything stacks to 1 col).
- Uploads under `templates/site/uploads/` are NOT copied or linked anywhere in the site.
- Copy (headlines, body text, list items) must match `templates/site/Site Leanwork.dc.html` verbatim — do not paraphrase.

---

### Task 1: Base scaffold — index.html shell, CSS tokens/reset, JS stub, assets

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `assets/logo.png` (copy of `templates/site/assets/logo.png`)
- Create: `assets/favicon.png` (generated from `assets/logo.png`)

**Interfaces:**
- Consumes: nothing (first task).
- Produces:
  - CSS custom properties: `--c-black`, `--c-white`, `--c-bg-light`, `--c-text-eyebrow`, `--c-text-body`, `--c-border`, `--max-width`, `--nav-height`.
  - CSS classes: `.container`, `.btn`, `.btn--dark`, `.btn--light`, `.btn--outline`, `.section-eyebrow`, `.section-title`, `.section-text`.
  - `index.html` structure: `<head>` (fonts, `css/style.css`, favicon) + `<body><main></main><script src="js/main.js" defer></script></body>`. All later tasks insert `<section>` elements as children of `<main>`, immediately before `</main>`.

- [ ] **Step 1: Copy the logo asset**

Run:
```powershell
New-Item -ItemType Directory -Force -Path assets | Out-Null
Copy-Item "templates\site\assets\logo.png" "assets\logo.png"
```
Expected: `assets\logo.png` exists.

- [ ] **Step 2: Generate a square favicon from the logo**

The source logo is 1000x369 (wide wordmark), not square, so it can't be used directly as a favicon. Generate a padded square PNG:

Run:
```powershell
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("$PWD\assets\logo.png")
$canvasSize = 512
$bmp = New-Object System.Drawing.Bitmap $canvasSize, $canvasSize
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::White)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$scale = [Math]::Min(($canvasSize * 0.8) / $src.Width, ($canvasSize * 0.8) / $src.Height)
$w = [int]($src.Width * $scale)
$h = [int]($src.Height * $scale)
$x = [int](($canvasSize - $w) / 2)
$y = [int](($canvasSize - $h) / 2)
$g.DrawImage($src, $x, $y, $w, $h)
$bmp.Save("$PWD\assets\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
```
Expected: `assets\favicon.png` exists, 512x512.

- [ ] **Step 3: Create `index.html` shell**

Write `index.html`:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leanwork Group — Tecnologia como ativo estratégico para varejo e digital commerce</title>
<meta name="description" content="A Leanwork elimina gargalos tecnológicos em operações de varejo e digital commerce com Plataforma Enterprise, Lean App e Outsourcing AI-Native.">
<link rel="icon" type="image/png" href="assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<main>
</main>
<script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Create `css/style.css` with tokens, reset and shared components**

Write `css/style.css`:
```css
:root{
  --c-black:#000000;
  --c-white:#ffffff;
  --c-bg-light:#f4f4f4;
  --c-text-eyebrow:#8a8a8a;
  --c-text-body:#555555;
  --c-border:#e8e8e8;
  --max-width:1240px;
  --nav-height:76px;
}

*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--c-white);color:var(--c-black);font-family:'Figtree',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:var(--c-black);text-decoration:none}
a:hover{color:#444444}
::selection{background:var(--c-black);color:var(--c-white)}

.container{max-width:var(--max-width);margin:0 auto;padding:0 40px}

.section-eyebrow{font-size:14px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--c-text-eyebrow);margin-bottom:20px}
.section-title{margin:0;font-size:44px;line-height:1.1;font-weight:800;letter-spacing:-0.02em}
.section-text{margin:20px 0 0 0;font-size:17px;line-height:1.6;color:var(--c-text-body)}

.btn{display:inline-block;font-weight:700;border-radius:2px;text-align:center;cursor:pointer;border:none}
.btn--dark{background:var(--c-black);color:var(--c-white)}
.btn--dark:hover{background:#2a2a2a;color:var(--c-white)}
.btn--light{background:var(--c-white);color:var(--c-black)}
.btn--light:hover{background:#d9d9d9;color:var(--c-black)}
.btn--outline{color:var(--c-white);border:1px solid #3a3a3a;background:transparent}
.btn--outline:hover{border-color:var(--c-white);color:var(--c-white)}

@media (max-width:1099px){
  .container{padding:0 28px}
  .section-title{font-size:36px}
}
@media (max-width:767px){
  .container{padding:0 20px}
  .section-title{font-size:30px}
}
```

- [ ] **Step 5: Create `js/main.js` stub**

Write `js/main.js`:
```js
// Leanwork site behavior. Only feature: mobile nav toggle (added in Task 2).
```

- [ ] **Step 6: Verify the scaffold**

Run:
```powershell
Select-String -Path index.html -Pattern '<main>','</main>','css/style.css','js/main.js','assets/favicon.png'
Select-String -Path css/style.css -Pattern '--c-black','--max-width','\.btn--dark','\.section-title'
Test-Path assets\logo.png
Test-Path assets\favicon.png
```
Expected: every pattern matches at least once in its file; both `Test-Path` calls return `True`.

- [ ] **Step 7: Commit**

```bash
git add index.html css/style.css js/main.js assets/logo.png assets/favicon.png
git commit -m "Add base scaffold for Leanwork static site"
```

---

### Task 2: Navigation header with mobile menu

**Files:**
- Modify: `index.html` (insert `<header>` immediately before `<main>`)
- Modify: `css/style.css` (append nav rules)
- Modify: `js/main.js` (replace stub with the toggle behavior)

**Interfaces:**
- Consumes: `.container`, `.btn`, `.btn--dark` from Task 1.
- Produces: `.site-header` (JS toggles `.nav-open` on this element), classes `.nav`, `.nav-logo`, `.nav-toggle`, `.nav-links`, `.nav-link`, `.nav-cta`. Anchor ids that later sections must define: `#topo`, `#problemas`, `#plataforma`, `#leanapp`, `#outsourcing`, `#como`.

- [ ] **Step 1: Insert the header markup**

In `index.html`, replace:
```html
<body>
<main>
```
with:
```html
<body>
<header class="site-header">
  <div class="container nav">
    <a href="#topo" class="nav-logo"><img src="assets/logo.png" alt="Leanwork Group"></a>
    <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav-links">
      <a href="#problemas" class="nav-link">Problemas que resolvemos</a>
      <a href="#plataforma" class="nav-link">Plataforma Enterprise</a>
      <a href="#leanapp" class="nav-link">Lean App</a>
      <a href="#outsourcing" class="nav-link">Outsourcing</a>
      <a href="#como" class="nav-link">Como trabalhamos</a>
      <a href="mailto:comercial@leanwork.com.br?subject=Diagn%C3%B3stico%20Leanwork" class="nav-link nav-cta btn btn--dark">Fale com a gente</a>
    </nav>
  </div>
</header>
<main>
```

- [ ] **Step 2: Append nav CSS**

Append to `css/style.css`:
```css
.site-header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.94);backdrop-filter:blur(12px);border-bottom:1px solid var(--c-border)}
.nav{height:var(--nav-height);display:flex;align-items:center;justify-content:space-between;gap:32px}
.nav-logo img{height:34px}
.nav-links{display:flex;align-items:center;gap:36px}
.nav-link{font-size:15px;font-weight:400;color:#444444}
.nav-link:hover{color:var(--c-black)}
.nav-cta{font-size:15px;font-weight:600;color:var(--c-white)!important;padding:11px 22px}
.nav-cta:hover{color:var(--c-white)!important}
.nav-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:8px;cursor:pointer}
.nav-toggle span{display:block;width:24px;height:2px;background:var(--c-black)}

@media (max-width:767px){
  .nav-toggle{display:flex}
  .nav-links{position:fixed;top:var(--nav-height);left:0;right:0;bottom:0;background:var(--c-white);flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:0;padding:12px 20px 32px;transform:translateX(100%);transition:transform .25s ease;overflow-y:auto}
  .nav-links .nav-link{width:100%;padding:16px 0;border-bottom:1px solid var(--c-border)}
  .nav-links .nav-cta{width:100%;text-align:center;margin-top:16px;border-bottom:none}
  .site-header.nav-open .nav-links{transform:translateX(0)}
}
```

- [ ] **Step 3: Write the toggle behavior**

Replace the contents of `js/main.js` with:
```js
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  var links = document.querySelectorAll('.nav-links .nav-link');
  if (!toggle || !header) return;

  function closeMenu() {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  toggle.addEventListener('click', toggleMenu);
  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function (e) {
    if (header.classList.contains('nav-open') && !header.contains(e.target)) {
      closeMenu();
    }
  });
})();
```

- [ ] **Step 4: Verify structure**

Run:
```powershell
Select-String -Path index.html -Pattern 'class="site-header"','class="nav-toggle"','class="nav-links"'
(Select-String -Path index.html -Pattern 'class="nav-link"').Count
```
Expected: each pattern matches once; nav-link count is `6` (5 section links + the CTA, which also carries `nav-link`).

- [ ] **Step 5: Manual check**

Open `index.html` directly in a browser, shrink the window below 767px width, click the hamburger button: the menu should slide in from the right and cover the links; clicking a link or clicking outside the drawer should close it.

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "Add responsive nav with mobile menu toggle"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html` (insert `<section id="topo">` as the only child of `<main>`)
- Modify: `css/style.css` (append hero rules)

**Interfaces:**
- Consumes: `.container`, `.btn`, `.btn--light`, `.btn--outline` from Task 1.
- Produces: `.hero`, `.hero-eyebrow`, `.hero-title`, `.hero-subtitle`, `.hero-actions`, `.hero-summary`, `.hero-summary-item`, `.hero-summary-title`, `.hero-summary-text`. Defines anchor target `#topo`.

- [ ] **Step 1: Insert hero markup**

In `index.html`, replace:
```html
<main>
</main>
```
with:
```html
<main>
<section id="topo" class="hero">
  <div class="container">
    <div class="hero-eyebrow">Tecnologia como ativo estratégico, não dependência</div>
    <h1 class="hero-title">Sua operação digital cresceu.<br>Sua tecnologia virou gargalo.</h1>
    <p class="hero-subtitle">Plataformas fragmentadas, dependência de fornecedor e investimento que não vira resultado. A Leanwork elimina esses gargalos em operações de varejo e digital commerce — com método, senioridade e responsabilidade sobre o que entrega.</p>
    <div class="hero-actions">
      <a href="mailto:comercial@leanwork.com.br?subject=Diagn%C3%B3stico%20Leanwork" class="btn btn--light">Agendar um diagnóstico</a>
      <a href="#problemas" class="btn btn--outline">O que resolvemos ↓</a>
    </div>
    <div class="hero-summary">
      <div class="hero-summary-item">
        <div class="hero-summary-title">Plataforma Enterprise</div>
        <div class="hero-summary-text">E-commerce que deixa de ser aluguel e vira patrimônio digital.</div>
      </div>
      <div class="hero-summary-item">
        <div class="hero-summary-title">Lean App</div>
        <div class="hero-summary-text">Canal mobile próprio de venda e recompra, sem depender de mídia paga.</div>
      </div>
      <div class="hero-summary-item">
        <div class="hero-summary-title">Outsourcing AI-Native</div>
        <div class="hero-summary-text">Squads enxutos com IA que entregam como times duas vezes maiores.</div>
      </div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Append hero CSS**

Append to `css/style.css`:
```css
.hero{background:var(--c-black);color:var(--c-white)}
.hero .container{padding-top:120px;padding-bottom:110px}
.hero-eyebrow{font-size:14px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--c-text-eyebrow);margin-bottom:28px}
.hero-title{margin:0;font-size:76px;line-height:1.04;font-weight:800;letter-spacing:-0.02em;max-width:1020px}
.hero-subtitle{margin:36px 0 0 0;font-size:22px;line-height:1.55;font-weight:300;color:#c4c4c4;max-width:720px}
.hero-actions{display:flex;gap:16px;margin-top:48px;align-items:center}
.hero-actions .btn{font-size:16px;padding:16px 30px}
.hero-actions .btn--outline{padding:16px 22px;font-weight:400}
.hero-summary{margin-top:88px;padding-top:32px;border-top:1px solid #222222;display:flex;gap:56px}
.hero-summary-item{max-width:250px}
.hero-summary-title{font-size:17px;font-weight:700}
.hero-summary-text{font-size:14px;color:var(--c-text-eyebrow);margin-top:6px;line-height:1.5}

@media (max-width:1099px){
  .hero .container{padding-top:90px;padding-bottom:80px}
  .hero-title{font-size:56px}
  .hero-summary{flex-wrap:wrap;gap:32px}
}
@media (max-width:767px){
  .hero .container{padding-top:64px;padding-bottom:56px}
  .hero-title{font-size:40px}
  .hero-subtitle{font-size:18px}
  .hero-actions{flex-direction:column;align-items:stretch}
  .hero-summary{flex-direction:column;gap:24px;margin-top:56px}
  .hero-summary-item{max-width:none}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section id="topo" class="hero">'
(Select-String -Path index.html -Pattern 'class="hero-summary-item"').Count
```
Expected: header match found once; count is `3`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add hero section"
```

---

### Task 4: Problemas que resolvemos section

**Files:**
- Modify: `index.html` (insert `<section id="problemas">` before `</main>`)
- Modify: `css/style.css` (append problemas rules)

**Interfaces:**
- Consumes: `.container`, `.section-eyebrow`, `.section-title`, `.section-text` from Task 1.
- Produces: `.problemas`, `.problemas-grid`, `.problemas-sidebar`, `.problema-item`, `.problema-num`, `.problema-title`, `.problema-text`. Defines anchor target `#problemas`.

- [ ] **Step 1: Insert problemas markup**

In `index.html`, replace:
```html
  </div>
</section>
</main>
```
with:
```html
  </div>
</section>

<section id="problemas" class="problemas">
  <div class="container problemas-grid">
    <div class="problemas-sidebar">
      <div class="section-eyebrow">Problemas que resolvemos</div>
      <h2 class="section-title">O problema não é falta de ferramenta.</h2>
      <p class="section-text">É transformar tecnologia em vantagem competitiva sustentável — com governança, previsibilidade e autonomia. Atuamos onde a complexidade técnica virou entrave ao crescimento.</p>
    </div>
    <div class="problemas-list">
      <div class="problema-item">
        <div class="problema-num">01</div>
        <div>
          <div class="problema-title">Operação digital fragmentada</div>
          <div class="problema-text">Plataformas, integrações e dados que não conversam entre si. Cada evolução vira um projeto de risco — e o time-to-market só aumenta.</div>
        </div>
      </div>
      <div class="problema-item">
        <div class="problema-num">02</div>
        <div>
          <div class="problema-title">Dependência excessiva de mídia paga</div>
          <div class="problema-text">Conversão baixa e jornada de compra que não retém. O crescimento só acontece enquanto você paga por ele.</div>
        </div>
      </div>
      <div class="problema-item">
        <div class="problema-num">03</div>
        <div>
          <div class="problema-title">Tecnologia que consome sem retornar</div>
          <div class="problema-text">Orçamento alto, retorno invisível para a operação. Investimento que vira despesa recorrente em vez de patrimônio digital.</div>
        </div>
      </div>
      <div class="problema-item">
        <div class="problema-num">04</div>
        <div>
          <div class="problema-title">Falta de governança sobre a evolução digital</div>
          <div class="problema-text">Decisões reativas, roadmap ditado pelo fornecedor e zero previsibilidade sobre prazos, custos e resultados.</div>
        </div>
      </div>
      <div class="problema-item">
        <div class="problema-num">05</div>
        <div>
          <div class="problema-title">Dados que não viram decisão</div>
          <div class="problema-text">Dashboards existem; decisões acionáveis, não. A operação coleta muito e aprende pouco.</div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Append problemas CSS**

Append to `css/style.css`:
```css
.problemas .container{padding-top:110px;padding-bottom:110px}
.problemas-grid{display:grid;grid-template-columns:380px 1fr;gap:64px;align-items:start}
.problemas-sidebar{position:sticky;top:120px}
.problema-item{display:grid;grid-template-columns:72px 1fr;gap:24px;padding:28px 0;border-top:1px solid var(--c-border);align-items:baseline}
.problema-num{font-size:15px;font-weight:600;color:#b0b0b0;font-variant-numeric:tabular-nums}
.problema-title{font-size:21px;font-weight:700;letter-spacing:-0.01em}
.problema-text{font-size:16px;line-height:1.6;color:var(--c-text-body);margin-top:8px;max-width:560px}

@media (max-width:1099px){
  .problemas .container{padding-top:80px;padding-bottom:80px}
  .problemas-grid{grid-template-columns:1fr;gap:40px}
  .problemas-sidebar{position:static}
}
@media (max-width:767px){
  .problemas .container{padding-top:56px;padding-bottom:56px}
  .problema-item{grid-template-columns:1fr;gap:8px}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section id="problemas" class="problemas">'
(Select-String -Path index.html -Pattern 'class="problema-item"').Count
```
Expected: header match found once; count is `5`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add problemas que resolvemos section"
```

---

### Task 5: Plataforma Enterprise section (introduces shared `.service` component)

**Files:**
- Modify: `index.html` (insert `<section id="plataforma">` before `</main>`)
- Modify: `css/style.css` (append shared `.service*` rules, reused by Tasks 6 and 7)

**Interfaces:**
- Consumes: `.container`, `.section text helpers`, `.btn`, `.btn--dark` from Task 1.
- Produces (shared across Tasks 5–7): `.service`, `.service--light`, `.service--dark`, `.service-eyebrow`, `.service-grid`, `.service-title`, `.service-bullets`, `.service-bullet`, `.bullet-dash`, `.service-solution`, `.service-solution--muted`, `.service-solution-eyebrow`, `.service-solution-lead`, `.service-solution-list`, `.service-solution-item`, `.solution-item-title`, `.solution-item-text`, `.service-solution-cta`. Defines anchor target `#plataforma`.

- [ ] **Step 1: Insert Plataforma Enterprise markup**

In `index.html`, replace:
```html
  </div>
</section>
</main>
```
with:
```html
  </div>
</section>

<section id="plataforma" class="service service--light">
  <div class="container">
    <div class="service-eyebrow">Serviço 01 — Plataforma Enterprise</div>
    <div class="service-grid">
      <div class="service-problem">
        <h2 class="service-title">Você paga aluguel perpétuo por uma plataforma que nunca será sua.</h2>
        <div class="service-bullets">
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Customização limitada ao roadmap do fornecedor, não à sua estratégia.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Experiência de compra igual à de qualquer concorrente na mesma plataforma.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Cada integração é frágil, cada evolução é um projeto de risco.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>O investimento acumulado não vira patrimônio: vira dependência.</span></div>
        </div>
      </div>
      <div class="service-solution">
        <div class="service-solution-eyebrow">Como resolvemos</div>
        <p class="service-solution-lead">Plataforma de e-commerce enterprise B2C e B2B sob medida, com arquitetura flexível a integrações e a velocidade de implantação de um SaaS — e um diferencial único no mercado: a opção de adquirir o código-fonte e a propriedade intelectual.</p>
        <div class="service-solution-list">
          <div class="service-solution-item"><div class="solution-item-title">Autonomia total</div><div class="solution-item-text">Liberdade para evoluir, customizar e integrar sem depender de terceiros.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Diferenciação real</div><div class="solution-item-text">Experiência de compra proprietária, que concorrentes em SaaS não replicam.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Ativo de longo prazo</div><div class="solution-item-text">O investimento vira um ativo auditável da empresa — não despesa operacional.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Integração enterprise</div><div class="solution-item-text">Middleware e conectores sob medida, com consistência de dados e monitoramento.</div></div>
        </div>
        <a href="mailto:comercial@leanwork.com.br?subject=Plataforma%20Enterprise%20%E2%80%94%20diagn%C3%B3stico" class="btn btn--dark service-solution-cta">Conversar sobre a sua operação</a>
      </div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Append shared service CSS**

Append to `css/style.css`:
```css
.service{background:var(--c-white)}
.service--light{background:var(--c-bg-light)}
.service--dark{background:var(--c-black);color:var(--c-white)}
.service .container{padding-top:110px;padding-bottom:110px}
.service-eyebrow{font-size:14px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--c-text-eyebrow)}
.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;margin-top:28px;align-items:start}
.service-title{margin:0;font-size:48px;line-height:1.06;font-weight:800;letter-spacing:-0.02em}
.service-bullets{margin-top:36px;display:flex;flex-direction:column;gap:14px}
.service-bullet{display:flex;gap:14px;align-items:baseline}
.bullet-dash{font-weight:800;font-size:15px}
.service-bullet span:last-child{font-size:17px;line-height:1.55;color:#333333}
.service--dark .bullet-dash{color:#666666}
.service--dark .service-bullet span:last-child{color:#c4c4c4}

.service-solution{background:var(--c-white);border:1px solid var(--c-border);padding:44px 44px 40px 44px}
.service-solution--muted{background:var(--c-bg-light)}
.service--dark .service-solution{background:#111111;border-color:#2a2a2a}
.service-solution-eyebrow{font-size:14px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--c-text-eyebrow);margin-bottom:16px}
.service-solution-lead{margin:0;font-size:19px;line-height:1.6;color:#111111}
.service--dark .service-solution-lead{color:#eeeeee}
.service-solution-list{margin-top:32px;display:flex;flex-direction:column;gap:0}
.service-solution-item{padding:18px 0;border-top:1px solid var(--c-border)}
.service--dark .service-solution-item{border-top-color:#2a2a2a}
.solution-item-title{font-size:16px;font-weight:700}
.solution-item-text{font-size:15px;color:var(--c-text-body);line-height:1.55;margin-top:4px}
.service--dark .solution-item-text{color:#9a9a9a}
.service-solution-cta{display:inline-block;margin-top:28px;font-size:15px;padding:14px 26px}

@media (max-width:1099px){
  .service .container{padding-top:80px;padding-bottom:80px}
  .service-grid{grid-template-columns:1fr;gap:40px}
  .service-title{font-size:38px}
}
@media (max-width:767px){
  .service .container{padding-top:56px;padding-bottom:56px}
  .service-title{font-size:30px}
  .service-solution{padding:32px 24px}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section id="plataforma" class="service service--light">'
(Select-String -Path index.html -Pattern 'class="service-bullet"').Count
(Select-String -Path index.html -Pattern 'class="service-solution-item"').Count
```
Expected: header match found once; both counts are `4`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Plataforma Enterprise section with shared service component styles"
```

---

### Task 6: Lean App section

**Files:**
- Modify: `index.html` (insert `<section id="leanapp">` before `</main>`)

No CSS changes — this task reuses every class produced by Task 5, plus `.service-solution--muted` for the card background (Lean App's card is light gray on a white section, the inverse of Plataforma).

**Interfaces:**
- Consumes: `.service`, `.service-eyebrow`, `.service-grid`, `.service-title`, `.service-bullets`, `.service-bullet`, `.bullet-dash`, `.service-solution`, `.service-solution--muted`, `.service-solution-eyebrow`, `.service-solution-lead`, `.service-solution-list`, `.service-solution-item`, `.solution-item-title`, `.solution-item-text`, `.service-solution-cta`, `.btn`, `.btn--dark` (all from Task 5/1).
- Produces: nothing new. Defines anchor target `#leanapp`.

- [ ] **Step 1: Insert Lean App markup**

In `index.html`, replace:
```html
  </div>
</section>
</main>
```
with:
```html
  </div>
</section>

<section id="leanapp" class="service">
  <div class="container">
    <div class="service-eyebrow">Serviço 02 — Lean App</div>
    <div class="service-grid">
      <div class="service-solution service-solution--muted">
        <div class="service-solution-eyebrow">Como resolvemos</div>
        <p class="service-solution-lead">Aplicativo de comércio digital B2C e B2B com a identidade da sua marca, integrado a VTEX, Wake e Leancommerce. Um canal direto de venda e relacionamento — onde a recompra acontece por push e dados comportamentais, não por leilão de mídia.</p>
        <div class="service-solution-list">
          <div class="service-solution-item"><div class="solution-item-title">Canal próprio de recompra</div><div class="solution-item-text">Relacionamento direto com quem já comprou, a um custo muito menor que mídia paga.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Dados que viram ação</div><div class="solution-item-text">Inteligência de comportamento traduzida em campanhas, segmentos e decisões.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Especialista no seu segmento</div><div class="solution-item-text">Profundidade em Moda &amp; Acessórios e Farma &amp; Beleza — experiência aderente ao seu público.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Suporte humano e próximo</div><div class="solution-item-text">Time sênior, resposta rápida e evolução contínua do canal junto com a operação.</div></div>
        </div>
        <a href="mailto:comercial@leanwork.com.br?subject=Lean%20App%20%E2%80%94%20diagn%C3%B3stico" class="btn btn--dark service-solution-cta">Avaliar o canal mobile da sua marca</a>
      </div>
      <div class="service-problem">
        <h2 class="service-title">Cada venda exige mídia paga. E a recompra não acontece.</h2>
        <div class="service-bullets">
          <div class="service-bullet"><span class="bullet-dash">—</span><span>CAC crescente: o crescimento só acontece enquanto você paga por ele.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Conversão mobile baixa em jornadas que não foram desenhadas para o celular.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Cliente que comprou uma vez e a marca não tem canal direto para trazer de volta.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>App tratado como "mais um canal", sem metrificação de incremento real.</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section id="leanapp" class="service">'
Select-String -Path index.html -Pattern 'service-solution--muted'
(Select-String -Path index.html -Pattern 'class="service-bullet"').Count
```
Expected: header match found once; `service-solution--muted` found once; bullet count is `8` (4 from Plataforma + 4 from Lean App, cumulative in the file).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Lean App section"
```

---

### Task 7: Outsourcing AI-Native section (adds stats row component)

**Files:**
- Modify: `index.html` (insert `<section id="outsourcing">` before `</main>`)
- Modify: `css/style.css` (append stats-row rules)

**Interfaces:**
- Consumes: `.service--dark`, `.service-eyebrow`, `.service-grid`, `.service-title`, `.service-bullets`, `.service-bullet`, `.bullet-dash`, `.service-solution`, `.service-solution-eyebrow`, `.service-solution-lead`, `.service-solution-list`, `.service-solution-item`, `.solution-item-title`, `.solution-item-text`, `.service-solution-cta`, `.btn`, `.btn--light` (all from Task 5/1).
- Produces: `.stats-row`, `.stat-item`, `.stat-number`, `.stat-label`. Defines anchor target `#outsourcing`.

- [ ] **Step 1: Insert Outsourcing AI-Native markup**

In `index.html`, replace:
```html
  </div>
</section>
</main>
```
with:
```html
  </div>
</section>

<section id="outsourcing" class="service service--dark">
  <div class="container">
    <div class="service-eyebrow">Serviço 03 — Outsourcing AI-Native</div>
    <div class="service-grid">
      <div class="service-problem">
        <h2 class="service-title">Backlog parado, contratação lenta, time inchado.</h2>
        <div class="service-bullets">
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Meses para contratar; roadmap esperando gente que não chega.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Times grandes, handoffs demais, custo de coordenação que só cresce.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>Fornecedores que alocam gente, mas não respondem pela qualidade da entrega.</span></div>
          <div class="service-bullet"><span class="bullet-dash">—</span><span>IA no discurso, mas ausente do ciclo real de desenvolvimento.</span></div>
        </div>
        <div class="stats-row">
          <div class="stat-item"><div class="stat-number">4</div><div class="stat-label">profissionais em um squad AI-native</div></div>
          <div class="stat-item"><div class="stat-number">6–7</div><div class="stat-label">capacidade equivalente de um time tradicional</div></div>
          <div class="stat-item"><div class="stat-number">100%</div><div class="stat-label">do código e da PI são propriedade do cliente</div></div>
        </div>
      </div>
      <div class="service-solution">
        <div class="service-solution-eyebrow">Como resolvemos</div>
        <p class="service-solution-lead">Engenheiros e times dedicados que operam com agentes de IA integrados ao ciclo de desenvolvimento — geração de código, testes, revisão e documentação — sob supervisão técnica rigorosa. Squads menores, mais rápidos, com qualidade auditável.</p>
        <div class="service-solution-list">
          <div class="service-solution-item"><div class="solution-item-title">Full-stack por padrão</div><div class="solution-item-text">Engenheiros que atuam em toda a stack, eliminando a divisão entre especialidades e reduzindo handoffs.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Qualidade auditável</div><div class="solution-item-text">Todo código com apoio de IA passa por revisão humana, testes automatizados e padrões de segurança. A responsabilidade é nossa.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Composição flexível</div><div class="solution-item-text">Você monta o time por perfil — de Tech Lead a AI Engineer — e ajusta a composição conforme a demanda.</div></div>
          <div class="service-solution-item"><div class="solution-item-title">Onboarding em até 15 dias úteis</div><div class="solution-item-text">Gestão compartilhada: você define prioridades de negócio; nós garantimos ritmo, qualidade e reposição.</div></div>
        </div>
        <a href="mailto:comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad" class="btn btn--light service-solution-cta">Montar um squad AI-native</a>
      </div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Append stats row CSS**

Append to `css/style.css`:
```css
.stats-row{margin-top:48px;display:flex;border:1px solid #2a2a2a}
.stat-item{flex:1;padding:26px 28px;border-right:1px solid #2a2a2a}
.stat-item:last-child{border-right:none}
.stat-number{font-size:40px;font-weight:800;letter-spacing:-0.02em}
.stat-label{font-size:14px;color:var(--c-text-eyebrow);margin-top:4px;line-height:1.5}

@media (max-width:767px){
  .stats-row{flex-direction:column}
  .stat-item{border-right:none;border-bottom:1px solid #2a2a2a}
  .stat-item:last-child{border-bottom:none}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section id="outsourcing" class="service service--dark">'
(Select-String -Path index.html -Pattern 'class="stat-item"').Count
```
Expected: header match found once; stat-item count is `3`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Outsourcing AI-Native section with stats row"
```

---

### Task 8: Como trabalhamos section

**Files:**
- Modify: `index.html` (insert `<section id="como">` before `</main>`)
- Modify: `css/style.css` (append steps rules)

**Interfaces:**
- Consumes: `.container`, `.section-eyebrow`, `.section-title` from Task 1.
- Produces: `.steps-section`, `.steps-header`, `.steps-title`, `.steps-intro`, `.steps-grid`, `.step-item`, `.step-num`, `.step-title`, `.step-text`. Defines anchor target `#como`.

- [ ] **Step 1: Insert Como trabalhamos markup**

In `index.html`, replace:
```html
  </div>
</section>
</main>
```
with:
```html
  </div>
</section>

<section id="como" class="steps-section">
  <div class="container">
    <div class="steps-header">
      <div>
        <div class="section-eyebrow">Como trabalhamos</div>
        <h2 class="section-title steps-title">Tecnologia é meio. Resultado é o fim.</h2>
      </div>
      <p class="steps-intro">Parceria de longo prazo baseada em previsibilidade e clareza — ciclos curtos, decisões tomadas em conjunto e responsabilidade sobre o que é entregue.</p>
    </div>
    <div class="steps-grid">
      <div class="step-item">
        <div class="step-num">01</div>
        <div class="step-title">Diagnóstico</div>
        <div class="step-text">Mergulho no seu contexto e objetivos: assessment técnico e de negócio, feito em conjunto com as áreas envolvidas.</div>
      </div>
      <div class="step-item">
        <div class="step-num">02</div>
        <div class="step-title">Prioridades e escopo</div>
        <div class="step-text">Priorização de problemas reais, avaliação consciente de complexidade, risco e escala — e métricas claras de sucesso.</div>
      </div>
      <div class="step-item">
        <div class="step-num">03</div>
        <div class="step-title">Execução orientada a resultado</div>
        <div class="step-text">Sprints dinâmicos com visibilidade total: planejamento, validação e adaptação contínua do plano.</div>
      </div>
      <div class="step-item">
        <div class="step-num">04</div>
        <div class="step-title">Acompanhamento de impacto</div>
        <div class="step-text">Governança contínua, transferência de conhecimento e transição suave — sua equipe opera e evolui com autonomia.</div>
      </div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Append steps CSS**

Append to `css/style.css`:
```css
.steps-section .container{padding-top:110px;padding-bottom:110px}
.steps-header{display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
.steps-title{max-width:560px}
.steps-intro{margin:0;font-size:17px;line-height:1.6;color:var(--c-text-body);max-width:400px}
.steps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:64px}
.step-item{border-top:2px solid var(--c-black);padding-top:22px}
.step-num{font-size:14px;font-weight:600;color:var(--c-text-eyebrow);font-variant-numeric:tabular-nums}
.step-title{font-size:20px;font-weight:700;margin-top:10px;letter-spacing:-0.01em}
.step-text{font-size:15px;line-height:1.6;color:var(--c-text-body);margin-top:8px}

@media (max-width:1099px){
  .steps-section .container{padding-top:80px;padding-bottom:80px}
  .steps-header{flex-direction:column;align-items:flex-start}
  .steps-grid{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:767px){
  .steps-section .container{padding-top:56px;padding-bottom:56px}
  .steps-grid{grid-template-columns:1fr;gap:24px;margin-top:40px}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section id="como" class="steps-section">'
(Select-String -Path index.html -Pattern 'class="step-item"').Count
```
Expected: header match found once; step-item count is `4`.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Como trabalhamos section"
```

---

### Task 9: Por que a Leanwork section (with Stack row)

**Files:**
- Modify: `index.html` (insert `<section class="why-section">` before `</main>`)
- Modify: `css/style.css` (append why-section rules)

**Interfaces:**
- Consumes: `.container`, `.section-eyebrow`, `.section-title` from Task 1.
- Produces: `.why-section`, `.why-title`, `.why-grid`, `.why-item`, `.why-item-title`, `.why-item-text`, `.stack-row`, `.stack-label`, `.stack-list`.

- [ ] **Step 1: Insert Por que a Leanwork markup**

In `index.html`, replace:
```html
  </div>
</section>
</main>
```
with:
```html
  </div>
</section>

<section class="why-section">
  <div class="container">
    <div class="section-eyebrow">Por que a Leanwork</div>
    <h2 class="section-title why-title">Não somos uma software house de execução. Nem consultoria dissociada da operação.</h2>
    <div class="why-grid">
      <div class="why-item"><div class="why-item-title">Especialistas em varejo e digital commerce</div><div class="why-item-text">Sazonalidade, logística, omnicanalidade e jornada do consumidor. Não somos generalistas — entendemos a operação por dentro.</div></div>
      <div class="why-item"><div class="why-item-title">Tecnologia como ativo do cliente</div><div class="why-item-text">Transferência de código-fonte e propriedade intelectual. Autonomia futura da operação, redução de lock-in.</div></div>
      <div class="why-item"><div class="why-item-title">Senioridade para grandes operações</div><div class="why-item-text">Projetos de alto impacto exigem quem já tomou decisões críticas em ambientes complexos — porque o erro custa caro.</div></div>
      <div class="why-item"><div class="why-item-title">Governança e previsibilidade</div><div class="why-item-text">Sprints dinâmicos, acompanhamento contínuo e métricas claras de sucesso. O sucesso é medido pela sua independência, não pela sua dependência.</div></div>
    </div>
    <div class="stack-row">
      <div class="stack-label">Stack</div>
      <div class="stack-list">.NET&nbsp;&nbsp;·&nbsp;&nbsp;React / Next.js&nbsp;&nbsp;·&nbsp;&nbsp;Node.js&nbsp;&nbsp;·&nbsp;&nbsp;Go&nbsp;&nbsp;·&nbsp;&nbsp;Python&nbsp;&nbsp;·&nbsp;&nbsp;Swift&nbsp;&nbsp;·&nbsp;&nbsp;Kotlin&nbsp;&nbsp;·&nbsp;&nbsp;Azure&nbsp;&nbsp;·&nbsp;&nbsp;AWS&nbsp;&nbsp;·&nbsp;&nbsp;SQL Server&nbsp;&nbsp;·&nbsp;&nbsp;PostgreSQL&nbsp;&nbsp;·&nbsp;&nbsp;MongoDB&nbsp;&nbsp;·&nbsp;&nbsp;Docker / CI-CD</div>
    </div>
  </div>
</section>
</main>
```

- [ ] **Step 2: Append why-section CSS**

Append to `css/style.css`:
```css
.why-section{background:var(--c-bg-light)}
.why-section .container{padding-top:110px;padding-bottom:110px}
.why-title{max-width:760px;margin-top:20px}
.why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#dcdcdc;border:1px solid #dcdcdc;margin-top:64px}
.why-item{background:var(--c-white);padding:40px}
.why-item-title{font-size:20px;font-weight:700;letter-spacing:-0.01em}
.why-item-text{font-size:16px;line-height:1.6;color:var(--c-text-body);margin-top:10px;max-width:460px}
.stack-row{margin-top:56px;display:flex;align-items:baseline;gap:28px;flex-wrap:wrap}
.stack-label{font-size:13px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--c-text-eyebrow)}
.stack-list{font-size:15px;color:#777777;line-height:2;font-weight:400}

@media (max-width:1099px){
  .why-section .container{padding-top:80px;padding-bottom:80px}
}
@media (max-width:767px){
  .why-section .container{padding-top:56px;padding-bottom:56px}
  .why-grid{grid-template-columns:1fr}
  .why-item{padding:28px}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern '<section class="why-section">'
(Select-String -Path index.html -Pattern 'class="why-item"').Count
Select-String -Path index.html -Pattern 'class="stack-row"'
```
Expected: header match found once; why-item count is `4`; stack-row found once.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add Por que a Leanwork section with stack row"
```

---

### Task 10: CTA final and footer

**Files:**
- Modify: `index.html` (insert `<section class="cta-final">` and `<footer>` before `</main>`... and after `</main>`, respectively — see step 1)
- Modify: `css/style.css` (append CTA and footer rules)

**Interfaces:**
- Consumes: `.container`, `.btn`, `.btn--light` from Task 1.
- Produces: `.cta-final`, `.cta-final-title`, `.cta-final-text`, `.cta-final-btn`, `.site-footer`, `.footer-inner`, `.footer-brand`, `.footer-logo`, `.footer-tagline`, `.footer-meta`, `.footer-email`, `.footer-copyright`.

- [ ] **Step 1: Insert CTA final section (inside `<main>`) and footer (after `<main>`)**

In `index.html`, replace:
```html
  </div>
</section>
</main>
<script src="js/main.js" defer></script>
```
with:
```html
  </div>
</section>

<section class="cta-final">
  <div class="container">
    <h2 class="cta-final-title">Onde a tecnologia está travando o seu crescimento?</h2>
    <p class="cta-final-text">Começamos por um diagnóstico do seu contexto — sem compromisso e sem resposta pronta. Só clareza sobre o que priorizar.</p>
    <a href="mailto:comercial@leanwork.com.br?subject=Diagn%C3%B3stico%20Leanwork" class="btn btn--light cta-final-btn">Agendar um diagnóstico</a>
  </div>
</section>
</main>

<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <img src="assets/logo.png" alt="Leanwork Group" class="footer-logo">
      <span class="footer-tagline">live the experience</span>
    </div>
    <div class="footer-meta">
      <a href="mailto:comercial@leanwork.com.br?subject=Diagn%C3%B3stico%20Leanwork" class="footer-email">comercial@leanwork.com.br</a>
      <span class="footer-copyright">© 2026 Leanwork Group</span>
    </div>
  </div>
</footer>
<script src="js/main.js" defer></script>
```

- [ ] **Step 2: Append CTA and footer CSS**

Append to `css/style.css`:
```css
.cta-final{background:var(--c-black);color:var(--c-white)}
.cta-final .container{padding-top:120px;padding-bottom:120px;text-align:center}
.cta-final-title{margin:0 auto;font-size:56px;line-height:1.08;font-weight:800;letter-spacing:-0.02em;max-width:820px}
.cta-final-text{margin:28px auto 0 auto;font-size:19px;line-height:1.6;font-weight:300;color:#b0b0b0;max-width:560px}
.cta-final-btn{display:inline-block;margin-top:44px;font-size:17px;padding:18px 36px}

.site-footer{background:var(--c-black);color:var(--c-white);border-top:1px solid #1e1e1e}
.footer-inner{padding-top:56px;padding-bottom:56px;display:flex;justify-content:space-between;align-items:center;gap:40px;flex-wrap:wrap}
.footer-brand{display:flex;align-items:center;gap:20px}
.footer-logo{height:30px;filter:invert(1)}
.footer-tagline{font-size:14px;color:var(--c-text-eyebrow);font-weight:300;font-style:italic}
.footer-meta{display:flex;align-items:center;gap:32px}
.footer-email{font-size:15px;color:#c4c4c4}
.footer-email:hover{color:var(--c-white)}
.footer-copyright{font-size:14px;color:#666666}

@media (max-width:767px){
  .cta-final .container{padding-top:72px;padding-bottom:72px}
  .cta-final-title{font-size:34px}
  .footer-inner{flex-direction:column;align-items:flex-start;gap:24px}
}
```

- [ ] **Step 3: Verify**

Run:
```powershell
Select-String -Path index.html -Pattern 'class="cta-final"','class="site-footer"'
```
Expected: both patterns found once each.

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "Add CTA final and footer"
```

---

### Task 11: Full-page QA pass (anchors, mailtos, responsive check)

**Files:**
- No file changes expected unless QA finds a defect (in which case fix `index.html`/`css/style.css`/`js/main.js` directly and re-run this task's checks).

**Interfaces:**
- Consumes: the complete `index.html`, `css/style.css`, `js/main.js` from Tasks 1–10.
- Produces: nothing (verification-only task).

- [ ] **Step 1: Automated anchor-integrity check**

Run:
```powershell
$html = Get-Content index.html -Raw
$hrefs = [regex]::Matches($html, 'href="#([a-zA-Z0-9_-]+)"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$missing = @()
foreach ($h in $hrefs) {
  if ($html -notmatch "id=`"$h`"") { $missing += $h }
}
"Anchors checked: $($hrefs.Count)"
"Missing: $($missing -join ', ')"
```
Expected: `Anchors checked: 6` (`topo`, `problemas`, `plataforma`, `leanapp`, `outsourcing`, `como`); `Missing:` is empty.

- [ ] **Step 2: Automated mailto check**

Run:
```powershell
$html = Get-Content index.html -Raw
$mailtos = [regex]::Matches($html, 'href="mailto:([^"]+)"')
"Mailto count: $($mailtos.Count)"
$mailtos | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
```
Expected: `Mailto count: 7` (nav CTA, hero CTA, plataforma CTA, leanapp CTA, outsourcing CTA, CTA final, footer email). The sorted unique list has exactly 4 entries, all starting with `comercial@leanwork.com.br?subject=`:
- `comercial@leanwork.com.br?subject=Diagn%C3%B3stico%20Leanwork` (used 4 times: nav CTA, hero CTA, CTA final, footer email)
- `comercial@leanwork.com.br?subject=Plataforma%20Enterprise%20%E2%80%94%20diagn%C3%B3stico` (1 time: Plataforma CTA)
- `comercial@leanwork.com.br?subject=Lean%20App%20%E2%80%94%20diagn%C3%B3stico` (1 time: Lean App CTA)
- `comercial@leanwork.com.br?subject=Outsourcing%20AI-Native%20%E2%80%94%20montar%20squad` (1 time: Outsourcing CTA)

- [ ] **Step 3: Design-tool residue check**

Run:
```powershell
Select-String -Path index.html -Pattern 'x-dc','sc-for','sc-if','\{\{','support\.js','data-screen-label','style-hover'
```
Expected: no matches (empty output). If any match is found, remove the leftover directive from `index.html`.

- [ ] **Step 4: Manual responsive + interaction check**

Open `index.html` directly in a browser (double-click the file, no server needed) and check, resizing the window (or using devtools device toolbar):
- **≥1100px:** layout matches `templates/site/Site Leanwork.dc.html` visually (all 2/4-column grids side by side, hero at full size).
- **~800px (tablet):** Plataforma/Lean App/Outsourcing grids and the 4-column "Como trabalhamos" grid collapse to 1 column; padding is visibly tighter than desktop.
- **~375px (mobile):** nav bar shows the hamburger button instead of the inline links; clicking it opens the drawer with all 5 links + CTA, and clicking a link or tapping outside closes it; hero title is legible at a smaller size (not overflowing); every section stacks to a single column.
- Click every anchor link in the nav and confirm the page scrolls smoothly to the right section.
- Click each `mailto:` link (or right-click → copy link) and confirm it opens a mail client addressed to `comercial@leanwork.com.br` with the expected subject line pre-filled.

- [ ] **Step 5: Commit (only if Step 4 required fixes)**

```bash
git add index.html css/style.css js/main.js
git commit -m "Fix QA issues found in full-page responsive pass"
```

If no fixes were needed, skip this step — there is nothing to commit.
