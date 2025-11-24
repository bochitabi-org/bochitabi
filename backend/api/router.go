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

type Response struct {
	Memories []Memory `json:"memories"`
}

type Memory struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Story string `json:"story"` 
	Latitude string `json:"latitude"`
	Longitude string `json:"longitude"`
	Pictures []string `json:"pictures"`
}

// TODO: レイヤーリングする
func getMemories(c *gin.Context) {
  dsn := "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"
	db, _ := gorm.Open(postgres.Open(dsn))

	query.SetDefault(db)

	m := query.Memory
	ms, _ := m.WithContext(c.Request.Context()).Preload(m.Pictures).Find()

	memories := make([]Memory, len(ms))
	for i, memory := range ms {
		pictures := make([]string, len(memory.Pictures))
		for j, picture := range(memory.Pictures) {
			pictures[j] = picture.URL
		}
		memories[i] = Memory{
			ID: memory.ID,
			Name: memory.Name,
			Story: memory.Story,
			Latitude: memory.Latitude,
			Longitude: memory.Longitude,
			Pictures: pictures,
		} 
	}

	c.JSON(200, Response{memories})
}