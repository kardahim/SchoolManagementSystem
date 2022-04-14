import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AddNewUser from './pages/AddNewUser/AddNewUser'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [authState, setAuthState] = useState({
    email: '',
    id: 0,
    isAdmin: false,
    isTeacher: false,
    status: false
  })

  // check that token is valid
  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/check/token', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false })
        }
        else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            isAdmin: response.data.isAdmin,
            isTeacher: response.data.isTeacher,
            status: true
          })
        }
      })
  }, [])


  // logout function
  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ ...authState, status: false })
  }

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
            {!authState.status && (
              <Link to="/login">Zaloguj się</Link>
            )}
            {authState.status && (
              <Link to='/' onClick={logout}>Wyloguj się</Link>
            )}
            {authState.isAdmin && (
              <Link to="/add/user">Dodaj nowego użytkownika</Link>
            )}
            <Link to="#">Empty</Link>
            <Link to="#">Empty</Link>
          </nav>
          <main>
            <div className='background'></div>
            {/* TODO: add linking auth system */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
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
