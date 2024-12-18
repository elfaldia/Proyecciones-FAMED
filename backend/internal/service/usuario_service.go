package service

import (
	"errors"
	"log"

	"github.com/elfaldia/Proyecciones-FAMED/env"
	"github.com/elfaldia/Proyecciones-FAMED/internal/model"
	"github.com/elfaldia/Proyecciones-FAMED/internal/repository"
	"github.com/elfaldia/Proyecciones-FAMED/internal/request"
	"github.com/elfaldia/Proyecciones-FAMED/internal/response"
	"github.com/go-playground/validator"
)

type UsuarioService interface {
	FindAll() ([]response.UsuarioResponse, error)
	FindById(string) (response.UsuarioResponse, error)
	FindByRut(string) (response.UsuarioResponse, error)
	CreateUsuario(request.CreateUsuarioRequest) (response.UsuarioResponse, error)
	DeleteUsuario(string) (bool, error)
	GetEstudiantes() ([]response.EstudianteResponse, error)
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
			Id:           value.Id,
			Nombre:       value.Nombre,
			Apellido:     value.Apellido,
			Rut:          value.Rut,
			Rol:          value.Rol,
			Password:     value.Password,
			AnioAdmision: value.AnioAdmision,
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
		Id:       data.Id,
		Nombre:   data.Nombre,
		Apellido: data.Apellido,
		Rut:      data.Rut,
		Rol:      data.Rol,
		Password: data.Password,
	}
	return res, nil
}

func (u *UsuarioServiceImpl) CreateUsuario(req request.CreateUsuarioRequest) (response.UsuarioResponse, error) {

	err := u.Validate.Struct(req)
	if err != nil {
		return response.UsuarioResponse{}, err
	}

	usuario := model.Usuario{
		Nombre:   req.Nombre,
		Apellido: req.Apellido,
		Rut:      req.Rut,
		Rol:      req.Rol,
		Password: req.Password,
	}

	data, err := u.UsuarioRepository.InsertOne(usuario)
	if err != nil {
		return response.UsuarioResponse{}, err
	}
	res := response.UsuarioResponse{
		Id:       data.Id,
		Nombre:   req.Nombre,
		Apellido: req.Apellido,
		Rut:      req.Rut,
		Rol:      req.Rol,
		Password: req.Password,
	}
	return res, nil

}

func (u *UsuarioServiceImpl) DeleteUsuario(_id string) (bool, error) {
	return u.UsuarioRepository.DeleteOne(_id)
}

// FindByRut implements UsuarioService.
func (u *UsuarioServiceImpl) FindByRut(rut string) (response.UsuarioResponse, error) {
	data, err := u.UsuarioRepository.FindByRut(rut)
	if err != nil {
		return response.UsuarioResponse{}, err
	}
	log.Printf(data.Nombre)
	res := response.UsuarioResponse{
		Id:       data.Id,
		Nombre:   data.Nombre,
		Apellido: data.Apellido,
		Rut:      data.Rut,
		Rol:      data.Rol,
		Password: data.Password,
	}
	return res, nil
}

// GetEstudiantes implements UsuarioService.
func (u *UsuarioServiceImpl) GetEstudiantes() ([]response.EstudianteResponse, error) {
	data, err := u.FindAll()
	if err != nil {
		return []response.EstudianteResponse{}, err
	}

	dataEstudiante := []response.EstudianteResponse{}

	for _, u := range data {
		if u.Rol == env.GetString("ROL_ESTUDIANTE", "") {
			dataEstudiante = append(dataEstudiante, response.EstudianteResponse{
				Id:           u.Id,
				Nombre:       u.Nombre,
				Apellido:     u.Apellido,
				Rut:          u.Rut,
				AnioAdmision: u.AnioAdmision,
			})
		}
	}
	return dataEstudiante, nil
}
