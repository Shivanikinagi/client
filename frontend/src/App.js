import React, { useState } from 'react';
import ThreeRenderer from './ThreeRenderer'; // Assuming ThreeRenderer is in the same directory
import InputForm from './InputForm';
import './App.css';

function App() {
  // State to hold the model URL or any other necessary parameter
  const [modelPath, setModelPath] = useState('');

  // Handle the form submission or input change
  const handleModelPathChange = (path) => {
    setModelPath(path); // Set the path for the model to be loaded in Three.js
  };

  return (
    <div className="App">
      <h1>DreamHome 3D Model Generator</h1>

      {/* InputForm will accept a model URL or path */}
      <InputForm onModelPathChange={handleModelPathChange} />

      {/* ThreeRenderer component will render the 3D model */}
      {modelPath && <ThreeRenderer modelPath={modelPath} />}
    </div>
  );
}

export default App;
