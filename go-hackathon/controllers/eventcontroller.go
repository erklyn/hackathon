package controllers

import (
	"go-hackathon/database"
	"go-hackathon/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterEvent(context *gin.Context) {
	var event models.Event
	if err := context.ShouldBindJSON(&event); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		context.Abort()
		return
	}
	record := database.Instance.Create(&event)
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}
	context.JSON(http.StatusCreated, gin.H{"eventId": event.ID , "title": event.Title})
}
func GetEvents(context *gin.Context) {
	var events []models.Event
	if err := database.Instance.Find(&events).Error; err != nil {
		context.JSON(http.StatusNotFound , gin.H{"error": err.Error()})
		context.Abort()
		return 
	}
	context.JSON(200 , events)
}

func GetEvent(context *gin.Context) {
	id := context.Params.ByName("id")
	var event models.Event
	if err := database.Instance.Where("ID = ?", id).Preload("User").Preload("Attendees").First(&event).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	context.JSON(200 , event)
}
type AttendEventRequest struct {
	UserID uint
	EventID uint
}
func AttendEvent(context *gin.Context) {
	var request AttendEventRequest
	var event models.Event 
	var user models.User
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	eventRecord := database.Instance.Where("ID =?",request.EventID).First(&event)

	if eventRecord.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": eventRecord.Error.Error()})
		context.Abort()
		return
	}
	userRecord := database.Instance.Where("ID =?", request.UserID).First(&user)
	if userRecord.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": userRecord.Error.Error()})
		context.Abort()
		return
	}
	attendee := models.Attendee{
		User: user,
		UserID: request.UserID,
		EventID: request.EventID,
		Event: event,
	}
	createRecord := database.Instance.Create(&attendee)
	if createRecord.Error != nil{
		context.JSON(http.StatusInternalServerError , gin.H{"error": createRecord.Error.Error()})
		context.Abort()
		return
	}
	context.JSON(http.StatusCreated , gin.H{"userId": request.UserID , "eventID": request.EventID})
}
