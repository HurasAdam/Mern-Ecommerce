import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { useSelector } from "react-redux";
import { NewProduct } from "./components/pages/NewProduct";
import { ProductPage } from "./components/pages/ProductPage";
import CategoryPage from "./components/pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />

          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user&&(
            <>
            <Route path="/cart/" element={<CartPage/>}/>
            <Route path="/orders/" element={<OrdersPage/>}/>
            </>
          )}
           <Route  exact path="/product/:id" element={<ProductPage/>} />
           <Route  exact path="/category/:category" element={<CategoryPage/>} />
          <Route  exact path="/new-product" element={<NewProduct/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
