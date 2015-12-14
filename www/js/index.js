// create table
function populateDB(tx) {
 tx.executeSql('DROP TABLE IF EXISTS test_table');
 tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, username text, password text)');
 tx.executeSql('INSERT INTO usuarios (username, password) VALUES (?,?)', ['fitorec', 'secret']);
 queryDB(tx);
}
// form the query
function queryDB(tx) {
 tx.executeSql("SELECT id, username, password FROM usuarios;", [], querySuccess, errorCB);
}
// Display the results
function querySuccess(tx, results) {
 var len = results.rows.length;
 alert("results.rows.length: " + results.rows.length + " [should be 2]"); 
 for (var i = 0; i < len; i++) { // loop as many times as there are row results
 document.getElementById("output").innerHTML +=
 "<table><tr><td>ID = " + results.rows.item(i).id + 
 "</td><td>username = " + results.rows.item(i).username + 
 "</td><td>password = " + results.rows.item(i).password + "</td></tr></table>";
 } 
}
// Transaction error callback
function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}
// Success error callback
function successCB() {
}



var app = {
	db: null,
    // Application Constructor
    initialize: function() {
		//app.db = window.sqlitePlugin.openDatabase({name: "my.db"});
		app.db = window.sqlitePlugin.openDatabase({name: "my.db"});
		app.db.transaction(populateDB, errorCB, successCB);
    }
};
