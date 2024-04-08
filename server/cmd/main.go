package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/NamLuongiii/library_for_VietNam/database"
)

func main() {
    database.ConnectDb()

    app := fiber.New()

    setupRoutes(app)

    app.Listen(":8080")
}