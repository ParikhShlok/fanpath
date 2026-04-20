import VenueMapCard from '@/components/VenueMapCard';
import RecommendationPanel from '@/components/RecommendationPanel';
import AlertNotice from '@/components/AlertNotice';
import { mockGates, mockAlerts, mockZones } from '@/lib/mockData';
import { getBestGate } from '@/lib/logic';
import { buildUserContextFromSearchParams, getHighestPriorityAlert } from '@/lib/venue';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = buildUserContextFromSearchParams(await searchParams);
  const bestGate = getBestGate(user, mockGates, mockZones);
  const activeAlert = getHighestPriorityAlert(mockAlerts);

  return (
    <div className="animate-fade-up page-shell">
      <header style={{ marginBottom: '24px' }}>
        <h1 className="title">StadiumFlow</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>
          Section {user.section} in the {user.currentZone} zone. {user.needsAccessibility ? 'Accessible routing is enabled.' : 'Standard venue routing is active.'}
        </p>
      </header>

      {activeAlert && <AlertNotice alert={activeAlert} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Entry Strategy</h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', background: 'rgba(0,210,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>
          Live Optimized
        </span>
      </div>

      <VenueMapCard recommendedZone={bestGate.to} />

      <RecommendationPanel recommendation={bestGate} title="Smart Routing" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }} className="animate-fade-up delay-3">
        <div className="glass-panel clickable" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Food Near You</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '12px', color: 'var(--text-primary)' }}>4m</div>
        </div>
        <div className="glass-panel clickable" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
          <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Merch Queue</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '12px', color: 'var(--accent-orange)' }}>20m</div>
        </div>
      </div>
    </div>
  );
}
