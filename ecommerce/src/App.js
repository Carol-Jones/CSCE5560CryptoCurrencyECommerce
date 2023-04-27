import "./styles/style.css";
import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EthProvider } from "./context/EthContext";
import { CartProvider } from "./context/CartContext";
import Login from "./components/login";

import Main from "./components/main";
import NavBar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EthProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Main />} />
            </Routes>
          </CartProvider>
        </EthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
