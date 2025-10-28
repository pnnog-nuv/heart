import { render, screen } from '@testing-library/react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

// Mock do Next.js
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock do AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'Test User',
      email: 'test@example.com',
    },
    logout: jest.fn(),
  }),
}));

// Mock do use-mobile hook
jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false, // Desktop mode
}));

describe('Ordem da Navegação na Sidebar', () => {
  it('deve renderizar os links na ordem correta: Empresa, Insights, Setores', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );

    // Pega apenas os links de navegação (não pega o header nem o footer)
    const navSection = container.querySelector('[data-sidebar="group"]');
    const links = navSection?.querySelectorAll('[data-sidebar="menu-button"]');

    // Deve ter exatamente 3 links de navegação
    expect(links?.length).toBe(3);

    // Verifica a ordem correta
    expect(links?.[0]).toHaveTextContent('Empresa');
    expect(links?.[1]).toHaveTextContent('Insights');
    expect(links?.[2]).toHaveTextContent('Setores');
  });

  it('deve ter Insights ANTES de Setores (não invertido)', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );

    const links = Array.from(container.querySelectorAll('[data-sidebar="menu-button"]'));
    const linksText = links.map(link => link.textContent);

    const insightsIndex = linksText.findIndex(text => text?.includes('Insights'));
    const setoresIndex = linksText.findIndex(text => text?.includes('Setores'));

    // Insights deve aparecer ANTES de Setores
    expect(insightsIndex).toBeLessThan(setoresIndex);
    expect(insightsIndex).toBeGreaterThan(0); // Mas depois de Empresa
  });

  it('deve marcar todos os links da home como ativos quando pathname é /', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );

    // Quando estamos na home (/), Empresa, Insights e Setores devem estar ativos
    const activeLinks = container.querySelectorAll('[data-active="true"]');

    // Todos os 3 links devem estar marcados como ativos na home
    expect(activeLinks.length).toBe(3);
  });

  it('deve ter os hrefs corretos para cada link', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );

    const empresaLink = container.querySelector('a[href="/"]');
    const insightsLink = container.querySelector('a[href="/#insights"]');
    const setoresLink = container.querySelector('a[href="/#setores"]');

    expect(empresaLink).toBeInTheDocument();
    expect(insightsLink).toBeInTheDocument();
    expect(setoresLink).toBeInTheDocument();
  });
});

describe('Active Link em páginas diferentes', () => {
  it('deve marcar TODOS os links como ativos quando está na home', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );

    // Na home (/), todos os links devem estar ativos:
    // - Empresa (/) está ativo pois pathname === "/"
    // - Insights (/#insights) está ativo pois pathname === "/"
    // - Setores (/#setores) está ativo pois pathname === "/"
    const activeLinks = container.querySelectorAll('[data-active="true"]');

    expect(activeLinks.length).toBe(3);
  });
});
