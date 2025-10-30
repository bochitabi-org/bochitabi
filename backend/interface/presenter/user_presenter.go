package presenter

import (
	"net/http"

	"github.com/bochitabi-backend/domain/model"
	"github.com/gin-gonic/gin"
)

type IUserPresenter interface {
	Execute(*gin.Context, model.User, error)
}

type UserPresenterImpl struct {
}

func NewUserPresenter() IUserPresenter {
	return &UserPresenterImpl{}
}

func (u *UserPresenterImpl) Execute(c *gin.Context, user model.User, err error) {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err.Error()})
		c.Abort()
		return
	}

	type UserResponse struct {
		Id   string `json:"id"`
		Name string `json:"name"`
	}

	c.JSON(http.StatusOK, UserResponse{
		Id:   user.Id,
		Name: user.Name,
	})
}
