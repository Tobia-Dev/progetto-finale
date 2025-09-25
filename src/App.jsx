import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';
import CryptoSearch from './components/CryptoSearch';
import NewsCard from './components/NewsCard';
import CryptoTable from './components/CryptoTable';




function App() {
  const [news, setNews] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  const handleSearch = (query) => {
    if (!query) {
      setDisplayedData(cryptoData);
      return;
    }

    const filtered = cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedData(filtered);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch 1: Cani
        const dogsResponse = await fetch("https://dog.ceo/api/breeds/image/random/6");
        const dogsData = await dogsResponse.json();
        setNews(dogsData.message);

        // Fetch 2: Crypto  
        const cryptoResponse = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h,24h,7d");
        const cryptoData = await cryptoResponse.json();

        setCryptoData(cryptoData);
        setDisplayedData(cryptoData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <Navbar left="Watchlist">
        Cryptob
      </Navbar>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">
          Utime Notizie
        </h1>
        <p className="single-line mt-2"></p>
        <div className="news-scroll mt-5">
          {news.map((item, index) => (
            <NewsCard key={index} url={item} title={item}></NewsCard>
          ))}
        </div>
      </div>
      <CryptoSearch onSearch={handleSearch} />
      <CryptoTable data={displayedData}></CryptoTable>
    </>
  );
}



export default App
