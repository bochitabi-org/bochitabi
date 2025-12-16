package handler

import (
	"net/http"

	"github.com/bochitabi-org/bochitabi/backend/internal/usecase/get_memories"
	"github.com/gin-gonic/gin"
)

type MemoryHandler struct {
	usecase *getmemories.GetMemoriesUsecase
}

func NewMemoryHandler(usecase *getmemories.GetMemoriesUsecase) *MemoryHandler {
	return &MemoryHandler{
		usecase: usecase,
	}
}

func (h *MemoryHandler) GetMemories(c *gin.Context) {
	result := h.usecase.Execute(c.Request.Context())

	c.JSON(http.StatusOK, result)
}
