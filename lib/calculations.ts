import { Agente, AgentStatus, Empresa, ProcessStatus, SetorMetrics } from "./types";

/**
 * Calculate agent status based on success rate and latency thresholds
 */
export function calculateAgentStatus(agente: Agente): AgentStatus {
  if (agente.taxa_sucesso < 0.93 || agente.latencia_p95_ms > 2500) {
    return "Crítico";
  }
  if (agente.taxa_sucesso < 0.95 || agente.latencia_p95_ms > 2000) {
    return "Atenção";
  }
  return "OK";
}

/**
 * Format percentage (0-1) to display string
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format milliseconds to seconds with unit
 */
export function formatMs(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(1)}s`;
}

/**
 * Format large numbers with K suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Calculate global automation percentage (weighted average)
 */
export function calculateGlobalAutomation(empresa: Empresa): number {
  const totalProcessos = empresa.setores.reduce(
    (sum, setor) => sum + setor.processos.length,
    0
  );

  if (totalProcessos === 0) return 0;

  const weightedSum = empresa.setores.reduce((sum, setor) => {
    return sum + setor.percentual_automacao_setor * setor.processos.length;
  }, 0);

  return weightedSum / totalProcessos;
}

/**
 * Calculate global average execution time
 */
export function calculateGlobalExecutionTime(empresa: Empresa): number {
  const allProcessos = empresa.setores.flatMap((setor) => setor.processos);

  if (allProcessos.length === 0) return 0;

  const totalTime = allProcessos.reduce(
    (sum, processo) => sum + processo.tempo_medio_execucao_ms,
    0
  );

  return totalTime / allProcessos.length;
}

/**
 * Count total unique agents in the company
 */
export function countTotalAgents(empresa: Empresa): number {
  const allAgents = empresa.setores.flatMap((setor) =>
    setor.processos.flatMap((processo) => processo.agentes)
  );

  return allAgents.length;
}

/**
 * Calculate sector metrics
 */
export function calculateSetorMetrics(setorId: string, empresa: Empresa): SetorMetrics {
  const setor = empresa.setores.find((s) => s.id === setorId);

  if (!setor) {
    return {
      processos_ativos: 0,
      agentes_ativos: 0,
      status_mais_critico: "Manual",
    };
  }

  const processos_ativos = setor.processos.length;
  const agentes_ativos = setor.processos.reduce(
    (sum, processo) => sum + processo.agentes.length,
    0
  );

  // Determine most critical status
  const hasManual = setor.processos.some((p) => p.status === "Manual");
  const hasParcial = setor.processos.some((p) => p.status === "Parcial");

  let status_mais_critico: ProcessStatus = "Automatizado";
  if (hasManual) status_mais_critico = "Manual";
  else if (hasParcial) status_mais_critico = "Parcial";

  return {
    processos_ativos,
    agentes_ativos,
    status_mais_critico,
  };
}

/**
 * Get status color for badges
 */
export function getStatusColor(status: ProcessStatus | AgentStatus): string {
  const colorMap: Record<string, string> = {
    Automatizado: "text-success bg-success/15 border-success/30",
    Parcial: "text-warning bg-warning/15 border-warning/30",
    Manual: "text-critical bg-critical/15 border-critical/30",
    OK: "text-success bg-success/15 border-success/30",
    Atenção: "text-warning bg-warning/15 border-warning/30",
    Crítico: "text-critical bg-critical/15 border-critical/30",
  };

  return colorMap[status] || "";
}

/**
 * Get automation level description based on percentage
 */
export function getAutomationLevel(percent: number): string {
  if (percent >= 0.9) return "Excelente";
  if (percent >= 0.75) return "Ótimo";
  if (percent >= 0.5) return "Bom";
  if (percent >= 0.3) return "Em desenvolvimento";
  return "Inicial";
}

/**
 * Sort sectors by automation percentage (descending)
 */
export function sortSetoresByAutomation(empresa: Empresa) {
  return [...empresa.setores].sort(
    (a, b) => b.percentual_automacao_setor - a.percentual_automacao_setor
  );
}
