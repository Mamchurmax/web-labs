import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import ItemPage from './components/catalog/ItemPage';
import CartPage from "./components/CartPage/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path={"/cart"} element={<CartPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
