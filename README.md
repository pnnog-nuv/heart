# 🏥 Dashboard Consultivo de Automação - Blue Saúde

> **Dashboard executivo de alto padrão** que apresenta visão estratégica da automação com IA nos setores da Blue Saúde.
> Desenvolvido por **NUV Tech**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055)

---

## 🎯 Objetivo

Construir uma aplicação web **consultiva** (sem executar ações) que oferece visão executiva sobre:

- ✅ **Grau de automação** por empresa e setor
- 🤖 **Mapa de agentes** existentes por processo
- ⚡ **Tempo médio de execução** e sucesso dos agentes
- 📊 **Insights automáticos** sobre performance

---

## 🚀 Stack Tecnológica

- **[Next.js 16](https://nextjs.org/)** - React framework com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[TailwindCSS 4](https://tailwindcss.com/)** - Estilização utilitária
- **[Framer Motion](https://www.framer.com/motion/)** - Animações premium
- **[Recharts](https://recharts.org/)** - Visualização de dados
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18+ e **npm** 10+

### Passos

```bash
# 1. Clone ou navegue até o diretório
cd blue-saude-dashboard

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev

# 4. Abra no navegador
# http://localhost:3000
```

---

## 🗂️ Estrutura do Projeto

```
blue-saude-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout principal com Sidebar
│   ├── page.tsx                  # Home (visão empresa)
│   ├── setor/[id]/               # Página de detalhes do setor
│   │   └── page.tsx
│   └── setor/[setorId]/processo/[processoId]/  # Página de processo
│       └── page.tsx
├── components/
│   ├── cards/                    # Componentes de cards
│   │   ├── KpiCard.tsx           # Card de KPI com animação
│   │   ├── SectorCard.tsx        # Card de setor com progress bar
│   │   ├── ProcessCard.tsx       # Card de processo
│   │   └── AgentCard.tsx         # Card detalhado de agente
│   ├── layout/                   # Componentes de layout
│   │   ├── Sidebar.tsx           # Navegação lateral
│   │   └── Breadcrumb.tsx        # Breadcrumb dinâmico
│   └── ui/                       # Componentes de UI base
│       ├── Tooltip.tsx           # Tooltip acessível
│       ├── ProgressBar.tsx       # Barra de progresso animada
│       └── StatusBadge.tsx       # Badge de status com cores
├── data/
│   └── mock-data.json            # Dados mockados (13 setores)
├── lib/
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Funções utilitárias
├── public/                       # Assets estáticos
├── tailwind.config.ts            # Configuração Tailwind customizada
├── next.config.ts                # Configuração Next.js
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
```

---

## 📊 Dados Mockados

A aplicação utiliza dados **determinísticos** com seed fixa em `data/mock-data.json`.

### Hierarquia de Dados

```
Empresa → Setor → Processo → Agente
```

### Setores Incluídos (14 setores)

**Automação Global: 77.2%** | **Total de Processos: 50** | **Total de Agentes: 44**

| Setor              | Automação | Responsável       | Destaque |
|--------------------|-----------|-------------------|----------|
| Atendimento        | 95%       | Franciele Ribeiro | 💙 Bloom Agent |
| Vendas Adesão      | 93%       | Carla Mendes      | - |
| Credenciamento     | 92%       | Ana Martins       | 🔐 Automação Real |
| Marketing          | 91%       | Juliana Santos    | - |
| Compliance         | 86%       | Roberto Alves     | - |
| Vendas PME         | 85%       | Rodrigo Farias    | 📄 Análise Documental |
| Vendas PJ+         | 88%       | Claudio Marques   | ⚖️ Licite.AI |
| Regulação          | 83%       | Fernanda Oliveira | - |
| Desenvolvimento    | 74%       | Felipe Martins    | - |
| Regulatório        | 73%       | Patricia Nunes    | - |
| Jurídico           | 69%       | Dr. Marcelo Azevedo | - |
| RH                 | 65%       | Simone Ribeiro    | - |
| Contas Médicas     | 46%       | Mônica Cardoso    | - |
| Financeiro         | 41%       | Paulo Roberto     | - |

### Status de Processos

- **Automatizado**: Executado integralmente por agentes de IA
- **Parcial**: Parte do fluxo requer validação humana
- **Manual**: Sem automação ativa

### Métricas de Agentes

- **Execuções 24h**: 100–5000
- **Taxa de Sucesso**: 92–99.5%
- **Latência P50**: 500–1200ms
- **Latência P95**: 900–2500ms
- **Transbordo**: 4–8% (quando aplicável)

---

## 🎨 Design e UX

### Tema Visual (Atualizado v1.0.0)

**Design Premium Light Theme - Inspirado Apple/iCloud**

- **Fundo**: `#f5f7fa` (cinza claro elegante)
- **Cards**: `#ffffff` (branco com glassmorphism sutil)
- **Texto**: `#1d1d1f` (preto suave)
- **Primary Blue Saúde**: `#0066cc` (azul corporativo)
  - Light: `#3d8bde`
  - Dark: `#004c99`
- **Muted**: `#86868b` (cinza para textos secundários)
- **Semânticas**:
  - Success: `#34c759` (verde Apple)
  - Warning: `#ff9500` (laranja Apple)
  - Critical: `#ff3b30` (vermelho Apple)

### Tipografia (Apple-Style)

- **Font Stack**: `-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto'`
- **Letter Spacing**: Refinado para cada tamanho
- **Font Weights**: 400, 500, 600, 700, 800

### Animações

- ✨ **Entrada de cards**: Stagger animation com fade + slide
- 📊 **Progress bars**: Preenchimento animado com easing suave
- 🔢 **Números**: Counter animation nos KPIs
- 🎭 **Hover states**: Scale + glow effects
- 🌊 **Transições**: Fade entre páginas

---

## 🧩 Componentes Principais

### `<KpiCard>`

Card de métrica com ícone, valor animado e subtitle.

```tsx
<KpiCard
  title="Automação Global"
  value="72%"
  subtitle="13 setores ativos"
  icon={TrendingUp}
  delay={0.1}
/>
```

### `<SectorCard>`

Card de setor com progress bar, métricas e link para detalhes.

```tsx
<SectorCard
  setor={setor}
  metrics={metrics}
  delay={0.2}
/>
```

### `<ProcessCard>`

Card compacto de processo com status badge e tempo de execução.

```tsx
<ProcessCard
  processo={processo}
  setorId={setorId}
  delay={0.1}
/>
```

### `<AgentCard>`

Card detalhado de agente com KPIs de performance (execuções, sucesso, latência).

```tsx
<AgentCard
  agente={agente}
  delay={0.2}
/>
```

### `<StatusBadge>`

Badge dinâmico com cores baseadas no status e tooltip explicativo.

```tsx
<StatusBadge
  status="Automatizado"
  showTooltip={true}
  pulse={false}
/>
```

---

## 📄 Páginas

### 1. **Home** (`/`)

- Hero com nome e descrição da empresa
- **KPIs Globais** em Bento Grid:
  - Automação global
  - Total de agentes
  - Tempo médio de execução
  - Processos ativos
- **Insights Automáticos**: destaca melhor e pior performance
- **Grid de Setores**: cards clicáveis com métricas

### 2. **Setor** (`/setor/[id]`)

- Header com descrição, responsável e % automação
- KPIs do setor
- Distribuição de processos (Automatizado/Parcial/Manual)
- Grid de processos (3 colunas)

### 3. **Processo** (`/setor/[setorId]/processo/[processoId]`)

- Header com status e tempo médio
- KPIs do processo (total execuções, taxa de sucesso)
- Distribuição de status dos agentes
- Lista de agentes com cards detalhados

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar versão de produção
npm start

# Lint
npm run lint
```

---

## ♿ Acessibilidade

- ✅ Contraste AA
- ✅ Navegação por teclado
- ✅ ARIA labels em componentes interativos
- ✅ Tooltips acessíveis com `role="tooltip"`
- ✅ Foco visível em elementos interativos

---

## 🎯 Próximos Passos (Expansões Futuras)

- [ ] Dark mode toggle
- [ ] Skeleton loading states
- [ ] Toast notifications
- [ ] Filtros avançados (por status, setor, responsável)
- [ ] Busca global de processos e agentes
- [ ] Gráficos de tendência temporal (Recharts)
- [ ] Export de relatórios em PDF/Excel
- [ ] Dashboard analytics
- [ ] Sistema de alertas em tempo real
- [ ] Multi-idioma (i18n)
- [ ] Integração com API real

---

## 📝 Changelog

### v1.0.0 (2025-10-27)
- ✅ **Redesign completo da interface**
- ✅ Migração de dark theme para **light theme elegante**
- ✅ Design system **Blue Saúde** com cores corporativas
- ✅ **Página de login** mockada
- ✅ Tipografia **Apple-style** com tracking refinado
- ✅ **Glassmorphism sutil** inspirado em iCloud
- ✅ Animações **Framer Motion** otimizadas
- ✅ Integração de **4 processos reais** de automação:
  - Atendimento com Bloom
  - Análise Documental (Vendas PME)
  - Credenciamento
  - Vendas PJ+ com Licite.AI
- ✅ **14 setores**, **50 processos**, **44 agentes**
- ✅ Automação global: **77.2%**

---

## 👥 Créditos

**Desenvolvido por**: [NUV Tech](https://nuvtech.com)
**Cliente**: Blue Saúde
**Design System**: Premium Light Theme (Apple-inspired)
**Stack**: Next.js 16 + TypeScript 5.9 + TailwindCSS 4.1 + Framer Motion 12

---

## 📝 Licença

Este projeto é proprietário da **NUV Tech** e foi desenvolvido exclusivamente para **Blue Saúde**.

---

## 🐛 Suporte

Para dúvidas ou problemas, entre em contato com a equipe **NUV Tech**.

---

**Feito com 💙 por NUV Tech**
