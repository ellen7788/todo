CREATE DATABASE todo_list;

use todo_list;

CREATE TABLE todos (
    id INT(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(2048) DEFAULT "",
    finished TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO todos (title, description) VALUES ("微分代数", "偏微分に関する課題");
INSERT INTO todos (title, description, finished) VALUES ("線形代数", "行列に関する課題", 1);
INSERT INTO todos (title) VALUES ("基礎物理学");