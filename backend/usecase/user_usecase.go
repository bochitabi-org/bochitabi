package usecase

import (
	"context"

	"github.com/bochitabi-backend/domain/model"
	"github.com/bochitabi-backend/domain/repository"
)

type IUserUsecase interface {
	Execute(ctx context.Context, id string) (model.User, error)
}

type UserUsecaseImpl struct {
	userRepository repository.UserRepository
}

func NewUserUsecase(repository repository.UserRepository) IUserUsecase {
	return &UserUsecaseImpl{
		userRepository: repository,
	}
}

func (u *UserUsecaseImpl) Execute(ctx context.Context, id string) (model.User, error) {
	data, err := u.userRepository.FindById(ctx, id)
	if err != nil {
		return model.User{}, err
	}

	return data, nil
}
