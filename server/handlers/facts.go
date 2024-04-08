package handlers

import (
    "github.com/gofiber/fiber/v3"
)

func Home(c fiber.Ctx) error {
    return c.SendString("Div Rhino Trivia Vlibrary!")
}

func CreateFact(c fiber.Ctx) error {
    return c.SendString("Create fact")
}