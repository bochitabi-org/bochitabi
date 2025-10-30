package repository

import (
	"context"

	"github.com/bochitabi-backend/domain/model"
)

type UserRepository interface {
	FindById(ctx context.Context, id string) (model.User, error)
}
