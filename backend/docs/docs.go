// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/curso": {
            "get": {
                "description": "get cursos",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "curso"
                ],
                "summary": "Devuelve todos los carritos de la base de datos",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/response.Response"
                        }
                    }
                }
            }
        },
        "/curso/{curso_id}/comentarios": {
            "get": {
                "description": "get comentarios",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "curso"
                ],
                "summary": "Obtiene comentarios de un curso",
                "parameters": [
                    {
                        "type": "string",
                        "description": "671989c45e52cd33c7e3f6cd",
                        "name": "curso_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/response.Response"
                        }
                    }
                }
            },
            "post": {
                "description": "add comentarios",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "curso"
                ],
                "summary": "Agrega comentario a un curso",
                "parameters": [
                    {
                        "type": "string",
                        "description": "671989c45e52cd33c7e3f6cd",
                        "name": "curso_id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "671989c45e52cd33c7e3f6cd",
                        "name": "curso_id",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/request.CreateComentarioRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/response.Response"
                        }
                    }
                }
            }
        },
        "/unidad/:id": {
            "get": {
                "description": "Encontrar una unidad con el id de un curso",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "unidad"
                ],
                "summary": "Devuelve todos las unidades que pertenezcan a un respectivo Curso",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/response.ResponseUnidad"
                        }
                    }
                }
            }
        },
        "/unidad/{id_unidad}/clase": {
            "get": {
                "description": "Devuelve una clase",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "clase"
                ],
                "summary": "get clase por Object ID",
                "parameters": [
                    {
                        "type": "string",
                        "description": "CLASE ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/response.Response"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/response.ErrorResponse"
                        }
                    }
                }
            },
            "post": {
                "description": "Agrega una clase a la coleccion Clase",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "clase"
                ],
                "summary": "Crea una clase",
                "parameters": [
                    {
                        "description": "Carrito a crear",
                        "name": "clase",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/request.CreateClaseRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/response.Response"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/response.ErrorResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.Material": {
            "type": "object",
            "properties": {
                "nombre": {
                    "type": "string"
                },
                "tipo": {
                    "description": "Puede ser ENUM",
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            }
        },
        "request.CreateClaseRequest": {
            "type": "object",
            "required": [
                "id_unidad",
                "indice_clase",
                "nombre",
                "video"
            ],
            "properties": {
                "descripcion": {
                    "type": "string"
                },
                "id_unidad": {
                    "type": "string"
                },
                "indice_clase": {
                    "type": "integer"
                },
                "material_adicional": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.Material"
                    }
                },
                "nombre": {
                    "type": "string"
                },
                "video": {
                    "type": "string"
                }
            }
        },
        "request.CreateComentarioRequest": {
            "type": "object",
            "required": [
                "detalle",
                "dislikes",
                "fecha",
                "id_curso",
                "likes",
                "nombre",
                "titulo"
            ],
            "properties": {
                "detalle": {
                    "type": "string"
                },
                "dislikes": {
                    "type": "integer"
                },
                "fecha": {
                    "type": "string"
                },
                "id_curso": {
                    "type": "string"
                },
                "likes": {
                    "type": "integer"
                },
                "nombre": {
                    "type": "string"
                },
                "titulo": {
                    "type": "string"
                }
            }
        },
        "response.ErrorResponse": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "response.Response": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "data": {},
                "status": {
                    "type": "string"
                }
            }
        },
        "response.ResponseUnidad": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "data": {},
                "status": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}