'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="animate-fade-up" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 20px var(--primary-glow))' }}>🏟️</div>
         <h1 className="title" style={{ fontSize: '3rem', margin: '16px 0 8px 0' }}>StadiumFlow</h1>
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '300px', margin: '0 auto' }}>
           Intelligent routing & live updates to elevate your event experience.
         </p>
      </div>

      <form className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleStart}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>Your Section</label>
          <select style={{ 
            width: '100%', 
            padding: '16px', 
            borderRadius: '12px', 
            background: 'var(--background)', 
            color: 'white', 
            border: '1px solid var(--surface-border-bright)',
            fontSize: '1rem',
            outline: 'none',
            WebkitAppearance: 'none'
          }}>
            <option value="North">North Zone (Sec 100-150)</option>
            <option value="South">South Zone (Sec 200-250)</option>
            <option value="East">East Zone (Sec 300-350)</option>
            <option value="West">West Zone (Sec 400-450)</option>
          </select>
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>Preferences</label>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Accessible', 'VIP', 'Family'].map(p => (
                 <label key={p} style={{ 
                   display: 'flex', alignItems: 'center', gap: '6px', 
                   background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '20px',
                   border: '1px solid var(--surface-border)'
                 }}>
                    <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                    <span style={{ fontSize: '0.9rem' }}>{p}</span>
                 </label>
              ))}
           </div>
        </div>

        <button type="submit" className="clickable" style={{
          marginTop: '24px',
          background: 'var(--primary-gradient)',
          color: 'white',
          border: 'none',
          padding: '18px',
          borderRadius: '12px',
          fontSize: '1.2rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 8px 20px var(--primary-glow)',
          transition: 'all 0.2s'
        }}>
          Enter Venue
        </button>
      </form>
    </div>
  );
}
