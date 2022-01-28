const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: 3306,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	multipleStatements: true
});

mysqlConnection.connect((err) => {
	if (!err) {
		console.log('MySQL is connected');
	} else {
		console.log('MySQL failed to connect');
		console.log(err);
	}
});

module.exports = mysqlConnection;
