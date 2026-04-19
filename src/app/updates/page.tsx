import { mockAlerts } from '@/lib/mockData';
import AlertBanner from '@/components/AlertBanner';

export default function Updates() {
  return (
    <div style={{ padding: '24px 24px 100px 24px' }} className="animate-fade-up">
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
          mockAlerts.map(alert => <AlertBanner key={alert.id} alert={alert} />)
        )}
      </div>
    </div>
  );
}
