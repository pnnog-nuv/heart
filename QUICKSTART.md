# 🚀 Quick Start Guide

## Rodando a Aplicação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000** (ou porta alternativa caso 3000 esteja em uso)

### 3. Build para Produção

```bash
npm run build
npm start
```

---

## 📱 Navegação da Aplicação

### Home (`/`)
- Visão geral da empresa Blue Saúde
- KPIs globais (automação, agentes, tempo médio)
- Insights automáticos destacando melhor e pior desempenho
- Grid com todos os 13 setores clicáveis

### Página de Setor (`/setor/[setorId]`)
Exemplos:
- `/setor/marketing`
- `/setor/credenciamento`
- `/setor/vendas-adesao`

Mostra:
- Métricas detalhadas do setor
- Distribuição de processos (Automatizado/Parcial/Manual)
- Grid de processos clicáveis

### Página de Processo (`/setor/[setorId]/processo/[processoId]`)
Exemplos:
- `/setor/marketing/processo/analise-sentimento`
- `/setor/credenciamento/processo/validacao-prestadores`

Mostra:
- KPIs do processo
- Status dos agentes (OK/Atenção/Crítico)
- Cards detalhados de cada agente com métricas

---

## 🎨 Features Visuais Premium

✅ **Glassmorphism** - Cards com efeito vidro e backdrop blur
✅ **Gradientes Animados** - Background e elementos com gradientes dinâmicos
✅ **Framer Motion** - Animações suaves de entrada (stagger, fade, slide)
✅ **Hover Effects** - Scale e glow effects nos cards
✅ **Tooltips Interativos** - Explicações contextuais em badges de status
✅ **Progress Bars Animadas** - Preenchimento suave com gradiente ciano
✅ **Responsive Design** - Mobile-first com sidebar colapsável
✅ **Dark Theme** - Tema escuro premium (#0b0c10)

---

## 📊 Dados Mockados

Os dados estão em `/data/mock-data.json` com:
- **13 setores** completos com percentuais reais
- **49 processos** distribuídos pelos setores
- **37 agentes** com KPIs realistas
- Todos os números respeitam faixas realistas (taxa de sucesso 92-99.5%, latências 500-2500ms)

---

## 🛠️ Stack Utilizada

- **Next.js 16** com App Router e Turbopack
- **TypeScript** com strict mode
- **TailwindCSS 4** com tema customizado
- **Framer Motion** para animações
- **Lucide React** para ícones
- **Recharts** (pronto para gráficos futuros)

---

## 📁 Estrutura de Componentes

```
components/
├── cards/
│   ├── KpiCard.tsx       # Cards de métricas principais
│   ├── SectorCard.tsx    # Cards de setores
│   ├── ProcessCard.tsx   # Cards de processos
│   └── AgentCard.tsx     # Cards detalhados de agentes
├── layout/
│   ├── Sidebar.tsx       # Navegação lateral
│   └── Breadcrumb.tsx    # Breadcrumb contextual
└── ui/
    ├── Tooltip.tsx       # Tooltips acessíveis
    ├── ProgressBar.tsx   # Barras de progresso
    └── StatusBadge.tsx   # Badges de status
```

---

## 🎯 Métricas Calculadas Automaticamente

A aplicação calcula em tempo real:
- **Automação Global**: Média ponderada dos setores
- **Tempo Médio Global**: Média dos processos
- **Total de Agentes**: Contagem de agentes únicos
- **Status dos Agentes**: Baseado em thresholds de sucesso e latência
  - ✅ OK: sucesso ≥ 95% e P95 ≤ 2000ms
  - ⚠️ Atenção: sucesso ≥ 93% e P95 ≤ 2500ms
  - 🚨 Crítico: abaixo dos thresholds

---

## 🎓 Como Personalizar

### Adicionar um Novo Setor
Edite `data/mock-data.json` e adicione um objeto no array `setores[]` com a estrutura:

```json
{
  "id": "novo-setor",
  "nome": "Nome do Setor",
  "descricao": "Descrição...",
  "responsavel_setor": "Nome Responsável",
  "percentual_automacao_setor": 0.85,
  "processos": []
}
```

### Modificar Tema de Cores
Edite `tailwind.config.ts` na seção `extend.colors` para ajustar a paleta.

### Adicionar Novas Animações
Use Framer Motion nos componentes:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo
</motion.div>
```

---

## 📞 Suporte

**Desenvolvido por**: NUV Tech
**Cliente**: Blue Saúde

Para dúvidas técnicas, consulte o [README.md](README.md) completo.

---

**Feito com 💙 por NUV Tech**
