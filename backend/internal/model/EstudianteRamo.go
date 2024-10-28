package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type EstudianteRamo struct {
	Id           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	IdRamo       primitive.ObjectID `bson:"id_ramo" json:"id_ramo"`
	IdEstudiante primitive.ObjectID `json:"id_estudiante" bson:"id_estudiante"`
	Notas        []Nota             `json:"notas" bson:"notas"`
}

type Nota struct {
	Calificacion float64 `json:"calificacion" bson:"calificacion"`
	Porcentaje   float64 `json:"porcentaje" bson:"porcentaje"`
	Tipo         string  `json:"tipo" bson:"tipo"`
}
