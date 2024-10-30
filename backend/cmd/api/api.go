package main

import (
	"github.com/elfaldia/Proyecciones-FAMED/internal/controller"
	"github.com/gin-gonic/gin"
)

func UsuarioRouter(service *gin.Engine, cUsuaurio *controller.UsuarioController) {
	router := service.Group("usuario")

	router.GET("", cUsuaurio.FindAll)
	router.POST("", cUsuaurio.CreateUsuario)

	router.POST("/auth/login", cUsuaurio.Login)
	router.GET("/auth/check-token", cUsuaurio.CheckToken)
}

func RamoRouter(
	service *gin.Engine,
	controllerRamo *controller.RamoController,
	controllerEstudianteRamo *controller.EstudianteRamoController,
	controllerUsuario *controller.UsuarioController,
) {
	router := service.Group("ramo", controllerUsuario.ProfesorMiddleWare)

	router.GET("", controllerRamo.FindAll)
}

func EstudianteRamoRouter(service *gin.Engine, controller *controller.EstudianteRamoController) {
	router := service.Group("estudiante")

	router.GET("/:estudiante_id", controller.FindRamosByEstudiante)

}
