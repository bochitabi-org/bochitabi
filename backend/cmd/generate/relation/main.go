package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gen"
	"gorm.io/gen/field"
	"gorm.io/gorm"

	"github.com/bochitabi-org/bochitabi/backend/internal/infrastructure/db/gen/model"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath: "infrastructure/gen/query",
		Mode:    gen.WithoutContext | gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	dsn := "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	g.UseDB(db)

	allModels := []interface{}{
		g.GenerateModel(
			model.TableNameUser,
			gen.FieldRelateModel(field.HasMany, "Records", model.Record{}, nil),
		),
		g.GenerateModel(
			model.TableNameRecord,
			gen.FieldRelateModel(field.BelongsTo, "User", model.User{}, nil),
			gen.FieldRelateModel(field.HasMany, "Memories", model.Memory{}, nil),
		),
		g.GenerateModel(
			model.TableNameMemory,
			gen.FieldRelateModel(field.BelongsTo, "Record", model.Record{}, nil),
			gen.FieldRelateModel(field.HasMany, "Pictures", model.Picture{}, nil),
		),
		g.GenerateModel(
			model.TableNamePicture,
			gen.FieldRelateModel(field.BelongsTo, "Memory", model.Memory{}, nil),
		),
	}

	g.ApplyBasic(allModels...)

	g.Execute()
}
