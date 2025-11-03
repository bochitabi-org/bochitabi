package main

import (
	// "github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gen"
	"gorm.io/gorm"
)

// func main() {
//   router := gin.Default()
//   router.GET("/ping", func(c *gin.Context) {
//     c.JSON(200, gin.H{
//       "message": "pong",
//     })
//   })
//   router.Run() // デフォルトで0.0.0.0:8080で待機します
// }

func main() {
  g := gen.NewGenerator(gen.Config{
    OutPath: ".",
    Mode: gen.WithoutContext|gen.WithDefaultQuery|gen.WithQueryInterface,
    ModelPkgPath: "./model",
  })

  dsn := "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"
  db, _ := gorm.Open(postgres.Open(dsn),&gorm.Config{})
  
  g.UseDB(db)

  g.GenerateAllTable()

  g.Execute()
}