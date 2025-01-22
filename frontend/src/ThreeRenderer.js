import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ThreeRenderer = ({ modelPath }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!modelPath) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add light
    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    // Load the 3D model
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      (gltf) => {
        scene.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error)
      },
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      // Cleanup on component unmount
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }
    }
  }, [modelPath])

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />
}

export default ThreeRenderer
