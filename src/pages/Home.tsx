import React, { useState } from "react";
import { Link } from "react-router-dom";

import ListGroup from "../components/ListGroup";
import Navbar from "../components/Navbar";
import myImage from "../../public/running.jpg";
import backgroundImage from "../../public/black_background.jpg";
import Product from "../pages/Product";
import Header from "../components/Header";

function Home() {
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
      <Header></Header>

      <div className="genre_image-container">
        <div className="product_homme">
          <Link to="/products/item/homme">
            <div className="image-block" style={containerStyle}>
              <div className="text-overlay">Homme</div>
            </div>
          </Link>
        </div>

        <div className="product_femme">
          <Link to="/products/item/femme">
            <div className="image-block" style={containerStyle}>
              <div className="text-overlay">Femme</div>
            </div>
          </Link>
        </div>

        <div className="product_enfant">
          <Link to="/products/item/enfant">
            <div className="image-block" style={containerStyle}>
              <div className="text-overlay">Enfant</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="image_container">
        <img src={myImage} alt="Description de l'image" />
      </div>
    </div>
  );
}

export default Home;
