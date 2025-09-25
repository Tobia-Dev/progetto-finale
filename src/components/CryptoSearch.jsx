import React, { useState } from "react";

function CryptoSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value.trim()); // aggiorna tabella in tempo reale
  };

  return (
    <div className="flex items-center gap-2 mb-4  w-11/12 mx-auto">
      <input
        type="text"
        placeholder="Cerca crypto..."
        value={query}
        onChange={handleChange}
        className="border border-gray-700 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
}


export default CryptoSearch;