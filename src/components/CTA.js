import { Button } from '@/components/ui/button'

const CTA = () => {
  return (
    <section
      style={{
        padding: '4rem 0',
        backgroundColor: '#1E40AF', // Adjust this to match your primary color
        color: 'white',
        textAlign: 'center',
      }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Ready to Transform Your Home Design?
        </h2>
        <Button size="lg" variant="secondary">
          Start Your 3D Design
        </Button>
      </div>
    </section>
  )
}

export default CTA
