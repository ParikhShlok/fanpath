'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="glass-panel animate-fade-up delay-4"
      style={{
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
        borderRadius: '30px',
      }}
    >
      <Link href="/dashboard" style={getNavItemStyle(pathname === '/dashboard')} className="nav-link" aria-current={pathname === '/dashboard' ? 'page' : undefined}>
        <span style={iconStyle} aria-hidden="true">Map</span>
        <span>Gate</span>
      </Link>
      <Link href="/assistant" style={getNavItemStyle(pathname === '/assistant')} className="nav-link" aria-current={pathname === '/assistant' ? 'page' : undefined}>
        <span style={iconStyle} aria-hidden="true">AI</span>
        <span>Guide</span>
      </Link>
      <Link href="/updates" style={getNavItemStyle(pathname === '/updates')} className="nav-link" aria-current={pathname === '/updates' ? 'page' : undefined}>
        <span style={iconStyle} aria-hidden="true">Live</span>
        <span>Alerts</span>
      </Link>
      <Link href="/profile" style={getNavItemStyle(pathname === '/profile')} className="nav-link" aria-current={pathname === '/profile' ? 'page' : undefined}>
        <span style={iconStyle} aria-hidden="true">You</span>
        <span>Settings</span>
      </Link>
    </nav>
  );
}

function getNavItemStyle(isActive: boolean) {
  return {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    fontSize: '0.75rem',
    fontWeight: 600,
    gap: '6px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    textShadow: isActive ? '0 0 12px var(--primary-glow)' : 'none',
  };
}

const iconStyle = {
  fontSize: '1rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
};
