import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom';

import Main from './components/main'

function App() {
  return (
    
    
      <BrowserRouter>

     
      <Routes>
          <Route exact path="/Home" element ={<Main />}/>
 
      </Routes>
      </BrowserRouter>
  
  )
}

export default App;
