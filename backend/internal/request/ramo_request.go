package request

type CreateRamoRequest struct {
	Nombre   string `json:"nombre" validate:"required"`
	Creditos int    `json:"indice" validate:"required"`
	Semestre string `json:"id_curso" validate:"required"`
}
