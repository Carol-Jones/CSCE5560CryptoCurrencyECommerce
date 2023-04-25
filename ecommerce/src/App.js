import "./styles/style.css";
import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EthProvider } from "./context/EthContext";
import Login from "./components/login"

import Main from "./components/main";
function App() {
  return (
   

    <BrowserRouter>
      <AuthProvider>
       
      <EthProvider>

      
        <Routes>
          
        <Route exact path="/" element={<Main />} />
        <Route exact path="/Login" element={<Login />} />

       
        </Routes>
        
        </EthProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
