"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Clock, TrendingUp } from "lucide-react";
import mockData from "@/data/mock-data.json";
import {
  calculateGlobalAutomation,
  calculateGlobalExecutionTime,
  countTotalAgents,
  countTotalAgentsWithNano,
  calculateSetorMetrics,
  formatPercent,
  formatMs,
  sortSetoresByAutomation,
} from "@/lib/calculations";
import { DashboardData } from "@/lib/types";
import { KpiCard } from "@/components/cards/KpiCard";
import { SectorCard } from "@/components/cards/SectorCard";

const data = mockData as DashboardData;

export default function HomePage() {
  const { empresa } = data;

  // Calculate global metrics
  const globalAutomation = calculateGlobalAutomation(empresa);
  const totalAgents = countTotalAgentsWithNano(empresa); // Includes nano-agents (~2,500 total)
  const mainAgents = countTotalAgents(empresa); // Main agents only (~50)
  const avgExecutionTime = calculateGlobalExecutionTime(empresa);
  const totalSetores = empresa.setores.length;
  const totalProcessos = empresa.setores.reduce(
    (sum, setor) => sum + setor.processos.length,
    0
  );

  // Sort sectors by automation
  const sortedSetores = sortSetoresByAutomation(empresa);

  // Get metrics for insights
  const topSetor = sortedSetores[0];
  const bottomSetor = sortedSetores[sortedSetores.length - 1];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight">
          {empresa.nome}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {empresa.descricao}
        </p>
      </motion.div>

      {/* Global KPIs */}
      <section>
        <h2 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-widest">
          Visão Geral
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard
            title="Automação Global"
            value={formatPercent(globalAutomation)}
            subtitle={`${totalSetores} setores ativos`}
            icon={TrendingUp}
            delay={0}
          />
          <KpiCard
            title="Total de Agentes"
            value={totalAgents.toLocaleString('pt-BR')}
            subtitle={`${mainAgents} agentes principais + nano-agentes`}
            icon={Cpu}
            delay={0.1}
          />
          <KpiCard
            title="Tempo Médio"
            value={formatMs(avgExecutionTime)}
            subtitle="Execução global"
            icon={Clock}
            delay={0.2}
          />
          <KpiCard
            title="Processos"
            value={totalProcessos}
            subtitle="Ativos no sistema"
            icon={Activity}
            delay={0.3}
          />
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights">
        <h2 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-widest">
          Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="glass rounded-xl p-6 border-l-4 border-success hover-lift"
          >
            <h3 className="text-base font-bold text-success mb-3">
              Melhor Desempenho
            </h3>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              <span className="font-bold text-foreground">{topSetor.nome}</span> lidera
              com <span className="font-bold text-success">{formatPercent(topSetor.percentual_automacao_setor)}</span> de
              automação
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Responsável: {topSetor.responsavel_setor}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="glass rounded-xl p-6 border-l-4 border-warning hover-lift"
          >
            <h3 className="text-base font-bold text-warning mb-3">
              Oportunidade de Crescimento
            </h3>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              <span className="font-bold text-foreground">{bottomSetor.nome}</span> com{" "}
              <span className="font-bold text-warning">{formatPercent(bottomSetor.percentual_automacao_setor)}</span> tem
              potencial de melhoria
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Responsável: {bottomSetor.responsavel_setor}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section id="setores">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Setores
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            {totalSetores} ativos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {empresa.setores.map((setor, index) => {
            const metrics = calculateSetorMetrics(setor.id, empresa);
            return (
              <SectorCard
                key={setor.id}
                setor={setor}
                metrics={metrics}
                delay={0.05 * index}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
