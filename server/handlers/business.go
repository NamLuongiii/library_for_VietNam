package handlers

import (
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/gofiber/fiber/v3"
)

func BusinessShow(c fiber.Ctx) error {

	var books, authors, categories int64
	database.DB.Table("books").Count(&books)
	database.DB.Table("authors").Count(&authors)
	database.DB.Table("categories").Count(&categories)

	data := fiber.Map{
		"books":      books,
		"authors":    authors,
		"categories": categories,
	}

	return c.JSON(fiber.Map{
		"data":    data,
		"message": "success",
	})
}
