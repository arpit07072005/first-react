import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../CartContext';

const Navbar = () => {
  const [downOpen, setDownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const { cart } = useCart();
  const api = "https://dummyjson.com/products?limit=194";

  const fetchItems = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setItems(data.products);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  let filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [
    "Laptops",
    "Mensshirt",
    "mobile-accessories",
    "Smartphones",
    "Menswatches",
  ];


  return (
    <div>
      <nav className="navbar">
        <div className="navbarleft">ShopMate</div>
        <div className="links">
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li
              className="category"
              onMouseEnter={() => setDownOpen(true)}
              onMouseLeave={() => setDownOpen(false)}
            >
              <span>Category</span>
              {downOpen && (
                <ul className="dropdown">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link to={`/${category}`}>{category}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link to="/Popular">Products</Link>
            </li>
          </ul>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search products"
            className="inputs"
            onChange={(a) => setSearch(a.target.value)}
          />
          {search && (
            <ul className="dropdownsearch">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <li key={item.id}>
                    <Link to={`/Item/${item.id}`} onClick={() => setSearch("")}>{item.title}</Link>
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
          )}
        </div>
        <div className="navbarright">
          <ul>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
            <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i> Cart({cart.length})
              </Link>
            </li>
          </ul>
        </div>
        <div className="menubutton">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
