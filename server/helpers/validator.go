package helpers

import (
    "github.com/go-playground/validator/v10"
    "sync"
)

// Singleton instance of validator
var instance *validator.Validate
var once sync.Once

// GetValidator returns a singleton instance of validator
func ValidatorInstance() *validator.Validate {
    once.Do(func() {
        instance = validator.New()
    })
    return instance
}