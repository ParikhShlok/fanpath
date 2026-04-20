import { mockAlerts } from '@/lib/mockData';
import AlertNotice from '@/components/AlertNotice';

export default function Updates() {
  return (
    <div className="animate-fade-up page-shell">
      <header style={{ marginBottom: '32px' }}>
        <h1 className="title">Live Updates</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>Sourced from venue operations.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {mockAlerts.length === 0 ? (
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>No active alerts. Have a great event!</p>
          </div>
        ) : (
          mockAlerts.map((alert) => <AlertNotice key={alert.id} alert={alert} />)
        )}
      </div>
    </div>
  );
}
