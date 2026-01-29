import { useState } from 'react'
import './App.css'

// Mock weather data - This is our static database
const weatherDatabase = {
  london: {
    city: 'London',
    temperature: 18,
    condition: 'Cloudy',
    icon: '☁️'
  },
  newyork: {
    city: 'New York',
    temperature: 22,
    condition: 'Sunny',
    icon: '☀️'
  },
  tokyo: {
    city: 'Tokyo',
    temperature: 20,
    condition: 'Rainy',
    icon: '🌧️'
  },
  paris: {
    city: 'Paris',
    temperature: 16,
    condition: 'Cloudy',
    icon: '☁️'
  },
  sydney: {
    city: 'Sydney',
    temperature: 28,
    condition: 'Sunny',
    icon: '☀️'
  },
  moscow: {
    city: 'Moscow',
    temperature: 5,
    condition: 'Snowy',
    icon: '❄️'
  },
  dubai: {
    city: 'Dubai',
    temperature: 32,
    condition: 'Sunny',
    icon: '☀️'
  },
  toronto: {
    city: 'Toronto',
    temperature: 8,
    condition: 'Cloudy',
    icon: '☁️'
  },
  berlin: {
    city: 'Berlin',
    temperature: 12,
    condition: 'Rainy',
    icon: '🌧️'
  },
  singapore: {
    city: 'Singapore',
    temperature: 30,
    condition: 'Thunderstorm',
    icon: '⛈️'
  }
}

function App() {
  // State for the input field
  const [cityInput, setCityInput] = useState('')
  
  // State to store the weather result
  const [weatherResult, setWeatherResult] = useState(null)
  
  // State to track if we've searched and found nothing
  const [notFound, setNotFound] = useState(false)

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault()
    
    // Convert input to lowercase and remove spaces to match our database keys
    const searchKey = cityInput.toLowerCase().replace(/\s+/g, '')
    
    // Check if the city exists in our mock data
    if (weatherDatabase[searchKey]) {
      setWeatherResult(weatherDatabase[searchKey])
      setNotFound(false)
    } else {
      // City not found
      setWeatherResult(null)
      setNotFound(true)
    }
    
    // Clear the input field after search
    setCityInput('')
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🌤️ Weather App</h1>
        <p className="subtitle">Find weather information for any city</p>
      </header>

      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name (e.g., London, New York, Tokyo)"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Weather Display - Shows when a city is found */}
      {weatherResult && (
        <div className="weather-card">
          <div className="weather-icon">{weatherResult.icon}</div>
          <h2 className="city-name">{weatherResult.city}</h2>
          <div className="temperature">
            <span className="temp-value">{weatherResult.temperature}</span>
            <span className="temp-unit">°C</span>
          </div>
          <p className="condition">{weatherResult.condition}</p>
        </div>
      )}

      {/* Error Message - Shows when city is not found */}
      {notFound && (
        <div className="error-message">
          <p>❌ City not found! Please try another city.</p>
          <p className="available-cities">
            <strong>Available cities:</strong> London, New York, Tokyo, Paris, Sydney, Moscow, Dubai, Toronto, Berlin, Singapore
          </p>
        </div>
      )}

      {/* Welcome Message - Shows on initial load */}
      {!weatherResult && !notFound && (
        <div className="welcome-message">
          <p>👋 Welcome! Start by searching for a city to see its weather.</p>
        </div>
      )}
    </div>
  )
}

export default App