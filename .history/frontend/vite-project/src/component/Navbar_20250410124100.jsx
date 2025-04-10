import { NavLink} from "react-router-dom";

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
  

  return (
    <nav className="bg-white p-2 shadow-lg">
      <div className="mx-auto flex justify-between items-center px-4">
        <div className="text-black text-xl font-bold">  
        </div>
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

       </div>
    </nav>
  );
};

export default Navbar;
