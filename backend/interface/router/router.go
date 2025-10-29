package router

import "github.com/gin-gonic/gin"

// ここでginのルーティング設定をして、gin.Engineを返してあげるようにする
// APIエンドポイントのパスとかグルーピングもここで定義するようにする

func NewRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	return router
}
