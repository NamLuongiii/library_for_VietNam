package clienthandler

import (
	"strings"

	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/NamLuongiii/library_for_VietNam/models"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm/clause"
)

func BooksIndex(c fiber.Ctx) error {
	p := helpers.Paginate(c)
	q := c.Queries()

	orderBy := q["order_by"]
	if orderBy == "" {
		orderBy = "desc"
	}

	books := []models.Book{}
	dbHandler := database.DB.
		Table("books").
		Distinct("id").
		Select("books.*")

	categoryQuery := q["category"]
	if categoryQuery != "" {
		categoryIds := strings.Split(q["category"], ",")
		dbHandler.
			Joins("JOIN book_categories ON books.id = book_categories.book_id").
			Where("book_categories.category_id IN (?)", categoryIds).
			Where("is_show = 1")
	}

	keyWord := strings.ToLower(q["key_word"])
	if keyWord != "" {
		dbHandler.
			Where(database.DB.
				Where("LOWER(name) LIKE ?", "%"+keyWord+"%").
				Or("LOWER(en_name) LIKE ?", "%"+keyWord+"%"))
	}

	result := dbHandler.
		Order("created_at " + orderBy).
		Scopes(p.DbHandler).
		Scan(&books)

	if err := result.Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

	data := []fiber.Map{}
	for _, book := range books {
		data = append(data, fiber.Map{
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
		})
	}

	return c.JSON(fiber.Map{
		"data":      data,
		"message":   "success",
		"page":      p.Page,
		"page_size": p.PageSize,
	})
}

func BooksDiscovery(c fiber.Ctx) error {
	p := helpers.Paginate(c)

	books := []models.Book{}
	if err := database.DB.
		Preload(clause.Associations).
		Scopes(p.DbHandler).
		Where("is_show = 1").
		Order("created_at desc").
		Find(&books).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
	}

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

func BooksShow(c fiber.Ctx) error {
	id := c.Params("id")

	book := models.Book{}
	if err := database.DB.
		Preload(clause.Associations).
		Where("is_show = 1").
		First(&book, id).Error; err != nil {
		return helpers.StatusInternalServerResponse(c, err.Error())
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

	data := fiber.Map{
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
	}

	return c.JSON(fiber.Map{
		"data":    data,
		"message": "success",
	})
}
