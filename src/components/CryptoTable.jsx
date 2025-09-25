
import { Link } from "react-router-dom";

function formatLargeNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num;
}

const CryptoTable = ({ data }) => {
    return (
        <div className="cryptoContainer overflow-x-auto w-11/12 mx-auto">
            <table className="border-collapse">
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
                    {data.map((crypto, index) => (
                        <tr
                            key={crypto.id}
                            className="border-b hover:bg-gray-100 transition"
                        >
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3 text-left">
                                <Link
                                    to={`/crypto/${crypto.id}`}
                                    className="flex items-center gap-2"
                                    href="#"
                                >
                                    <img
                                        src={crypto.image}
                                        alt={crypto.id}
                                        width="25"
                                        height="25"
                                        className="as"
                                    />
                                    <span className="font-bold">{crypto.name}</span>
                                    <span className="font-light text-gray-700 hidden md:table-cell">{crypto.symbol}</span>
                                </Link>
                            </td>
                            <td className="p-3 text-right">
                                <b>
                                    $
                                    {crypto.current_price.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </b>
                            </td>
                            <td
                                className={`p-3 text-right hidden md:table-cell ${crypto.price_change_percentage_1h_in_currency >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {crypto.price_change_percentage_1h_in_currency.toFixed(2)}%
                            </td>
                            <td
                                className={`p-3 text-right hidden md:table-cell ${crypto.price_change_percentage_24h_in_currency >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {crypto.price_change_percentage_24h_in_currency.toFixed(2)}%
                            </td>
                            <td
                                className={`p-3 text-right hidden md:table-cell ${crypto.price_change_percentage_7d_in_currency >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {!crypto.price_change_percentage_7d_in_currency
                                    ? "N/A"
                                    : crypto.price_change_percentage_7d_in_currency.toFixed(2) + "%"}
                            </td>
                            <td className="p-3 text-right hidden lg:table-cell">
                                {formatLargeNumber(crypto.total_volume)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;