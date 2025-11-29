package queryservice

import (
	"context"

	getmemories "github.com/bochitabi-org/bochitabi/backend/internal/usecase/query/get_memories"
)

type GetMemoriesQueryService struct {
}

func NewGetMemoriesQueryService() *GetMemoriesQueryService {
	return &GetMemoriesQueryService{}
}

func (*GetMemoriesQueryService) Execute(ctx context.Context) (*getmemories.GetMemoriesQueryResult, error) {
	return &getmemories.GetMemoriesQueryResult{
		Memories: []getmemories.Memory{
			{
				ID:        "1",
				Name:      "Sample Memory",
				Story:     "This is a sample",
				Latitude:  "35.6895",
				Longitude: "139.6917",
				Pictures:  []string{},
			},
		},
	}, nil
}
