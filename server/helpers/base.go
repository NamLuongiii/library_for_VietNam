package helpers 

import (
	"github.com/gofiber/fiber/v3"
	"strconv"
	"gorm.io/gorm"
)

type PaginateResponseType struct {
	Page int
	PageSize int
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
	  pageSize = 10
	}

	offset := (page - 1) * pageSize

	return PaginateResponseType{
		page,
		pageSize,
		func (db *gorm.DB) *gorm.DB {
			return db.Offset(offset).Limit(pageSize)
		},
	}
}
