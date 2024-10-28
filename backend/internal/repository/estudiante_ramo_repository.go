package repository

import (
	"context"

	"github.com/elfaldia/Proyecciones-FAMED/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type EstudianteRamoRepository interface {
	FindAll() ([]model.EstudianteRamo, error)
	FindEstudiantesByRamo(string) ([]model.EstudianteRamo, error)
	FindRamosByEstudiante(string) ([]model.EstudianteRamo, error)
	FindById(string) (model.EstudianteRamo, error)
	InsertOne(model.EstudianteRamo) (model.EstudianteRamo, error)
	DeleteOne(string) (bool, error)
}

type EstudianteRamoRepositoryImpl struct {
	EstudianteRamoCollection *mongo.Collection
}

func NewEstudianteRamoRepositoryImpl(estudianteRamoCollection *mongo.Collection) EstudianteRamoRepository {
	return &EstudianteRamoRepositoryImpl{EstudianteRamoCollection: estudianteRamoCollection}
}

func (e *EstudianteRamoRepositoryImpl) FindAll() (res []model.EstudianteRamo, err error) {

	cursor, err := e.EstudianteRamoCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return res, err
	}
	err = cursor.All(context.TODO(), &res)
	if err != nil {
		return res, err
	}
	return res, nil
}

func (e *EstudianteRamoRepositoryImpl) FindEstudiantesByRamo(idRamo string) (ramos []model.EstudianteRamo, err error) {

	objectRamoID, err := primitive.ObjectIDFromHex(idRamo)
	if err != nil {
		return []model.EstudianteRamo{}, err
	}
	cursor, err := e.EstudianteRamoCollection.Find(context.TODO(), bson.M{"id_ramo": objectRamoID})
	if err != nil {
		return []model.EstudianteRamo{}, err
	}
	err = cursor.All(context.TODO(), &ramos)
	if err != nil {
		return []model.EstudianteRamo{}, err
	}
	return ramos, nil
}

func (e *EstudianteRamoRepositoryImpl) FindRamosByEstudiante(idEstudiante string) (ramos []model.EstudianteRamo, err error) {

	objectRamoID, err := primitive.ObjectIDFromHex(idEstudiante)
	if err != nil {
		return []model.EstudianteRamo{}, err
	}
	cursor, err := e.EstudianteRamoCollection.Find(context.TODO(), bson.M{"id_estudiante": objectRamoID})
	if err != nil {
		return []model.EstudianteRamo{}, err
	}
	err = cursor.All(context.TODO(), &ramos)
	if err != nil {
		return []model.EstudianteRamo{}, err
	}
	return ramos, nil
}

func (e *EstudianteRamoRepositoryImpl) FindById(_id string) (comentario model.EstudianteRamo, err error) {

	objectID, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return model.EstudianteRamo{}, err
	}
	err = e.EstudianteRamoCollection.FindOne(context.TODO(), bson.M{"_id": objectID}).Decode(&comentario)
	if err != nil {
		return model.EstudianteRamo{}, err
	}
	return comentario, nil
}

func (e *EstudianteRamoRepositoryImpl) InsertOne(estudianteRamo model.EstudianteRamo) (model.EstudianteRamo, error) {

	insertEstudianteRamo, err := e.EstudianteRamoCollection.InsertOne(context.TODO(), estudianteRamo)
	if err != nil {
		return model.EstudianteRamo{}, err
	}
	estudianteRamo.Id = insertEstudianteRamo.InsertedID.(primitive.ObjectID)
	return estudianteRamo, nil
}


func (e *EstudianteRamoRepositoryImpl) DeleteOne(_id string) (bool, error) {

	objectID, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return false, err
	}
	cursor, err := e.EstudianteRamoCollection.DeleteOne(context.TODO(), bson.M{"_id": objectID})
	if err != nil {
		return false, err
	}
	if cursor.DeletedCount >= 1 {
		return true, nil
	}
	return false, nil
}
