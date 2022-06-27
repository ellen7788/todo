package main

import (
	"example/todo_db"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db := todo_db.ConnectDB()
	defer db.Close()
	todo := todo_db.GetAllTodo(db)

	engine := gin.Default()
	engine.GET("/todo", func(c *gin.Context) {
        c.JSON(http.StatusOK, todo)
    })
    engine.Run(":8080")
}
