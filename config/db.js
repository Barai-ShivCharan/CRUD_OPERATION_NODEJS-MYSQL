const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "students_db",
});
module.exports = mySqlPool;
