package clienthandler

import (
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm/clause"
)

func AuthorsShow(c fiber.Ctx) error {
	id := c.Params("id")

	author := models.Author{}
	if err := database.DB.Preload(clause.Associations).First(&author, id).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	books := []fiber.Map{}
	for _, book := range author.Books {
		books = append(books, fiber.Map{
			"id":    book.ID,
			"isbn":  book.Isbn,
			"name":  book.Name,
			"cover": book.Cover,
		})
	}

	data := fiber.Map{
		"id":         author.ID,
		"created_at": author.CreatedAt,
		"updated_at": author.UpdatedAt,
		"name":       author.Name,
		"potrait":    author.Potrait,
		"bio":        author.Bio,
		"gender":     author.Gender,
		"know_as":    author.KnowAs,
		"nation":     author.Nation,
		"books":      books,
	}

	return c.JSON(fiber.Map{
		"data":    data,
		"message": "success",
	})
}
