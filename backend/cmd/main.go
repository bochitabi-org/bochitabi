package main

import (
	"bochitabi-backend/interface/router"
)

func main() {
	// 依存を順々に生成して注入する
	// db
	// dbConfig := ...
	// db, error := db.NewDBClient

	// repositorty(実体なのでinfra側)
	// userRepository := repository.NewUserRepositoryImpl(db)

	// usecase
	// userUsecase := usecase.NewUserUsecase(userRepository)

	// controller
	// ...

	// この辺のDIの仕組みはdig.Containerとかが便利
	// 別途dependencyみたいなレイヤを設けて、そこで全部依存解決する方が楽

	r := router.NewRouter()
	r.Run() // デフォルトで0.0.0.0:8080で待機します
}
