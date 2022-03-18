import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BAAT CHEET
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Chat">
                Chat
              </Link>
            </li>
          </ul>
          {props.isLogined ? (
            <>
              <Link to="/Profile">
                <button className="btn btn-outline-success m-1" type="button">
                  Profile
                </button>
              </Link>
              <Link to="/Logout">
                <button className="btn btn-outline-danger m-1" type="button">
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login">
                <button className="btn btn-outline-success m-1" type="button">
                  Login
                </button>
              </Link>
              <Link to="/Signin">
                <button className="btn btn-outline-success m-1" type="button">
                  Signin
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
