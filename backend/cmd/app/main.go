package main

import (
	"github.com/bochitabi-org/bochitabi/backend/internal/config"
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db"
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/repository"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation"
	"github.com/bochitabi-org/bochitabi/backend/internal/presentation/handler"
	getmemories "github.com/bochitabi-org/bochitabi/backend/internal/usecase/get_memories"
)

func main() {
	cfg := config.LoadConfig()
	db, _ := db.NewGormDB(cfg.DB)

	mr := repository.NewMemoryRepository(db)
	mu := getmemories.NewGetMemoriesUsecase(mr)
	mh := handler.NewMemoryHandler(mu)

	router := presentation.NewRouter(mh)
	engine := router.Init()

	engine.Run()
}
