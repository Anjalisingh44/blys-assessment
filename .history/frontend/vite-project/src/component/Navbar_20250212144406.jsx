import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Using react-icons for menu icons
import logo from "../assets/logo.png";


const NavLinks = () => (
  <>
   
    <NavLink to="/login">
      Login
    </NavLink>
    <NavLink to="/register">
      Register
    </NavLink>
  </>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  

  const toggleNavbar = () => {
    setMenuOpen(!menuOpen);
  };



  return (
    <nav className="bg-white p-2 shadow-lg">
      <div className="mx-auto flex justify-between items-center px-4">
        
        {/* Logo */}
        <div className="text-black text-xl font-bold">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-16 w-16" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{menuOpen ? <FiX /> : <FiMenu />}</button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mt-4 flex flex-col items-center space-y-4 md:hidden">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
