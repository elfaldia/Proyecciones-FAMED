package repository

import (
	"context"

	"github.com/elfaldia/taller-noSQL/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RamoRepository interface {
	FindAll() ([]model.Ramo, error)
	FindById(string) (model.Ramo, error)
	InsertOne(model.Ramo) (model.Ramo, error)
}

type RamoRepositoryImpl struct {
	RamoCollection *mongo.Collection
}

func NewRamoRepositoryImpl(ramoCollection *mongo.Collection) RamoRepository {
	return &RamoRepositoryImpl{RamoCollection: ramoCollection}
}

func (r *RamoRepositoryImpl) FindAll() (ramos []model.Ramo, err error) {

	cursor, err := r.RamoCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	err = cursor.All(context.TODO(), &ramos)
	if err != nil {
		return nil, err
	}
	return ramos, nil
}

func (r *RamoRepositoryImpl) FindById(_id string) (ramo model.Ramo, err error) {

	objectID, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return ramo, err
	}

	err = r.RamoCollection.FindOne(context.TODO(), bson.M{"_id": objectID}).Decode(&ramo)
	if err != nil {
		return ramo, err
	}
	return ramo, nil
}


func (r *RamoRepositoryImpl) InsertOne(ramo model.Ramo) (model.Ramo, error) {

	insertarRamo, err := r.RamoCollection.InsertOne(context.TODO(), ramo)
	if err != nil {
		return ramo, err
	}

	ramo.Id = insertarRamo.InsertedID.(primitive.ObjectID)
	return ramo, nil
}
