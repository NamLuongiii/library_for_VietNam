// cmd/routes.go

package main

import (
    "github.com/gofiber/fiber/v2"
	"github.com/NamLuongiii/library_for_VietNam/handlers"
)

func setupRoutes(app *fiber.App) {
    app.Get("/", handlers.Home)

	app.Get("/books", handlers.BookIndex)
	app.Post("/books", handlers.BookStore)
	app.Put("/books", handlers.BookUpdate)
	app.Delete("/books", handlers.BookDestroy)
}