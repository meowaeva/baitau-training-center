import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('baitau_token');

  const logout = () => {
    localStorage.removeItem('baitau_token');
    localStorage.removeItem('baitau_user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-icon">B</span>
          <span>
            <strong>Baitau</strong> Partners
          </span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/gallery">Training Formats</NavLink></li>
            {token && <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Account</NavLink></li>}
            <li className="nav-item ms-lg-2">
              {token ? (
                <button className="btn btn-outline-primary btn-sm" onClick={logout}>Log out</button>
              ) : (
                <NavLink className="btn btn-primary btn-sm" to="/login">Log in</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
