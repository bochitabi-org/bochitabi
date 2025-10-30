package controller

import (
	"github.com/bochitabi-backend/domain/model"
	"github.com/bochitabi-backend/interface/presenter"
	"github.com/bochitabi-backend/usecase"
	"github.com/gin-gonic/gin"
)

type IUserController interface {
	Execute(c *gin.Context)
}

type UserControllerImpl struct {
	userUsecase   usecase.IUserUsecase
	userPresenter presenter.IUserPresenter
}

func NewUserController(
	usecase usecase.IUserUsecase,
	presenter presenter.IUserPresenter,
) IUserController {
	return &UserControllerImpl{
		userUsecase:   usecase,
		userPresenter: presenter,
	}
}

func (u *UserControllerImpl) Execute(c *gin.Context) {
	id := c.Query("id")

	// usecaseに委譲
	data, err := u.userUsecase.Execute(c, id)
	if err != nil {
		u.userPresenter.Execute(c, model.User{}, err)
		return
	}

	u.userPresenter.Execute(c, data, nil)
}
