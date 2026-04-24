import "./style.css"

function Informativa() {
  return (
    <div className="informativa-container">
      <h1>Acerca de la app</h1>

      <div className="informativa-card">
        <h2>¿Qué es esta app?</h2>
        <p>
          Una aplicación web que te permite consultar información
          sobre países del mundo de forma rápida y sencilla :).
        </p>
      </div>

      <div className="informativa-card">
        <h2>¿Qué puedes ver?</h2>
        <ul>
          <li>Países por región</li>
          <li>Banderas y capitales</li>
          <li>Población y área</li>
          <li>Búsqueda por nombre</li>
        </ul>
      </div>

      <div className="informativa-card">
        <h2>Fuente de datos</h2>
        <p>restcountries.com</p>
      </div>
    </div>
  )
}

export default Informativa