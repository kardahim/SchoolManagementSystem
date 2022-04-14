import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AddNewUser from './pages/AddNewUser/AddNewUser'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/check/token', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false)
        }
        else {
          setAuthState(true)
        }
      })
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav>
            <Link to="/">
              <i className="fa-solid fa-house"></i>
              &nbsp;
              Główna
            </Link>
            {!authState && (
              <Link to="/login">Zaloguj się</Link>
            )}
            {authState && (
              <Link to="/logout">Wyloguj się</Link>
            )}
            <Link to="/add/user">Dodaj nowego użytkownika</Link>
            <Link to="#">Empty</Link>
            <Link to="#">Empty</Link>
          </nav>
          <main>
            <div className='background'></div>
            <Routes>
              <Route path="/" element={<Home />} />
              {!authState && (
                <Route path="/login" element={<Login />} />
              )}
              <Route path="/add/user" element={<AddNewUser />} />
            </Routes>
          </main>
          <footer>
            <Link to="/about">O nas</Link>
          </footer>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
