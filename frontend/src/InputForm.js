import React, { useState } from 'react'
import axios from 'axios'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import ThreeRenderer from './ThreeRenderer'

const InputForm = () => {
  const [userInput, setUserInput] = useState({})
  const [modelPath, setModelPath] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserInput({ ...userInput, [name]: value })
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:5000/generate-model', userInput)
      setModelPath(response.data.modelPath)
    } catch (error) {
      setError('Error generating model: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const load3DModel = (modelPath) => {
    const loader = new GLTFLoader()
    loader.load(modelPath, (gltf) => {
      scene.add(gltf.scene) // Add 3D model to the Three.js scene
    })
  }

  return (
    <div>
      <form>
        <label>
          Material:
          <input type="text" name="material" onChange={handleChange} />
        </label>
        <label>
          Size:
          <input type="text" name="size" onChange={handleChange} />
        </label>
        <button type="button" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate 3D Model'}
        </button>
      </form>

      {error && <p>{error}</p>}

      {modelPath && !loading && <ThreeRenderer modelPath={modelPath} />}
    </div>
  )
}

export default InputForm
