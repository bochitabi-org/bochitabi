package main

import (
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/queryservice"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation/handler"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dsn = "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"

func main() {
	db, _ := gorm.Open(postgres.Open(dsn))
	getMemoriesQuery := queryservice.NewGetMemoriesQueryService(db)
	memoryHandler := handler.NewMemoryHandler(getMemoriesQuery)
	router := presentation.NewRouter(memoryHandler)
	engine := router.Init()

	engine.Run()
}
