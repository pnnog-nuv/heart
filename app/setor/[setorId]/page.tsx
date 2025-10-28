"use client";

import React, { use } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { User, Activity, Cpu, TrendingUp } from "lucide-react";
import mockData from "@/data/mock-data.json";
import { DashboardData } from "@/lib/types";
import { formatPercent, formatMs, calculateSetorMetrics } from "@/lib/calculations";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { KpiCard } from "@/components/cards/KpiCard";
import { ProcessCard } from "@/components/cards/ProcessCard";
import { Progress } from "@/components/ui/progress";

const data = mockData as DashboardData;

interface PageProps {
  params: Promise<{ setorId: string }>;
}

export default function SetorPage({ params }: PageProps) {
  const { setorId } = use(params);
  const { empresa } = data;

  // Find the sector
  const setor = empresa.setores.find((s) => s.id === setorId);

  if (!setor) {
    notFound();
  }

  // Calculate metrics
  const metrics = calculateSetorMetrics(setor.id, empresa);
  const avgExecutionTime =
    setor.processos.reduce((sum, p) => sum + p.tempo_medio_execucao_ms, 0) /
    setor.processos.length;

  // Count processes by status
  const processosAutomatizados = setor.processos.filter(
    (p) => p.status === "Automatizado"
  ).length;
  const processosParciais = setor.processos.filter(
    (p) => p.status === "Parcial"
  ).length;
  const processosManuais = setor.processos.filter(
    (p) => p.status === "Manual"
  ).length;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Empresa", href: "/" },
          { label: setor.nome },
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
            <h1 className="text-4xl font-heading font-bold text-gradient mb-3">
              {setor.nome}
            </h1>
            <p className="text-lg text-foreground/70 mb-4">
              {setor.descricao}
            </p>
            <div className="flex items-center gap-2 text-foreground/60">
              <User className="w-4 h-4" />
              <span className="font-medium">{setor.responsavel_setor}</span>
            </div>
          </div>

          <div className="lg:w-64">
            <div className="text-center mb-3">
              <p className="text-sm text-foreground/60 mb-1">
                Nível de Automação
              </p>
              <p className="text-5xl font-bold text-primary">
                {formatPercent(setor.percentual_automacao_setor)}
              </p>
            </div>
            <Progress
              value={setor.percentual_automacao_setor * 100}
              className="h-3"
            />
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <section>
        <h2 className="text-xl font-heading font-semibold text-foreground/80 mb-4 uppercase tracking-wide">
          Métricas do Setor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Processos Ativos"
            value={metrics.processos_ativos}
            subtitle={`${processosAutomatizados} automatizados`}
            icon={Activity}
            delay={0}
          />
          <KpiCard
            title="Agentes IA"
            value={metrics.agentes_ativos}
            subtitle="Agentes em operação"
            icon={Cpu}
            delay={0.1}
          />
          <KpiCard
            title="Tempo Médio"
            value={formatMs(avgExecutionTime)}
            subtitle="Execução dos processos"
            icon={TrendingUp}
            delay={0.2}
          />
          <KpiCard
            title="Status"
            value={metrics.status_mais_critico}
            subtitle="Status mais crítico"
            delay={0.3}
          />
        </div>
      </section>

      {/* Process Status Distribution */}
      <section>
        <h2 className="text-xl font-heading font-semibold text-foreground/80 mb-4 uppercase tracking-wide">
          Distribuição de Processos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-6 border-l-4 border-success"
          >
            <p className="text-sm text-foreground/60 mb-2">Automatizados</p>
            <p className="text-3xl font-bold text-success">
              {processosAutomatizados}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-2xl p-6 border-l-4 border-warning"
          >
            <p className="text-sm text-foreground/60 mb-2">Parciais</p>
            <p className="text-3xl font-bold text-warning">
              {processosParciais}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass rounded-2xl p-6 border-l-4 border-critical"
          >
            <p className="text-sm text-foreground/60 mb-2">Manuais</p>
            <p className="text-3xl font-bold text-critical">
              {processosManuais}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Processes Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground/80 uppercase tracking-wide">
            Processos
          </h2>
          <p className="text-sm text-foreground/50">
            {setor.processos.length} processos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {setor.processos.map((processo, index) => (
            <ProcessCard
              key={processo.id}
              processo={processo}
              setorId={setor.id}
              delay={0.1 * index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
