import React, { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Appeler la fonction de recherche avec la requête de l'utilisateur
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Si la touche appuyée est "Entrée", effectuer la recherche
      handleSearch();
    }
  };

  return (
    <div className="navbar">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default Navbar;
