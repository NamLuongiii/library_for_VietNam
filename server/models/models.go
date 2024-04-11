package models

import "gorm.io/gorm"

type Fact struct {
	gorm.Model
	Question string `json:"question" gorm:"default:NULL"`
	Answer   string `json:"answer" gorm:"default:NULL"`
}

type Book struct {
	gorm.Model
	Isbn            string `gorm:"size:256;default:null"`
	Name            string `gorm:"unique;size:256;not null"`
	EnName          string `gorm:"unique;size:256;default:null"`
	OriginName      string `gorm:"size:256;default:null"`
	Cover           string `gorm:"size:256;not null"`
	Preface         string `gorm:"size:500;not null"`
	ComposeAt       string `gorm:"size:256;default:null"`
	Release         string `gorm:"size:256;default:null"`
	Publisher       string `gorm:"size:256;default:null"`
	GlobalPublisher string `gorm:"size:256;default:null"`
	Page            uint64 `gorm:"default:null"`
	Location        uint64 `gorm:"default:null"`
	Chapter         uint8  `gorm:"default:null"`
	Lang            string `gorm:"size:256;not null"`
	OriginLang      string `gorm:"size:256;default:null"`
	ProjectUrl      string `gorm:"size:256;default:null"`
	ResourceUrl     string `gorm:"size:256;default:null"`
	FileUrl         string `gorm:"size:256;not null;"`
	FileName        string `gorm:"unique;size:256;not null"`
	Nation          string `gorm:"size:256;default: null"`
	Status          uint8  `gorm:"not null;default:0"`
	Show            uint8  `gorm:"not null;default:1"`
	Level           uint8  `gorm:"dault:50"`

	Authors     []Author    `gorm:"many2many:book_authors;"`
	Translators []Author    `gorm:"many2many:book_translators;"`
	Bookshelves []Bookshelf `gorm:"many2many:book_bookshelves;"`
	Categories  []Category  `gorm:"many2many:book_categories;"`
}

type Author struct {
	gorm.Model
	Name    string `gorm:"size:256;not null"`
	Potrait string `gorm:"size:256;default:null"`
	Bio     string `gorm:"size:500;default:null"`
	KnowAs  string `gorm:"size:256;default:null"`
	Gender  uint8  `gorm:"default:0"`
	Nation  string `gorm:"size:256;default:null"`
}

type Bookshelf struct {
	gorm.Model
	Name        string `gorm:"size:256;unique;not null"`
	Des         string `gorm:"size:256;default:null"`
	Categories  []Category
}

type Category struct {
	gorm.Model
	Name        string `gorm:"size:256;unique;not null"`
	Des         string `gorm:"size:256;default:null"`
	BookShelfID uint
}
