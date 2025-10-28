import { render, screen } from '@testing-library/react';
import { SectorCard } from '@/components/cards/SectorCard';
import { AgentCard } from '@/components/cards/AgentCard';
import { Setor, SetorMetrics, Agente } from '@/lib/types';

// Mock do Next.js
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock do simple-tooltip
jest.mock('@/components/ui/simple-tooltip', () => ({
  SimpleTooltip: ({ children, content }: any) => <div title={content}>{children}</div>,
}));

describe('Migração para componentes shadcn/ui', () => {
  describe('SectorCard', () => {
    const mockSetor: Setor = {
      id: 'setor-1',
      nome: 'Financeiro',
      descricao: 'Gestão financeira e contábil',
      responsavel_setor: 'João Silva',
      percentual_automacao_setor: 75,
    };

    const mockMetrics: SetorMetrics = {
      processos_ativos: 5,
      agentes_ativos: 3,
      status_mais_critico: 'OK',
    };

    it('deve renderizar usando Progress do shadcn ao invés de ProgressBar customizado', () => {
      const { container } = render(
        <SectorCard setor={mockSetor} metrics={mockMetrics} />
      );

      // Verifica que o componente Progress do shadcn está sendo usado
      // Progress usa Radix UI primitives com data-attributes
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
    });

    it('deve renderizar Badge do shadcn ao invés de StatusBadge customizado', () => {
      const { container } = render(
        <SectorCard setor={mockSetor} metrics={mockMetrics} />
      );

      // Badge do shadcn é uma div com classes específicas
      const badge = container.querySelector('.inline-flex.items-center.rounded-md');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('OK');
    });

    it('deve mapear status Automatizado para variant success do Badge', () => {
      const { container } = render(
        <SectorCard setor={mockSetor} metrics={{...mockMetrics, status_mais_critico: 'Automatizado'}} />
      );

      const badge = container.querySelector('.bg-success');
      expect(badge).toBeInTheDocument();
    });

    it('deve mapear status Parcial para variant warning do Badge', () => {
      const { container } = render(
        <SectorCard setor={mockSetor} metrics={{...mockMetrics, status_mais_critico: 'Parcial'}} />
      );

      const badge = container.querySelector('.bg-warning');
      expect(badge).toBeInTheDocument();
    });

    it('deve mapear status Manual para variant secondary do Badge', () => {
      const { container } = render(
        <SectorCard setor={mockSetor} metrics={{...mockMetrics, status_mais_critico: 'Manual'}} />
      );

      const badge = container.querySelector('.bg-secondary');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('AgentCard', () => {
    const mockAgente: Agente = {
      id: 'agente-1',
      nome: 'Agente de Triagem',
      descricao: 'Classifica documentos automaticamente',
      responsavel_tecnico: 'Maria Santos',
      execucoes_24h: 150,
      taxa_sucesso: 98.5,
      latencia_p50_ms: 250,
      latencia_p95_ms: 800,
    };

    it('deve renderizar Badge do shadcn ao invés de StatusBadge customizado', () => {
      const { container } = render(
        <AgentCard agente={mockAgente} />
      );

      // Badge do shadcn é uma div com classes específicas
      const badge = container.querySelector('.inline-flex.items-center.rounded-md');
      expect(badge).toBeInTheDocument();
    });

    it('deve aplicar classes do Badge corretamente', () => {
      const { container } = render(
        <AgentCard agente={mockAgente} />
      );

      // Verifica que o Badge está sendo renderizado
      const badge = container.querySelector('.inline-flex.items-center.rounded-md');
      expect(badge).toBeInTheDocument();

      // Verifica que tem algum conteúdo de status
      expect(badge?.textContent).toMatch(/OK|Atenção|Crítico/);
    });
  });

  describe('Componentes shadcn instalados', () => {
    it('deve ter componente Progress do shadcn disponível', () => {
      // Tenta importar o componente Progress
      expect(() => require('@/components/ui/progress')).not.toThrow();
    });

    it('deve ter componente Badge do shadcn disponível', () => {
      // Tenta importar o componente Badge
      expect(() => require('@/components/ui/badge')).not.toThrow();
    });

    it('deve ter componente Card do shadcn disponível', () => {
      // Tenta importar o componente Card
      expect(() => require('@/components/ui/card')).not.toThrow();
    });

    it('NÃO deve ter componentes customizados obsoletos', () => {
      // ProgressBar customizado foi removido
      expect(() => require('@/components/ui/ProgressBar')).toThrow();

      // StatusBadge customizado foi removido
      expect(() => require('@/components/ui/StatusBadge')).toThrow();
    });
  });
});
