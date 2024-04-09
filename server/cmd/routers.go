// cmd/routes.go

package main

import (
    "github.com/gofiber/fiber/v3"
	"github.com/NamLuongiii/library_for_VietNam/handlers"
)

func setupRoutes(app *fiber.App) {
    app.Get("/", handlers.Home)
	app.Post("/facts", handlers.CreateFact)

	app.Get("/books", handlers.BookIndex)
	app.Get("/books/:id", handlers.BookShow)
	app.Post("/books", handlers.BookStore)
	app.Put("/books/:id", handlers.BookUpdate)
	app.Delete("/books/:id", handlers.BookDestroy)


	app.Get("/authors", handlers.AuthorIndex)
	app.Get("/authors/:id", handlers.AuthorShow)
	app.Post("/authors", handlers.AuthorStore)
	app.Put("/authors/:id", handlers.AuthorUpdate)
	app.Delete("/authors/:id", handlers.AuthorDestroy)


	app.Get("/bookshelves", handlers.BookShelfIndex)
	app.Get("/bookshelves/:id", handlers.BookShelfShow)
	app.Post("/bookshelves", handlers.BookShelfStore)
	app.Put("/bookshelves/:id", handlers.BookShelfUpdate)
	app.Delete("/bookshelves/:id", handlers.BookShelfDestroy)
}