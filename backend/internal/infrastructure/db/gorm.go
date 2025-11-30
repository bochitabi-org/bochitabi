package db

import (
	"fmt"

	"github.com/bochitabi-org/bochitabi/backend/internal/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewGormDB(cfg config.DBConfig) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=bochitabi sslmode=disable search_path=bochitabi", cfg.Host, cfg.Port, cfg.User, cfg.Password)

	db, err := gorm.Open(postgres.Open(dsn))

	return db, err
}
