package handlers

import (
	"encoding/json"
	"fmt"

	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
)

type BookStoreInputValidate struct {
	Isbn            string   `json:"isbn" validate:"max=256"`
	Name            string   `json:"name" validate:"required,max=256"`
	EnName          string   `json:"en_name" validate:"max=256"`
	OriginName      string   `json:"origin_name" validate:"max=256"`
	Cover           string   `json:"cover" validate:"required,url,max=256"`
	Preface         string   `json:"preface" validate:"required,max=500"`
	ComposeAt       string   `json:"compose_at" validate:"max=256"`
	Release         string   `json:"release" validate:"max=256"`
	Publisher       string   `json:"publisher" validate:"max=256"`
	GlobalPublisher string   `json:"global_publisher" validate:"max=256"`
	Page            uint64   `json:"page" validate:"gte=0,lte=100000"`
	Location        uint64   `json:"location" validate:"gte=0,lte=100000"`
	Chapter         uint8    `json:"chapter" validate:"gte=0,lt=256"`
	Lang            string   `json:"lang" validate:"required,max=256,oneof=vietnamese english chinese greek japanese other"`
	OriginLang      string   `json:"origin_lang" validate="max=256,oneof=vietnamese english chinese greek japanese other"`
	ProjectUrl      string   `json:"project_url" validate="max=256,url"`
	ResourceUrl     string   `json:"resource_url" validate="max=256,url"`
	FileUrl         string   `json:"file_url" validate="required,max=256,url"`
	FileName        string   `json:"file_name" validate="required,max=256,url"`
	Nation          string   `json:"nation" validate="max=256"`
	Status          uint8    `json:"status" validate="oneof= 0 1 2 3 4 5 6 7"`
	Show            uint8    `json:"show" validate="oneof=0 1"`
	Level           uint8    `json:"level" validate="gte=0,lte=100"`
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
			"message": "Book with non-exsit ID",
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
			"message": "Book body un-parserable",
		})
	}

	fields := fiber.Map{}

	if err := helpers.Validate.Struct(input); err != nil {
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
			"fields": fields,
		})
	}

	book := models.Book{
		Isbn: input.Isbn,
		Name: input.Name,
		EnName: input.EnName,
		OriginName: input.OriginName,
		Cover: input.Cover,
		Preface: input.Preface,
		ComposeAt: input.ComposeAt,
		Release: input.Release,
		Publisher: input.Publisher,
		GlobalPublisher: input.GlobalPublisher,
		Page: input.Page,
		Location: input.Location,
		Chapter: input.Chapter,
		Lang: input.Lang,
		OriginLang: input.OriginLang,
		ProjectUrl: input.ProjectUrl,
	    ResourceUrl: input.ResourceUrl,
		FileUrl: input.FileUrl,
	 	FileName: input.FileName,
		Nation: input.Nation,
		Status: input.Status,
		Show: input.Show,
		Level: input.Level,
	}

	if result := database.DB.Create(&book); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "StatusInternalServerError",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Book store sucessable",
	})
}

func BookUpdate(c fiber.Ctx) error {
	return c.SendString("BookIndex")
}

func BookDestroy(c fiber.Ctx) error {
	return c.SendString("BookIndex")
}
