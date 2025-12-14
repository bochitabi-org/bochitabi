package repository

import (
	"context"

	"github.com/bochitabi-org/bochitabi/backend/internal/domain/memory"
	"github.com/bochitabi-org/bochitabi/backend/internal/domain/memory/model"
	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/gen/query"
	"gorm.io/gorm"
)

type memoryRepository struct {
	db *gorm.DB
}

func NewMemoryRepository(db *gorm.DB) memory.Repository {
	return memoryRepository{db: db}
}

func (repo memoryRepository) FindAll(ctx context.Context) (*[]model.Memory, error) {
	query.SetDefault(repo.db)

	m := query.Memory
	ms, _ := m.WithContext(ctx).Preload(m.Pictures).Find()

	memories := make([]model.Memory, len(ms))
	for i, m := range ms {
		pictures := make([]model.Picture, len(m.Pictures))
		for j, p := range m.Pictures {
			pictures[j] = model.Picture{
				ID:  p.ID,
				URL: p.URL,
			}
		}
		memories[i] = model.Memory{
			ID:        m.ID,
			Name:      m.Name,
			Story:     m.Story,
			Latitude:  m.Latitude,
			Longitude: m.Longitude,
			Pictures:  pictures,
		}
	}
	return &memories, nil
}
