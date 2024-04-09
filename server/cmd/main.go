package main

import (
    "github.com/gofiber/fiber/v3"
    "github.com/NamLuongiii/library_for_VietNam/database"
)

func main() {
    database.ConnectDb()

    app := fiber.New(fiber.Config{})

    app.Use("/api", func(c fiber.Ctx) error {
        return c.Next()
    })

    setupRoutes(app)

    app.Listen(":8080")
}