import { useState, useEffect } from 'react'

interface Deal {
  id: string
  title: string
  description: string
  original_price: string
  deal_price: string
  savings_amount: string
  savings_percentage: number
  venue_name: string
  venue_city: string
  venue_address: string
  vouchers_remaining: string
}

interface DealsResponse {
  deals: Deal[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

function Deals() {
  const [deals, set_deals] = useState<Deal[]>([])
  const [loading, set_loading] = useState(true)
  const [error, set_error] = useState<string | null>(null)

  const fetch_deals = async () => {
    try {
      set_loading(true)
      set_error(null)
      
      const response = await fetch('/api/deals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: DealsResponse = await response.json()
      set_deals(data.deals)
    } catch (err) {
      set_error(err instanceof Error ? err.message : 'Failed to fetch deals')
    } finally {
      set_loading(false)
    }
  }

  useEffect(() => {
    fetch_deals()
  }, [])

  const format_price = (price: string) => {
    return `R${parseFloat(price).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="container safe-top safe-bottom">
        <div className="flex flex-col items-center justify-center min-h-64 animate-fade-in">
          <div className="skeleton h-8 w-48 mb-4"></div>
          <div className="deals-grid w-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="deal-card">
                <div className="card-header">
                  <div className="skeleton h-4 w-full mb-2"></div>
                  <div className="skeleton h-3 w-3/4"></div>
                </div>
                <div className="card-content">
                  <div className="skeleton h-3 w-full mb-2"></div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="skeleton h-3 w-16"></div>
                    <div className="skeleton h-6 w-20"></div>
                  </div>
                  <div className="skeleton h-3 w-2/3"></div>
                </div>
                <div className="card-footer">
                  <div className="skeleton h-10 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container safe-top safe-bottom">
        <div className="max-w-md mx-auto mt-8">
          <div className="card border-destructive/50 bg-destructive/5">
            <div className="card-content text-center">
              <h2 className="card-title text-destructive mb-2">Unable to Load Deals</h2>
              <p className="card-description text-destructive/80 mb-4">{error}</p>
              <button 
                onClick={fetch_deals}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container safe-top safe-bottom animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-balance mb-2">Available Deals</h1>
        <p className="text-muted-foreground text-balance">
          Discover amazing drink deals at venues near you
        </p>
      </div>
      
      {deals.length === 0 ? (
        <div className="text-center py-12">
          <div className="card max-w-md mx-auto">
            <div className="card-content text-center">
              <h3 className="card-title mb-2">No Deals Available</h3>
              <p className="card-description">
                Check back later for new deals and offers.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="deals-grid animate-slide-up">
          {deals.map((deal, index) => (
            <div 
              key={deal.id} 
              className="deal-card"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Deal Header */}
              <div className="card-header pb-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title text-balance flex-1">
                    {deal.title}
                  </h3>
                  <div className="deal-card-badge deal-card-badge-success flex-shrink-0">
                    {deal.savings_percentage}% OFF
                  </div>
                </div>
              </div>
              
              {/* Deal Content */}
              <div className="card-content space-y-4">
                <p className="card-description line-clamp-2">
                  {deal.description}
                </p>
                
                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Original:</span>
                    <span className="price-original">
                      {format_price(deal.original_price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Deal Price:</span>
                    <span className="price-deal">
                      {format_price(deal.deal_price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent">You Save:</span>
                    <span className="price-savings">
                      {format_price(deal.savings_amount)}
                    </span>
                  </div>
                </div>
                
                {/* Venue Information */}
                <div className="border-t pt-4 space-y-1" style={{ borderColor: 'hsl(var(--color-border))' }}>
                  <div className="font-medium text-sm">
                    {deal.venue_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {deal.venue_city}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deal.venue_address}
                  </div>
                  <div className="text-xs text-muted-foreground pt-1">
                    {deal.vouchers_remaining} vouchers remaining
                  </div>
                </div>
              </div>
              
              {/* Deal Footer */}
              <div className="card-footer">
                <button className="btn btn-primary w-full focus-ring">
                  Buy Voucher
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Deals