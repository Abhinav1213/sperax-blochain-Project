
import React, { useState, useEffect } from 'react';
import './CryptoTable.css';

export default function CryptoTable() {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));
      setCryptoData(dataWithIndex);
      setIsLoading(false);
    } catch (e) {
      setError('Failed to fetch crypto data. Please try again later.');
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="crypto-table-container">
      <h2>Top 50 Cryptocurrencies</h2>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.index}</td>
              <td className="coin-name">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                {coin.name}
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toFixed(2)}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

