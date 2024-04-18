package helpers

import (
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/iancoleman/strcase"
)

func ToSnake(camel string) string {
	return strcase.ToSnake(camel)
}

func ShortenString(s string) string {
	output_length := 7
	if len(s) <= output_length {
		return s
	}
	return ConnectString(SliceString(s, 0, 7), "...")
}

func SliceString(s string, start, end int) string {
	if start < 0 {
		start = 0
	}
	if end > len(s) {
		end = len(s)
	}
	return s[start:end]
}

func ConnectString(strs ...string) string {
	result := strings.Join(strs, "")
	return result
}

func StatusInternalServerResponse(c fiber.Ctx, message string) error {
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"message": message,
	})
}

func FieldValidateBadRequestResponse(c fiber.Ctx, fields *fiber.Map) error {
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
		"message": "error",
		"fields":  fields,
	})
}

func SimpleSuccessResponse(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func SimpleNotFoundResponse(c fiber.Ctx, message string) error {
	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
		"message": message,
	})
}

func SimpleUnAuthozitionResponse(c fiber.Ctx, message string) error {
	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"message": message,
	})
}
