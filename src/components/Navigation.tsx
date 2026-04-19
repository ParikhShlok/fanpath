import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="glass-panel animate-fade-up delay-4" style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '400px',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 24px',
      zIndex: 1000,
      borderRadius: '30px'
    }}>
      <Link href="/dashboard" style={navItemStyle} className="nav-link">
        <span style={iconStyle}>🏟️</span>
        <span>Map</span>
      </Link>
      <Link href="/assistant" style={navItemStyle} className="nav-link">
        <span style={iconStyle}>🤖</span>
        <span>Guide</span>
      </Link>
      <Link href="/updates" style={navItemStyle} className="nav-link">
        <span style={iconStyle}>🔴</span>
        <span>Alerts</span>
      </Link>
      <Link href="/profile" style={navItemStyle} className="nav-link">
        <span style={iconStyle}>⚙️</span>
        <span>Settings</span>
      </Link>
    </nav>
  );
}

const navItemStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  color: 'var(--text-secondary)',
  fontSize: '0.75rem',
  fontWeight: 600,
  gap: '6px',
  transition: 'all 0.2s ease',
  position: 'relative' as const
};

const iconStyle = {
  fontSize: '1.4rem',
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
};
