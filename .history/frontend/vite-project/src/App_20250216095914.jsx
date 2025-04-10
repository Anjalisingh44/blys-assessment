import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import Form from './page/Form';
import Updateform from './component/Updateform';
import OTP from './page/OTP';
import PrivateRoute from './component/PrivateRoute';
import { authAction } from './store/auth';




const App = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const role = useSelector((state) => state.auth.role);
  

  const location = useLocation();
  const hideNavbarRoutes = ['/form', '/dashboard'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
   
  <>
 
 {!shouldHideNavbar &&  <Navbar/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     
     
    <Route path="/update/:id" element={<Updateform />} />
    <Route path='/otp' element = {<OTP/>} />
    <Route
  path="/dashboard"
  element={
    <PrivateRoute isSignedIn={isSignedIn} role={role} allowedRole="admin">
      <Dashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/form"
  element={
    <PrivateRoute isSignedIn={isSignedIn} role={role} allowedRole="user">
      <Form />
    </PrivateRoute>
  }
/>



    </Routes>
    
  

  </>
  )
}

export default App