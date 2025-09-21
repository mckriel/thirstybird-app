import { useState } from 'react'

function Auth() {
  const [is_login, set_is_login] = useState(true)
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')
  const [loading, set_loading] = useState(false)

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    set_loading(true)
    
    try {
      // TODO: Implement authentication logic
      console.log('Form submitted:', { email, password, is_login })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      set_loading(false)
    }
  }

  const toggle_auth_mode = () => {
    set_is_login(!is_login)
    set_email('')
    set_password('')
  }

  const handle_email_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_email(e.target.value)
  }

  const handle_password_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_password(e.target.value)
  }

  return (
    <div className="container safe-top safe-bottom">
      <div className="flex items-center justify-center min-h-screen">
        <div className="card max-w-md w-full animate-fade-in">
          <div className="card-header text-center">
            <h1 className="text-2xl font-bold mb-2">
              {is_login ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="card-description">
              {is_login 
                ? 'Sign in to access your account and deals' 
                : 'Join ThirstyBird to start saving on drinks'
              }
            </p>
          </div>
          
          <div className="card-content">
            <form className="space-y-4" onSubmit={handle_submit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email Address
                </label>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={handle_email_change}
                  className="input mobile-optimized focus-ring"
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={handle_password_change}
                  className="input mobile-optimized focus-ring"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-full focus-ring"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                    {is_login ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  is_login ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>
          </div>
          
          <div className="card-footer flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              {is_login ? "Don't have an account?" : "Already have an account?"}
            </div>
            <button 
              type="button"
              onClick={toggle_auth_mode}
              className="btn btn-outline w-full focus-ring"
              disabled={loading}
            >
              {is_login ? 'Create New Account' : 'Sign In Instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth