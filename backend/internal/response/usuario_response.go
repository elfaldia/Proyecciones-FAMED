package response

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsuarioResponse struct {
	Id       primitive.ObjectID `bson:"_id" json:"_id"`
	Nombre   string             `json:"nombre" bson:"nombre"`
	Apellido string             `json:"apellido" bson:"apellido"`
	Rut      string             `json:"rut" bson:"rut"`
	Rol      string             `json:"rol" bson:"rol"`
	Password string             `json:"password"`
}

type CheckTokenResponse struct {
	IsValid bool   `json:"is_valid"`
	Rol     string `json:"rol"`
}

type LoginResponse struct {
	Success     bool   `json:"success"`
	Nombre      string `json:"nombre"`
	Rol         string `json:"rol"`
	AccessToken string `json:"access_token"`
}

type EstudianteResponse struct {
	Id       primitive.ObjectID `json:"_id"`
	Nombre   string             `json:"nombre"`
	Apellido string             `json:"apellido"`
	Rut      string             `json:"rut"`
}
