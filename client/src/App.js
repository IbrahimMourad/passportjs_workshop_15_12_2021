import { useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
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
  const handleRegister = async () => {
    const { data } = await axios.post(
      'http://localhost:4001/user/register',
      formData
    );
    console.log('register Done', data);
  };
  const handleLogin = async () => {
    const response = await axios.post(
      'http://localhost:4001/user/login',
      loginData
    );
    console.log(response);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="email"
                aria-label=".form-control-lg example"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="password"
                aria-label=".form-control-lg example"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <input type="submit" value="Register" onClick={handleLogin} />
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="name"
                aria-label=".form-control-lg example"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="email"
                aria-label=".form-control-lg example"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="password"
                aria-label=".form-control-lg example"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input type="submit" value="Register" onClick={handleRegister} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
