package service

import (
	"errors"

	"github.com/elfaldia/taller-noSQL/internal/model"
	"github.com/elfaldia/taller-noSQL/internal/repository"
	"github.com/elfaldia/taller-noSQL/internal/request"
	"github.com/elfaldia/taller-noSQL/internal/response"
	"github.com/go-playground/validator"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EstudianteRamoService interface {
	FindAll() ([]response.EstudianteRamoResponse, error)
	FindById(string) (response.EstudianteRamoResponse, error)
	FindEstudiantesByRamo(string) ([]string, error) // [ids de estudiantes]
	FindRamosByEstudiante(string) ([]string, error) // [ids de ramos]
	CreateEstudianteRamo(request.CreateEstudianteRamoRequest) (response.EstudianteRamoResponse, error)
	DeleteEstudianteRamo(string) (bool, error)
}

type EstudianteRamoServiceImpl struct {
	EstudianteRamoRepository repository.EstudianteRamoRepository
	Validate                 *validator.Validate
}

func NewEstudianteRamoServiceImpl(estudianteRamoRep repository.EstudianteRamoRepository, validate *validator.Validate) (service EstudianteRamoService, err error) {
	if validate == nil {
		return nil, errors.New("validator no puede ser nil")
	}
	return &EstudianteRamoServiceImpl{
		EstudianteRamoRepository: estudianteRamoRep,
		Validate:                 validate,
	}, nil
}

func (e *EstudianteRamoServiceImpl) CreateEstudianteRamo(req request.CreateEstudianteRamoRequest) (response.EstudianteRamoResponse, error) {

	err := e.Validate.Struct(req)
	if err != nil {
		return response.EstudianteRamoResponse{}, err
	}

	idRamo, err := primitive.ObjectIDFromHex(req.IdRamo)
	if err != nil {
		return response.EstudianteRamoResponse{}, err
	}

	idEstudiante, err := primitive.ObjectIDFromHex(req.IdEstudiante)
	if err != nil {
		return response.EstudianteRamoResponse{}, err
	}

	model := model.EstudianteRamo{
		IdRamo:       idRamo,
		IdEstudiante: idEstudiante,
		Notas:        req.Notas,
	}
	data, err := e.EstudianteRamoRepository.InsertOne(model)
	if err != nil {
		return response.EstudianteRamoResponse{}, err
	}

	res := response.EstudianteRamoResponse{
		Id:           data.Id,
		IdRamo:       data.IdRamo,
		IdEstudiante: data.IdEstudiante,
		Notas:        data.Notas,
	}
	return res, nil
}

func (e *EstudianteRamoServiceImpl) DeleteEstudianteRamo(_id string) (bool, error) {

	deleted, err := e.EstudianteRamoRepository.DeleteOne(_id)
	if err != nil {
		return false, err
	}
	return deleted, nil
}

func (e *EstudianteRamoServiceImpl) FindAll() (res []response.EstudianteRamoResponse, err error) {

	data, err := e.EstudianteRamoRepository.FindAll()
	if err != nil {
		return []response.EstudianteRamoResponse{}, err
	}

	for _, value := range data {
		estRamo := response.EstudianteRamoResponse{
			Id:           value.Id,
			IdRamo:       value.IdRamo,
			IdEstudiante: value.IdEstudiante,
			Notas:        value.Notas,
		}
		res = append(res, estRamo)
	}
	return res, nil
}

func (e *EstudianteRamoServiceImpl) FindById(_id string) (response.EstudianteRamoResponse, error) {

	data, err := e.EstudianteRamoRepository.FindById(_id)
	if err != nil {
		return response.EstudianteRamoResponse{}, err
	}

	res := response.EstudianteRamoResponse{
		Id:           data.Id,
		IdRamo:       data.IdRamo,
		IdEstudiante: data.IdEstudiante,
	}
	return res, nil
}

func (e *EstudianteRamoServiceImpl) FindEstudiantesByRamo(idRamo string) (res []string, err error) {

	data, err := e.EstudianteRamoRepository.FindEstudiantesByRamo(idRamo)
	if err != nil {
		return []string{}, err
	}

	for _, value := range data {
		idEstudiante := value.IdEstudiante.Hex()
		res = append(res, idEstudiante)
	}
	return res, nil
}

func (e *EstudianteRamoServiceImpl) FindRamosByEstudiante(idEstudiante string) (res []string, err error) {

	data, err := e.EstudianteRamoRepository.FindEstudiantesByRamo(idEstudiante)
	if err != nil {
		return []string{}, err
	}

	for _, value := range data {
		idRamo := value.IdRamo.Hex()
		res = append(res, idRamo)
	}
	return res, nil
}
