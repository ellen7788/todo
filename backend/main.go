package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// User db users
type ToDo struct {
	ID          int
	Title       string
	Description string
	Finished    bool
}

const (
	DriverName     = "mysql"
	DataSourceName = "root:golang@tcp(todo_mysql_1:3306)/todo_list" // user:password@tcp(container-name:port)/dbname
)

func main() {
	db, dbErr := sql.Open(DriverName, DataSourceName)
	// connect to database
	if dbErr != nil {
		log.Print("error connecting to database:", dbErr)
	}
	defer db.Close()

	todo := getAllTodo(db)

	fmt.Println(todo)
}

func getAllTodo(db *sql.DB) map[int]ToDo {
	todo := make(map[int]ToDo)

	// execute a query which we get all record
	rows, queryErr := db.Query("SELECT * FROM todos")
	if queryErr != nil {
		log.Print("query error :", queryErr)
	}
	defer rows.Close()

	// get all data
	for rows.Next() {
		var u ToDo
		if err := rows.Scan(&u.ID, &u.Title, &u.Description, &u.Finished); err != nil {
			log.Print(err)
		}
		todo[u.ID] = ToDo{
			ID:          u.ID,
			Title:       u.Title,
			Description: u.Description,
			Finished:    u.Finished,
		}
	}

	return todo
}
