package handler

import (
	"net/http"

	getmemories "github.com/bochitabi-org/bochitabi/backend/internal/usecase/query/get_memories"
	"github.com/gin-gonic/gin"
)

type MemoryHandler struct {
	getMemoryQuery getmemories.GetMemoriesQuery
}

func NewMemoryHandler(getMemoryQuery getmemories.GetMemoriesQuery) *MemoryHandler {
	return &MemoryHandler{
		getMemoryQuery: getMemoryQuery,
	}
}

func (h *MemoryHandler) GetMemories(c *gin.Context) {
	result, err := h.getMemoryQuery.Execute(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

// func (h *MemoryHandler) GetMemories(c *gin.Context) {
//   dsn := "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"
// 	db, _ := gorm.Open(postgres.Open(dsn))

// 	query.SetDefault(db)

// 	m := query.Memory
// 	ms, _ := m.WithContext(c.Request.Context()).Preload(m.Pictures).Find()

// 	memories := make([]Memory, len(ms))
// 	for i, memory := range ms {
// 		pictures := make([]string, len(memory.Pictures))
// 		for j, picture := range(memory.Pictures) {
// 			pictures[j] = picture.URL
// 		}
// 		memories[i] = Memory{
// 			ID: memory.ID,
// 			Name: memory.Name,
// 			Story: memory.Story,
// 			Latitude: memory.Latitude,
// 			Longitude: memory.Longitude,
// 			Pictures: pictures,
// 		}
// 	}

// 	c.JSON(200, Response{memories})
// }
