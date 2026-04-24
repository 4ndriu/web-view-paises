import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./style.css"

interface PaisData {
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

function Pais() {
  const { cca2 } = useParams<{ cca2: string }>();
  const [data, setData] = useState<PaisData | null>(null);

  useEffect(() => {
    if (!cca2) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${cca2}`
        );
        const json = await res.json();
        setData(json[0]); // La API retorna un array
      } catch (error) {
        console.error("Error cargando país:", error);
      }
    };

    fetchData();
  }, [cca2]);

  if (!data) return <p>Cargando...</p>;

  return (
    <>
      <img src={data.flags.png} alt={data.name.common} width={120} />
      <p>{data.name.common}</p>
      <p>{data.name.official}</p>
      <p>{data.capital?.[0] ?? '—'}</p>
      <p>{data.subregion}, {data.region}</p>
      <p>{data.population.toLocaleString()} habitantes</p>
      <p>{data.area.toLocaleString()} km²</p>
      <p>{Object.values(data.languages ?? {}).join(', ')}</p>
      <p>{Object.values(data.currencies ?? {}).map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
      <a href={data.maps.googleMaps} target="_blank">Ver en Google Maps</a>
    </>
  )
}

export default Pais