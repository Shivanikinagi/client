import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const ArchitectFlow = () => {
  const [blueprint, setBlueprint] = useState(null)
  const [model3D, setModel3D] = useState(null)

  const handleBlueprintUpload = (event) => {
    const file = event.target.files[0]
    if (file && (file.type === 'image/svg+xml' || file.name.endsWith('.dxf'))) {
      setBlueprint(file)
    } else {
      alert('Please upload a valid SVG or DXF file.')
    }
  }

  const generate3DModel = async () => {
    // Simulating 3D model generation
    setModel3D(true)
  }

  return (
    <section style={{ padding: '40px', background: '#f9f9f9', textAlign: 'center' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Architect Workflow</h2>
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Upload Blueprint</h3>
        <input type="file" accept=".svg,.dxf" onChange={handleBlueprintUpload} style={{ marginBottom: '15px' }} />
        {blueprint && (
          <div>
            <p style={{ marginBottom: '10px' }}>File uploaded: {blueprint.name}</p>
            <button
              onClick={generate3DModel}
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Generate 3D Model
            </button>
          </div>
        )}
        {model3D && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Generated 3D Model</h3>
            <div style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
              <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="skyblue" />
                </mesh>
                <OrbitControls />
              </Canvas>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ArchitectFlow
