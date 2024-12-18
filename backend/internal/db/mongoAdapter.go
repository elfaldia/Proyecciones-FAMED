package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoAdapter struct {
	Client *mongo.Client
	URI    string
}

func NewMongoAdapter(uri string) *MongoAdapter {
	return &MongoAdapter{
		URI: uri,
	}
}

func (m *MongoAdapter) Connect() error {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(m.URI).SetServerAPIOptions(serverAPI)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return err
	}

	m.Client = client
	return nil
}

func (m *MongoAdapter) Disconnect(ctx context.Context) error {
	if m.Client != nil {
		return m.Client.Disconnect(ctx)
	}
	return nil
}

func (m *MongoAdapter) Ping(ctx context.Context) error {
	if err := m.Client.Database("admin").RunCommand(ctx, bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
		return fmt.Errorf("MongoDB ping failed: %v", err)
	}
	fmt.Println("MongoDB connection successful")
	return nil
}
