package service

import (
	"errors"

	"github.com/elfaldia/taller-noSQL/internal/model"
	"github.com/elfaldia/taller-noSQL/internal/repository"
	"github.com/elfaldia/taller-noSQL/internal/request"
	"github.com/elfaldia/taller-noSQL/internal/response"
	"github.com/go-playground/validator"
)

type UsuarioService interface {
	FindAll() ([]response.UsuarioResponse, error)
	FindById(string) (response.UsuarioResponse, error)
	CreateUsuario(request.CreateUsuarioRequest) (response.UsuarioResponse, error)
	DeleteUsuario(string) (bool, error)
}

type UsuarioServiceImpl struct {
	UsuarioRepository repository.UsuarioRepository
	Validate          *validator.Validate
}

func NewUsuarioServiceImpl(usuarioRepository repository.UsuarioRepository, validate *validator.Validate) (service UsuarioService, err error) {
	if validate == nil {
		return nil, errors.New("validator no puede ser nil")
	}
	return &UsuarioServiceImpl{
		UsuarioRepository: usuarioRepository,
		Validate:          validate,
	}, nil
}

func (u *UsuarioServiceImpl) FindAll() (res []response.UsuarioResponse, err error) {
	data, err := u.UsuarioRepository.FindAll()
	if err != nil {
		return []response.UsuarioResponse{}, err
	}
	for _, value := range data {
		usuario := response.UsuarioResponse{
			Id:         value.Id,
			Nombre:     value.Nombre,
			Apellido:   value.Apellido,
			Rut:        value.Rut,
			EsProfesor: value.EsProfesor,
		}
		res = append(res, usuario)
	}
	return res, nil
}

func (u *UsuarioServiceImpl) FindById(_id string) (response.UsuarioResponse, error) {
	data, err := u.UsuarioRepository.FindById(_id)
	if err != nil {
		return response.UsuarioResponse{}, err
	}

	res := response.UsuarioResponse{
		Id:         data.Id,
		Nombre:     data.Nombre,
		Apellido:   data.Apellido,
		Rut:        data.Rut,
		EsProfesor: data.EsProfesor,
	}
	return res, nil
}

func (u *UsuarioServiceImpl) CreateUsuario(req request.CreateUsuarioRequest) (response.UsuarioResponse, error) {
	err := u.Validate.Struct(req)
	if err != nil {
		return response.UsuarioResponse{}, err
	}

	usuario := model.Usuario{
		Nombre:     req.Nombre,
		Apellido:   req.Apellido,
		Rut:        req.Rut,
		EsProfesor: req.EsProfesor,
	}

	data, err := u.UsuarioRepository.InsertOne(usuario)
	if err != nil {
		return response.UsuarioResponse{}, err
	}
	res := response.UsuarioResponse{
		Id:         data.Id,
		Nombre:     req.Nombre,
		Apellido:   req.Apellido,
		Rut:        req.Rut,
		EsProfesor: req.EsProfesor,
	}
	return res, nil

}

func (u *UsuarioServiceImpl) DeleteUsuario(_id string) (bool, error) {
	return u.UsuarioRepository.DeleteOne(_id)
}