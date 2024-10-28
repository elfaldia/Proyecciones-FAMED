package request

import "github.com/elfaldia/Proyecciones-FAMED/internal/model"

type CreateEstudianteRamoRequest struct {
	IdRamo       string       `json:"id_ramo" validate:"required"`
	IdEstudiante string       `json:"id_estudiante" validate:"required"`
	Notas        []model.Nota `json:"notas" validate:"required"`
}
