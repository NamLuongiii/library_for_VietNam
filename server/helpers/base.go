package helpers

import (
	"strconv"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

type PaginateResponseType struct {
	Page      int
	PageSize  int
	DbHandler func(db *gorm.DB) *gorm.DB
}

func Paginate(c fiber.Ctx) PaginateResponseType {

	q := c.Queries()

	page, _ := strconv.Atoi(q["page"])
	if page <= 0 {
		page = 1
	}

	pageSize, _ := strconv.Atoi(q["page_size"])
	switch {
	case pageSize > 100:
		pageSize = 100
	case pageSize <= 0:
		pageSize = 20
	}

	offset := (page - 1) * pageSize

	return PaginateResponseType{
		page,
		pageSize,
		func(db *gorm.DB) *gorm.DB {
			return db.Offset(offset).Limit(pageSize)
		},
	}
}
