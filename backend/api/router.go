package api

import (
	"github.com/bochitabi-org/bochitabi/backend/infrastructure/gen/query"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func RegisterRoute(c *gin.Engine){
	memories := c.Group("v1/memories")

	memories.GET("", getMemories)
}

// TODO: レイヤーリングする
func getMemories(c *gin.Context) {
  dsn := "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"
	db, _ := gorm.Open(postgres.Open(dsn))

	query.SetDefault(db)

	m := query.Memory
	memories, _ := m.WithContext(c.Request.Context()).Preload(m.Pictures).Find()

	responseJson := make([]gin.H, len(memories))
	for i, memory := range memories {
		pictures := make([]string, len(memory.Pictures))
		for _, picture := range(memory.Pictures) {
			pictures[i] = picture.URL
		}
		responseJson[i] = gin.H{
			"id": memory.ID,
			"name": memory.Name,
			"story": memory.Story,
			"latitude": memory.Latitude,
			"longitude": memory.Longitude,
			"pictures": pictures,
		} 
	}

	c.JSON(200, gin.H{"memories": responseJson})
}