import React, { useEffect } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

function ThreeRenderer({ modelPath }) {
  useEffect(() => {
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new window.THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new window.THREE.GLTFLoader();
    loader.load(modelPath, (gltf) => {
      scene.add(gltf.scene);
      camera.position.z = 5;
      renderer.render(scene, camera);
    });

    // Clean up on unmount
    return () => {
      renderer.dispose();
    };
  }, [modelPath]);

  return null;
}

export default ThreeRenderer;
