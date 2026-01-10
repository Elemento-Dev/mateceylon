import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#040707',
          color: '#cd9f2b',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Something went wrong.</h1>
          <p style={{ fontFamily: 'Lato, sans-serif', maxWidth: '600px', marginBottom: '2rem', color: '#f4f4f4' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '0.9rem',
              fontWeight: '700',
              border: '1px solid #cd9f2b',
              backgroundColor: 'transparent',
              color: '#cd9f2b',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#cd9f2b';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#cd9f2b';
            }}
          >
            Refresh Page
          </button>
          
          {/* Optional: Show error details in development */}
          {import.meta.env.DEV && this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '2rem', textAlign: 'left', color: '#ff6b6b', maxWidth: '800px', overflow: 'auto' }}>
              <summary>Error Details</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
