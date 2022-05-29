package database

import (
	"go-hackathon/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Instance *gorm.DB
var dbError error
func Connect(connectString string)() {
	Instance, dbError = gorm.Open(mysql.Open(connectString) ,&gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,	
	})
	if dbError != nil {
		log.Fatal(dbError)
		panic("couldn't connect to database")
	}
	log.Println("Connected to database!")
}

func Migrate() {
	Instance.AutoMigrate(&models.User{}, &models.Attendee{}, &models.Event{} , &models.EventRequest{} , &models.Qualification{})
	log.Println("Database migration Completed!")
}

