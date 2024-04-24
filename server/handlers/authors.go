package handlers

import (
	"encoding/json"
	"errors"

	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

type AuthorInputValidate struct {
	Name    string `validate:"required,max=50" json:"name"`
	Potrait string `validate:"omitempty,url" json:"potrait"`
	Bio     string `validate:"omitempty,max=500" json:"bio"`
	KnowAs  string `validate:"omitempty,max=256" json:"know_as"`
	Gender  uint8  `validate:"omitempty,oneof= 0 1 2 3" json:"gender"`
	Nation  string `valdate:"omitempty" json:"nation"`
}

func AuthorIndex(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	var authors []models.Author
	if err := database.DB.Scopes(p.DbHandler).Find(&authors).Error; err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	res_authors := []fiber.Map{}
	for _, author := range authors {
		res_authors = append(res_authors, fiber.Map{
			"id":         author.ID,
			"name":       author.Name,
			"potrait":    author.Potrait,
			"bio":        author.Bio,
			"know_as":    author.KnowAs,
			"gender":     author.Gender,
			"nation":     author.Nation,
			"created_at": author.CreatedAt,
			"updated_at": author.UpdatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"data":      res_authors,
		"page":      p.Page,
		"page_size": p.PageSize,
		"message":   "success",
	})
}

func AuthorShow(c fiber.Ctx) error {
	id := c.Params("id")

	var author models.Author
	if err := database.DB.Find(&author, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	res_author := fiber.Map{
		"id":         author.ID,
		"name":       author.Name,
		"potrait":    author.Potrait,
		"bio":        author.Bio,
		"know_as":    author.KnowAs,
		"gender":     author.Gender,
		"nation":     author.Nation,
		"created_at": author.CreatedAt,
		"updated_at": author.UpdatedAt,
	}

	return c.JSON(fiber.Map{
		"data":    res_author,
		"message": "success",
	})
}

func AuthorStore(c fiber.Ctx) error {
	var input AuthorInputValidate
	if err := json.Unmarshal(c.Body(), &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	fields := fiber.Map{}
	if errs := helpers.Validate.Struct(input); errs != nil {
		helpers.ErrorFieldMessages(errs.(validator.ValidationErrors), &fields)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    fields,
			"message": "error",
		})
	}

	author := models.Author{
		Name:    input.Name,
		Potrait: input.Potrait,
		Bio:     input.Bio,
		Nation:  input.Nation,
		KnowAs:  input.KnowAs,
	}

	if err := database.DB.Create(&author).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	return c.JSON(fiber.Map{
		"data":    "oke",
		"message": "success",
	})
}

func AuthorUpdate(c fiber.Ctx) error {
	id := c.Params("id")

	var author models.Author
	if err := database.DB.First(&author, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	var input AuthorInputValidate
	if err := json.Unmarshal(c.Body(), &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	fields := fiber.Map{}
	if errs := helpers.Validate.Struct(input); errs != nil {
		helpers.ErrorFieldMessages(errs.(validator.ValidationErrors), &fields)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":    fields,
			"message": "error",
		})
	}

	author.Name = input.Name
	author.Potrait = input.Potrait
	author.Bio = input.Bio
	author.KnowAs = input.KnowAs
	author.Gender = input.Gender
	author.Nation = input.Nation

	if err := database.DB.Save(author).Error; err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func AuthorDestroy(c fiber.Ctx) error {
	var author models.Author
	if err := database.DB.First(&author, c.Params("id")).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := database.DB.Delete(author).Error; err != nil {
		if errors.Is(err, gorm.ErrForeignKeyViolated) {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func OptionAuthorGender(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"data": []fiber.Map{
			{
				"id":   0,
				"name": "Male",
			},
			{
				"id":   1,
				"name": "Female",
			},
			{
				"id":   2,
				"name": "Other",
			},
		},
		"message": "success",
	})
}
