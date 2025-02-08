import { FileInputIcon as Input, Palette, FileImage, CuboidIcon as Cube } from 'lucide-react'

const steps = [
  {
    icon: Input,
    title: 'Input Parameters',
    description: 'Users provide details like size, materials, and layout preferences.',
  },
  {
    icon: Palette,
    title: 'Generate Images',
    description: 'AI generates multiple design images based on user input.',
  },
  {
    icon: FileImage,
    title: 'Choose or Upload',
    description: 'Users select a generated image, or architects upload their own.',
  },
  {
    icon: Cube,
    title: '3D Model Generation',
    description: 'AI transforms the selected image into an interactive 3D model.',
  },
]

const HowItWorks = () => {
  return (
    <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
          How It Works
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}>
              <step.icon style={{ width: '40px', height: '40px', color: '#2563EB', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '1rem', color: '#4A5568' }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
