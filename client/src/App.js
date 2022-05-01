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
    return auth ? children : <Navigate to='/login' />
  }

  function AdminRoute({ children }) {
    const auth = authState.isAdmin
    return auth ? children : <Navigate to='/login' />
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
            {authState.isAdmin && authState.status && (
              <>
                <Link to="/add/user">Dodaj nowego użytkownika</Link>
                <Link to="/principal/add/grade">Dodaj ocenę</Link>
              </>
            )}
          </nav>
          <main>
            <div className='background'></div>
            <Routes>
              {(!isLoading &&
                <>
                  {/* TODO: block url like / */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/add/user" element={<AddNewUser />} />
                  <Route path="/add/grade" element={<AddNewGrade />} />
                  <Route path="/teacher/list" element={<TeacherList />} />
                  <Route path="/student/list" element={<StudentList />} />
                  <Route path="/class/list" element={<ClassList />} />
                  <Route path="/principal/add/grade" element={<TeacherHome />} />
                  <Route path="/" element={<LoggedRoute><Home /></LoggedRoute>} />
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
