package getmemories

import "context"

type GetMemoriesQuery interface {
	Execute(ctx context.Context) (*GetMemoriesQueryResult, error)
}
