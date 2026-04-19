'use client';
import { useState } from 'react';
import AssistantPanel from '@/components/AssistantPanel';
import { mockQueues } from '@/lib/mockData';
import { getShortestQueue } from '@/lib/logic';

const categories = [
  { id: 'Concession', icon: '🍔', label: 'Food & Drink', desc: 'Find the fastest concession stand' },
  { id: 'Restroom', icon: '🚻', label: 'Restrooms', desc: 'Nearest open restroom queue' },
  { id: 'Merchandise', icon: '👕', label: 'Merchandise', desc: 'Official venue merchandise' }
] as const;

export default function Assistant() {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (type: 'Concession' | 'Restroom' | 'Merchandise') => {
    setActiveQuery(type);
    setIsLoading(true);
    setRecommendation(null);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: type,
          userContext: { section: 'North' },
          venueState: { time: new Date().toISOString() }
        })
      });
      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px 24px 100px 24px' }} className="animate-fade-up">
      <header style={{ marginBottom: '32px' }}>
        <h1 className="title">Smart Assistant</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '1.1rem' }}>Your context-aware venue guide.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {categories.map(cat => (
           <button 
             key={cat.id}
             onClick={() => handleQuery(cat.id)} 
             className="glass-panel clickable animate-fade-up"
             style={{ 
               padding: '20px', 
               textAlign: 'left', 
               border: activeQuery === cat.id ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
               boxShadow: activeQuery === cat.id ? '0 0 20px var(--primary-glow)' : 'none',
               color: 'white', 
               cursor: 'pointer', 
               display: 'flex',
               gap: '16px',
               alignItems: 'center'
             }}
           >
             <div style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>{cat.icon}</div>
             <div>
               <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{cat.label}</div>
               <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{cat.desc}</div>
             </div>
           </button>
        ))}
      </div>

      {isLoading && (
        <div className="animate-fade-up" style={{ textAlign: 'center', padding: '20px', color: 'var(--primary)', fontStyle: 'italic' }}>
           ✨ AI is analyzing venue traffic...
        </div>
      )}

      {recommendation && !isLoading && (
         <div className="animate-fade-up">
            <AssistantPanel recommendation={recommendation} title={`${activeQuery} Response`} />
         </div>
      )}
    </div>
  );
}
