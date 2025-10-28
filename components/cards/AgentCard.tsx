"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  TrendingUp,
  User,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateAgentStatus, formatPercent, formatMs, formatNumber } from "@/lib/calculations";
import { Agente } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { SimpleTooltip as Tooltip } from "@/components/ui/simple-tooltip";

// Helper para mapear AgentStatus para Badge variant
const getStatusVariant = (status: string): "success" | "warning" | "destructive" => {
  if (status === "OK") return "success";
  if (status === "Atenção") return "warning";
  return "destructive"; // Crítico
};

interface AgentCardProps {
  agente: Agente;
  delay?: number;
  className?: string;
}

export function AgentCard({ agente, delay = 0, className }: AgentCardProps) {
  const status = calculateAgentStatus(agente);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "glass rounded-xl p-5 hover-lift border border-transparent hover:border-primary/10",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h5 className="text-base font-bold text-foreground mb-1 tracking-tight">{agente.nome}</h5>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <User className="w-3.5 h-3.5" />
            <span>{agente.responsavel_tecnico}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {agente.descricao}
          </p>
        </div>
        <Badge variant={getStatusVariant(status)} className={status === "Crítico" ? "animate-pulse" : ""}>
          {status}
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Executions */}
        <Tooltip content="Número de execuções nas últimas 24 horas">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="p-1.5 rounded-md gradient-blue">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-foreground/50 mb-0.5">Execuções 24h</p>
              <p className="text-xl font-bold text-foreground">
                {formatNumber(agente.execucoes_24h)}
              </p>
            </div>
          </div>
        </Tooltip>

        {/* Success Rate */}
        <Tooltip content="Taxa de sucesso das execuções">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
            <div className="p-1.5 rounded-md bg-success">
              <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Taxa de Sucesso</p>
              <p className="text-xl font-bold text-success">
                {formatPercent(agente.taxa_sucesso, 1)}
              </p>
            </div>
          </div>
        </Tooltip>

        {/* P50 Latency */}
        <Tooltip content="Latência mediana (50º percentil)">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="p-1.5 rounded-md bg-warning">
              <Clock className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Latência P50</p>
              <p className="text-lg font-bold text-foreground">
                {formatMs(agente.latencia_p50_ms)}
              </p>
            </div>
          </div>
        </Tooltip>

        {/* P95 Latency */}
        <Tooltip content="Latência no 95º percentil (pior caso para 95% das requisições)">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="p-1.5 rounded-md bg-warning">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Latência P95</p>
              <p className="text-lg font-bold text-foreground">
                {formatMs(agente.latencia_p95_ms)}
              </p>
            </div>
          </div>
        </Tooltip>
      </div>

      {/* Transbordo (if applicable) */}
      {agente.transbordo !== undefined && (
        <Tooltip content="Percentual de casos que exigiram intervenção humana">
          <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-critical/10 border border-critical/30">
            <AlertTriangle className="w-5 h-5 text-critical" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">Transbordo</p>
              <p className="text-base font-bold text-critical">
                {formatPercent(agente.transbordo, 1)}
              </p>
            </div>
          </div>
        </Tooltip>
      )}
    </motion.div>
  );
}
