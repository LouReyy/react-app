import React, { useState } from "react";

import ListGroup from "../components/ListGroup";
import Navbar from "../components/Navbar";
import myImage from "../../public/running.jpg";
import backgroundImage from "../../public/black_background.jpg";
import Product from "../pages/Product";
import { Link, useNavigate } from "react-router-dom";

function Header(props: any) {
  let items_vetements = ["T-Shirt", "Sweat", "Pantalon"];

  let items_chaussures = ["Sneakers", "Bottes"];

  let items_accesoires = ["Casquette", "Bonnet", "Sac", "Chaussettes"];

  let items_brand = ["Nike", "Adidas", "Timberland"];

  const navigate = useNavigate();

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchResults([query]);
    console.log("Résultat de la recherche:", query);
    navigate(`/products/${encodeURIComponent(query)}/search`);
  };

  const handleSearchBrand = (item: string) => {
    console.log("Résultat de la recherche brand:", item);
    navigate(`/products/${encodeURIComponent(item)}/brand`);
  };

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div>
      <div className="header">
        <h1>
          <Link to="/http://localhost:5173/home">Foot Locker</Link>
        </h1>
        <Navbar onSearch={handleSearch} />
      </div>

      <div className="main_list_container">
        <div className="list-group-container">
          <ListGroup
            items={items_vetements}
            heading="Vetements"
            onSelectItem={handleSelectItem}
          ></ListGroup>
        </div>

        <div className="list-group-container">
          <ListGroup
            items={items_chaussures}
            heading="Chaussures"
            onSelectItem={handleSelectItem}
          ></ListGroup>
        </div>

        <div className="list-group-container">
          <ListGroup
            items={items_accesoires}
            heading="Accesoires"
            onSelectItem={handleSelectItem}
          ></ListGroup>
        </div>

        <div className="list-group-container">
          <ListGroup
            items={items_brand}
            heading="Marques"
            onSelectItem={handleSearchBrand}
          ></ListGroup>
        </div>
      </div>
    </div>
  );
}

export default Header;
