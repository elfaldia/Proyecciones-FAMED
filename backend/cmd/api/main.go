package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/elfaldia/Proyecciones-FAMED/internal/controller"
	"github.com/elfaldia/Proyecciones-FAMED/internal/db"
	"github.com/elfaldia/Proyecciones-FAMED/internal/repository"
	"github.com/elfaldia/Proyecciones-FAMED/internal/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

func main() {

	client, err := db.ConnectToDataBase()
	if err != nil {
		log.Fatal(err.Error())
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error desconectando de MongoDB: %v", err)
		}
	}()

	db := client.Database("FAMED")
	validator := validator.New()

	usuarioCollection := db.Collection("usuario")
	usuarioRep := repository.NewUsuarioRepositoryImpl(usuarioCollection)
	usuarioService, _ := service.NewUsuarioServiceImpl(usuarioRep, validator)
	usuarioController := controller.NewUsuarioController(usuarioService)

	ramoCollection := db.Collection("ramo")
	ramoRep := repository.NewRamoRepositoryImpl(ramoCollection)
	ramoService, _ := service.NewRamoServiceImpl(ramoRep, validator)
	ramoController := controller.NewRamoController(ramoService)

	estudianteRamoCollection := db.Collection("estudiante_ramo")
	estudianteRamoRep := repository.NewEstudianteRamoRepositoryImpl(estudianteRamoCollection)
	estudianteRamoService, _ := service.NewEstudianteRamoServiceImpl(estudianteRamoRep, validator)
	estudianteRamoController := controller.NewEstudianteRamoController(estudianteRamoService)

	routes := gin.Default()

	UsuarioRouter(routes, usuarioController)
	RamoRouter(routes, ramoController, estudianteRamoController)
	EstudianteRamoRouter(routes, estudianteRamoController)

	routes.Use(cors.Default()) // "*"
	// CORS da problemas si se hace despues primero definir CORS y luego las rutas
	/*
		routes.Use(cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:3000"},
			AllowMethods:     []string{"PUT", "GET", "POST", "DELETE"},
			AllowHeaders:     []string{"Origin"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
		}))
	*/

	server := &http.Server{
		Addr:           ":8080",
		Handler:        routes,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	err = server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}

}
