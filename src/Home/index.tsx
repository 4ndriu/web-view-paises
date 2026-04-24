
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

  const filtros: FiltroRegion[] = ['america', 'europe', 'africa', 'asia', 'oceania']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${filtro}`)
        const data: Pais[] = await res.json()
        // Ordenar por población descendente
        setPaises(data.sort((a, b) => b.population - a.population))
      } catch (error) {
        console.error('Error cargando países:', error)
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
    <>
      <div className="filtros">
        {filtros.map((region) => (
          <button
            key={region}
            onClick={() => setFiltro(region)}
            className={filtro === region ? 'activo' : ''}
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
      />

      <div className="tabla-container">
        <h2>{filtro.toUpperCase()}</h2>
        <table className="tabla-posiciones">
          <thead>
            <tr>
              <th>#</th>
              <th>Bandera</th>
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
                  <img src={pais.flags.png} alt={pais.name.common} width={32} />
                </td>
                <td>
                  <Link to={`/pais/${pais.cca2.toLowerCase()}`}>
                    {pais.name.common}
                  </Link>
                </td>
                <td>{pais.capital?.[0] ?? '—'}</td>
                <td>{pais.subregion}</td>
                <td>{pais.population.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home