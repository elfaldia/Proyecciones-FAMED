package controller

import (
	"log"
	"net/http"
	"strings"

	"github.com/elfaldia/Proyecciones-FAMED/internal/request"
	"github.com/elfaldia/Proyecciones-FAMED/internal/response"
	"github.com/elfaldia/Proyecciones-FAMED/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type UsuarioController struct {
	UsuarioService service.UsuarioService
	AuthService    service.AuthService
}

func NewUsuarioController(usuarioService service.UsuarioService, authService service.AuthService) *UsuarioController {
	return &UsuarioController{
		UsuarioService: usuarioService,
		AuthService:    authService,
	}
}

func (controller *UsuarioController) FindAll(ctx *gin.Context) {
	data, err := controller.UsuarioService.FindAll()

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, response.ErrorResponse{
			Code:    500,
			Message: err.Error(),
		})
		return
	}
	res := response.Response{
		Code:   200,
		Status: "OK",
		Data:   data,
	}
	ctx.JSON(http.StatusOK, res)
}

func (controller *UsuarioController) FindById(ctx *gin.Context) {
	id := ctx.Param("id")

	data, err := controller.UsuarioService.FindById(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, response.ErrorResponse{
			Code:    500,
			Message: err.Error(),
		})
		return
	}

	res := response.Response{
		Code:   200,
		Status: "OK",
		Data:   data,
	}
	ctx.JSON(http.StatusOK, res)
}

func (controller *UsuarioController) CreateUsuario(ctx *gin.Context) {
	var req request.CreateUsuarioRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.ErrorResponse{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	_, err := controller.UsuarioService.CreateUsuario(req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, response.ErrorResponse{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	res := response.Response{
		Code:   http.StatusCreated,
		Status: "Created",
		Data:   nil,
	}
	ctx.JSON(http.StatusCreated, res)
}

func (controller *UsuarioController) DeleteUsuario(ctx *gin.Context) {
	id := ctx.Param("id")

	data, err := controller.UsuarioService.DeleteUsuario(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, response.ErrorResponse{
			Code:    500,
			Message: err.Error(),
		})
		return
	}
	var status string
	if data {
		status = "deleted"
	} else {
		status = "not deleted"
	}

	res := response.Response{
		Code:   200,
		Status: status,
		Data:   data,
	}
	ctx.JSON(http.StatusOK, res)

}

func (controller *UsuarioController) Login(ctx *gin.Context) {

	var req request.LoginRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.ErrorResponse{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	tokenString, err := controller.AuthService.CreateToken(req.Rut)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, response.ErrorResponse{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, response.Response{
		Code:   200,
		Status: "OK",
		Data:   tokenString,
	})

}

func (controller *UsuarioController) CheckToken(ctx *gin.Context) {

	token := strings.Split(ctx.Request.Header["Authorization"][0], " ")[1]
	esValido, err := controller.AuthService.VerifyToken(token)
	if err != nil || !esValido {
		ctx.JSON(http.StatusUnauthorized, response.ErrorResponse{
			Code:    http.StatusUnauthorized,
			Message: "unauthorized",
		})
		return
	}
	ctx.JSON(http.StatusAccepted, response.Response{
		Code:   http.StatusAccepted,
		Status: "OK",
		Data:   esValido,
	})
}

func (controller *UsuarioController) ProfesorMiddleWare(ctx *gin.Context) {

	tokenString := strings.Split(ctx.Request.Header["Authorization"][0], " ")[1]
	token, err := controller.AuthService.ParseToken(tokenString)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, response.ErrorResponse{
			Code:    http.StatusUnauthorized,
			Message: "unauthorized",
		})
		return
	}
	claims := token.Claims.(jwt.MapClaims)
	role := claims["role"].(string)
	log.Printf("role: %s", role)
	if role != "profesor" {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Forbidden"})
		ctx.Abort()
		return
	}
	ctx.Next()
}
