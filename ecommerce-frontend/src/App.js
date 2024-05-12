import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Home from './Components/Pages/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
        </Routes >
      </BrowserRouter >
    </div>
  );
}

export default App;
