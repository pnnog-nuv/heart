"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { formatPercent } from "@/lib/calculations";
import { cn } from "@/lib/utils";
import { Setor, SetorMetrics } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SectorCardProps {
  setor: Setor;
  metrics: SetorMetrics;
  delay?: number;
  className?: string;
}

// Helper para mapear ProcessStatus para Badge variant
const getStatusVariant = (status: string): "success" | "warning" | "secondary" => {
  if (status === "Automatizado") return "success";
  if (status === "Parcial") return "warning";
  return "secondary"; // Manual
};

const getStatusLabel = (status: string): string => {
  return status; // Já vem no formato correto: Automatizado, Parcial, Manual
};

export function SectorCard({ setor, metrics, delay = 0, className }: SectorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={cn("group", className)}
    >
      <Link href={`/setor/${setor.id}`}>
        <div className="glass rounded-xl p-6 h-full hover-lift cursor-pointer border border-transparent hover:border-primary/20">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                {setor.nome}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{setor.responsavel_setor}</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
            {setor.descricao}
          </p>

          {/* Automation Progress */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Automação
              </span>
              <span className="text-2xl font-bold text-primary tracking-tight">
                {formatPercent(setor.percentual_automacao_setor)}
              </span>
            </div>
            <Progress value={setor.percentual_automacao_setor * 100} className="h-2" />
          </div>

          {/* Micro KPIs */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Processos</p>
              <p className="text-xl font-bold text-foreground tracking-tight">
                {metrics.processos_ativos}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Agentes</p>
              <p className="text-xl font-bold text-foreground tracking-tight">
                {metrics.agentes_ativos}
              </p>
            </div>
            <div className="flex items-end justify-end">
              <Badge variant={getStatusVariant(metrics.status_mais_critico)}>
                {getStatusLabel(metrics.status_mais_critico)}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
