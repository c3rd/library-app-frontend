import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Library App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/"}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/search"}>Search Books</NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-light" type="button">Sign In</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
