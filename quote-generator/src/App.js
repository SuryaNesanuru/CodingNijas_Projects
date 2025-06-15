import React, { useState, useEffect } from 'react';
import './App.css';

const QuoteBox = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setFade(false);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      setTimeout(() => {
        setQuoteData(data);
        setFade(true);
        setLoading(false);
      }, 200); // short delay for animation effect
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const tweetUrl = quoteData
    ? `https://twitter.com/intent/tweet?text="${quoteData.quote}" - ${quoteData.author}`
    : '#';

  return (
    <div className="quote-container">
      <div className={`quote-card ${fade ? 'fade-in' : ''}`}>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <p className="quote">“{quoteData.quote}”</p>
            <p className="author">– {quoteData.author}</p>
          </>
        )}
        <div className="buttons">
          <button onClick={fetchQuote}>New Quote</button>
          <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
            <button className="tweet-btn">Tweet Quote</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <QuoteBox />
    </div>
  );
}
