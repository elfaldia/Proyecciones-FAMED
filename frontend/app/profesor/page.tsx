import React from 'react'

const PaginaProfesores = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">¡Bienvenido a Simulaciones-FAMED!</h1>
      <p className="mb-4">Monitorea el progreso de tus estudiantes en tiempo real.</p>
      <ul className="list-disc pl-8 mb-6">
        <li><strong>Visualización instantánea de promedios:</strong> Obtén una visión clara del desempeño de cada estudiante.</li>
        <li><strong>Búsquedas personalizadas:</strong> Filtra de manera alfabética, por año o cualquier otro criterio para encontrar la información que necesitas.</li>
        <li><strong>Integración con Banner:</strong> Las notas se actualizan automáticamente, ahorrándote tiempo y esfuerzo.</li>
      </ul>
    </div>
  )
}

export default PaginaProfesores;