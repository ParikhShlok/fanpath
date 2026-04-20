import { RouteRecommendation } from '../lib/types';

export default function RecommendationPanel({ recommendation, title }: { recommendation: RouteRecommendation; title?: string }) {
  return (
    <section
      aria-label={title || 'Smart pathing recommendation'}
      className="glass-panel animate-fade-up delay-2"
      style={{
        padding: '24px',
        margin: '16px 0',
        borderLeft: '4px solid var(--primary)',
        background: 'linear-gradient(145deg, rgba(18,22,38,0.8) 0%, rgba(10,14,24,0.9) 100%)',
      }}
    >
      <h3 style={{ marginBottom: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span aria-hidden="true">Path</span> {title || 'Smart Pathing'}
      </h3>

      <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--surface-border-bright)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{recommendation.reason}</p>
      </div>

      <div>
        <div style={{ fontWeight: '800', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Estimated Route Time</span>
          <span style={{ color: 'var(--accent-green)', background: 'var(--accent-green-glow)', padding: '4px 12px', borderRadius: '12px' }}>
            {recommendation.estimatedMinutes} mins
          </span>
        </div>

        <ol style={{ listStyleType: 'none', paddingLeft: 0, position: 'relative' }}>
          <span
            aria-hidden="true"
            style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: 'var(--surface-border-bright)' }}
          ></span>
          {recommendation.pathSummary.map((step, idx) => (
            <li
              key={idx}
              style={{
                padding: '12px 12px 12px 32px',
                position: 'relative',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: idx === recommendation.pathSummary.length - 1 ? 'var(--primary)' : 'var(--surface)',
                  border: '2px solid var(--primary)',
                }}
              ></span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
