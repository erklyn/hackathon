package controllers

import (
	"go-hackathon/database"
	"go-hackathon/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterEventRequest(context *gin.Context) {
	var eventRequest models.EventRequest
	if err := context.ShouldBindJSON(&eventRequest) ; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		context.Abort()
		return
	}
	record := database.Instance.Create(&eventRequest)
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}
	context.JSON(http.StatusCreated , gin.H{"eventTitle":eventRequest.Title})
}

func GetEventRequests(context *gin.Context){
	var EventRequests []models.EventRequest
	if err := database.Instance.Preload("User").Find(&EventRequests).Error; err != nil {
		context.JSON(http.StatusInternalServerError , gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	context.JSON(200 , EventRequests)
}

func GetEventRequest(context *gin.Context){
	id := context.Params.ByName("id")
	var eventRequest models.EventRequest
	if err := database.Instance.Where("id = ?", id).Preload("User").First(&eventRequest).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	context.JSON(200 , eventRequest)
}