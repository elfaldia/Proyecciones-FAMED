package controller

import (
	"net/http"

	"github.com/elfaldia/Proyecciones-FAMED/internal/request"
	"github.com/elfaldia/Proyecciones-FAMED/internal/response"
	"github.com/elfaldia/Proyecciones-FAMED/internal/service"
	"github.com/gin-gonic/gin"
)

type EstudianteRamoController struct {
	EstudianteRamoService service.EstudianteRamoService
}

func NewEstudianteRamoController(service service.EstudianteRamoService) *EstudianteRamoController {
	return &EstudianteRamoController{EstudianteRamoService: service}
}


func (controller *EstudianteRamoController) FindAll(ctx *gin.Context) {
	data, err := controller.EstudianteRamoService.FindAll()

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

func (controller *EstudianteRamoController) FindById(ctx *gin.Context) {
	id := ctx.Param("id")
	data, err := controller.EstudianteRamoService.FindById(id)
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


func (controller *EstudianteRamoController) FindEstudiantesByRamo(ctx *gin.Context) {

	idRamo := ctx.Param("ramo_id")

	data, err := controller.EstudianteRamoService.FindEstudiantesByRamo(idRamo)

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

func (controller *EstudianteRamoController) FindRamosByEstudiante(ctx *gin.Context) {

	idEstudiante := ctx.Param("estudiante_id")

	data, err := controller.EstudianteRamoService.FindEstudiantesByRamo(idEstudiante)

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



func (controller *EstudianteRamoController) CreateEstudianteRamo(ctx *gin.Context) {
	var req request.CreateEstudianteRamoRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, response.ErrorResponse{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
		return
	}

	_, err := controller.EstudianteRamoService.CreateEstudianteRamo(req)
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


