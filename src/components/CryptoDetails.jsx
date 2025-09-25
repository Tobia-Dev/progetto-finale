import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";

function CryptoDetails() {
    const { id } = useParams(); // prende l'id dalla URL
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}`
                );
                const data = await res.json();
                setCrypto(data);

                const chartRes = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
                );
                const chartJson = await chartRes.json();

                const labels = chartJson.prices.map((p) => {
                    const date = new Date(p[0]);
                    return date.toLocaleDateString();
                });
                const values = chartJson.prices.map((p) => p[1]);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: `${id.toUpperCase()} Price (USD)`,
                            data: values,
                            borderColor: "rgb(75, 192, 192)",
                            backgroundColor: "rgba(75,192,192,0.2)",
                            tension: 0.4
                        }
                    ]
                });
            } catch (err) {
                console.error("Errore", err);
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
            <p className="text-lg">
                <span className="font-bold">Capitalizzazione:</span> ${crypto.market_data.market_cap.usd.toLocaleString()}
            </p>
            <div className="mt-8 h-96 w-11/12 mb-8">
                {chartData ? (
                    <LineChart data={chartData} />
                ) : (
                    <p>Caricamento grafico...</p>
                )}
            </div>

            <p className="mt-4">{crypto.description.en.slice(0, 500)}...</p>
        </div>
    );
}

export default CryptoDetails;