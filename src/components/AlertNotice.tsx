import { VenueAlert } from '../lib/types';

export default function AlertNotice({ alert }: { alert: VenueAlert }) {
  const colors = (() => {
    switch (alert.severity) {
      case 'high':
        return { bg: 'rgba(255, 51, 102, 0.15)', border: 'var(--accent-red)', glow: 'var(--accent-red-glow)', icon: 'Alert' };
      case 'medium':
        return { bg: 'rgba(255, 153, 0, 0.15)', border: 'var(--accent-orange)', glow: 'var(--accent-orange-glow)', icon: 'Warn' };
      default:
        return { bg: 'rgba(0, 210, 255, 0.15)', border: 'var(--primary)', glow: 'var(--primary-glow)', icon: 'Info' };
    }
  })();

  return (
    <section
      aria-live={alert.severity === 'high' ? 'assertive' : 'polite'}
      role={alert.severity === 'high' ? 'alert' : 'status'}
      className="animate-fade-up"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 15px ${colors.glow}`,
        padding: '16px',
        borderRadius: '16px',
        marginBottom: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div aria-hidden="true" style={{ fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.border, minWidth: '44px' }}>
        {colors.icon}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: colors.border, fontWeight: '700' }}>{alert.title}</h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>{alert.message}</p>
        {alert.suggestedAction && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              borderLeft: `2px solid ${colors.border}`,
            }}
          >
            <strong>Action:</strong> {alert.suggestedAction}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Zones: <span style={{ color: 'white' }}>{alert.affectedZones.join(', ')}</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
            {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </section>
  );
}
