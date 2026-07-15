# leanwork.com.br

Landing page institucional da **Leanwork Group** — tecnologia como ativo estratégico para operações de varejo e digital commerce.

Site estático, single-page, sem build step: HTML, CSS e JS puros.

## Estrutura

```
.
├── index.html        # página única, todas as seções
├── css/style.css      # estilos (tokens, layout, responsivo)
├── js/main.js         # menu mobile (toggle + fechar ao clicar fora/no link)
├── assets/            # logo e favicon
├── docs/               # documentação de apoio
└── templates/          # exports de design de referência (não versionado)
```

### Seções da página

| Âncora | Conteúdo |
|---|---|
| `#topo` | Hero |
| `#problemas` | Problemas que resolvemos |
| `#plataforma` | Plataforma Enterprise |
| `#leanapp` | Lean App |
| `#outsourcing` | Outsourcing AI-Native |
| `#como` | Como trabalhamos |
| CTA final + footer | Contato |

## Rodando localmente

Não há dependências nem build. Basta servir a pasta com qualquer servidor estático:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois abra `http://localhost:8000` (ou a porta indicada).

## Deploy

Site estático — publique o conteúdo da raiz (`index.html`, `css/`, `js/`, `assets/`) em qualquer host estático (Vercel, Netlify, GitHub Pages, S3, etc.). Não é necessário passo de build.

## Contato

comercial@leanwork.com.br
