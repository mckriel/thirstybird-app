// src/pages/venue-login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VenueLogin() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: Replace with proper API call for venue authentication
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder authentication logic - replace with actual API call
      if (email) {
        setMessage('Check your email for the magic link!')
        // Simulate successful login after delay
        setTimeout(() => {
          navigate('/admin/payments')
        }, 3000)
      } else {
        throw new Error('Please enter your email')
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1>Venue Admin Sign‑In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your venue email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem' }}>
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  )
}

