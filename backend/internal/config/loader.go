package config

import "os"

type AppConfig struct {
	DB DBConfig
}

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
}

func getEnv(key string, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return defaultValue
	}
	return defaultValue
}

func LoadConfig() AppConfig {
	return AppConfig{
		DB: DBConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "app"),
			Password: getEnv("DB_PASSWORD", "password"),
		},
	}
}
