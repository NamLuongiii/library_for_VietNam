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
	"gorm.io/gorm"
)

type BookStoreInputValidate struct {
	Isbn            string   `validate:"omitempty,max=256" json:"isbn"`
	Name            string   `validate:"required,max=256" json:"name"`
	EnName          string   `validate:"omitempty,max=256" json:"en_name"`
	OriginName      string   `validate:"omitempty,max=256" json:"origin_name"`
	Cover           string   `validate:"required,url,max=256" json:"cover"`
	Preface         string   `validate:"required,max=500" json:"preface"`
	ComposeAt       string   `validate:"omitempty,max=256" json:"compose_at"`
	Release         string   `validate:"omitempty,max=256" json:"release"`
	Publisher       string   `validate:"omitempty,max=256" json:"publisher"`
	GlobalPublisher string   `validate:"omitempty,max=256" json:"global_publisher"`
	Page            uint64   `validate:"omitempty,gte=0,lte=100000" json:"page"`
	Location        uint64   `validate:"omitempty,gte=0,lte=100000" json:"location"`
	Chapter         uint8    `validate:"omitempty,gte=0,lt=256" json:"chapter"`
	Lang            string   `validate:"required,max=256,oneof=vietnamese english chinese greek japanese other" json:"lang"`
	OriginLang      string   `validate:"omitempty,oneof=vietnamese english chinese greek japanese other" json:"origin_lang"`
	ProjectUrl      string   `validate:"omitempty,max=256,url" json:"project_url"`
	ResourceUrl     string   `validate:"omitempty,max=256,url" json:"resource_url"`
	FileUrl         string   `validate:"required,max=256,url" json:"file_url"`
	FileName        string   `validate:"required,max=256" json:"file_name"`
	Nation          string   `validate:"omitempty,max=256" json:"nation"`
	Status          uint8    `validate:"omitempty,oneof= 0 1 2 3 4 5 6 7" json:"status"`
	Show            uint8    `validate:"omitempty,oneof=0 1" json:"show"`
	Level           uint8    `validate:"omitempty,gte=0,lte=100" json:"level"`
	Authors         []string `json:"authors"`
	Translators     []string `json:"translators"`
	Categories      []string `json:"categories"`
}

type BookUpdateInputValidate struct {
	Isbn            string   `validate:"omitempty,max=256" json:"isbn"`
	Name            string   `validate:"required,max=256" json:"name"`
	EnName          string   `validate:"omitempty,max=256" json:"en_name"`
	OriginName      string   `validate:"omitempty,max=256" json:"origin_name"`
	Cover           string   `validate:"required,url,max=256" json:"cover"`
	Preface         string   `validate:"required,max=500" json:"preface"`
	ComposeAt       string   `validate:"omitempty,max=256" json:"compose_at"`
	Release         string   `validate:"omitempty,max=256" json:"release"`
	Publisher       string   `validate:"omitempty,max=256" json:"publisher"`
	GlobalPublisher string   `validate:"omitempty,max=256" json:"global_publisher"`
	Page            uint64   `validate:"omitempty,gte=0,lte=100000" json:"page"`
	Location        uint64   `validate:"omitempty,gte=0,lte=100000" json:"location"`
	Chapter         uint8    `validate:"omitempty,gte=0,lt=256" json:"chapter"`
	Lang            string   `validate:"required,max=256,oneof=vietnamese english chinese greek japanese other" json:"lang"`
	OriginLang      string   `validate:"omitempty,oneof=vietnamese english chinese greek japanese other" json:"origin_lang"`
	ProjectUrl      string   `validate:"omitempty,max=256,url" json:"project_url"`
	ResourceUrl     string   `validate:"omitempty,max=256,url" json:"resource_url"`
	FileUrl         string   `validate:"required,max=256,url" json:"file_url"`
	FileName        string   `validate:"required,max=256" json:"file_name"`
	Nation          string   `validate:"omitempty,max=256" json:"nation"`
	Status          uint8    `validate:"omitempty,oneof= 0 1 2 3 4 5 6 7" json:"status"`
	Show            uint8    `validate:"omitempty,oneof=0 1" json:"show"`
	Level           uint8    `validate:"omitempty,gte=0,lte=100" json:"level"`
	Authors         []string `json:"authors"`
	Translators     []string `json:"translators"`
	Categories      []string `json:"categories"`
}

func BookIndex(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	var books []models.Book
	database.DB.Scopes(p.DbHandler).Find(&books)

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
			"show":             book.Show,
			"level":            book.Level,
			"authors":          book.Authors,
			"translators":      book.Translators,
			"categories":       book.Categories,
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

	if err := database.DB.First(&book, ID).Error; err != nil {
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
			"show":             book.Show,
			"level":            book.Level,
			"authors":          book.Authors,
			"translators":      book.Translators,
			"categories":       book.Categories,
			"created_at":       book.CreatedAt,
			"updated_at":       book.UpdatedAt,
		},
	})
}

