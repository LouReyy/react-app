import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Vos autres routes */}
          {/* Ajoutez :item pour indiquer un paramètre d'URL */}
          <Route path="/products/:item" element={<Product />} />
          <Route path="/home" element={<Home />} />
          {/* Route par défaut avec redirection vers /home */}
          <Route
            path="*"
            element={<Navigate to="/home" replace />} // Replace permet de remplacer l'historique
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
