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

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>From 2D to 3D – AI-Driven Home Design at Your Fingertips</h1>
      <div style={styles.buttonContainer}>
        <button style={{ ...styles.button, ...styles.primaryButton }}>Generate 3D Model from 2D Plan</button>
        <button style={{ ...styles.button, ...styles.secondaryButton }}>Upload Custom 2D Plan</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom, #f8f9fa, #2c3e50)',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    maxWidth: '700px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s ease-in-out',
  },
  primaryButton: {
    backgroundColor: 'black',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: 'black',
    border: '2px solid black',
  },
}

export default Home
