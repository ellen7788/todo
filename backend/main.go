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
	
	engine := gin.Default()
	engine.GET("/todo", func(c *gin.Context) {
		todo := todo_db.GetAllTodo(db)
        c.JSON(http.StatusOK, todo)
    })

	engine.POST("/oneTodo", func(c *gin.Context) {
		var query struct { ID int };
		c.BindJSON(&query)
		todo := todo_db.GetOneTodo(db, query.ID)
		c.JSON(http.StatusOK, todo)
    })

	engine.POST("/insert", func(c *gin.Context) {
		var resTodo todo_db.ToDo;
		c.BindJSON(&resTodo)
		todo_db.InsertTodo(db, resTodo)
		c.Status(http.StatusOK)
    })

	engine.POST("/update", func(c *gin.Context) {
		var resTodo todo_db.ToDo;
		c.BindJSON(&resTodo)
		todo_db.UpdateTodo(db, resTodo)
		c.Status(http.StatusOK)
    })

	engine.POST("/delete", func(c *gin.Context) {
		var query struct { ID int };
		c.BindJSON(&query)
		todo_db.DeleteTodo(db, query.ID)
		c.Status(http.StatusOK)
    })

    engine.Run(":8080")
}
