/*import React, { useState } from "react";
import ModelViewer from "./ModelViewer"; // Import ModelViewer

const Home = () => {
  const [inputs, setInputs] = useState({ material: "", size: "" });
  const [modelUrl, setModelUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(false); // To manage user authentication state
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (data.message === "Registration successful") {
        setAuth(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (data.message === "Login successful") {
        setAuth(true); // Set auth to true on successful login
      } else {
        setLoginError(data.message);
      }
    } catch (err) {
      setLoginError("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle 3D model generation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/generate-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (data.status === "success") {
        setModelUrl(data.modelPath); // URL of the generated model
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to generate model.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 text-primary">User Authentication</h2>

        {/* Registration Form }
        {!auth ? (
          <form onSubmit={handleRegister}>
            <h3>Register</h3>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Generate 3D Model</h3>
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
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Generating..." : "Generate Model"}
            </button>
          </form>
        )}
        {error && <p className="text-danger">{error}</p>}
        {loginError && <p className="text-danger">{loginError}</p>}
        {modelUrl && (
          <div className="mt-4">
            <h3>3D Model:</h3>
            <ModelViewer modelUrl={modelUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
*/
import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import KeyFeatures from '../components/KeyFeatures'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <Footer />
    </div>
  )
}

export default Home
