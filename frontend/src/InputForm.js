import React, { useState } from 'react';
import axios from 'axios';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ThreeRenderer from './ThreeRenderer';

const InputForm = () => {
  const [userInput, setUserInput] = useState({});
  const [modelPath, setModelPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/generate-model', userInput);

      if (response.data && response.data.modelPath) {
        setModelPath(response.data.modelPath);
      } else {
        setError('Model generation failed: Invalid server response.');
      }
    } catch (error) {
      setError(`Error generating model: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const load3DModel = (modelPath) => {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        // You can integrate this with the Three.js renderer
        console.log('3D model loaded successfully:', gltf.scene);
      },
      undefined,
      (error) => {
        setError(`Error loading 3D model: ${error.message}`);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Generate 3D Model</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Material:</label>
            <input
              type="text"
              name="material"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter material"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Size:</label>
            <input
              type="text"
              name="size"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter size"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md shadow-md text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Generating...' : 'Generate 3D Model'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-500">
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>

      {modelPath && !loading && (
        <div className="mt-8 w-full">
          <h2 className="text-center text-lg font-semibold">Rendered Model:</h2>
          <ThreeRenderer modelPath={modelPath} />
        </div>
      )}
    </div>
  );
};

export default InputForm;
