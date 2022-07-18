import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  function logoutHandler(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="z-50 w-full bg-white px-30 pt-3 shadow-md">
      <div className="container flex flex-wrap justify-between mx-auto">
        <Link to="/products">
          <span className="text-3xl font-roboto font-bold whitespace-nowrap text-darkSmalt">
            Furni CMS
          </span>
        </Link>
        <div className="ml-6 flex space-x-8" id="navPostAuth">
          <Link to="/products" className="link inactive">
            Products
          </Link>
          <Link to="/categories" className="link inactive">
            Categories
          </Link>
          <Link to="/add-admin" className="link inactive">
            Add Admin
          </Link>
          <button className="link inactive" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
