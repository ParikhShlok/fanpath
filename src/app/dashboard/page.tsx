import MapCard from '@/components/MapCard';
import AssistantPanel from '@/components/AssistantPanel';
import AlertBanner from '@/components/AlertBanner';
import { mockGates, mockAlerts, mockZones } from '@/lib/mockData';
import { getBestGate } from '@/lib/logic';
import { UserContext } from '@/lib/types';

export default function Dashboard() {
  const user: UserContext = { section: '101', preferredZone: 'North' as any, needsAccessibility: false, currentZone: 'North', preferences: [] };
  const bestGate = getBestGate(user, mockGates, mockZones);
  
  // Find highest severity alert for the dashboard preview
  const activeAlert = mockAlerts.sort((a, b) => {
    const sMap = { high: 3, medium: 2, low: 1 };
    return sMap[b.severity] - sMap[a.severity];
  })[0];

  return (
    <div style={{ padding: '24px 24px 100px 24px' }} className="animate-fade-up">
      <header style={{ marginBottom: '24px' }}>
        <h1 className="title">StadiumFlow</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>Welcome to the main event.</p>
      </header>

      {activeAlert && <AlertBanner alert={activeAlert} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', marginBottom: '12px' }}>
         <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Entry Strategy</h2>
         <span style={{ fontSize: '0.85rem', color: 'var(--primary)', background: 'rgba(0,210,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>Live Optimized</span>
      </div>
      
      <MapCard recommendedZone={bestGate.to} />
      
      <AssistantPanel recommendation={bestGate} title="Smart Routing" />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }} className="animate-fade-up delay-3">
         <div className="glass-panel clickable" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Food Near You</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '12px', color: 'var(--text-primary)' }}>🍔 4m</div>
         </div>
         <div className="glass-panel clickable" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Merch Queue</h3>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '12px', color: 'var(--accent-orange)' }}>👕 20m</div>
         </div>
      </div>
    </div>
  );
}
