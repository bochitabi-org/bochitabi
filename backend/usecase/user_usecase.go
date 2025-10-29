package usecase

import (
	"bochitabi-backend/domain/entity"
	"bochitabi-backend/domain/repository"
)

type IUserUsecase interface {
	CreateUser(name string) (entity.User, error)
	GetUser(id string) (entity.User, error)
}

type UserUsecase struct {
	userRepository repository.IUserRepository
}

func NewUserUsecase(repository repository.IUserRepository) IUserUsecase {
	return &UserUsecase{
		userRepository: repository,
	}
}

func (u *UserUsecase) CreateUser(name string) (entity.User, error) {
	user, err := u.userRepository.Create(name)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (u *UserUsecase) GetUser(id string) (entity.User, error) {
	user, err := u.userRepository.FindByID(id)
	if err != nil {
		return user, err
	}
	return user, nil
}
