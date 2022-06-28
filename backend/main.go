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

	engine.POST("/insert", func(c *gin.Context) {
		var resTodo todo_db.ToDo;
		c.BindJSON(&resTodo)
		todo_db.InsertTodo(db, resTodo)
		c.Status(http.StatusOK)
    })

    engine.Run(":8080")
}
