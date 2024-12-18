package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/elfaldia/Proyecciones-FAMED/env"
	"github.com/elfaldia/Proyecciones-FAMED/internal/controller"
	"github.com/elfaldia/Proyecciones-FAMED/internal/db"
	"github.com/elfaldia/Proyecciones-FAMED/internal/repository"
	"github.com/elfaldia/Proyecciones-FAMED/internal/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/joho/godotenv"
)

func main() {

	err1 := godotenv.Load(".envrc")
	if err1 != nil {
		log.Fatalf("Error cargando archivo .envrc: %v", err1)
	}

	var databaseAdapter db.DatabaseAdapter
	mongoURI := env.GetString("URL_MONGO_FAMED", "mongodb+srv://user:MlUbLvrzfEYUDu6O@famed.dbhrq.mongodb.net/?retryWrites=true&w=majority&appName=FAMED")
	databaseAdapter = db.NewMongoAdapter(mongoURI)

	if err := databaseAdapter.Connect(); err != nil {
		log.Fatalf("Error conectando a la base de datos: %v", err)
	}
	defer func() {
		if err := databaseAdapter.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error desconectando de la base de datos: %v", err)
		}
	}()

	if err := databaseAdapter.Ping(context.TODO()); err != nil {
		log.Fatal(err)
	}

	// Obtenemos el cliente de MongoDB a partir del adaptador
	mongoAdapter := databaseAdapter.(*db.MongoAdapter)
	client := mongoAdapter.Client
	database := client.Database("FAMED")
	validate := validator.New()

	// Configurar Repositories, Services y Controllers
	usuarioCollection := database.Collection("usuario")
	usuarioRep := repository.NewUsuarioRepositoryImpl(usuarioCollection)
	usuarioService, _ := service.NewUsuarioServiceImpl(usuarioRep, validate)
	authService, _ := service.NewAuthServiceImpl(usuarioService, validate)
	usuarioController := controller.NewUsuarioController(usuarioService, authService)

	ramoCollection := database.Collection("Asignatura")
	ramoRep := repository.NewRamoRepositoryImpl(ramoCollection)
	ramoService, _ := service.NewRamoServiceImpl(ramoRep, validate)
	ramoController := controller.NewRamoController(ramoService)

	estudianteRamoCollection := database.Collection("estudiante_ramo")
	estudianteRamoRep := repository.NewEstudianteRamoRepositoryImpl(estudianteRamoCollection)
	estudianteRamoService, _ := service.NewEstudianteRamoServiceImpl(estudianteRamoRep, validate)
	estudianteRamoController := controller.NewEstudianteRamoController(estudianteRamoService)

	routes := gin.Default()

	// CORS da problemas si se hace despues primero definir CORS y luego las rutas
	routes.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "GET", "POST", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	UsuarioRouter(routes, usuarioController)
	RamoRouter(routes, ramoController, estudianteRamoController, usuarioController)
	EstudianteRamoRouter(routes, estudianteRamoController)

	server := &http.Server{
		Addr:           ":8080",
		Handler:        routes,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println("Servidor corriendo en el puerto 8080...")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}

}
