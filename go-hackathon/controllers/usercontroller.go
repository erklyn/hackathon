package controllers

import (
	"go-hackathon/auth"
	"go-hackathon/database"
	"go-hackathon/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterUser(context *gin.Context) {
	var user models.User
	if err := context.ShouldBindJSON(&user) ; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	if err:= user.HashPassword(user.Password); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	record := database.Instance.Create(&user) 
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}
	
	context.JSON(http.StatusCreated, gin.H{"userId": user.ID, "name": user.Name , "username" :user.Username})
}

func GetUser(context *gin.Context) {
	username := context.Params.ByName("username")
	var user models.User
	if err := database.Instance.Where("username = ?", username).Preload("Qualification").Preload("Events").Preload("EventRequests").Preload("AttendingEvents").First(&user).Error; err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	context.JSON(200 , user)
}
type LoginRequestType struct {
	Username string
	Password string
}
func LoginUser(context *gin.Context) {
	var request LoginRequestType
	var userFromDatabase models.User
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	if err := database.Instance.Preload("Events").Where("username = ?", request.Username).First(&userFromDatabase).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error" :err.Error()})
		context.Abort()
		return
	}
	
	if err := userFromDatabase.CheckPassword(request.Password); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error" : "not authorized"})
		context.Abort()
		return
	}
	tokenString ,err := auth.GenerateJWT(request.Password , request.Username) 
	if err != nil {
		context.JSON(http.StatusInternalServerError , gin.H{"error" : err.Error()})
		context.Abort()
		return
	}

	context.JSON(200 , gin.H{"token":tokenString ,"username":request.Username })
}

func GiveIdToUser(context *gin.Context) {
	var username = context.Params.ByName("username")
	var user models.User

	record := database.Instance.Where("username =?" , username).First(&user)
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}
	context.JSON(200 , gin.H{"userID": user.ID})

	



}

