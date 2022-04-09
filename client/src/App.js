import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

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
          <Link to="/register">Rejestracja</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
