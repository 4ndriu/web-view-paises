
import { BrowserRouter as Router, Link, Route } from 'react-router'
import './App.css'
import Pais from './Pais'
import Favorito from './Favoritos'
import Home from './Home'
import Infromativa from './Informativa'
import Original from './Original'
import Usuario from './Usuario'
import { Routes } from 'react-router'

function App() {
  return (
    <>
    <Router>
      <nav className="c-menu">
        <Link to="/">Home</Link>
      <Link to="/Favoritos">Favorito</Link>
      <Link to="/Original">Original</Link>
      <Link to="/Informativa">Informativa</Link>
      <Link to="/Usuario">Usuario</Link>
      </nav>

      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/Favoritos'element={<Favorito/>}/>
        <Route path='/pais/:cca2'element={<Pais/>}/>
        <Route path='/Original'element={<Original/>}/>
        <Route path='/Informativa'element={<Infromativa/>}/>
        <Route path='/Usuario'element={<Usuario/>}/>
        <Route path='/Elemento'element={<Pais/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
