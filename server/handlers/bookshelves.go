package handlers

import (
	"github.com/gofiber/fiber/v3"
)

func BookShelfIndex(c fiber.Ctx) error {
	return c.SendString("BookShelfIndex")
}

func BookShelfShow(c fiber.Ctx) error {
	return c.SendString("BookShelfShow")
}

func BookShelfStore(c fiber.Ctx) error {
	return c.SendString("BookShelfStore")
}

func BookShelfUpdate(c fiber.Ctx) error {
	return c.SendString("BookShelfUpdate")
}

func BookShelfDestroy(c fiber.Ctx) error {
	return c.SendString("BookShelfDestroy")
}