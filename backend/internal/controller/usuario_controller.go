package controller

import (
	"net/http"

	"github.com/elfaldia/Proyecciones-FAMED/internal/request"
	"github.com/elfaldia/Proyecciones-FAMED/internal/response"
	"github.com/elfaldia/Proyecciones-FAMED/internal/service"
	"github.com/gin-gonic/gin"
)

type UsuarioController struct {
	UsuarioService service.UsuarioService
}

func NewUsuarioController(service service.UsuarioService) *UsuarioController {
	return &UsuarioController{UsuarioService: service}
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
