package main

import (
	"log"

	"github.com/bochitabi-backend/injector"
)

func main() {
	if err := injector.RunInject(); err != nil {
		log.Fatalln(err)
	}
}
