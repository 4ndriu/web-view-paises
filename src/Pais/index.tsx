import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./style.css"

interface PaisData {
  cca2: string
  name: {
    common: string
    official: string
  }
  flags: {
    png: string
    svg: string
  }
  capital: string[]
  population: number
  area: number
  subregion: string
  region: string
  languages: Record<string, string>
  currencies: Record<string, { name: string; symbol: string }>
  timezones: string[]
  borders: string[]
  maps: {
    googleMaps: string
  }
}

interface PaisFavorito {
  cca2: string
  name: { common: string }
  flags: { png: string }
  capital: string[]
}

function Pais() {
  const { cca2 } = useParams<{ cca2: string }>();
  const [data, setData] = useState<PaisData | null>(null);
  const [esFavorito, setEsFavorito] = useState(false)

  useEffect(() => {
    if (!cca2) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`);
        const json = await res.json();
        setData(json[0]);

        // Verificar si ya es favorito
        const guardados: PaisFavorito[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
        setEsFavorito(guardados.some((p) => p.cca2.toLowerCase() === cca2.toLowerCase()))
      } catch (error) {
        console.error("Error cargando país:", error);
      }
    };

    fetchData();
  }, [cca2]);

  const toggleFavorito = () => {
    if (!data) return
    const guardados: PaisFavorito[] = JSON.parse(localStorage.getItem('favoritos') || '[]')

    if (esFavorito) {
      const nuevos = guardados.filter((p) => p.cca2.toLowerCase() !== data.cca2.toLowerCase())
      localStorage.setItem('favoritos', JSON.stringify(nuevos))
      setEsFavorito(false)
    } else {
      const nuevo: PaisFavorito = {
        cca2: data.cca2,
        name: data.name,
        flags: data.flags,
        capital: data.capital
      }
      localStorage.setItem('favoritos', JSON.stringify([...guardados, nuevo]))
      setEsFavorito(true)
    }
  }

  if (!data) return <p>Cargando...</p>;

  return (
  <div className="pais-container">
    <div className="pais-header">
      <img src={data.flags.png} alt={data.name.common} width={80} />
      <div>
        <h1>{data.name.common}</h1>
        <p>{data.name.official}</p>
      </div>
    </div>

    <div className="pais-card">
      <p><span>Capital</span>{data.capital?.[0] ?? '—'}</p>
      <p><span>Subregión</span>{data.subregion}, {data.region}</p>
      <p><span>Población</span>{data.population.toLocaleString()} hab.</p>
      <p><span>Área</span>{data.area.toLocaleString()} km²</p>
      <p><span>Idiomas</span>{Object.values(data.languages ?? {}).join(', ')}</p>
      <p><span>Monedas</span>{Object.values(data.currencies ?? {}).map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
    </div>

    <div className="pais-links">
      <a href={data.maps.googleMaps} target="_blank">🗺️ Google Maps</a>
    </div>

    <button className="pais-favorito" onClick={toggleFavorito}>
      {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
    </button>
  </div>
)
}

export default Pais