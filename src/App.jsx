/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./components/Cart";
import ProductCard from "./components/ProductCard";
import CheckoutForm from "./components/CheckoutForm";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [conversionRate, setConversionRate] = useState(15000); 

  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);


  useEffect(() => {
    setLoading(true);
    const url =
      selectedCategory === "all"
        ? "https://fakestoreapi.com/products/"
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedCategory]);

 
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  
  const getTotalPrice = () => {
    const totalUSD = cart.reduce((acc, product) => acc + product.price, 0);
    const totalIDR = totalUSD * conversionRate;
    return totalIDR;
  };

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">POS System</h1>

       
        <ul className="nav nav-tabs justify-content-center mt-3">
          <li className="nav-item">
            <button
              className={`nav-link ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li className="nav-item" key={category}>
              <button
                className={`nav-link ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        
        <div className="row mt-4">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>

        
        <div className="position-fixed top-0 end-0 p-3">
          <Link to="/cart" className="btn btn-warning">
            🛒 Cart ({cart.length})
          </Link>
        </div>

        <Routes>
          <Route
            path="/cart"
            element={<Cart cart={cart} totalPrice={getTotalPrice} />}
          />
          <Route path="/checkout" element={<CheckoutForm cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
