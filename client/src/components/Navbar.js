import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Navbar = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4001/user/checkAuthentication',
          { withCredentials: true }
        );

        if (data.authenticated) {
          setUserName(data.user.name);
        } else {
          setUserName('');
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log();

    checkAuth();
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            {userName.length !== 0 ? (
              <li className="nav-item">
                <button className="btn btn-secondary " aria-current="page">
                  Welcome {userName}!
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
