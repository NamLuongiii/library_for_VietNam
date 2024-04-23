// cmd/routes.go

package main

import (
	"github.com/NamLuongiii/library_for_VietNam/handlers"
	"github.com/gofiber/fiber/v3"
)

func setupRoutes(router fiber.Router) {
	router.Get("/", handlers.Home)
	router.Post("/facts", handlers.CreateFact)

	router.Get("/books", handlers.BookIndex)
	router.Get("/books/:id", handlers.BookShow)
	router.Post("/books", handlers.BookStore)
	router.Put("/books/:id", handlers.BookUpdate)
	router.Delete("/books/:id", handlers.BookDestroy)

	router.Get("/options/books/level", handlers.BookOptionLevel)
	router.Get("/options/books/lang", handlers.BookOptionLang)
	router.Get("/options/books/status", handlers.BookOptionStatus)
	router.Get("/options/books/authors", handlers.BookOptionAuthors)
	router.Get("/options/books/categories", handlers.BookOptionCategories)

	router.Get("/authors", handlers.AuthorIndex)
	router.Get("/authors/:id", handlers.AuthorShow)
	router.Post("/authors", handlers.AuthorStore)
	router.Put("/authors/:id", handlers.AuthorUpdate)
	router.Delete("/authors/:id", handlers.AuthorDestroy)
	router.Get("/options/authors/gender", handlers.OptionAuthorGender)

	router.Get("/categories", handlers.CategoryIndex)
	router.Get("/categories/:id", handlers.CategoryShow)
	router.Post("/categories", handlers.CategoryStore)
	router.Put("/categories/:id", handlers.CategoryUpdate)
	router.Delete("/categories/:id", handlers.CategoryDestroy)

	router.Get("/business", handlers.BusinessShow)

	router.Get("/auth", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})
}
