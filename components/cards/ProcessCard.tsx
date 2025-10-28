"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Cpu } from "lucide-react";
import { formatMs } from "@/lib/calculations";
import { cn } from "@/lib/utils";
import { Processo } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

// Helper para mapear ProcessStatus para Badge variant
const getStatusVariant = (status: string): "success" | "warning" | "secondary" => {
  if (status === "Automatizado") return "success";
  if (status === "Parcial") return "warning";
  return "secondary"; // Manual
};

interface ProcessCardProps {
  processo: Processo;
  setorId: string;
  delay?: number;
  className?: string;
}

export function ProcessCard({ processo, setorId, delay = 0, className }: ProcessCardProps) {
  const agentCount = processo.agentes.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      className={cn("group", className)}
    >
      <Link href={`/setor/${setorId}/processo/${processo.id}`}>
        <div className="glass rounded-2xl p-5 h-full hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {processo.nome}
              </h4>
              <Badge variant={getStatusVariant(processo.status)} className={processo.status === "Manual" ? "animate-pulse" : ""}>
                {processo.status}
              </Badge>
            </div>
            <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
            {processo.descricao}
          </p>

          {/* Metrics */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-foreground/60">
              <Clock className="w-4 h-4" />
              <span>{formatMs(processo.tempo_medio_execucao_ms)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground/60">
              <Cpu className="w-4 h-4" />
              <span>
                {agentCount} {agentCount === 1 ? "agente" : "agentes"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
