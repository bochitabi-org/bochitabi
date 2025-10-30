package rdb

import (
	"context"

	"github.com/bochitabi-backend/domain/model"
	"github.com/bochitabi-backend/domain/repository"
)

type UserRepositoryImpl struct {
}

// ほんとはDB依存を持つけど省略
func NewUserRepository() repository.UserRepository {
	return &UserRepositoryImpl{}
}

func (u *UserRepositoryImpl) FindById(ctx context.Context, id string) (model.User, error) {
	// DBアクセスしてレコード取得とか
	return model.User{Id: "0001", Name: "太郎"}, nil
}
