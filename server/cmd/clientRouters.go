package main

import (
	clienthandler "github.com/NamLuongiii/library_for_VietNam/clientHandler"
	"github.com/gofiber/fiber/v3"
)

func setupClientRouter(client fiber.Router) {

	client.Get("/books", clienthandler.BooksIndex)
	client.Get("/books/discovery", clienthandler.BooksDiscovery)
	client.Get("/books/:id", clienthandler.BooksShow)

	client.Get("/categories", clienthandler.CategoriesIndex)

	client.Get("/navigation", clienthandler.NavigationShow)

	client.Get("/authors/:id", clienthandler.AuthorsShow)

}
