package request

import "github.com/elfaldia/taller-noSQL/internal/model"

type CreateEstudianteRamoRequest struct {
	IdRamo       string       `json:"id_ramo" validate:"required"`
	IdEstudiante string       `json:"id_estudiante" validate:"required"`
	Notas        []model.Nota `json:"notas" validate:"required"`
}
