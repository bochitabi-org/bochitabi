package queryservice

import (
	"context"

	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/gen/query"
	getmemories "github.com/bochitabi-org/bochitabi/backend/internal/usecase/query/get_memories"
	"gorm.io/gorm"
)

type GetMemoriesQueryService struct {
	db *gorm.DB
}

func NewGetMemoriesQueryService(db *gorm.DB) *GetMemoriesQueryService {
	return &GetMemoriesQueryService{db: db}
}

func (svc *GetMemoriesQueryService) Execute(ctx context.Context) (*getmemories.GetMemoriesQueryResult, error) {
	query.SetDefault(svc.db)

	m := query.Memory
	ms, _ := m.WithContext(ctx).Preload(m.Pictures).Find()

	memories := getmemories.GetMemoriesQueryResult{Memories: make([]getmemories.Memory, len(ms))}
	for i, memory := range ms {
		pictures := make([]string, len(memory.Pictures))
		for j, picture := range memory.Pictures {
			pictures[j] = picture.URL
		}
		memories.Memories[i] = getmemories.Memory{
			ID:        memory.ID,
			Name:      memory.Name,
			Story:     memory.Story,
			Latitude:  memory.Latitude,
			Longitude: memory.Longitude,
			Pictures:  pictures,
		}
	}
	return &memories, nil
}
