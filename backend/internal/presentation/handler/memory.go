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
