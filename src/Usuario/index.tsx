import "./style.css"

function Usuario() {
  return (
    <div className="usuario-container">
      <h1>Perfil</h1>
      <div className="usuario-card">
        <h2>Información del usuario</h2>
        <p><span>Nombre:</span> Juan Pérez</p>
        <p><span>Email:</span> juan.perez@ejemplo.com</p>
        <p><span>País:</span> Venezuela</p>
        <p><span>Edad:</span> 30 años</p>
      </div>
    </div>
  )
}

export default Usuario