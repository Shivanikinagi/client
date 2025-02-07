import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // Handle form input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isLogin ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/register/'

    try {
      console.log('Submitting:', formData)
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      console.log('Headers:', response.headers.get('content-type'))

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Response Data:', data)
      setMessage(data.message || 'Success!')

      if (isLogin) {
        alert('Login Successful!')
        navigate('/home')
      } else {
        alert('Registration Successful!')
        setIsLogin(true)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Check the console.')
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: 'linear-gradient(to bottom right, #7f7fff, #bb7fff)' }}>
      <div className="card p-4 shadow-lg" style={{ width: '24rem', borderRadius: '1.5rem' }}>
        <h1 className="text-center mb-4 text-dark">3D Model Generator</h1>
        <div className="d-flex justify-content-around mb-4">
          <button onClick={() => setIsLogin(true)} className={`btn ${isLogin ? 'btn-primary' : 'btn-light'} w-50`}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className={`btn ${!isLogin ? 'btn-primary' : 'btn-light'} w-50`}>
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
                value={formData.name}
                required
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
              value={formData.email}
              required
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
              value={formData.password}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-3">{message}</p>
      </div>
    </div>
  )
}

export default AuthForm
