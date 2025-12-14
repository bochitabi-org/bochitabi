package memory

import (
	"context"

	"github.com/bochitabi-org/bochitabi/backend/internal/domain/memory/model"
)

type Repository interface {
	FindAll(ctx context.Context) (*[]model.Memory, error)
}
