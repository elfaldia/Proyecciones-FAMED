package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Ramo struct {
	Id       primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Nombre   string             `json:"nombre" bson:"nombre"`
	Creditos int                `json:"creditosAsociados" bson:"creditosAsociados"`
	Semestre string             `json:"semestre" bson:"semestre"`
}
