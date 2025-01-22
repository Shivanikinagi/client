import React, { useEffect } from 'react'
import * as THREE from 'three'

function ThreeRenderer({ modelPath }) {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const loader = new THREE.GLTFLoader()
    loader.load(modelPath, (gltf) => {
      scene.add(gltf.scene)
      camera.position.z = 5
      renderer.render(scene, camera)
    })
  }, [modelPath])

  return null
}

export default ThreeRenderer
