"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-12 text-center max-w-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-16 h-16 text-warning" />
          </div>
        </div>

        <h1 className="text-5xl font-heading font-bold text-gradient mb-4">
          404
        </h1>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
          Página não encontrada
        </h2>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
          Retorne à página inicial para continuar navegando.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          Voltar para Home
        </Link>
      </motion.div>
    </div>
  );
}
