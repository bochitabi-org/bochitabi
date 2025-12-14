package getmemories

import (
	"context"

	"github.com/bochitabi-org/bochitabi/backend/internal/domain/memory"
)

type GetMemoriesUsecase struct {
	repository memory.Repository
}

func NewGetMemoriesUsecase(repository memory.Repository) *GetMemoriesUsecase {
	return &GetMemoriesUsecase{
		repository: repository,
	}
}

func (usecase *GetMemoriesUsecase) Execute(ctx context.Context) GetMemoriesResult {
	result, err := usecase.repository.FindAll(ctx)
	if err != nil {
		return GetMemoriesResult{
			Memories: []Memory{},
		}
	}

	memories := make([]Memory, len(*result))
	for i, m := range *result {
		pictures := make([]string, len(m.Pictures))
		for j, p := range m.Pictures {
			pictures[j] = p.URL
		}
		memories[i] = Memory{
			ID:        m.ID,
			Name:      m.Name,
			Story:     m.Story,
			Latitude:  m.Latitude,
			Longitude: m.Longitude,
			Pictures:  pictures,
		}
	}
	return GetMemoriesResult{Memories: memories}
}
