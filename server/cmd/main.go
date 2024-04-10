package main

import (
    "github.com/gofiber/fiber/v3"
    "github.com/NamLuongiii/library_for_VietNam/database"
    "github.com/NamLuongiii/library_for_VietNam/helpers"
)

func main() {
    database.ConnectDb()
    helpers.SetupValidator()

    app := fiber.New(fiber.Config{})

    app.Use("/api", func(c fiber.Ctx) error {
        return c.Next()
    })

    setupRoutes(app)

    app.Listen(":8080")
}