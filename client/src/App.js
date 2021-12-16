import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import cookie from 'cookiejs';
import './styles.css';
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleRegister = async () => {
    const { data } = await axios.post(
      'http://localhost:4001/user/register',
      formData,
      { withCredentials: true }
    );
    setIsLoggedIn(data.authenticated);
    console.log('register Done', data);
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:4001/user/login',
        loginData,
        { withCredentials: true }
      );
      setIsLoggedIn(data.authenticated);
      setUserData(data.user);
      cookie.set('name', data.user.name);
      cookie.set('id', data.user.id);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:4001/user/logout', {
      withCredentials: true,
    });
    setIsLoggedIn(data.authenticated);
    cookie.remove('name', 'id');
    setUserData('');
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4001/user/checkAuthentication',
          { withCredentials: true }
        );

        setIsLoggedIn(data.authenticated);
        if (isLoggedIn) {
          cookie.set('name', data.user.name);
          cookie.set('id', data.user.id);
          setUserData(data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, [isLoggedIn]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="text-center">
          {isLoggedIn ? (
            <h2>
              {' '}
              Welcome <strong>{userData?.name}</strong>
            </h2>
          ) : (
            <h2>Please Login</h2>
          )}
        </div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="email"
                aria-label=".form-control-lg example"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="password"
                aria-label=".form-control-lg example"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              {!isLoggedIn ? (
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Login"
                  onClick={handleLogin}
                />
              ) : (
                <input
                  type="submit"
                  className="btn btn-danger"
                  value="Logout"
                  onClick={handleLogout}
                />
              )}
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="name"
                aria-label=".form-control-lg example"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="email"
                aria-label=".form-control-lg example"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="password"
                aria-label=".form-control-lg example"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                type="submit"
                className="btn btn-dark"
                value="Register "
                onClick={handleRegister}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
