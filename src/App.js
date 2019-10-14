import React, { useState } from 'react';
import items from './api/api';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import logo from './logo.svg';
import './App.css';

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);

  const handleAddToCartClick = id => {
    setItemsInCart(itemsInCart => {
      const itemInCart = itemsInCart.find(item => item.id === id);

      // if item is already in cart, update the quantity
      if (itemInCart) {
        return itemsInCart.map(item => {
          if (item.id !== id) return item;
          return { ...itemInCart, quantity: item.quantity + 1 };
        });
      }

      // otherwise, add new item to cart
      const item = items.find(item => item.id === id);
      return [...itemsInCart, { ...item, quantity: 1 }];
    });
  };

  const totalCost = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-header-text">Dreamcast Shop</h1>
      </header>
      <main className="App-shop">
        <div className="App-products">
          {items.map(item => (
            <Product
            key={item.title}
            title={item.title}
            price={item.price}
            onAddToCartClick={() => handleAddToCartClick(item.id)}
          />
          ))}
        </div>
        <Cart itemsInCart={itemsInCart} totalCost={totalCost} />
        {itemsInCart.length > 0 && (
  <StripeProvider apiKey="your_public_key">
    <Elements>
      <CheckoutForm totalCost={totalCost} />
    </Elements>
  </StripeProvider>
)}
      </main>
    </div>
  );
}

export default App;
