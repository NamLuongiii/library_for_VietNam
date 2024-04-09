package handlers

import (
	"github.com/gofiber/fiber/v3"
)

func AuthorIndex(c fiber.Ctx) error {
	return c.SendString("AuthorIndex")
}

func AuthorShow(c fiber.Ctx) error {
	return c.SendString("AuthorShow")
}

func AuthorStore(c fiber.Ctx) error {
	return c.SendString("AuthorStore")
}

func AuthorUpdate(c fiber.Ctx) error {
	return c.SendString("AuthorUpdate")
}

func AuthorDestroy(c fiber.Ctx) error {
	return c.SendString("AuthorDestroy")
}
