package handlers

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/basicauth"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type AuthorInput struct {
	ID      uint   `validate:"required" json:"id"`
	Name    string `validate:"required,max=256" json:"name"`
	Potrait string `validate:"omitempty,url" json:"potrait"`
	Bio     string `validate:"omitempty,max=500" json:"bio"`
	KnowAs  string `validate:"omitempty,max=256" json:"know_as"`
	Gender  uint8  `validate:"omitempty" json:"gender"`
	Nation  string `validate:"omitempty" json:"nation"`
}

type BookInput struct {
	Isbn            string        `validate:"omitempty,max=256" json:"isbn"`
	Name            string        `validate:"required,max=256" json:"name"`
	EnName          string        `validate:"omitempty,max=256" json:"en_name"`
	OriginName      string        `validate:"omitempty,max=256" json:"origin_name"`
	Cover           string        `validate:"required,url,max=256" json:"cover"`
	Preface         string        `validate:"required,max=500" json:"preface"`
	ComposeAt       string        `validate:"omitempty,max=256" json:"compose_at"`
	Release         string        `validate:"omitempty,max=256" json:"release"`
	Publisher       string        `validate:"omitempty,max=256" json:"publisher"`
	GlobalPublisher string        `validate:"omitempty,max=256" json:"global_publisher"`
	Page            uint64        `validate:"omitempty,gte=0,lte=100000" json:"page"`
	Location        uint64        `validate:"omitempty,gte=0,lte=100000" json:"location"`
	Chapter         uint8         `validate:"omitempty,gte=0,lt=256" json:"chapter"`
	Lang            string        `validate:"required,max=256,oneof=vietnamese english chinese greek japanese other" json:"lang"`
	OriginLang      string        `validate:"omitempty,oneof=vietnamese english chinese greek japanese other" json:"origin_lang"`
	ProjectUrl      string        `validate:"omitempty,max=256,url" json:"project_url"`
	ResourceUrl     string        `validate:"omitempty,max=256,url" json:"resource_url"`
	FileUrl         string        `validate:"required,max=256,url" json:"file_url"`
	FileName        string        `validate:"required,max=256" json:"file_name"`
	Nation          string        `validate:"omitempty,max=256" json:"nation"`
	Status          uint8         `validate:"omitempty,oneof= 0 1 2 3 4 5 6 7" json:"status"`
	IsShow          uint8         `validate:"omitempty,oneof=0 1" json:"is_show"`
	Level           uint8         `validate:"omitempty,gte=0,lte=100" json:"level"`
	Authors         []AuthorInput `validate:"omitempty,dive,required" json:"authors"`
	Translators     []AuthorInput `validate:"omitempty,dive,required" json:"translators"`
	// Bookshelves     []models.Bookshelf `validate:"dive,required" json:"bookshelves"`
}

func BookIndex(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	var books []models.Book
	database.DB.Preload(clause.Associations).Scopes(p.DbHandler).Find(&books)

	res_books := []fiber.Map{}
	for _, book := range books {
		res_books = append(res_books, fiber.Map{
			"id":               book.ID,
			"isbn":             book.Isbn,
			"name":             book.Name,
			"en_name":          book.EnName,
			"origin_name":      book.OriginName,
			"cover":            book.Cover,
			"preface":          book.Preface,
			"compose_at":       book.ComposeAt,
			"release":          book.Release,
			"publisher":        book.Publisher,
			"global_publisher": book.GlobalPublisher,
			"page":             book.Page,
			"location":         book.Location,
			"chapter":          book.Chapter,
			"lang":             book.Lang,
			"origin_lang":      book.OriginLang,
			"project_url":      book.ProjectUrl,
			"resource_url":     book.ResourceUrl,
			"file_url":         book.FileUrl,
			"file_name":        book.FileName,
			"nation":           book.Nation,
			"status":           book.Status,
			"is_show":          book.IsShow,
			"level":            book.Level,
			"authors":          book.Authors,
			"translators":      book.Translators,
			"created_at":       book.CreatedAt,
			"updated_at":       book.UpdatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"data":      res_books,
		"page":      p.Page,
		"page_size": p.PageSize,
	})
}

func BookShow(c fiber.Ctx) error {
	ID := c.Params("id")
	var book models.Book

	if err := database.DB.Preload(clause.Associations).First(&book, ID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Not found book",
		})
	}

	return c.JSON(fiber.Map{
		"data": fiber.Map{
			"id":               book.ID,
			"isbn":             book.Isbn,
			"name":             book.Name,
			"en_name":          book.EnName,
			"origin_name":      book.OriginName,
			"cover":            book.Cover,
			"preface":          book.Preface,
			"compose_at":       book.ComposeAt,
			"release":          book.Release,
			"publisher":        book.Publisher,
			"global_publisher": book.GlobalPublisher,
			"page":             book.Page,
			"location":         book.Location,
			"chapter":          book.Chapter,
			"lang":             book.Lang,
			"origin_lang":      book.OriginLang,
			"project_url":      book.ProjectUrl,
			"resource_url":     book.ResourceUrl,
			"file_url":         book.FileUrl,
			"file_name":        book.FileName,
			"nation":           book.Nation,
			"status":           book.Status,
			"is_show":          book.IsShow,
			"level":            book.Level,
			"authors":          book.Authors,
			"translators":      book.Translators,
			"created_at":       book.CreatedAt,
			"updated_at":       book.UpdatedAt,
		},
	})
}

