package main

import (
	"github.com/poty-tom/bochitabi/api"
)

func main() {
	r := api.NewRouter()
	r.Run()
}
