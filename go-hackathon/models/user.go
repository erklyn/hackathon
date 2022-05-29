package models

import (

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	IsAdmin 				bool 		    		`json:"isadmin"`
	Name 	 				string 					`json:"name"`
	Surname  				string 					`json:"surname"`
	Address 				string  				`json:"address"`
	Username 				string					`json:"username" gorm:"unique"`
	Email 	 				string  				`json:"email" gorm:"unique"`
	Password 				string  				`json:"password"`
	Qualification 			Qualification  			`json:"qualifications" gorm:"foreignKey:UserID"`
	Events 					[]Event 				`json:"events" gorm:"foreignKey:UserID"`
	EventRequests			[]EventRequest			`json:"eventRequests" gorm:"foreignKey:UserID"`
	AttendingEvents 		[]Attendee				`json:"attendingEvents" gorm:"foreignKey:UserID"`
	Phone  					string 					`json:"phone"`
}

func (user *User) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}
func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}

type Qualification struct {
	AreaOfInterest 			string 				`json:"areaofinterest"`
	University 				string 				`json:"university"`
	UserID 					uint   				`json:"userId"`
}

type Event struct {
	gorm.Model
	UserID 					uint 		`json:"userId"`
	User 						User 		`json:"creator"`
	Title 					string 		`json:"title"`
	Address 				string	 	`json:"address"`
	EventType  				string 		`json:"eventType"`
	LimitOfAttendees 		int 		`json:"peoplelimit"`
	Attendees 				[]Attendee  `json:"attendees"`
	Town 					string 		`json:"town"`
	Description 			string		`json:"description"`
} 

type EventRequest struct {
	gorm.Model
	UserID 		uint        	`json:"userId"`
	User 		User			`json:"requester"`
	Town 	    string    		`json:"town"`
	Title	    string 			`json:"title"`
	Description string 			`json:"description"`
	PeopleLimit uint 			`json:"peoplelimit"`
	EventType 	string     `json:"eventType"`
}

type Attendee struct {
	EventID 	uint 	 `json:"eventId"`
	Event 		Event	 `json:"event"`
	UserID 		uint 	 `json:"userId" gorm:"unique"`
	User 		User 	 `json:"user"`
}
