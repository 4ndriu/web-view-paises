import "./style.css"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Pais {
  cca2: string
  name: { common: string }
  flags: { png: string }
  capital: string[]
}

function Favoritos() {
  const [favoritos, setFavoritos] = useState<Pais[]>([])

  useEffect(() => {
    const guardados = localStorage.getItem('favoritos')
    if (guardados) setFavoritos(JSON.parse(guardados))
  }, [])

  const quitarFavorito = (cca2: string) => {
    const nuevos = favoritos.filter((p) => p.cca2 !== cca2)
    setFavoritos(nuevos)
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
  }

  return (
    <div className="favoritos-container">
      <h1>Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="favoritos-vacio">No tienes países favoritos aún.</p>
      ) : (
        <ul className="favoritos-lista">
          {favoritos.map((pais) => (
            <li key={pais.cca2} className="favoritos-item">
              <img src={pais.flags.png} alt={pais.name.common} width={40} />
              <Link to={`/pais/${pais.cca2.toLowerCase()}`}>
                {pais.name.common}
              </Link>
              <span>{pais.capital?.[0] ?? '—'}</span>
              <button onClick={() => quitarFavorito(pais.cca2)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favoritos