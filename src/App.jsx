import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { AuthGuard } from './guards/AuthGuard';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProductForm from './pages/admin/AdminProductForm';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {/* Ana Sayfa Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={
                  <AuthGuard>
                    <Cart />
                  </AuthGuard>
                } />
                <Route path="profile" element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                } />

                <Route path="search" element={<Search />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AuthGuard adminRequired>
                  <AdminLayout />
                </AuthGuard>
              }>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/edit/:id" element={<AdminProductForm />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;