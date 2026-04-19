export default function MapCard({ recommendedZone }: { recommendedZone?: string }) {
  return (
    <div className="glass-panel animate-fade-up delay-1" style={{
      width: '100%',
      height: '280px',
      overflow: 'hidden',
      position: 'relative',
      margin: '20px 0',
      padding: '2px', // tiny border effect
      background: 'var(--primary-gradient)'
    }}>
      <div style={{ width: '100%', height: '100%', borderRadius: '18px', overflow: 'hidden', position: 'relative' }}>
         <iframe 
           width="100%" 
           height="100%" 
           style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(120%)' }} 
           loading="lazy" 
           allowFullScreen 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19846.1234!2d-0.281!3d51.556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761181d5cdab07%3A0x6bd7ed85f8121f14!2sWembley%20Stadium!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
         ></iframe>
         {recommendedZone && (
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--surface)',
              backdropFilter: 'blur(10px)',
              padding: '10px 20px',
              borderRadius: '20px',
              textAlign: 'center',
              fontWeight: 'bold',
              border: '1px solid var(--primary)',
              boxShadow: '0 8px 25px rgba(0,210,255,0.4)',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
               <span style={{ display: 'inline-block', width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
               Navigating to {recommendedZone}
            </div>
         )}
      </div>
    </div>
  );
}
