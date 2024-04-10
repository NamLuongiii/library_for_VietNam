package helpers

import (
	"github.com/go-playground/validator/v10"
)

var Validate *validator.Validate

func SetupValidator() {
	Validate = validator.New(validator.WithRequiredStructEnabled())
}