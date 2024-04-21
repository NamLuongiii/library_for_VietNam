package clienthandler

import (
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/gofiber/fiber/v3"
)

func CategoriesIndex(c fiber.Ctx) error {
	categories := []models.Category{}
	if err := database.DB.Find(&categories).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	data := []fiber.Map{}
	for _, category := range categories {
		data = append(data, fiber.Map{
			"id":         category.ID,
			"name":       category.Name,
			"des":        category.Des,
			"created_at": category.CreatedAt,
			"updated_at": category.UpdatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"data":    data,
		"message": "success",
	})
}
