import "./style.css"
import { useState, useEffect } from 'react'

interface Pais {
  cca2: string
  name: { common: string }
  flags: { png: string }
  capital: string[]
  population: number
  area: number
  borders: string[]
  languages: Record<string, string>
}

function Original() {
  const [paises, setPaises] = useState<Pais[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,flags,capital,population,area,borders,languages')
        const data: Pais[] = await res.json()
        setPaises(data)
      } catch (error) {
        console.error('Error cargando países:', error)
      } finally {
        setCargando(false)
      }
    }
    fetchData()
  }, [])

  if (cargando) return <p>Cargando...</p>

  const masPoblado    = paises.reduce((a, b) => a.population > b.population ? a : b)
  const menosPoblado  = paises.reduce((a, b) => a.population < b.population ? a : b)
  const masGrande     = paises.reduce((a, b) => a.area > b.area ? a : b)
  const masChico      = paises.filter(p => p.area > 0).reduce((a, b) => a.area < b.area ? a : b)
  const masFronteras  = paises.reduce((a, b) => (a.borders?.length ?? 0) > (b.borders?.length ?? 0) ? a : b)
  const masIdiomas    = paises.reduce((a, b) => Object.keys(a.languages ?? {}).length > Object.keys(b.languages ?? {}).length ? a : b)

  const datos = [
    { label: 'Más poblado',       pais: masPoblado,   valor: masPoblado.population.toLocaleString() + ' hab.' },
    { label: 'Menos poblado',      pais: menosPoblado, valor: menosPoblado.population.toLocaleString() + ' hab.' },
    { label: 'Más grande',         pais: masGrande,    valor: masGrande.area.toLocaleString() + ' km²' },
    { label: 'Más pequeño',        pais: masChico,     valor: masChico.area.toLocaleString() + ' km²' },
    { label: 'Más fronteras',      pais: masFronteras, valor: masFronteras.borders?.length + ' fronteras' },
    { label: 'Más idiomas',        pais: masIdiomas,   valor: Object.keys(masIdiomas.languages ?? {}).length + ' idiomas' },
  ]

  return (
    <div className="original-container">
      <h1>Países Únicos</h1>
      <div className="original-grid">
        {datos.map((item) => (
          <div key={item.label} className="original-card">
            <p className="original-label">{item.label}</p>
            <img src={item.pais.flags.png} alt={item.pais.name.common} width={60} />
            <p className="original-nombre">{item.pais.name.common}</p>
            <p className="original-valor">{item.valor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Original