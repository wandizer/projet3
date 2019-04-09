var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

const sql = 'SELECT * FROM user WHERE id=1';

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, rows, fields) {

  	if (err) throw err;

    const hello = document.getElementById("hello");
    hello.innerHTML = rows[0].fname;


	con.end(function(err) {
	  if (err) {
	    return console.log('error:' + err.message);
	  }
	  console.log('Close the database connection.');
	});

  });
});