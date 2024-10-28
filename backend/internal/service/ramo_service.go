package service

import (
	"errors"

	"github.com/elfaldia/taller-noSQL/internal/model"
	"github.com/elfaldia/taller-noSQL/internal/repository"
	"github.com/elfaldia/taller-noSQL/internal/request"
	"github.com/elfaldia/taller-noSQL/internal/response"
	"github.com/go-playground/validator"
)

type RamoService interface {
	CreateRamo(request.CreateRamoRequest) error
	FindAll() ([]response.RamoResponse, error)
	FindById(string) (response.RamoResponse, error)
}

type RamoServiceImpl struct {
	RamoRepository repository.RamoRepository
	Validate       *validator.Validate
}

func NewRamoServiceImpl(ramoRepository repository.RamoRepository, validate *validator.Validate) (service RamoService, err error) {
	if validate == nil {
		return nil, errors.New("validator no puede ser nil")
	}
	return &RamoServiceImpl{
		RamoRepository: ramoRepository,
		Validate:       validate,
	}, nil
}

func (r *RamoServiceImpl) FindAll() (ramos []response.RamoResponse, err error) {
	results, err := r.RamoRepository.FindAll()
	if err != nil {
		return nil, err
	}

	for _, value := range results {
		ramo := response.RamoResponse{
			Id:       value.Id,
			Nombre:   value.Nombre,
			Creditos: value.Creditos,
			Semestre: value.Semestre,
		}
		ramos = append(ramos, ramo)
	}
	return ramos, nil
}

func (r *RamoServiceImpl) FindById(_id string) (ramo response.RamoResponse, err error) {
	data, err := r.RamoRepository.FindById(_id)
	if err != nil {
		return response.RamoResponse{}, err
	}
	res := response.RamoResponse{
		Id:       data.Id,
		Nombre:   data.Nombre,
		Creditos: data.Creditos,
		Semestre: data.Semestre,
	}
	return res, nil
}

func (r *RamoServiceImpl) CreateRamo(req request.CreateRamoRequest) error {

	err := r.Validate.Struct(req)
	if err != nil {
		return err
	}

	ramo := model.Ramo{
		Nombre:   req.Nombre,
		Creditos: req.Creditos,
		Semestre: req.Semestre,
	}

	_, err = r.RamoRepository.InsertOne(ramo)
	if err != nil {
		return err
	}

	return nil
}
