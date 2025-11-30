package main

import (
	"github.com/bochitabi-org/bochitabi/backend/internal/config"
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db"
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/queryservice"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation/handler"
)

func main() {
	cfg := config.LoadConfig()
	db, _ := db.NewGormDB(cfg.DB)

	getMemoriesQuery := queryservice.NewGetMemoriesQueryService(db)
	memoryHandler := handler.NewMemoryHandler(getMemoriesQuery)
	router := presentation.NewRouter(memoryHandler)
	engine := router.Init()

	engine.Run()
}
