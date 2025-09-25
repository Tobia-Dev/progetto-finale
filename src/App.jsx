import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';
import CryptoSearch from './components/CryptoSearch';
import NewsCard from './components/NewsCard';
import CryptoTable from './components/CryptoTable';
import { Routes, Route } from "react-router-dom";
import CryptoDetails from './components/CryptoDetails';
import Footer from './components/Footer';



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
        const newsResponse = await fetch("https://newsdata.io/api/1/news?apikey=pub_1b2fef66d42a4dbcbf2f8e6911ef66df&q=crypto&language=en");
        const newsData = await newsResponse.json();
        setNews(newsData.results.slice(0, 6));

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="min-h-screen">
                <div className="p-5">
                  <h1 className="text-2xl font-semibold">
                    Utime Notizie
                  </h1>
                  <p className="single-line mt-2"></p>
                  <div className="news-scroll mt-5 w-11/12 mx-auto">
                    {news.map((item, index) => (
                      <NewsCard key={index} 
                        url={item.link}
                        title={item.title}
                        image={item.image_url} ></NewsCard>
                    ))}
                  </div>
                </div>
                <CryptoSearch onSearch={handleSearch} />
                <CryptoTable data={displayedData}></CryptoTable>
              </div>
            </>
          }
        />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}



export default App
