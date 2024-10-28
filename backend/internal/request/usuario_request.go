package request

type CreateUsuarioRequest struct {
	Nombre     string `json:"nombre" validate:"required"`
	Apellido   string `json:"apellido" validate:"required"`
	Rut        string `json:"rut" validate:"required"`
	EsProfesor bool   `json:"es_profesor" validate:"required"`
}
