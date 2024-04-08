package database

import (
    "fmt"
    "log"
    "os"

    "github.com/NamLuongiii/library_for_VietNam/models"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
)

type Dbinstance struct {
    Db *gorm.DB
}

var DB Dbinstance

func ConnectDb() {
    dsn := fmt.Sprintf(
        "host=db user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Shanghai",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
    )

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })

    if err != nil {
        log.Fatal("Failed to connect to database. \n", err)
        os.Exit(2)
    }

    log.Println("connected")
    db.Logger = logger.Default.LogMode(logger.Error)

    log.Println("running migrations")
    db.AutoMigrate(
        &models.Fact{}, 
        &models.Book{},
        &models.Author{},
        &models.Category{},
        &models.BookShelf{},
    )

    DB = Dbinstance{
        Db: db,
    }
}