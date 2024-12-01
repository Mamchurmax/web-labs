import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import Header from './components/header/Header';
import { PermitProvider } from './components/catalog/PermitContext';
import ItemPage from './components/catalog/ItemPage';
function App() {
  return (
    <PermitProvider>
    <Router>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </Router>
    </PermitProvider>
  );
}

export default App;
