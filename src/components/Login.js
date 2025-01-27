import React, { useState } from "react";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "User", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/register"; // Dynamic endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert(isLogin ? "Login Successful!" : "Registration Successful!");
      if (isLogin) {
        window.location.href = formData.role === "Architect" ? "/architect-home" : "/user-home";
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to bottom right, #7f7fff, #bb7fff)" }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "24rem", borderRadius: "1.5rem" }}>
        <h1 className="text-center mb-4 text-dark">3D Model Generator</h1>
        <div className="d-flex justify-content-around mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`btn ${isLogin ? "btn-primary" : "btn-light"} w-50`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`btn ${!isLogin ? "btn-primary" : "btn-light"} w-50`}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your username"
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
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select name="role" className="form-select" onChange={handleChange}>
                <option>User</option>
                <option>Architect</option>
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-dark w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
