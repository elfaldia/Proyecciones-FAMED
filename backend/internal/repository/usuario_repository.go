package repository

import (
	"context"

	"github.com/elfaldia/Proyecciones-FAMED/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UsuarioRepository interface {
	FindAll() ([]model.Usuario, error)
	FindById(string) (model.Usuario, error)
	FindByRut(string) (model.Usuario, error)
	InsertOne(model.Usuario) (model.Usuario, error)
	DeleteOne(string) (bool, error)
}

type UsuarioRepositoryImpl struct {
	UsuarioCollection *mongo.Collection
}

func NewUsuarioRepositoryImpl(usuarioCollection *mongo.Collection) UsuarioRepository {
	return &UsuarioRepositoryImpl{UsuarioCollection: usuarioCollection}
}

// FindAll implements UsuarioRepository.
func (c *UsuarioRepositoryImpl) FindAll() (usuarios []model.Usuario, err error) {
	cursor, err := c.UsuarioCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return []model.Usuario{}, err
	}
	err = cursor.All(context.TODO(), &usuarios)
	if err != nil {
		return []model.Usuario{}, err
	}
	return usuarios, nil
}

func (u *UsuarioRepositoryImpl) FindById(_id string) (usuario model.Usuario, err error) {

	objectID, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return model.Usuario{}, err
	}

	err = u.UsuarioCollection.FindOne(context.TODO(), bson.M{"_id": objectID}).Decode(&usuario)
	if err != nil {
		return model.Usuario{}, err
	}
	return usuario, nil
}

func (u *UsuarioRepositoryImpl) InsertOne(usuario model.Usuario) (model.Usuario, error) {

	insertarUsuario, err := u.UsuarioCollection.InsertOne(context.TODO(), usuario)
	if err != nil {
		return usuario, err
	}
	usuario.Id = insertarUsuario.InsertedID.(primitive.ObjectID)
	return usuario, nil
}

// DeleteOne implements UsuarioRepository.
func (u *UsuarioRepositoryImpl) DeleteOne(_id string) (bool, error) {

	objectID, err := primitive.ObjectIDFromHex(_id)
	if err != nil {
		return false, err
	}

	cursor, err := u.UsuarioCollection.DeleteOne(context.TODO(), bson.M{"_id": objectID})
	if err != nil {
		return false, err
	}
	if cursor.DeletedCount >= 1 {
		return true, nil
	}
	return false, nil
}

func (u *UsuarioRepositoryImpl) FindByRut(rut string) (usuario model.Usuario, err error) {

	err = u.UsuarioCollection.FindOne(context.TODO(), bson.M{"rut": rut}).Decode(&usuario)
	if err != nil {
		return model.Usuario{}, err
	}
	return usuario, nil
}
