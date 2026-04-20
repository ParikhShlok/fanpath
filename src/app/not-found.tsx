import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-shell" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <div className="glass-panel" style={{ maxWidth: '420px', padding: '32px' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Route not found
        </p>
        <h1 className="title" style={{ marginBottom: '16px' }}>Let&apos;s get you back on path</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
          The page you requested does not exist. Return to the venue assistant home screen to continue navigation.
        </p>
        <Link
          href="/"
          className="clickable"
          style={{
            display: 'inline-block',
            background: 'var(--primary-gradient)',
            color: 'white',
            borderRadius: '12px',
            padding: '14px 18px',
            fontWeight: 700,
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
