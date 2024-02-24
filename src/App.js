import React, { useState } from 'react';
import './App.css';

function App() {
  const [idCodes, setIdCodes] = useState([]);
  const [randomID, setRandomID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIDCodes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000');
      if (!response.ok) {
        throw new Error('Failed to fetch ID codes');
      }
      const data = await response.json();
      setIdCodes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomID = () => {
    const randomIndex = Math.floor(Math.random() * idCodes.length);
    const randomID = idCodes[randomIndex];
    setRandomID(randomID);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservice Demo</h1>
        {isLoading && <p>Loading ID codes...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && idCodes.length === 0 && (
          <button onClick={fetchIDCodes}>Fetch ID Codes</button>
        )}
        {!isLoading && !error && idCodes.length > 0 && (
          <>
            <p>Random ID: {randomID}</p>
            <button onClick={getRandomID}>Get Random ID</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
