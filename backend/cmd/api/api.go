package main

import (
	"github.com/elfaldia/taller-noSQL/internal/controller"
	"github.com/gin-gonic/gin"
)

func UsuarioRouter(service *gin.Engine, cUsuaurio *controller.UsuarioController) {
	router := service.Group("usuario")

	router.GET("", cUsuaurio.FindAll)
}

func RamoRouter(service *gin.Engine, controllerRamo *controller.RamoController, controllerEstudianteRamo *controller.EstudianteRamoController) {
	router := service.Group("ramo")

	router.GET("", controllerRamo.FindAll)
}

func EstudianteRamoRouter(service *gin.Engine, controller *controller.EstudianteRamoController) {
	router := service.Group("estudiante")

	router.GET("/:estudiante_id", controller.FindRamosByEstudiante)

}
