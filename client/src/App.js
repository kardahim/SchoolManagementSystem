import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AddNewUser from './pages/AddNewUser/AddNewUser'
import AddNewGrade from './pages/AddNewGrade/AddNewGrade'
import TeacherList from './pages/TeacherList/TeacherList'
import StudentList from './pages/StudentList/StudentList'
import ClassList from './pages/ClassList/ClassList'
import TeacherHome from './pages/Home/TeacherHome'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [authState, setAuthState] = useState({
    email: '',
    id: 0,
    isAdmin: false,
    isTeacher: false,
    name: '',
    status: false
  })

  const [isLoading, setIsLoading] = useState(true)

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
          setIsLoading(false)
        }
        else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            isAdmin: response.data.isAdmin,
            isTeacher: response.data.isTeacher,
            name: response.data.name,
            status: true
          })
          setIsLoading(false)
        }
      })
  }, [])

  // logout function
  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({ ...authState, status: false })
  }

  function LoggedRoute({ children }) {
    const auth = authState.status
    return auth ? children : <Navigate to='/login' />
  }

  function TeacherRoute({ children }) {
    const auth = authState.isTeacher
    return auth ? children : <Navigate to='/' />
  }

  function AdminRoute({ children }) {
    const auth = authState.isAdmin
    return auth ? children : <Navigate to='/' />
  }

  function menuStart() {
    let x = document.getElementById('menu')

    if (x.className === 'nav') {
      x.className += ' responsive'
    }
  }

  function menuEnd() {
    let x = document.getElementById('menu')

    if (x.className !== 'nav') {
      x.className = 'nav'
    }
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {/* TODO: add hamburger menu */}
          <nav id="menu" className='nav' onMouseLeave={() => menuEnd()}>
            <a href='javascript:void(0);' className='hamburger' onMouseOver={() => menuStart()}>
              <i className='fa fa-bars'></i>
            </a>
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
            {authState.isAdmin && authState.status && (
              <>
                <Link to="/add/user">Dodaj nowego użytkownika</Link>
                <Link to="/principal/add/grade">Dodaj ocenę</Link>
              </>
            )}
            {(authState.status && !isLoading &&
              <span>Witaj {authState.name}</span>
            )}
          </nav>
          <main>
            <div className='background'></div>
            <Routes>
              {(!isLoading &&
                <>
                  {/* all users routes */}
                  <Route path="/" element={<LoggedRoute><Home /></LoggedRoute>} />
                  <Route path="/login" element={<Login />} />
                  {/* teacher routes */}
                  <Route path="/add/grade" element={<TeacherRoute><AddNewGrade /></TeacherRoute>} />
                  {/* admin routes */}
                  <Route path="/teacher/list" element={<AdminRoute><TeacherList /></AdminRoute>} />
                  <Route path="/student/list" element={<AdminRoute><StudentList /></AdminRoute>} />
                  <Route path="/class/list" element={<AdminRoute><ClassList /></AdminRoute>} />
                  <Route path="/principal/add/grade" element={<AdminRoute><TeacherHome /></AdminRoute>} />
                  <Route path="/add/user" element={<AdminRoute><AddNewUser /></AdminRoute>} />
                </>
              )}
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
