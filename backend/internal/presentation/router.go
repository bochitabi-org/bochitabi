package presentation

import (
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation/handler"
	"github.com/gin-gonic/gin"
)

type Router struct {
	memoryHandler *handler.MemoryHandler
}

func NewRouter(memoryHandler *handler.MemoryHandler) *Router {
	return &Router{
		memoryHandler: memoryHandler,
	}
}

func (r *Router) Init() *gin.Engine {
	engine := gin.Default()

	engine.GET("/v1/memories", r.memoryHandler.GetMemories)

	return engine
}
