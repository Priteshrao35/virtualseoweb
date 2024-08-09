'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get("https://virtualseoweb.pythonanywhere.com/ourpartnerbrand/")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the brands data:", error);
      });
  }, []);

  return (
    <div className="p-20 bg-white">
      <ul className="flex gap-20 text-black text-center justify-center">
        {brands.map((brand) => (
          <li key={brand.id} className="flex items-center gap-2 text-3xl font-bold">
            <img src={brand.Brand_Logo} alt={brand.Brand_Name} className="w-10 h-10" />
            {brand.Brand_Name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Brands;
