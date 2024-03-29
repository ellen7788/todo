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

func GetOneTodo(db *sql.DB, id int) ToDo {
	var todo ToDo
	err := db.QueryRow("SELECT * FROM todos WHERE id=?", id).Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Finished)
	if err != nil {
		log.Print("prepare error :", err)
	}
	return todo
}

func InsertTodo(db *sql.DB, todo ToDo) {
	ins, err := db.Prepare("INSERT INTO todos(title, description) VALUES(?,?)")
	if err != nil {
		log.Print("prepare error :", err)
	}
	defer ins.Close()

	ins.Exec(todo.Title, todo.Description)
}

func UpdateTodo(db *sql.DB, todo ToDo) {
	upd, err := db.Prepare("UPDATE todos SET title=?, description=?, finished=? where id=? ")
    if err != nil {
        log.Fatal(err)
    }
    upd.Exec(todo.Title, todo.Description, todo.Finished, todo.ID)
}

func DeleteTodo(db *sql.DB, id int) {
	del, err := db.Prepare("DELETE FROM todos WHERE id=?")
	if err != nil {
		log.Print("prepare error :", err)
	}
	defer del.Close()

	del.Exec(id)
}
