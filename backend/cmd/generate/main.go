package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
	g := gen.NewGenerator(gen.Config{
		OutPath: "infrastructure/gen/query",
		Mode:    gen.WithoutContext | gen.WithDefaultQuery | gen.WithQueryInterface,
	})

	dsn := "host=localhost user=app password=password dbname=bochitabi port=5432 sslmode=disable search_path=bochitabi"
	db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	g.UseDB(db)

	all := g.GenerateAllTable()

	g.ApplyBasic(all...)

	g.Execute()

}
