package clienthandler

import (
	"strconv"

	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/gofiber/fiber/v3"
)

func NavigationShow(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	var categories []models.Category
	if err := database.DB.Scopes(p.DbHandler).Find(&categories).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	data_nav := []fiber.Map{}
	for _, category := range categories {
		data_nav = append(data_nav, fiber.Map{
			"id":    category.ID,
			"title": category.Name,
			"href":  "/books?category=" + strconv.FormatUint(uint64(category.ID), 10),
		})
	}

	data := []fiber.Map{
		{
			"title": "Home",
			"href":  "/",
		},
		{
			"title": "Danh mục",
			"menu":  data_nav,
		},
	}

	return c.JSON(fiber.Map{
		"data":      data,
		"page":      p.Page,
		"page_size": p.PageSize,
	})
}
