package controller

import (
	"net/http"

	"github.com/elfaldia/Proyecciones-FAMED/internal/request"
	"github.com/elfaldia/Proyecciones-FAMED/internal/response"
	"github.com/elfaldia/Proyecciones-FAMED/internal/service"
	"github.com/gin-gonic/gin"
)

type RamoController struct {
	RamoService service.RamoService
}

func NewRamoController(service service.RamoService) *RamoController {
	return &RamoController{RamoService: service}
}

func (controller *RamoController) FindAll(ctx *gin.Context) {
	data, err := controller.RamoService.FindAll()

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

func (controller *RamoController) FindById(ctx *gin.Context) {
	id := ctx.Param("id")
	data, err := controller.RamoService.FindById(id)
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

func (controller *RamoController) CreateClase(ctx *gin.Context) {
	var req request.CreateRamoRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.ErrorResponse{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	err := controller.RamoService.CreateRamo(req)
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

func (controller *EstudianteRamoController) DeleteEstudianteRamo(ctx *gin.Context) {
	id := ctx.Param("id")

	data, err := controller.EstudianteRamoService.DeleteEstudianteRamo(id)
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
