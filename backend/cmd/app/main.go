package main

import (
	"github.com/gin-gonic/gin"
)

func main() { 
	router := gin.Default()
  router.GET("/ping", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "message": "pong",
    })
  })

  router.GET("/v1/users/:userId/memories", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "memories": []gin.H{
        {
          "id": "dd640d2a-360f-4bb6-b36e-d95f96a4234b",
          "memoryName": "omoide",
          "stroy": "hogehoge",
          "latitude": 36.33018692714167,
          "longitude": 140.09567236901313,
          "pictureUrl": "https://picsum.photos/id/13",
        },
      },
    })
  })

  router.Run()
}
