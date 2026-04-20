import Link from 'next/link';

export default function Profile() {
  return (
    <div className="animate-fade-up page-shell">
      <header style={{ marginBottom: '32px' }}>
        <h1 className="title">Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>Your active context and preferences</p>
      </header>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary)', borderBottom: '1px solid var(--surface-border-bright)', paddingBottom: '8px' }}>Active Match</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Section</span>
          <strong style={{ color: 'white', fontSize: '1.1rem' }}>101</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Assigned Zone</span>
          <strong style={{ color: 'white', fontSize: '1.1rem' }}>North</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Accessibility Mode</span>
          <strong style={{ color: 'white', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '8px' }}>Off</strong>
        </div>
      </div>

      <Link
        href="/"
        className="clickable"
        style={{
          width: '100%',
          display: 'inline-block',
          textAlign: 'center',
          background: 'rgba(255, 51, 102, 0.1)',
          color: 'var(--accent-red)',
          border: '1px solid var(--accent-red)',
          padding: '18px',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: '700',
          boxShadow: '0 4px 15px var(--accent-red-glow)',
          transition: 'all 0.2s',
        }}
      >
        Reset Context / Exit
      </Link>
    </div>
  );
}
