'use client';

import { useState } from 'react';
import RecommendationPanel from '@/components/RecommendationPanel';
import { AssistantQuery, RouteRecommendation } from '@/lib/types';

const categories = [
  { id: 'Concession', icon: 'Food', label: 'Food & Drink', desc: 'Find the fastest concession stand' },
  { id: 'Restroom', icon: 'Rest', label: 'Restrooms', desc: 'Nearest open restroom queue' },
  { id: 'Merchandise', icon: 'Shop', label: 'Merchandise', desc: 'Official venue merchandise' },
] as const;

export default function Assistant() {
  const [recommendation, setRecommendation] = useState<RouteRecommendation | null>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleQuery = async (type: AssistantQuery) => {
    setActiveQuery(type);
    setIsLoading(true);
    setRecommendation(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: type,
          userContext: { section: '101' },
          venueState: { time: new Date().toISOString() },
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRecommendation(data.recommendation);
      } else {
        setErrorMessage(data.error || 'Unable to load a recommendation right now.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Network error while contacting the assistant.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-up page-shell">
      <header style={{ marginBottom: '32px' }}>
        <h1 className="title">Smart Assistant</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>Your context-aware venue guide.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleQuery(category.id)}
            disabled={isLoading}
            className="glass-panel clickable animate-fade-up"
            aria-pressed={activeQuery === category.id}
            style={{
              padding: '20px',
              textAlign: 'left',
              border: activeQuery === category.id ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
              boxShadow: activeQuery === category.id ? '0 0 20px var(--primary-glow)' : 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              opacity: isLoading && activeQuery !== category.id ? 0.7 : 1,
            }}
          >
            <div aria-hidden="true" style={{ fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {category.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{category.label}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{category.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {isLoading && (
        <div aria-live="polite" className="animate-fade-up" style={{ textAlign: 'center', padding: '20px', color: 'var(--primary)', fontStyle: 'italic' }}>
          AI is analyzing venue traffic...
        </div>
      )}

      {errorMessage && !isLoading && (
        <div role="alert" className="glass-panel" style={{ padding: '18px', color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}>
          {errorMessage}
        </div>
      )}

      {recommendation && !isLoading && (
        <div className="animate-fade-up">
          <RecommendationPanel recommendation={recommendation} title={`${activeQuery} Response`} />
        </div>
      )}
    </div>
  );
}
