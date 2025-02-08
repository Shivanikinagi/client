import React from 'react'

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
        <h2
          style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
          }}>
          Ready to Transform Your Home Design?
        </h2>

        {/* Button is defined here directly instead of importing */}
        <button
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3B82F6',
            color: 'white',
            borderRadius: '8px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => alert('Start Designing!')}>
          Start Your 3D Design
        </button>
      </div>
    </section>
  )
}

export default CTA
