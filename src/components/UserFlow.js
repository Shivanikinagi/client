'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import axios from 'axios'

function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl)
  return <primitive object={scene} />
}

const UserFlow = () => {
  const [step, setStep] = useState(1)
  const [parameters, setParameters] = useState({ size: '', material: '', layout: '' })
  const [generatedImage, setGeneratedImage] = useState(null)
  const [model3D, setModel3D] = useState(null)

  const handleParameterChange = (key, value) => {
    setParameters((prev) => ({ ...prev, [key]: value }))
  }

  const generateImage = async () => {
    if (!parameters.size || !parameters.material || !parameters.layout) return

    try {
      const response = await axios.post('/api/generate-image', {
        prompt: `A ${parameters.layout} house made of ${parameters.material}, covering ${parameters.size} sq ft.`,
      })
      setGeneratedImage(response.data.image_url)
      setStep(2)
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  const generate3DModel = async () => {
    if (!generatedImage) return
    setModel3D('/assets/3d/sample_model.glb')
    setStep(3)
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">User Workflow</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Step 1: Input Parameters */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Step 1: Input Parameters</h3>
              <input
                type="text"
                placeholder="Size (sq ft)"
                value={parameters.size}
                onChange={(e) => handleParameterChange('size', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => handleParameterChange('material', e.target.value)}>
                <option value="">Select material</option>
                <option value="wood">Wood</option>
                <option value="concrete">Concrete</option>
                <option value="brick">Brick</option>
              </select>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => handleParameterChange('layout', e.target.value)}>
                <option value="">Select layout</option>
                <option value="open">Open Plan</option>
                <option value="traditional">Traditional</option>
                <option value="minimalist">Minimalist</option>
              </select>
              <button
                onClick={generateImage}
                disabled={!parameters.size || !parameters.material || !parameters.layout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-300">
                Generate Image
              </button>
            </div>
          )}

          {/* Step 2: Display Generated Image */}
          {step === 2 && generatedImage && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Step 2: Generated Image</h3>
              <img
                src={generatedImage}
                alt="Generated Visualization"
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={generate3DModel}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Generate 3D Model
              </button>
            </div>
          )}

          {/* Step 3: View 3D Model */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Step 3: View 3D Model</h3>
              <div className="w-full h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
                <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                  <spotLight position={[10, 10, 10]} angle={0.2} penumbra={0.5} intensity={1} />
                  {model3D ? (
                    <Model modelUrl={model3D} />
                  ) : (
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color="hotpink" />
                    </mesh>
                  )}
                  <OrbitControls enableZoom />
                </Canvas>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserFlow
