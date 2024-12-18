package db

import "context"

type DatabaseAdapter interface {
	Connect() error
	Disconnect(ctx context.Context) error
	Ping(ctx context.Context) error
}
