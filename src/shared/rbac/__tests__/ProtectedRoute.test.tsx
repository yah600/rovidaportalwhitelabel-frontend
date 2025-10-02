import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ProtectedRoute from '../ProtectedRoute';
import type { AccessRequirement } from '../useAuth';

const useAuthMock = vi.fn();

vi.mock('../useAuth', () => ({
  __esModule: true,
  default: () => useAuthMock(),
}));


describe('ProtectedRoute', () => {
  const renderWithRouter = (
    element: React.ReactElement,
    initialPath = '/private',
  ) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);

    act(() => {
      root.render(
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/auth/login" element={<div>login</div>} />
            <Route path="/" element={<div>home</div>} />
            <Route path="/private" element={element} />
          </Routes>
        </MemoryRouter>,
      );
    });

    return {
      container,
      cleanup: () => {
        act(() => {
          root.unmount();
        });
        container.remove();
      },
    };
  };

  const setAuthState = (state: {
    currentUser: unknown;
    canAccess?: (module: string, requirement?: AccessRequirement) => boolean;
    hasRole?: (role: unknown) => boolean;
  } & Record<string, unknown>) => {
    useAuthMock.mockReturnValue({
      canAccess: vi.fn().mockReturnValue(true),
      hasRole: vi.fn().mockReturnValue(true),
      can: vi.fn(),
      canRead: vi.fn(),
      canCreate: vi.fn(),
      canUpdate: vi.fn(),
      canDelete: vi.fn(),
      canApprove: vi.fn(),
      canExport: vi.fn(),
      canPerformSpecial: vi.fn(),
      ...state,
    });
  };

  beforeEach(() => {
    useAuthMock.mockReset();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('redirects unauthenticated users to the login route', () => {
    setAuthState({ currentUser: null });

    const { container, cleanup } = renderWithRouter(
      <ProtectedRoute module="Dashboard">
        <div>secret</div>
      </ProtectedRoute>,
    );

    expect(container.textContent).toContain('login');
    cleanup();
  });

  it('denies access when module permission is missing', () => {
    const canAccess = vi.fn().mockReturnValue(false);
    setAuthState({ currentUser: { id: 'usr', roles: [], name: 'Test', email: 't@example.com', onboarded: true }, canAccess });

    const { container, cleanup } = renderWithRouter(
      <ProtectedRoute module="Finance" redirectTo="/">
        <div>finance</div>
      </ProtectedRoute>,
    );

    expect(canAccess).toHaveBeenCalledWith('Finance', undefined);
    expect(container.textContent).toContain('home');
    cleanup();
  });

  it('renders children when user can access the module', () => {
    const canAccess = vi.fn().mockReturnValue(true);
    setAuthState({ currentUser: { id: 'usr', roles: [], name: 'Test', email: 't@example.com', onboarded: true }, canAccess });

    const { container, cleanup } = renderWithRouter(
      <ProtectedRoute module="Rules" requirement="create">
        <div>rules</div>
      </ProtectedRoute>,
    );

    expect(canAccess).toHaveBeenCalledWith('Rules', 'create');
    expect(container.textContent).toContain('rules');
    cleanup();
  });
});
