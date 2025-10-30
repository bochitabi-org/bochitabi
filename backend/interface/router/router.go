package router

import (
	"github.com/bochitabi-backend/interface/controller"
	"github.com/gin-gonic/gin"
)

func NewRouter(
	userController controller.IUserController,
) *gin.Engine {
	router := gin.Default()

	router.GET("/user", userController.Execute)

	return router
}
