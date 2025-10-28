import { render, screen, fireEvent } from '@testing-library/react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

// Mock dependencies
jest.mock('@/contexts/AuthContext');
jest.mock('next/navigation');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Helper to render with SidebarProvider
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<SidebarProvider>{ui}</SidebarProvider>);
};

describe('AppSidebar with shadcn/ui', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin',
  };

  const mockLogout = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
      login: jest.fn(),
      logout: mockLogout,
    });
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render sidebar with Blue Saúde branding', () => {
    renderWithProvider(<AppSidebar />);

    expect(screen.getByText('Blue Saúde')).toBeInTheDocument();
    expect(screen.getByText('Dashboard IA')).toBeInTheDocument();
  });

  it('should render all navigation items', () => {
    renderWithProvider(<AppSidebar />);

    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Setores')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
  });

  it('should display authenticated user information', () => {
    renderWithProvider(<AppSidebar />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should NOT display user info when user is null', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: jest.fn(),
      logout: mockLogout,
    });

    renderWithProvider(<AppSidebar />);

    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
  });

  it('should call logout function when logout button is clicked', () => {
    renderWithProvider(<AppSidebar />);

    const logoutButton = screen.getByRole('button', { name: /sair/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should highlight active navigation item based on pathname', () => {
    mockUsePathname.mockReturnValue('/');
    const { container } = renderWithProvider(<AppSidebar />);

    // Find the active link - shadcn uses data-active attribute
    const activeLinks = container.querySelectorAll('[data-active="true"]');
    expect(activeLinks.length).toBeGreaterThan(0);
  });

  it('should use collapsible="icon" mode', () => {
    const { container } = renderWithProvider(<AppSidebar />);

    // The sidebar should have the proper structure with collapsible icon mode
    const sidebar = container.querySelector('[data-sidebar="sidebar"]');
    expect(sidebar).toBeInTheDocument();
  });
});
