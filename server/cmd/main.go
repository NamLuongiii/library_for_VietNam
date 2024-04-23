package main

import (
	"github.com/NamLuongiii/library_for_VietNam/database"
	"github.com/NamLuongiii/library_for_VietNam/helpers"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/basicauth"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	database.ConnectDb()
	database.FirebaseConnect()
	helpers.SetupValidator()

	app := fiber.New(fiber.Config{})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000, http://127.0.0.1:3000, http://127.0.0.1:8000",
		AllowCredentials: true,
	}))

	api := app.Group("/api")

	admin := api.Group("/admin", basicauth.New(basicauth.Config{
		Users: map[string]string{
			"admin":       "admin",
			"super_admin": "super_admin",
		},
	}))

	setupRoutes(admin)

	client := api.Group("/client")
	setupClientRouter(client)

	app.Listen(":8080")
}
