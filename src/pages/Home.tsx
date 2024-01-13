import React, { useState } from "react";

import ListGroup from "../components/ListGroup";
import Navbar from "../components/Navbar";
import myImage from "../../public/running.jpg";
import backgroundImage from "../../public/black_background.jpg";
import Product from "../pages/Product";

function Home() {
  let items_vetements = [
    "T-shirts",
    "Sweats à capuche & Sweats",
    "Pantalons & Leggings",
    "Vestes",
  ];

  let brand = ["Nike", "Adidas"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchResults([query]);
    console.log("Résultat de la recherche:", query);
  };

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div>
      <div className="header">
        <h1>Foot Locker</h1>
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
            items={items_vetements}
            heading="Chaussures"
            onSelectItem={handleSelectItem}
          ></ListGroup>
        </div>

        <div className="list-group-container">
          <ListGroup
            items={items_vetements}
            heading="Accesoires"
            onSelectItem={handleSelectItem}
          ></ListGroup>
        </div>

        <div className="list-group-container">
          <ListGroup
            items={brand}
            heading="Marques"
            onSelectItem={handleSelectItem}
          ></ListGroup>
        </div>
      </div>

      <div className="genre_image-container">
        <div className="image-block" style={containerStyle}>
          <div className="text-overlay">Homme</div>
        </div>
        <div className="image-block" style={containerStyle}>
          <div className="text-overlay">Femme</div>
        </div>
        <div className="image-block" style={containerStyle}>
          <div className="text-overlay">Enfant</div>
        </div>
      </div>

      <div className="image_container">
        <img src={myImage} alt="Description de l'image" />
      </div>
    </div>
  );
}

export default Home;
