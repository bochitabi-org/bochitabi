package main

import (
	"github.com/bochitabi-org/bochitabi/backend/api"
	"github.com/gin-gonic/gin"
)

func main() { 
	router := gin.Default()
  router.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "pong",
    })
  })

  api.RegisterRoute(router)
  router.Run()
}
