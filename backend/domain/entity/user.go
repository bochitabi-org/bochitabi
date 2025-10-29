package entity

type User struct {
	UserID   string
	UserName string
	Status   Status
}

func NewUser(userId string, userName string, status Status) User {
	return User{
		UserID:   userId,
		UserName: userName,
		Status:   status,
	}
}
