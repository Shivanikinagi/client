import React, { useState } from "react";

const Home = () => {
  const [inputs, setInputs] = useState({ material: "", size: "" });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/generate-blueprints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const data = await response.json();
    console.log(data.blueprints);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 text-primary">Input Parameters</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Material</label>
            <input
              type="text"
              name="material"
              className="form-control"
              placeholder="Enter material"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Size</label>
            <input
              type="text"
              name="size"
              className="form-control"
              placeholder="Enter size"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Generate Blueprints
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
