"use client";

import { Badge } from "@/components/ui/badge";

export default function TestColorsPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Teste de Cores dos Badges</h1>

      <div className="space-y-2">
        <div>
          <p className="text-sm mb-2">Success (Verde):</p>
          <Badge variant="success">Automatizado</Badge>
        </div>

        <div>
          <p className="text-sm mb-2">Warning (Amarelo):</p>
          <Badge variant="warning">Parcial</Badge>
        </div>

        <div>
          <p className="text-sm mb-2">Secondary (Cinza):</p>
          <Badge variant="secondary">Manual</Badge>
        </div>

        <div>
          <p className="text-sm mb-2">Destructive (Vermelho):</p>
          <Badge variant="destructive">Crítico</Badge>
        </div>

        <div>
          <p className="text-sm mb-2">Default (Azul):</p>
          <Badge variant="default">Default</Badge>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Teste das Variáveis CSS</h2>
        <div className="space-y-2">
          <div className="p-4 bg-success text-success-foreground rounded">
            bg-success text-success-foreground
          </div>
          <div className="p-4 bg-warning text-warning-foreground rounded">
            bg-warning text-warning-foreground
          </div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded">
            bg-secondary text-secondary-foreground
          </div>
        </div>
      </div>
    </div>
  );
}
