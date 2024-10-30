package request

type CreateUsuarioRequest struct {
	Nombre   string `json:"nombre" validate:"required"`
	Apellido string `json:"apellido" validate:"required"`
	Rut      string `json:"rut" validate:"required"`
	Rol      string `json:"rol" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type LoginRequest struct {
	Rut      string `json:"rut" binding:"required"`
	Password string `json:"password" binding:"required"`
}
