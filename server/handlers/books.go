package handlers

import (
	"encoding/json"
	"github.com/gofiber/fiber/v3"
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
)

type BookRequestBody struct {
	Isbn string `json:"isbn"`
	Name string `json:"name"`
	Author fiber.Map `json:"author"`
}

func BookIndex(c fiber.Ctx) error {
    p := helpers.Paginate(c)

	var books []models.Book
 	database.DB.Scopes(p.DbHandler).Find(&books)

	res_books := []fiber.Map{} 
	for _, book := range books {
		res_books = append(res_books, fiber.Map{
			"id": book.ID,
			"isbn": book.Isbn,
			"name": book.Name,
			"en_name": book.EnName,
			"origin_name": book.OriginName,
			"cover": book.Cover,
			"preface": book.Preface,
			"compose_at": book.ComposeAt,
			"release": book.Release,
			"publisher": book.Publisher,
			"global_publisher": book.GlobalPublisher,
			"page": book.Page,
			"location": book.Location,
			"chapter": book.Chapter,
			"lang": book.Lang,
			"origin_lang": book.OriginLang,
			"project_url": book.ProjectUrl,
			"resource_url": book.ResourceUrl,
			"file_url": book.FileUrl,
			"file_name": book.FileName,
			"nation": book.Nation,
			"status": book.Status,
			"show": book.Show,
			"level": book.Level,
			"authors": book.Authors,
			"translators": book.Translators,
			"categories": book.Categories,
			"created_at": book.CreatedAt,
			"updated_at": book.UpdatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"data": res_books,
		"page": p.Page,
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
			"id": book.ID,
			"isbn": book.Isbn,
			"name": book.Name,
			"en_name": book.EnName,
			"origin_name": book.OriginName,
			"cover": book.Cover,
			"preface": book.Preface,
			"compose_at": book.ComposeAt,
			"release": book.Release,
			"publisher": book.Publisher,
			"global_publisher": book.GlobalPublisher,
			"page": book.Page,
			"location": book.Location,
			"chapter": book.Chapter,
			"lang": book.Lang,
			"origin_lang": book.OriginLang,
			"project_url": book.ProjectUrl,
			"resource_url": book.ResourceUrl,
			"file_url": book.FileUrl,
			"file_name": book.FileName,
			"nation": book.Nation,
			"status": book.Status,
			"show": book.Show,
			"level": book.Level,
			"authors": book.Authors,
			"translators": book.Translators,
			"categories": book.Categories,
			"created_at": book.CreatedAt,
			"updated_at": book.UpdatedAt,
		},
	})
}

func BookStore(c fiber.Ctx) error {
	body := c.Body()
	 
	var input BookRequestBody
	if err := json.Unmarshal(body, &input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Book body un-parserable",
		})
	}


	return c.JSON(fiber.Map{
		"isbn": input.Isbn,
		"name": input.Name,
		"author": input.Author,
	})
}

func BookUpdate(c fiber.Ctx) error {
	return c.SendString("BookIndex")
}

func BookDestroy(c fiber.Ctx) error {
	return c.SendString("BookIndex")
}