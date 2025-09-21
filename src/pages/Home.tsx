import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  
  const handle_browse_deals = () => {
    navigate('/deals')
  }

  return (
    <div className="container safe-top safe-bottom animate-fade-in">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-balance mb-4">
            Welcome to ThirstyBird
          </h1>
          <p className="text-muted-foreground text-balance text-lg">
            Discover amazing drink deals at venues near you
          </p>
        </div>

        {/* CTA Card */}
        <div className="card max-w-md w-full animate-slide-up">
          <div className="card-header">
            <h2 className="card-title">Find Great Deals</h2>
            <p className="card-description">
              Browse exclusive vouchers and save money on your favorite drinks at local venues.
            </p>
          </div>
          <div className="card-footer">
            <button 
              className="btn btn-primary w-full focus-ring"
              onClick={handle_browse_deals}
            >
              Browse Deals
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-4xl">
          <div className="card text-center">
            <div className="card-content">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-accent rounded"></div>
              </div>
              <h3 className="font-medium mb-2">Great Savings</h3>
              <p className="text-sm text-muted-foreground">
                Save up to 50% on drinks at your favorite venues
              </p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-content">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <h3 className="font-medium mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Buy vouchers instantly and redeem with QR codes
              </p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-content">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-warning rounded"></div>
              </div>
              <h3 className="font-medium mb-2">Local Venues</h3>
              <p className="text-sm text-muted-foreground">
                Support local businesses while saving money
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home