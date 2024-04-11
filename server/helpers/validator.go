package helpers

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
)

var Validate *validator.Validate

func SetupValidator() {
	Validate = validator.New(validator.WithRequiredStructEnabled())
}

func ErrorFieldMessages(errors validator.ValidationErrors, fields *fiber.Map) {
	for _, err := range errors {
		(*fields)[ToSnake(err.Field())] = err.Error()
	}
}