package todo_db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type ToDo struct {
	ID          int
	Title       string
	Description string
	Finished    bool
}

const (
	DriverName     = "mysql"
	DataSourceName = "root:golang@tcp(mysql:3306)/todo_list" // user:password@tcp(container-name:port)/dbname
)

func ConnectDB() *sql.DB {
	db, dbErr := sql.Open(DriverName, DataSourceName)
	if dbErr != nil {
		log.Print("error connecting to database:", dbErr)
	}

	return db
}

func GetAllTodo(db *sql.DB) map[int]ToDo {
	todos := make(map[int]ToDo)

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
		todos[u.ID] = ToDo{
			ID:          u.ID,
			Title:       u.Title,
			Description: u.Description,
			Finished:    u.Finished,
		}
	}

	return todos
}
