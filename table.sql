created database in postico

database name = TasksDB 

CREATE TABLE task_table
(
  id SERIAL PRIMARY KEY NOT NULL,
  task TEXT,
  completed BOOLEAN,
  date TIMESTAMP
);
