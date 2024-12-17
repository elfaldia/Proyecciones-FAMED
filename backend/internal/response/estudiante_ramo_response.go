package response

import (
	"github.com/elfaldia/Proyecciones-FAMED/internal/model"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EstudianteRamoResponse struct {
	Id           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	IdRamo       primitive.ObjectID `bson:"id_ramo" json:"id_ramo"`
	IdEstudiante primitive.ObjectID `json:"id_estudiante" bson:"id_estudiante"`
	Notas        []model.Nota       `json:"notas" bson:"notas"`
	Validar      bool               `json:"validar" bson:"validar"`
}
