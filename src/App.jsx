import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

import Layout from './components/layout/Layout';
import Toast from './components/ui/Toast';
import ScrollToTop from './components/layout/ScrollToTop';

import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Athletes from './pages/Athletes';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Support from './pages/Support';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/men" element={<Men />} />
                  <Route path="/women" element={<Women />} />
                  <Route path="/athletes" element={<Athletes />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/privacy-policy" element={<Policy />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <Toast />
            </BrowserRouter>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
