import React, { useState } from "react";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://127.0.0.1:5000/login" : "http://127.0.0.1:5000/register"; // Dynamic endpoint

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json(); // Parse the response as JSON
      if (data.message === "Registration successful" || data.message === "Login successful") {
        alert(isLogin ? "Login Successful!" : "Registration Successful!");
        if (isLogin) {
          window.location.href = "/user-home"; // Redirect after successful login
        }
      } else {
        alert(data.message); // Show failure message from backend (e.g., "User already registered")
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to bottom right, #7f7fff, #bb7fff)" }}>
      <div className="card p-4 shadow-lg" style={{ width: "24rem", borderRadius: "1.5rem" }}>
        <h1 className="text-center mb-4 text-dark">3D Model Generator</h1>
        <div className="d-flex justify-content-around mb-4">
          <button onClick={() => setIsLogin(true)} className={`btn ${isLogin ? "btn-primary" : "btn-light"} w-50`}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className={`btn ${!isLogin ? "btn-primary" : "btn-light"} w-50`}>
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
