export type ProcessStatus = "Automatizado" | "Parcial" | "Manual";

export type AgentStatus = "OK" | "Atenção" | "Crítico";

export interface Agente {
  id: string;
  nome: string;
  descricao: string;
  responsavel_tecnico: string;
  execucoes_24h: number;
  taxa_sucesso: number; // 0-1
  latencia_p50_ms: number;
  latencia_p95_ms: number;
  transbordo?: number; // 0-1, opcional
}

export interface Processo {
  id: string;
  nome: string;
  descricao: string;
  status: ProcessStatus;
  tempo_medio_execucao_ms: number;
  agentes: Agente[];
}

export interface Setor {
  id: string;
  nome: string;
  descricao: string;
  responsavel_setor: string;
  percentual_automacao_setor: number; // 0-1
  processos: Processo[];
}

export interface Empresa {
  id: string;
  nome: string;
  descricao: string;
  percentual_automacao_global: number; // 0-1
  setores: Setor[];
}

export interface DashboardData {
  empresa: Empresa;
}

// Status glossary for tooltips
export const STATUS_GLOSSARY: Record<ProcessStatus, string> = {
  Automatizado: "Executado integralmente por agentes de IA.",
  Parcial: "Parte do fluxo ainda requer validação humana.",
  Manual: "Sem automação ativa neste processo.",
};

// Helper types for computed metrics
export interface GlobalMetrics {
  percentual_automacao: number;
  total_agentes: number;
  tempo_medio_execucao_global: number;
  total_setores: number;
  total_processos: number;
}

export interface SetorMetrics {
  processos_ativos: number;
  agentes_ativos: number;
  status_mais_critico: ProcessStatus;
}
