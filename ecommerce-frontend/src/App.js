import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Home from './Components/Pages/Home';
import Product from './Components/Pages/Product';
import Cart from './Components/Pages/Cart';
import ProtectedRoutes from './Components/Smallcomponents/ProtectedRoutes';
import ProductList from './Admin/Products/ProductList';
import AdminDashboard from './Admin/Components/AdminDashboard';
import AddProduct from './Admin/Products/AddProduct';
import UserList from './Admin/Users/UserList';
import UserDetails from './Admin/Users/UserDetails';
import OrderList from './Admin/Orders/OrderList';
import OrderDetails from './Admin/Orders/OrderDetails';
import AddCategory from './Admin/Categories/AddCategory';
import CategoriesList from './Admin/Categories/CategoriesList';
import NavigationBar from './Components/Smallcomponents/NavigationBar';
function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/Product/:id' element={<Product />} />

          <Route path='/Cart' element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />


          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/admin/Product' element={<AdminDashboard><ProductList /></AdminDashboard>} />
          <Route path='/admin/AddProduct' element={<AdminDashboard><AddProduct /></AdminDashboard>} />
          <Route path='/admin/AddCategory' element={<AdminDashboard><AddCategory /></AdminDashboard>} />
          <Route path='/admin/User' element={<AdminDashboard><UserList /></AdminDashboard>} />
          <Route path='/admin/Categories' element={<AdminDashboard><CategoriesList /></AdminDashboard>} />
          <Route path='/admin/User/:userId' element={<AdminDashboard><UserDetails /></AdminDashboard>} />
          <Route path='/admin/Order' element={<AdminDashboard><OrderList /></AdminDashboard>} />
          <Route path='/admin/Order/:orderId' element={<AdminDashboard><OrderDetails /></AdminDashboard>} />
        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
