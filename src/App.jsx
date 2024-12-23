import React, { useState } from 'react'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const [progress, setProgress] = useState(50)
  return (
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* <Alert/> */}
      <Routes>
        <Route path="/" element={<Home setProgress={setProgress}/>} />
        <Route path="/products" element={<Products setProgress={setProgress}/>} />
        <Route path="/about" element={<About setProgress={setProgress}/>} />
        <Route path="/contact" element={<Contact setProgress={setProgress}/>} />
        <Route path="/cart" element={<Cart setProgress={setProgress}/>} />
        <Route path="/checkout" element={<Checkout setProgress={setProgress}/>} />
        <Route path="/login" element={<Login setProgress={setProgress}/>} />
        <Route path="/signup" element={<Signup setProgress={progress}/>} />
      </Routes>
    </Router>
  )
}