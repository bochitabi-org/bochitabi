package main

import (
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/queryservice"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation/handler"
)

func main() {
	getMemoriesQuery := queryservice.NewGetMemoriesQueryService()
	memoryHandler := handler.NewMemoryHandler(getMemoriesQuery)
	router := presentation.NewRouter(memoryHandler)
	engine := router.Init()

	engine.Run()
}
