package service

import (
	"errors"
	"log"
	"time"

	"github.com/elfaldia/Proyecciones-FAMED/internal/response"
	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("auth-key")

type AuthService interface {
	CreateToken(string) (string, error)
	VerifyToken(string) (bool, error)
	ParseToken(string) (*jwt.Token, error)
}

type AuthServiceImpl struct {
	UsuarioSer UsuarioService
	Validate   *validator.Validate
}

func NewAuthServiceImpl(usuarioService UsuarioService, validate *validator.Validate) (service AuthService, err error) {
	if validate == nil {
		return nil, errors.New("validator no puede ser nil")
	}
	return &AuthServiceImpl{
		UsuarioSer: usuarioService,
		Validate:   validate,
	}, nil
}

func (a *AuthServiceImpl) CreateToken(rut string) (string, error) {

	usuario, err := a.UsuarioSer.FindByRut(rut)
	if (err != nil || usuario == response.UsuarioResponse{}) {
		return "", err
	}
	rol := usuario.Rol
	log.Printf("Rol en service: %s", rol)
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  rut,
		"iss":  "famed-app",
		"role": rol,
		"exp":  time.Now().Add(time.Hour).Unix(),
		"iat":  time.Now().Unix(),
	})

	tokenString, err := claims.SignedString(secretKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil

}

func (a *AuthServiceImpl) VerifyToken(tokenString string) (bool, error) {

	token, err := a.ParseToken(tokenString)
	if err != nil {
		return false, err
	}

	if !token.Valid {
		return false, errors.New("invalid token")
	}
	return true, nil
}

func (a *AuthServiceImpl) ParseToken(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
}
