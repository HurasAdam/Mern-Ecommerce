import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { NewProduct } from "./components/pages/NewProduct";
import { ProductPage } from "./components/pages/ProductPage";
import CategoryPage from "./components/pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import AdminDashboard from "./components/AdminDashboard";
import { EditProductPage } from "./components/pages/EditProductPage";
import { useEffect } from "react";
import {io} from "socket.io-client"
import { addNotification } from "./features/userSlice";
function App() {
  const user = useSelector((state) => state.user);
  const dispatch=useDispatch()
  useEffect(() => {
    const socket = io("ws://localhost:3001");
    socket.off("new-order").on("new-order", (msgObj,user_id) => {
      // logic for notification 
        if (user_id === user._id) {
            dispatch(addNotification(msgObj));
            console.log(msgObj)
        }
        
    });

    socket.off("new-order").on("new-order", (msgObj) => {
        if (user.isAdmin) {
            dispatch(addNotification(msgObj));
        }
    });



}, []);

console.log(user)

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
          {user&&user.isAdmin&&(
            <>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/product/:id/edit" element={<EditProductPage/>}/>
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
