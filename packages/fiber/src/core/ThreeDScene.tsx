// src/components/ThreeDScene.tsx
import React, { useEffect, useRef } from 'react'
import { useStore } from '../store' // Import the Zustand store
import * as THREE from 'three'

const ThreeDScene: React.FC = () => {
  const sceneRef = useRef<THREE.Scene | null>(null) // Reference to the div container for the scene
  const store = useStore() // Access the store

  useEffect(() => {
    const { gl, camera, scene } = store.get() // Access the state from the store
    if (sceneRef.current) {
      // Set up the WebGLRenderer
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      sceneRef.current.appendChild(renderer.domElement)

      // Animation loop to render the scene
      const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [store]) // Re-run the effect if the store changes

  return (
    <div ref={sceneRef} style={{ width: '100%', height: '100%' }}>
      3D Scene
    </div>
  )
}

export default ThreeDScene
