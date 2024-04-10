package helpers

import (
    "github.com/iancoleman/strcase"
    "strings"
)

func ToSnake(camel string) string {
    return strcase.ToSnake(camel)
}

func ShortenString(s string) string {
    output_length := 7
    if len(s) <= output_length {
        return s 
    } 
    return ConnectString(SliceString(s, 0, 7), "...")
}

func SliceString(s string, start, end int) string {
    if start < 0 {
        start = 0
    }
    if end > len(s) {
        end = len(s)
    }
    return s[start:end]
}

func ConnectString(strs ...string) string {
    result := strings.Join(strs, "")
    return result
}