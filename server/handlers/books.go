package handlers

import (
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

type FileInput struct {
	Name      string `validate:"required,max=256" json:"name"`
	Url       string `validate:"required,url,max=256" json:"url"`
	Extension string `validate:"required,max=256" json:"extension"`
	Color     string `validate:"omitempty,max=256" josn:"color"`
}

type categoryInput struct {
	ID   uint   `validate:"required" json:"id"`
	Name string `validate:"required,max=256" json:"name"`
	Des  string `validate:"max=256" json:"des"`
}

type BookInput struct {
	Isbn            string `validate:"omitempty,max=256" json:"isbn"`
	Name            string `validate:"required,max=256" json:"name"`
	EnName          string `validate:"omitempty,max=256" json:"en_name"`
	OriginName      string `validate:"omitempty,max=256" json:"origin_name"`
	Cover           string `validate:"required,url,max=256" json:"cover"`
	Preface         string `validate:"omitempty,max=500" json:"preface"`
	ComposeAt       string `validate:"omitempty,max=256" json:"compose_at"`
	Release         string `validate:"omitempty,max=256" json:"release"`
	Publisher       string `validate:"omitempty,max=256" json:"publisher"`
	GlobalPublisher string `validate:"omitempty,max=256" json:"global_publisher"`
	Page            uint64 `validate:"omitempty,gte=0,lte=100000" json:"page"`
	Location        uint64 `validate:"omitempty,gte=0,lte=100000" json:"location"`
	Chapter         uint8  `validate:"omitempty,gte=0,lt=256" json:"chapter"`
	Lang            string `validate:"omitempty,max=256" json:"lang"`
	OriginLang      string `validate:"omitempty,max=256" json:"origin_lang"`
	ProjectUrl      string `validate:"omitempty,max=256,url" json:"project_url"`
	ResourceUrl     string `validate:"omitempty,max=256,url" json:"resource_url"`
	Nation          string `validate:"omitempty,max=256" json:"nation"`
	Status          uint8  `validate:"omitempty,oneof= 0 1 2 3 4 5 6 7" json:"status"`
	IsShow          uint8  `validate:"omitempty,oneof=0 1" json:"is_show"`
	Level           uint8  `validate:"omitempty,gte=0,lte=100" json:"level"`

	Authors    []AuthorInput   `validate:"omitempty,dive,required" json:"authors"`
	Categories []categoryInput `validate:"omitempty,dive,required" json:"categories"`
	Files      []FileInput     `validate:"omitempty,dive,required" json:"files"`
}

func BookIndex(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	orderBy := "created_at desc"

	var books []models.Book
	database.DB.Preload(clause.Associations).Order(orderBy).Scopes(p.DbHandler).Find(&books)

	res_books := []fiber.Map{}
	for _, book := range books {
		authors := []fiber.Map{}
		for _, author := range book.Authors {
			authors = append(authors, fiber.Map{
				"id":         author.ID,
				"name":       author.Name,
				"bio":        author.Bio,
				"botrait":    author.Potrait,
				"know_as":    author.KnowAs,
				"gender":     author.Gender,
				"created_at": author.CreatedAt,
				"updated_at": author.UpdatedAt,
			})
		}

		categories := []fiber.Map{}
		for _, category := range book.Categories {
			categories = append(categories, fiber.Map{
				"id":         category.ID,
				"name":       category.Name,
				"des":        category.Des,
				"created_at": category.CreatedAt,
				"updated_at": category.UpdatedAt,
			})
		}

		files := ""
		for _, file := range book.Files {
			files += file.Extension + " "
		}

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
			"nation":           book.Nation,
			"status":           book.Status,
			"is_show":          book.IsShow,
			"level":            book.Level,
			"created_at":       book.CreatedAt,
			"updated_at":       book.UpdatedAt,

			"authors":    authors,
			"categories": categories,
			"files":      files,
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
		return helpers.SimpleNotFoundResponse(c, err.Error())
	}

	authors := []fiber.Map{}
	for _, author := range book.Authors {
		authors = append(authors, fiber.Map{
			"id":         author.ID,
			"name":       author.Name,
			"bio":        author.Bio,
			"botrait":    author.Potrait,
			"know_as":    author.KnowAs,
			"gender":     author.Gender,
			"created_at": author.CreatedAt,
			"updated_at": author.UpdatedAt,
		})
	}

	categories := []fiber.Map{}
	for _, category := range book.Categories {
		categories = append(categories, fiber.Map{
			"id":         category.ID,
			"name":       category.Name,
			"des":        category.Des,
			"created_at": category.CreatedAt,
			"updated_at": category.UpdatedAt,
		})
	}

	files := []fiber.Map{}
	for _, file := range book.Files {
		files = append(files, fiber.Map{
			"id":         file.ID,
			"name":       file.Name,
			"url":        file.Url,
			"extension":  file.Extension,
			"color":      file.Color,
			"created_at": file.CreatedAt,
			"updated_at": file.UpdatedAt,
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
			"nation":           book.Nation,
			"status":           book.Status,
			"is_show":          book.IsShow,
			"level":            book.Level,
			"created_at":       book.CreatedAt,
			"updated_at":       book.UpdatedAt,

			"authors":    authors,
			"categories": categories,
			"files":      files,
		},
	})
}

func BookStore(c fiber.Ctx) error {
	var input BookInput
	err := c.Bind().JSON(&input)
	if err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	if errs := helpers.Validate.Struct(input); errs != nil {
		fields := fiber.Map{}
		helpers.ErrorFieldMessages(errs.(validator.ValidationErrors), &fields)
		return helpers.FieldValidateBadRequestResponse(c, &fields)
	}

	authors := []models.Author{}
	for _, _author := range input.Authors {
		authors = append(authors, models.Author{
			Model: gorm.Model{
				ID: _author.ID,
			},
		})
	}

	categories := []models.Category{}
	for _, category := range input.Categories {
		categories = append(categories, models.Category{
			Model: gorm.Model{
				ID: category.ID,
			},
		})
	}

	files := []models.File{}
	for _, file := range input.Files {
		files = append(files, models.File{
			Name:      file.Name,
			Url:       file.Url,
			Extension: file.Extension,
			Color:     file.Color,
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
		Nation:          input.Nation,
		Status:          input.Status,
		IsShow:          input.IsShow,
		Level:           input.Level,

		Authors:    authors,
		Categories: categories,
		Files:      files,
	}

	if err := database.DB.Create(&book).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func BookUpdate(c fiber.Ctx) error {
	id := c.Params("id")

	var book models.Book
	if err := database.DB.First(&book, id).Error; err != nil {
		return helpers.SimpleNotFoundResponse(c, err.Error())
	}

	var input BookInput
	err := c.Bind().JSON(&input)
	if err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	if errs := helpers.Validate.Struct(input); errs != nil {
		fields := fiber.Map{}
		helpers.ErrorFieldMessages(errs.(validator.ValidationErrors), &fields)
		return helpers.FieldValidateBadRequestResponse(c, &fields)
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
	book.Nation = input.Nation
	book.Status = input.Status
	book.IsShow = input.IsShow
	book.Level = input.Level

	if err := database.DB.Save(&book).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	var authors []models.Author
	for _, _author := range input.Authors {
		authors = append(authors, models.Author{
			Model: gorm.Model{
				ID: _author.ID,
			},
		})
	}

	var categories []models.Category
	for _, category := range input.Categories {
		categories = append(categories, models.Category{
			Model: gorm.Model{
				ID: category.ID,
			},
		})
	}

	files := []models.File{}
	for _, file := range input.Files {
		files = append(files, models.File{
			Name:      file.Name,
			Url:       file.Url,
			Extension: file.Extension,
			Color:     file.Color,
		})
	}

	if err := database.DB.Model(&book).Association("Authors").Replace(authors); err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	if err := database.DB.Model(&book).Association("Files").Replace(files); err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	if err := database.DB.Model(&book).Association("Categories").Replace(categories); err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	return helpers.SimpleSuccessResponse(c)
}

func BookDestroy(c fiber.Ctx) error {
	username := basicauth.UsernameFromContext(c)
	password := basicauth.PasswordFromContext(c)
	if username != "super_admin" && password != "super_admin" {
		return helpers.SimpleUnAuthozitionResponse(c, "error")
	}

	id := c.Params("id")

	var book models.Book
	if err := database.DB.First(&book, id).Error; err != nil {
		return helpers.SimpleNotFoundResponse(c, err.Error())
	}

	if err := database.DB.Select(clause.Associations).Delete(&book, book.ID).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	return helpers.SimpleSuccessResponse(c)
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
		"data": []string{
			"Sách trong nước",
			"Sách nước ngoài",
			"Sách nước ngoài có chuyển ngữ",
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
		return helpers.StatusInternalServerResponse(c, err.Error())
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

func BookOptionCategories(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	categories := []models.Category{}
	if err := database.DB.Scopes(p.DbHandler).Find(&categories).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	res := []fiber.Map{}
	for _, category := range categories {
		res = append(res, fiber.Map{
			"id":         category.ID,
			"name":       category.Name,
			"des":        category.Des,
			"created_at": category.CreatedAt,
			"updated_at": category.UpdatedAt,
		})
	}

	return c.JSON(fiber.Map{
		"data":      res,
		"page":      p.Page,
		"page_size": p.PageSize,
		"message":   "success",
	})
}

type BookTestType struct {
	Name string `json:"name"`
	Age  uint8  `json:"age"`
	Cash uint64 `json:"cash"`
}

func BookTest(c fiber.Ctx) error {
	var data BookTestType
	c.Bind().JSON(&data)
	return c.JSONP(fiber.Map{
		"data": data,
	})
}
