import React, { useState } from 'react'

const InputForm = ({ onGenerate }) => {
  const [inputs, setInputs] = useState({
    material: '',
    size: '',
    color: '',
    style: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(inputs) // Pass the input data to the parent component
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Material:
        <select name="material" value={inputs.material} onChange={handleChange}>
          <option value="">Select Material</option>
          <option value="wood">Wood</option>
          <option value="metal">Metal</option>
          <option value="plastic">Plastic</option>
        </select>
      </label>
      <br />

      <label>
        Size:
        <select name="size" value={inputs.size} onChange={handleChange}>
          <option value="">Select Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
      <br />

      <label>
        Color:
        <input type="text" name="color" value={inputs.color} onChange={handleChange} placeholder="Enter color" />
      </label>
      <br />

      <label>
        Style:
        <input type="text" name="style" value={inputs.style} onChange={handleChange} placeholder="Enter style" />
      </label>
      <br />

      <button type="submit">Generate</button>
    </form>
  )
}

export default InputForm
