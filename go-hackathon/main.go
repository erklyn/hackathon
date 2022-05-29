package main

import (
	"go-hackathon/controllers"
	"go-hackathon/database"
	"go-hackathon/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect("root:utkutest@tcp(localhost:3306)/hackathon?parseTime=true")
	database.Migrate()
	router := initRouter()

	router.Run(":8080")
}

func initRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middlewares.CORSMiddleware())
	api := router.Group("/api")
	{
		api.POST("/user/register", controllers.RegisterUser)
		api.POST("/user/login", controllers.LoginUser)
		secured := router.Group("/secured") 
		{
			secured.GET("/userId/:username", controllers.GiveIdToUser).Use(middlewares.Auth())
			secured.GET("/user/:username", controllers.GetUser).Use(middlewares.Auth())
			secured.POST("/eventrequests", controllers.RegisterEventRequest).Use(middlewares.Auth())
			secured.GET("/eventrequests", controllers.GetEventRequests).Use(middlewares.Auth())
			secured.GET("/eventrequests/:id" , controllers.GetEventRequest).Use(middlewares.Auth())
			secured.POST("/attend/event", controllers.AttendEvent).Use(middlewares.Auth())
			secured.POST("/events", controllers.RegisterEvent).Use(middlewares.Auth())
			secured.GET("/events", controllers.GetEvents).Use(middlewares.Auth())
			secured.GET("/events/:id", controllers.GetEvent).Use(middlewares.Auth())
		}
	}
	return router
}
