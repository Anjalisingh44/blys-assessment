import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import Layout from './component/Layout';




const App = () => {
 

  
  return (
   
  <>
  
    <Routes>
    <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

    <Route path="/dashboard/*" element={<Dashboard />}/>
 </Routes>
    
  </>
  )
}

export default App