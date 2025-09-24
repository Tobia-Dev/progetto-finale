import { useEffect, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';




function App() {
  const [news, setNews] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);

function formatLargeNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num;
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


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

        console.log(cryptoData);
        setCryptoData(cryptoData);

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
            <a
              key={index}
              href={item || "#"}
              target="_blank"
              rel="noopener noreferrer" >
              <div
                key={index}
                className="notizia"
                style={{
                  backgroundImage: `url(${item || 'https://media.gettyimages.com/id/1434149985/it/foto/concetto-criptovaluta-sulle-banconote.jpg?s=612x612&w=0&k=20&c=JtEp7r4QbpaaUH_2cLC00H_bDpw4ELYaGykUGIlXQCo='})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3 className="titolo text-xl">{item}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="cryptoContainer overflow-x-auto w-11/12 mx-auto">
        <table className=" border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Nome</th>
              <th className="p-3 text-right">Prezzo</th>
              <th className="p-3 text-right hidden md:table-cell">Variazione 1h</th>
              <th className="p-3 text-right hidden md:table-cell">Variazione 24h</th>
              <th className="p-3 text-right hidden md:table-cell">Variazione 7d</th>
              <th className="p-3 text-right hidden lg:table-cell">Volume 24h</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key = {index++} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 ">{index+1}</td>
                <td className="p-3 text-left"><a className="flex items-center gap-2" href=""><img src={crypto.image} alt={crypto.id} width="25" height="25" className="as" /><span className='font-bold'>{capitalizeFirstLetter(crypto.id)}</span><span className='font-light text-gray-700'>{crypto.symbol}</span></a></td>
                <td className="p-3 text-right"><b>${crypto.current_price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</b></td>
                <td className={`p-3 text-right hidden md:table-cell ${crypto.price_change_percentage_1h_in_currency >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.price_change_percentage_1h_in_currency.toFixed(2)}%
                </td>
                <td className={`p-3 text-right hidden md:table-cell ${crypto.price_change_percentage_24h_in_currency >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.price_change_percentage_24h_in_currency.toFixed(2)}%
                </td>
                <td className={`p-3 text-right hidden md:table-cell ${crypto.price_change_percentage_7d_in_currency >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.price_change_percentage_7d_in_currency.toFixed(2)}%
                </td>
                <td className="p-3 text-right hidden lg:table-cell">{formatLargeNumber(crypto.total_volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}



export default App
