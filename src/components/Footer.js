import { Link } from 'react-router-dom' // ✅ Correct for React projects

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1A202C',
        color: 'white',
        padding: '3rem 0',
      }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
        }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>About Us</h3>
            <p style={{ color: '#A0AEC0' }}>
              We're revolutionizing home design with AI-powered 2D to 3D conversion technology.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'Features', 'Pricing', 'Contact'].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    href="#"
                    style={{
                      color: '#A0AEC0',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.color = 'white')}
                    onMouseOut={(e) => (e.target.style.color = '#A0AEC0')}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Legal</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    href="#"
                    style={{
                      color: '#A0AEC0',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.color = 'white')}
                    onMouseOut={(e) => (e.target.style.color = '#A0AEC0')}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Connect With Us</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: '#A0AEC0',
                    transition: 'color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.color = 'white')}
                  onMouseOut={(e) => (e.target.style.color = '#A0AEC0')}>
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #2D3748',
            textAlign: 'center',
            color: '#A0AEC0',
          }}>
          <p>&copy; {new Date().getFullYear()} AI-Driven 3D Home Designer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
