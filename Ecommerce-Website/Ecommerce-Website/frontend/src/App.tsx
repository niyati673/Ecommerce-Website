import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import CartPage from './pages/Cart';
import ProductPage from './pages/Product';
import AppContext from './utils/AppContext';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
); 

function App() {
  const [cartItems, setCartItems] = useState([]);

  async function getData() {
    const response = await fetch("http://localhost:3000/api/v1/cart/getCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
      }),
    }); 

    const data = await response.json();

    if (data.cartData) {
      setCartItems(JSON.parse(data.cartData.data));
    } else {
      setCartItems([]);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      localStorage.setItem("userId", uuidv4());
    }
    getData();
  }, []);

  return (
    <AppContext.Provider value={{
      cartItems, 
      setCartItems: (items) => {
        fetch("http://localhost:3000/api/v1/cart/updateCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("userId"),
            cart: JSON.stringify(items),
          }),
        })
        
        setCartItems(items);
      }
    }}>
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <PageWrapper>
                  <Shop />
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/checkout"
              element={
                <PageWrapper>
                  <Checkout />
                </PageWrapper>
              }
            />
            <Route
              path="/cart"
              element={
                <PageWrapper>
                  <CartPage />
                </PageWrapper>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageWrapper>
                  <ProductPage />
                </PageWrapper>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AppContext.Provider>
  );
}

export default App;
