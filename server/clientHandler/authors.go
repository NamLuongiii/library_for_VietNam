package clienthandler

import (
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/gofiber/fiber/v3"
)

func AuthorsShow(c fiber.Ctx) error {
	id := c.Params("id")

	author := models.Author{}
	if err := database.DB.First(&author, id).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
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
	}

	return c.JSON(fiber.Map{
		"data":    data,
		"message": "success",
	})
}