func BookStore(c fiber.Ctx) error {
	body := c.Body()

	var input BookInput
	if err := json.Unmarshal(body, &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Body unmarshal error",
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

	authors := []models.Author{}
	for _, _author := range input.Authors {
		authors = append(authors, models.Author{
			Model: gorm.Model{
				ID: _author.ID,
			},
		})
	}

	translators := []models.Author{}
	for _, _translator := range input.Translators {
		translators = append(translators, models.Author{
			Model: gorm.Model{
				ID: _translator.ID,
			},
		})
	}

	book := models.Book{
		Isbn:            input.Isbn,
		Name:            input.Name,
		FileUrl:         input.FileUrl,
		EnName:          input.EnName,
		OriginName:      input.OriginName,
		Cover:           input.Cover,
		Preface:         input.Preface,
		ComposeAt:       input.ComposeAt,
		Release:         input.Release,
		Publisher:       input.Publisher,
		GlobalPublisher: input.GlobalPublisher,
		Page:            input.Page,
		Location:        input.Location,
		Chapter:         input.Chapter,
		Lang:            input.Lang,
		OriginLang:      input.OriginLang,
		ProjectUrl:      input.ProjectUrl,
		ResourceUrl:     input.ResourceUrl,
		FileName:        input.FileName,
		Nation:          input.Nation,
		Status:          input.Status,
		IsShow:          input.IsShow,
		Level:           input.Level,
		Authors:         authors,
		Translators:     translators,
	}

	fmt.Println(1000, book.EnName)

	if result := database.DB.Create(&book); result.Error != nil {
		err_message := result.Error.Error()

		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			fields := fiber.Map{}
			var b models.Book
			if err := database.DB.Unscoped().Where("name=?", book.Name).First(&b).Error; err == nil {
				fields["name"] = err_message
			}
			if err := database.DB.Unscoped().Where("en_name=?", book.EnName).First(&b).Error; err == nil {
				fields["en_name"] = err_message
			}
			if err := database.DB.Unscoped().Where("file_name=?", book.FileName).First(&b).Error; err == nil {
				fields["file_name"] = err_message
			}

			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"fields":  fields,
				"message": result.Error.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err_message,
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func BookUpdate(c fiber.Ctx) error {
	id := c.Params("id")

	var book models.Book
	if err := database.DB.First(&book, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	var input BookInput
	if err := json.Unmarshal(c.Body(), &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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

	book.Isbn = input.Isbn
	book.Name = input.Name
	book.EnName = input.EnName
	book.OriginName = input.OriginName
	book.Cover = input.Cover
	book.Preface = input.Preface
	book.ComposeAt = input.ComposeAt
	book.Release = input.Release
	book.Publisher = input.Publisher
	book.GlobalPublisher = input.GlobalPublisher
	book.Page = input.Page
	book.Location = input.Location
	book.Chapter = input.Chapter
	book.Lang = input.Lang
	book.OriginLang = input.OriginLang
	book.ProjectUrl = input.ProjectUrl
	book.ResourceUrl = input.ResourceUrl
	book.FileUrl = input.FileUrl
	book.FileName = input.FileName
	book.Nation = input.Nation
	book.Status = input.Status
	book.Level = input.Level

	if err := database.DB.Save(&book).Error; err != nil {
		message := err.Error()

		if errors.Is(err, gorm.ErrDuplicatedKey) {
			fields := fiber.Map{}
			var b models.Book
			if err := database.DB.Where("name=?", book.Name).First(&b).Error; err == nil {
				fields["name"] = message
			}
			if err := database.DB.Where("en_name=?", book.EnName).First(&b).Error; err == nil {
				fields["en_name"] = message
			}
			if err := database.DB.Where("file_name=?", book.FileName).First(&b).Error; err == nil {
				fields["file_name"] = message
			}

			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"fields":  fields,
				"message": "error",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": message,
		})
	}

	var authors []models.Author
	for _, _author := range input.Authors {
		authors = append(authors, models.Author{
			Model: gorm.Model{
				ID: _author.ID,
			},
		})
	}

	var translators []models.Author
	for _, _translator := range input.Translators {
		translators = append(translators, models.Author{
			Model: gorm.Model{
				ID: _translator.ID,
			},
		})
	}

	if err := database.DB.Model(&book).Association("Authors").Replace(authors); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := database.DB.Model(&book).Association("Translators").Replace(translators); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func BookDestroy(c fiber.Ctx) error {
	username := basicauth.UsernameFromContext(c)
	password := basicauth.PasswordFromContext(c)
	if username != "super_admin" && password != "super_admin" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message": "error",
		})
	}

	id := c.Params("id")

	var book models.Book
	if err := database.DB.First(&book, id).Error; err != nil {
		c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "error",
		})
	}

	if err := database.DB.Select(clause.Associations).Delete(&book, book.ID).Error; err != nil {
		message := err.Error()

		if errors.Is(err, gorm.ErrForeignKeyViolated) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": message,
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": message,
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func BookOptionLevel(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"data": []fiber.Map{
			{
				"id":   1,
				"name": "level 1",
			},
			{
				"id":   2,
				"name": "level 2",
			},
			{
				"id":   3,
				"name": "level 3",
			},
			{
				"id":   4,
				"name": "level 4",
			},
			{
				"id":   5,
				"name": "level 5",
			},
			{
				"id":   6,
				"name": "level 6",
			},
			{
				"id":   7,
				"name": "level 7",
			},
		},
	})
}

