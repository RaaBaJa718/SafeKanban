import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="nav">
      {/* Nav Title */}
      <div className="nav-title">
        <Link to="/">Krazy Kanban Board</Link>
      </div>

      {/* Nav Actions (Buttons) */}
      <div className="nav-actions">
        <button className="new-ticket-btn">
          <Link to="/new-ticket">New Ticket</Link>
        </button>
        {loginCheck ? (
          <button
            onClick={() => {
              auth.logout();
            }}
          >
            Logout
          </button>
        ) : (
          <button>
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;