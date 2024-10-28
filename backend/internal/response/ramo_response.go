package response

import "go.mongodb.org/mongo-driver/bson/primitive"

type RamoResponse struct {
	Id       primitive.ObjectID `bson:"_id" json:"_id"`
	Nombre   string             `json:"nombre" bson:"nombre"`
	Creditos int                `json:"creditos" bson:"creditos"`
	Semestre string             `json:"semestre" bson:"semestre"`
}
