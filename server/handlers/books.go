package handlers

import (
	"github.com/gofiber/fiber/v2"
)

func BookIndex(c *fiber.Ctx) error {
	return c.SendString("BookIndex")
}

func BookStore(c *fiber.Ctx) error {
	return c.SendString("BookStore")
}

func BookUpdate(c *fiber.Ctx) error {
	return c.SendString("BookIndex")
}

func BookDestroy(c *fiber.Ctx) error {
	return c.SendString("BookIndex")
}