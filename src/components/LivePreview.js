import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/assets/3d/duck.glb')
  return <primitive object={scene} />
}

const LivePreview = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Live 3D Model Preview</h2>
        <div className="h-[400px] bg-white rounded-lg shadow-md overflow-hidden">
          <Canvas camera={{ position: [3, 3, 3], fov: 50 }} shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={0.5} intensity={1} />
            <Model />
            <OrbitControls enableZoom={true} />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default LivePreview
