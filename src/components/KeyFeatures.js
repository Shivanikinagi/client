import { Cpu, Palette, Zap, Maximize } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'AI-powered 2D-to-3D conversion',
    description: 'Transform your 2D plans into stunning 3D models with our advanced AI technology.',
  },
  {
    icon: Palette,
    title: 'Pre-trained models',
    description: 'Access a wide range of furniture, lighting, and materials to enhance your designs.',
  },
  {
    icon: Zap,
    title: 'Real-time 3D rendering',
    description: 'Experience smooth and responsive 3D rendering powered by Three.js.',
  },
  {
    icon: Maximize,
    title: 'Interactive model preview',
    description: 'Zoom, rotate, and explore your 3D models in real-time for a comprehensive view.',
  },
]

const KeyFeatures = () => {
  return (
    <section style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
          Key Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'box-shadow 0.3s ease-in-out',
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 6px 10px rgba(0,0,0,0.15)')}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)')}>
              <feature.icon style={{ width: '48px', height: '48px', color: '#2563EB', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '1rem', color: '#4A5568' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyFeatures
