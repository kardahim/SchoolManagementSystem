import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AddNewUser from './pages/AddNewUser/AddNewUser'

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            &nbsp;
            Główna
          </Link>
          <Link to="/login">Logowanie</Link>
          <Link to="/add/user">Dodaj nowego użytkownika</Link>
          <Link to="#">Empty</Link>
          <Link to="#">Empty</Link>
        </nav>
        <main>
          <div className='background'></div>
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
    </div>
  );
}

export default App;
