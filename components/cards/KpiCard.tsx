"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  delay?: number;
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className,
  delay = 0,
}: KpiCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-critical",
    neutral: "text-foreground/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glass rounded-xl p-6 hover-lift cursor-default",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {title}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
            className="text-4xl font-bold text-foreground mb-1 tracking-tight"
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-xl gradient-blue shadow-md">
            <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>
      {trend && trendValue && (
        <div className={cn("mt-4 text-sm font-semibold", trend && trendColors[trend])}>
          {trendValue}
        </div>
      )}
    </motion.div>
  );
}
