package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Usuario struct {
	Id         primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Nombre     string             `json:"nombre" bson:"nombre"`
	Apellido   string             `json:"apellido" bson:"apellido"`
	Rut        string             `json:"rut" bson:"rut"`
	EsProfesor bool               `json:"es_profesor" bson:"es_profesor"` // admin
}