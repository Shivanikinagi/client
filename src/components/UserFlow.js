'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent } from '../ui/card'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl)
  return <primitive object={scene} />
}

const UserFlow = () => {
  const [step, setStep] = useState(1)
  const [parameters, setParameters] = useState({ size: '', material: '', layout: '' })
  const [blueprints, setBlueprints] = useState([])
  const [selectedBlueprint, setSelectedBlueprint] = useState(null)
  const [model3D, setModel3D] = useState(null)

  const handleParameterChange = (key, value) => {
    setParameters((prev) => ({ ...prev, [key]: value }))
  }

  const generateBlueprints = async () => {
    if (!parameters.size || !parameters.material || !parameters.layout) return
    // Mock blueprint data (Replace with API call)
    const mockBlueprints = [
      { id: 1, image: '/blueprint1.png', name: 'Blueprint 1' },
      { id: 2, image: '/blueprint2.png', name: 'Blueprint 2' },
      { id: 3, image: '/blueprint3.png', name: 'Blueprint 3' },
    ]
    setBlueprints(mockBlueprints)
    setStep(2)
  }

  const selectBlueprint = (blueprint) => {
    setSelectedBlueprint(blueprint)
    setStep(3)
  }

  const generate3DModel = async () => {
    if (!selectedBlueprint) return
    // Mock 3D Model (Replace with API call)
    setModel3D('/assets/3d/sample_model.glb')
    setStep(4)
  }

  return (
    <section id="user-flow" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">User Workflow</h2>
        <Card>
          <CardContent className="p-6">
            {/* Step 1: Input Parameters */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Step 1: Input Parameters</h3>
                <Input
                  placeholder="Size (sq ft)"
                  value={parameters.size}
                  onChange={(e) => handleParameterChange('size', e.target.value)}
                />
                <Select onValueChange={(value) => handleParameterChange('material', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="concrete">Concrete</SelectItem>
                    <SelectItem value="brick">Brick</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleParameterChange('layout', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open Plan</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={generateBlueprints}
                  disabled={!parameters.size || !parameters.material || !parameters.layout}>
                  Generate Blueprints
                </Button>
              </div>
            )}

            {/* Step 2: Choose a Blueprint */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Step 2: Choose a Blueprint</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {blueprints.map((blueprint) => (
                    <div
                      key={blueprint.id}
                      className="cursor-pointer border p-2 rounded-lg hover:shadow-lg transition"
                      onClick={() => selectBlueprint(blueprint)}>
                      <img src={blueprint.image} alt={blueprint.name} className="w-full h-auto" />
                      <p className="text-center mt-2 font-medium">{blueprint.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Generate 3D Model */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Step 3: Generate 3D Model</h3>
                <img
                  src={selectedBlueprint.image}
                  alt={selectedBlueprint.name}
                  className="w-full max-w-md mx-auto rounded-lg shadow-md"
                />
                <Button onClick={generate3DModel} className="block mx-auto">
                  Generate 3D Model
                </Button>
              </div>
            )}

            {/* Step 4: View 3D Model */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Step 4: View 3D Model</h3>
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
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default UserFlow
