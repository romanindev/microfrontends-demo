import { Link, Outlet, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  cartCount?: number;
}

const linkStyle = (isActive: boolean): React.CSSProperties => ({
  textDecoration: 'none',
  color: isActive ? '#111' : '#555',
  fontWeight: isActive ? 700 : 500,
});

export default function MainLayout({ cartCount = 0 }: MainLayoutProps) {
  const location = useLocation();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <header
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #ddd',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ margin: 0 }}>Micro Frontends Demo</h1>
        <p style={{ margin: '8px 0 0', color: '#666' }}>
          Host shell application
        </p>
      </header>

      <nav
        style={{
          display: 'flex',
          gap: '16px',
          padding: '0 24px',
          marginBottom: '24px',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={linkStyle(location.pathname === '/')}>
          Home
        </Link>
        <Link
          to="/catalog"
          style={linkStyle(location.pathname.startsWith('/catalog'))}
        >
          Catalog
        </Link>
        <Link to="/cart" style={linkStyle(location.pathname.startsWith('/cart'))}>
          Cart ({cartCount})
        </Link>
      </nav>

      <main style={{ padding: '0 24px 32px' }}>
        <Outlet />
      </main>
    </div>
  );
}
