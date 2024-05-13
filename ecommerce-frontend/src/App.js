import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Home from './Components/Pages/Home';
import Product from './Components/Pages/Product';
import Cart from './Components/Pages/Cart';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Product/:id' element={<Product />} />
          <Route path='/Cart' element={<Cart />} />
        </Routes >
      </BrowserRouter >
    </div>
  );
}

export default App;
