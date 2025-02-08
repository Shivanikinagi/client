import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}>
        <img
          src="https://imgs.search.brave.com/rFZNIGM6M67bscfC_3acliCV7jKS-ECVs0kw6JOen_k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzgzLzU0Lzk0/LzM2MF9GXzI4MzU0/OTQ0NF9RSlA3NEtS/T3BiY3ZzQnZvaFlT/U0p4VmZGSWNxcjVP/OC5qcGc"
          alt="3D Home Design"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'black',
            opacity: 0.5,
          }}></div>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: 'white',
        }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}>
          AI-Powered 3D Home Design
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
          }}>
          Generate images and transform into interactive 3D models with ease
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link
            to="/user-flow"
            style={{
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563EB',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
            }}>
            For Users
          </Link>
          <Link
            to="/architect-flow"
            style={{
              fontSize: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              cursor: 'pointer',
            }}>
            For Architects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
