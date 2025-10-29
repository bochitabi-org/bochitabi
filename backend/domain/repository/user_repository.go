package repository

import (
	"bochitabi-backend/domain/entity"
)

type IUserRepository interface {
	FindByID(id string) (entity.User, error)
	Create(name string) (entity.User, error)
}
