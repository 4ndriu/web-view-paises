import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

interface Pais {
  cca2: string
  name: { common: string }
  flags: { png: string }
  capital: string[]
  population: number
  subregion: string
  languages: Record<string, string>
}

type FiltroRegion = 'america' | 'europe' | 'africa' | 'asia' | 'oceania'

function Home() {
  const [paises, setPaises] = useState<Pais[]>([])
  const [filtro, setFiltro] = useState<FiltroRegion>('america')
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const filtros: FiltroRegion[] = ['america', 'europe', 'africa', 'asia', 'oceania']

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      setPaises([])
      try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${filtro}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Pais[] = await res.json()
        setPaises(data.sort((a, b) => b.population - a.population))
      } catch (err: any) {
        setError(err.message || 'Error al cargar')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filtro])

  const paisesFiltrados = paises.filter((pais) =>
    busqueda.length < 3
      ? true
      : pais.name.common.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="container">
      
      <div className="filtros">
        {filtros.map((region) => (
          <button
            key={region}
            onClick={() => setFiltro(region)}
            className={filtro === region ? 'active' : ''}
          >
            {region}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar país..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      {/* Tabla */}
      <div className="tabla-container">
        <h2>{filtro.toUpperCase()}</h2>

        {loading && <p className="mensaje">Cargando países...</p>}
        {error && <p className="error"> {error}</p>}

        {!loading && !error && (
          <table className="tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>🏳</th>
                <th>País</th>
                <th>Capital</th>
                <th>Subregión</th>
                <th>Población</th>
              </tr>
            </thead>
            <tbody>
              {paisesFiltrados.map((pais, index) => (
                <tr key={pais.cca2}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={pais.flags.png} alt={pais.name.common} />
                  </td>
                  <td>
                    <Link to={`/pais/${pais.cca2.toLowerCase()}`}>
                      {pais.name.common}
                    </Link>
                  </td>
                  <td>{pais.capital?.[0] ?? '—'}</td>
                  <td>{pais.subregion}</td>
                  <td className="poblacion">
                    {pais.population.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Home