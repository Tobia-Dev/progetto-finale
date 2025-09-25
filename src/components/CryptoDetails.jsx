import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CryptoDetails() {
  const { id } = useParams(); // prende l'id dalla URL
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const data = await res.json();
        console.log(data);
        setCrypto(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCrypto();
  }, [id]);

  if (!crypto) return <p>Caricamento...</p>;

    return (
        <div className="p-5 flex flex-col items-center min-h-screen">
            <h1 className="text-3xl font-bold">{crypto.name}</h1>
            <img src={crypto.image.large} alt={crypto.name} className="my-4 w-20" />
            <p className="text-lg"><span className="font-bold">Simbolo:</span> {crypto.symbol}</p>
            <p className="text-lg"><span className="font-bold">Prezzo:</span> ${crypto.market_data.current_price.usd}</p>
            <p className="text-lg"><span className="font-bold">Capitalizzazione:</span> ${crypto.market_data.market_cap.usd.toLocaleString()}
            </p>
            <p className="mt-4">{crypto.description.en}</p>
        </div>
    );
}

export default CryptoDetails;