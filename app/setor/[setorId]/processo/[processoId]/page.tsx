"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { Clock, Cpu, TrendingUp } from "lucide-react";
import mockData from "@/data/mock-data.json";
import { DashboardData } from "@/lib/types";
import { formatMs, calculateAgentStatus } from "@/lib/calculations";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from "@/components/cards/AgentCard";
import { KpiCard } from "@/components/cards/KpiCard";

const data = mockData as DashboardData;

// Helper para mapear ProcessStatus para Badge variant
const getStatusVariant = (status: string): "success" | "warning" | "secondary" => {
  if (status === "Automatizado") return "success";
  if (status === "Parcial") return "warning";
  return "secondary"; // Manual
};

interface PageProps {
  params: Promise<{ setorId: string; processoId: string }>;
}

export default function ProcessoPage({ params }: PageProps) {
  const { setorId, processoId } = use(params);
  const { empresa } = data;

  // Find sector and process
  const setor = empresa.setores.find((s) => s.id === setorId);
  const processo = setor?.processos.find((p) => p.id === processoId);

  if (!setor || !processo) {
    notFound();
  }

  // Calculate metrics
  const totalAgents = processo.agentes.length;
  const avgSuccessRate =
    totalAgents > 0
      ? processo.agentes.reduce((sum, a) => sum + a.taxa_sucesso, 0) / totalAgents
      : 0;
  const totalExecutions = processo.agentes.reduce(
    (sum, a) => sum + a.execucoes_24h,
    0
  );

  // Count agent statuses
  const agentStatuses = processo.agentes.map((a) => calculateAgentStatus(a));
  const criticalCount = agentStatuses.filter((s) => s === "Crítico").length;
  const warningCount = agentStatuses.filter((s) => s === "Atenção").length;
  const okCount = agentStatuses.filter((s) => s === "OK").length;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Empresa", href: "/" },
          { label: setor.nome, href: `/setor/${setor.id}` },
          { label: processo.nome },
        ]}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-heading font-bold text-gradient">
                {processo.nome}
              </h1>
              <Badge variant={getStatusVariant(processo.status)} className="animate-pulse">
                {processo.status}
              </Badge>
            </div>
            <p className="text-lg text-foreground/70 mb-4">
              {processo.descricao}
            </p>
            <div className="flex items-center gap-2 text-foreground/60">
              <Clock className="w-4 h-4" />
              <span>
                Tempo médio de execução:{" "}
                <span className="font-semibold text-foreground">
                  {formatMs(processo.tempo_medio_execucao_ms)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Process KPIs */}
      {totalAgents > 0 && (
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground/80 mb-4 uppercase tracking-wide">
            Métricas do Processo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Agentes Ativos"
              value={totalAgents}
              subtitle="Executando o processo"
              icon={Cpu}
              delay={0}
            />
            <KpiCard
              title="Execuções 24h"
              value={totalExecutions.toLocaleString()}
              subtitle="Total de execuções"
              icon={TrendingUp}
              delay={0.1}
            />
            <KpiCard
              title="Taxa Média de Sucesso"
              value={`${(avgSuccessRate * 100).toFixed(1)}%`}
              subtitle="Média dos agentes"
              delay={0.2}
            />
            <KpiCard
              title="Tempo de Execução"
              value={formatMs(processo.tempo_medio_execucao_ms)}
              subtitle="Tempo médio"
              icon={Clock}
              delay={0.3}
            />
          </div>
        </section>
      )}

      {/* Agent Status Distribution */}
      {totalAgents > 0 && (
        <section>
          <h2 className="text-xl font-heading font-semibold text-foreground/80 mb-4 uppercase tracking-wide">
            Status dos Agentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-6 border-l-4 border-success"
            >
              <p className="text-sm text-foreground/60 mb-2">OK</p>
              <p className="text-3xl font-bold text-success">{okCount}</p>
              <p className="text-xs text-foreground/50 mt-1">
                Operando normalmente
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass rounded-2xl p-6 border-l-4 border-warning"
            >
              <p className="text-sm text-foreground/60 mb-2">Atenção</p>
              <p className="text-3xl font-bold text-warning">{warningCount}</p>
              <p className="text-xs text-foreground/50 mt-1">
                Requer monitoramento
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass rounded-2xl p-6 border-l-4 border-critical"
            >
              <p className="text-sm text-foreground/60 mb-2">Crítico</p>
              <p className="text-3xl font-bold text-critical">{criticalCount}</p>
              <p className="text-xs text-foreground/50 mt-1">
                Ação necessária
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Agents */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground/80 uppercase tracking-wide">
            Agentes
          </h2>
          <p className="text-sm text-foreground/50">
            {totalAgents} {totalAgents === 1 ? "agente" : "agentes"}
          </p>
        </div>

        {totalAgents === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <p className="text-lg text-foreground/60 mb-2">
              Este processo ainda não possui agentes de automação.
            </p>
            <p className="text-sm text-foreground/40">
              Processos manuais estão aguardando implementação de IA.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {processo.agentes.map((agente, index) => (
              <AgentCard key={agente.id} agente={agente} delay={0.1 * index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
