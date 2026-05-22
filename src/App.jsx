import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
 
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
 
import Home       from './Home';
import Pais       from './Pais';
import Favoritos  from './Favoritos';
import Informativa from './Informativa';
import Original   from './Original';
import Usuario    from './Usuario';
 
const icons = {
  home:  '🌍',
  fav:   '❤️',
  orig:  '🏆',
  info:  'ℹ️',
  user:  '👤',
};
 
function NavMenu() {
  const { pathname } = useLocation();
  const active = (path) => pathname === path ? 'active' : '';
 
  return (
    <nav className="c-menu">
      <Link to="/"           className={active('/')}>
        <span>{icons.home}</span><p>Inicio</p>
      </Link>
      <Link to="/Favoritos"  className={active('/Favoritos')}>
        <span>{icons.fav}</span><p>Favoritos</p>
      </Link>
      <Link to="/Original"   className={active('/Original')}>
        <span>{icons.orig}</span><p>Récords</p>
      </Link>
      <Link to="/Informativa" className={active('/Informativa')}>
        <span>{icons.info}</span><p>Info</p>
      </Link>
      <Link to="/Usuario"    className={active('/Usuario')}>
        <span>{icons.user}</span><p>Usuario</p>
      </Link>
    </nav>
  );
}
 
function App() {
  return (
    <AuthProvider>
      <Router>
        <NavMenu />
        <Routes>
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          }/>
          <Route path="/Favoritos" element={
            <ProtectedRoute><Favoritos /></ProtectedRoute>
          }/>
          <Route path="/pais/:cca2" element={
            <ProtectedRoute><Pais /></ProtectedRoute>
          }/>
          <Route path="/Original" element={
            <ProtectedRoute><Original /></ProtectedRoute>
          }/>
 
          {/* Rutas públicas */}
          <Route path="/Informativa" element={<Informativa />} />
          <Route path="/Usuario"     element={<Usuario />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
 
export default App;