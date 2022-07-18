import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white px-30 pt-3 shadow-md">
      <div className="container flex flex-wrap justify-between mx-auto">
        <Link to="/">
          <span className="text-3xl font-roboto font-bold whitespace-nowrap text-darkSmalt">
            Furni
          </span>
        </Link>
        <div className="ml-6 flex space-x-8" id="navPostAuth">
          <Link to="/products" className="link inactive">
            Products
          </Link>
          <Link to="/register" className="link inactive">
            Register
          </Link>
          <Link to="/login" className="link inactive">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
