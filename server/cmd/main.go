package main

import (
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/basicauth"
)

func main() {
	database.ConnectDb()
	helpers.SetupValidator()

	app := fiber.New(fiber.Config{})

	api := app.Group("/api")

	admin := api.Group("/admin", basicauth.New(basicauth.Config{
		Users: map[string]string{
			"admin":       "admin",
			"super_admin": "super_admin",
		},
	}))

	setupRoutes(admin)

	app.Listen(":8080")
}
