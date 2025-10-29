package repository

import (
	"bochitabi-backend/domain/entity"
	"bochitabi-backend/infrastructure/db"
)

// UserRepositoryImpl はUserRepositoryの実体
type UserRepositoryImpl struct {
	client db.DBClient
}

// NewUserRepositoryImpl はUserRepositoryImplのコンストラクタ
func NewUserRepositoryImpl(client db.DBClient) *UserRepositoryImpl {
	return &UserRepositoryImpl{client: client}
}

// FindByID はIDを元にUserを検索して応答します
func (u *UserRepositoryImpl) FindByID(id string) (entity.User, error) {
	// clientを介してDBとやり取り
	// 取得した結果をもとに応答
	return entity.User{}, nil
}

// Create は名前をもとにユーザーを作成します
func (u *UserRepositoryImpl) Create(name string) (entity.User, error) {
	return entity.User{}, nil
}