func BookStore(c fiber.Ctx) error {
	body := c.Body()

	var input BookStoreInputValidate
	if err := json.Unmarshal(body, &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Body unmarshal error",
		})
	}

	if err := helpers.Validate.Struct(input); err != nil {
		fields := fiber.Map{}
		for _, err := range err.(validator.ValidationErrors) {
			value := err.Value()
			if str, ok := value.(string); ok {
				value = helpers.ShortenString(str)
			}

			sentence := ""
			field := ""
			switch err.Param() {
			case "":
				sentence = "[%s]: '%v' | Needs to implement '%s'"
				field = fmt.Sprintf(sentence, err.Field(), value, err.Tag())
			default:
				sentence = "[%s]: '%v' | Needs to implement '%s=%s'"
				field = fmt.Sprintf(sentence, err.Field(), value, err.Tag(), err.Param())
			}

			fields[helpers.ToSnake(err.Field())] = field
		}

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error",
			"fields":  fields,
		})
	}

	book := models.Book{
		Isbn:            input.Isbn,
		Name:            input.Name,
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
		FileUrl:         input.FileUrl,
		FileName:        input.FileName,
		Nation:          input.Nation,
		Status:          input.Status,
		Show:            input.Show,
		Level:           input.Level,
	}

	if result := database.DB.Create(&book); result.Error != nil {
		err_message := result.Error.Error()

		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			fields := fiber.Map{}
			var b models.Book
			if err := database.DB.Where("name=?", book.Name).First(&b).Error; err == nil {
				fields["name"] = err_message
			}
			if err := database.DB.Where("en_name=?", book.EnName).First(&b).Error; err == nil {
				fields["en_name"] = err_message
			}
			if err := database.DB.Where("file_name=?", book.FileName).First(&b).Error; err == nil {
				fields["file_name"] = err_message
			}

			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"fields":  fields,
				"message": "error",
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
			"message": "Not found book",
		})
	}

	var input BookUpdateInputValidate
	if err := json.Unmarshal(c.Body(), &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Body unmarshal error",
		})
	}

	if err := helpers.Validate.Struct(input); err != nil {
		fields := fiber.Map{}
		for _, err := range err.(validator.ValidationErrors) {
			value := err.Value()
			if str, ok := value.(string); ok {
				value = helpers.ShortenString(str)
			}

			sentence := ""
			field := ""
			switch err.Param() {
			case "":
				sentence = "[%s]: '%v' | Needs to implement '%s'"
				field = fmt.Sprintf(sentence, err.Field(), value, err.Tag())
			default:
				sentence = "[%s]: '%v' | Needs to implement '%s=%s'"
				field = fmt.Sprintf(sentence, err.Field(), value, err.Tag(), err.Param())
			}

			fields[helpers.ToSnake(err.Field())] = field
		}

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

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func BookDestroy(c fiber.Ctx) error {
	id := c.Params("id")

	var book models.Book
	if err := database.DB.First(&book, id).Error; err != nil {
		c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "error",
		})
	}

	if err := database.DB.Delete(&book).Error; err != nil {
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
			fiber.Map{
				"id":   1,
				"name": "level 1",
			},
			fiber.Map{
				"id":   2,
				"name": "level 2",
			},
			fiber.Map{
				"id":   3,
				"name": "level 3",
			},
			fiber.Map{
				"id":   4,
				"name": "level 4",
			},
			fiber.Map{
				"id":   5,
				"name": "level 5",
			},
			fiber.Map{
				"id":   6,
				"name": "level 6",
			},
			fiber.Map{
				"id":   7,
				"name": "level 7",
			},
		},
	})
}

func BookOptionLang(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"data": []fiber.Map{
			fiber.Map{
				"id":   1,
				"name": "vietnamese",
			},
			fiber.Map{
				"id":   1,
				"name": "english",
			},
			fiber.Map{
				"id":   1,
				"name": "chinese",
			},
			fiber.Map{
				"id":   1,
				"name": "greek",
			},
			fiber.Map{
				"id":   1,
				"name": "japanese",
			},
			fiber.Map{
				"id":   1,
				"name": "other",
			},
		},
	})
}

func BookOptionStatus(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"data": []fiber.Map{
			fiber.Map{
				"id":   1,
				"name": "step 1",
			},
			fiber.Map{
				"id":   2,
				"name": "step 2",
			},
			fiber.Map{
				"id":   3,
				"name": "step 3",
			},
			fiber.Map{
				"id":   4,
				"name": "step 4",
			},
			fiber.Map{
				"id":   5,
				"name": "step 5",
			},
			fiber.Map{
				"id":   6,
				"name": "step 6",
			},
			fiber.Map{
				"id":   7,
				"name": "step 7",
			},
			fiber.Map{
				"id":   8,
				"name": "step 8",
			},
			fiber.Map{
				"id":   9,
				"name": "step 9",
			},
			fiber.Map{
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
		"data":    author_options,
		"page": p.Page,
		"page_size": p.PageSize,
		"message": "success",
	})
}
