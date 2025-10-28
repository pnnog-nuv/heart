import { render, screen } from '@testing-library/react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

// Mock do Next.js
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
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

describe('Sidebar Layout', () => {
  it('deve renderizar a estrutura correta (flex container)', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div data-testid="main-content">Main Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    // Verifica que o SidebarProvider tem display flex
    const wrapper = container.querySelector('.group\\/sidebar-wrapper');
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toBeInTheDocument();
  });

  it('deve ter um spacer com largura de 16rem (256px) quando expandida', () => {
    const { container } = render(
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <div data-testid="main-content">Main Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    // O spacer é a primeira div dentro do container .peer
    const sidebarContainer = container.querySelector('[data-variant="inset"]');
    expect(sidebarContainer).toBeInTheDocument();

    // Verifica que o spacer tem a classe de largura correta (Tailwind v4 syntax)
    const spacer = sidebarContainer?.querySelector('.bg-transparent');
    expect(spacer).toBeInTheDocument();
    expect(spacer).toHaveClass('w-(--sidebar-width)');
  });

  it('deve ter a sidebar com position fixed', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div data-testid="main-content">Main Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    // A sidebar fixa deve ter a classe 'fixed'
    const fixedSidebar = container.querySelector('.fixed.inset-y-0');
    expect(fixedSidebar).toBeInTheDocument();
    expect(fixedSidebar).toHaveClass('z-10');
  });

  it('deve renderizar o conteúdo dentro do SidebarInset', () => {
    render(
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div data-testid="main-content">Main Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    const mainContent = screen.getByTestId('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveTextContent('Main Content');
  });

  it('deve ter variant="inset" configurado corretamente', () => {
    const { container } = render(
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div data-testid="main-content">Main Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    const sidebarElement = container.querySelector('[data-variant="inset"]');
    expect(sidebarElement).toBeInTheDocument();
    expect(sidebarElement).toHaveAttribute('data-variant', 'inset');
  });

  it('deve ter collapsible="icon" configurado corretamente', () => {
    const { container } = render(
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <div data-testid="main-content">Main Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    const sidebarElement = container.querySelector('[data-collapsible="icon"]');
    expect(sidebarElement).toBeInTheDocument();
  });
});
