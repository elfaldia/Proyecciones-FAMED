package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectToDataBase() (*mongo.Client, error) {

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	URI := "mongodb+srv://user:MlUbLvrzfEYUDu6O@famed.dbhrq.mongodb.net/?retryWrites=true&w=majority&appName=FAMED"
	opts := options.Client().ApplyURI(URI).SetServerAPIOptions(serverAPI)

	ctx, cancel := context.WithTimeout(context.Background(), 4*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		panic(err)
	}
	/*
		defer func() {
			if err = client.Disconnect(context.TODO()); err != nil {
				panic(err)
			}
		}()
	*/

	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
	return client, nil
}
