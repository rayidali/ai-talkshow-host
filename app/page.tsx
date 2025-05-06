import { Conversation } from './components/Conversation';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', width: '100%', marginTop: '7vh' }}>
      <h1 className="main-heading" style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1.3rem', textAlign: 'center', color: '#fffbe9', lineHeight: 1.1 }}>
        AI Talk Show Host
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#fffbe9', marginBottom: '1.3rem', textAlign: 'center', maxWidth: '520px', fontWeight: 400, opacity: 0.95 }}>
        Vent or chat with an AI talk show host, just like you&apos;re on a podcast.
      </p>
      <div style={{ marginTop: '-0.7rem' }}>
        <Conversation />
      </div>
      <div style={{ height: '260px', width: '100%', transition: 'height 0.3s' }} />
    </div>
  );
}
