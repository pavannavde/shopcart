import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from 'react-router-dom';
import Login from "./pages/login";
import Cart from "./pages/cart";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
