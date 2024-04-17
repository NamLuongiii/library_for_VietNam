package handlers

import (
	"encoding/json"

	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm/clause"
)

type CategoryInput struct {
	Name string `validate:"required,max=256" json:"name"`
	Des  string `validate:"max=256" json:"des"`
}

func CategoryIndex(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	var categories []models.Category
	if err := database.DB.Scopes(p.DbHandler).Find(&categories).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	res := []fiber.Map{}
	for _, item := range categories {
		res = append(res, fiber.Map{
			"id":         item.ID,
			"name":       item.Name,
			"des":        item.Des,
			"created_at": item.CreatedAt,
			"updated_at": item.UpdatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"data":      res,
		"page":      p.Page,
		"page_size": p.PageSize,
	})
}

func CategoryShow(c fiber.Ctx) error {
	id := c.Params("id")

	var category models.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	data := fiber.Map{
		"id":         category.ID,
		"name":       category.Name,
		"des":        category.Des,
		"created_at": category.CreatedAt,
		"updated_at": category.UpdatedAt,
	}

	return c.JSON(fiber.Map{
		"data":    data,
		"message": "success",
	})
}

func CategoryStore(c fiber.Ctx) error {
	raw := c.Body()

	var input CategoryInput
	if err := json.Unmarshal(raw, &input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if errs := helpers.Validate.Struct(input); errs != nil {
		fields := fiber.Map{}
		helpers.ErrorFieldMessages(errs.(validator.ValidationErrors), &fields)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error",
			"fields":  fields,
		})
	}

	category := models.Category{
		Name: input.Name,
		Des:  input.Des,
	}
	if err := database.DB.Create(&category).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func CategoryUpdate(c fiber.Ctx) error {
	id := c.Params("id")
	raw := c.Body()

	var category models.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	var input CategoryInput
	if err := json.Unmarshal(raw, &input); err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	if errs := helpers.Validate.Struct(input); errs != nil {
		fields := fiber.Map{}
		helpers.ErrorFieldMessages(errs.(validator.ValidationErrors), &fields)
		return helpers.FieldValidateBadRequestResponse(c, &fields)
	}

	category.Name = input.Name
	category.Des = input.Des

	if err := database.DB.Save(&category).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	return helpers.SimpleSuccessResponse(c)
}

func CategoryDestroy(c fiber.Ctx) error {
	id := c.Params("id")

	var category models.Category
	if err := database.DB.First(&category, id).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	if err := database.DB.Select(clause.Associations).Delete(&category, id).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	return helpers.SimpleSuccessResponse(c)
}
