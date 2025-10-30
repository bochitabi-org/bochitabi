package injector

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/bochitabi-backend/infrastructure/rdb"
	"github.com/bochitabi-backend/interface/controller"
	"github.com/bochitabi-backend/interface/presenter"
	"github.com/bochitabi-backend/interface/router"
	"github.com/bochitabi-backend/usecase"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

var (
	DIContainer = dig.New()
)

func init() {
	var err error

	err = DIContainer.Provide(rdb.NewUserRepository)
	if err != nil {
		log.Fatalln(err)
	}

	err = DIContainer.Provide(usecase.NewUserUsecase)
	if err != nil {
		log.Fatalln(err)
	}

	err = DIContainer.Provide(controller.NewUserController)
	if err != nil {
		log.Fatalln(err)
	}

	err = DIContainer.Provide(presenter.NewUserPresenter)
	if err != nil {
		log.Fatalln(err)
	}

	err = DIContainer.Provide(router.NewRouter)
	if err != nil {
		log.Fatalln(err)
	}
}

func RunInject() error {
	var httpServer *http.Server
	go func() {
		if err := DIContainer.Invoke(func(g *gin.Engine) {
			g.Routes()

			httpServer = &http.Server{
				Addr:    "0.0.0.0:8080",
				Handler: g,
			}

			if err := httpServer.ListenAndServe(); err != nil {
				log.Fatalln(err)
			}
		}); err != nil {
			log.Fatalln(err)
		}
	}()

	// 終了用のシグナル待機
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("graceful shutdown start")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := httpServer.Shutdown(ctx); err != nil {
		log.Fatalln("http server gracefull shutdown error:", err)
	}
	log.Println("Server graceful shutdown")
	return nil
}