func BookOptionLang(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"data": []fiber.Map{
			{
				"id":   1,
				"name": "vietnamese",
			},
			{
				"id":   1,
				"name": "english",
			},
			{
				"id":   1,
				"name": "chinese",
			},
			{
				"id":   1,
				"name": "greek",
			},
			{
				"id":   1,
				"name": "japanese",
			},
			{
				"id":   1,
				"name": "other",
			},
		},
	})
}

func BookOptionStatus(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"data": []fiber.Map{
			{
				"id":   1,
				"name": "step 1",
			},
			{
				"id":   2,
				"name": "step 2",
			},
			{
				"id":   3,
				"name": "step 3",
			},
			{
				"id":   4,
				"name": "step 4",
			},
			{
				"id":   5,
				"name": "step 5",
			},
			{
				"id":   6,
				"name": "step 6",
			},
			{
				"id":   7,
				"name": "step 7",
			},
			{
				"id":   8,
				"name": "step 8",
			},
			{
				"id":   9,
				"name": "step 9",
			},
			{
				"id":   10,
				"name": "step 10",
			},
		},
	})
}

func BookOptionAuthors(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	var authors []models.Author
	if err := database.DB.Scopes(p.DbHandler).Find(&authors).Error; err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	author_options := []fiber.Map{}
	for _, author := range authors {
		author_options = append(author_options, fiber.Map{
			"id":      author.ID,
			"name":    author.Name,
			"potrait": author.Potrait,
			"bio":     author.Bio,
		})
	}

	return c.JSON(fiber.Map{
		"data":      author_options,
		"page":      p.Page,
		"page_size": p.PageSize,
		"message":   "success",
	})
}
