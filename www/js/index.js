document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
 var db = window.sqlitePlugin.openDatabase({name: "my.db"});
 db.transaction(populateDB, errorCB, successCB);
}

// create table
function populateDB(tx) {
 tx.executeSql('DROP TABLE IF EXISTS test_table');
 tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data1 text, data2 integer, svgImage text)');
 tx.executeSql('INSERT INTO test_table (data1, data2, svgImage) VALUES (?,?,?)', ['test1', 100, '<svg version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="4.815" y="4.815" fill="#039BF9" stroke="" width="100" height="100"></svg>']);
 tx.executeSql("INSERT INTO test_table (data1, data2, svgImage) VALUES (?,?,?)", ['test2', 200, '<svg version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="4.815" y="4.815" fill="#039BF9" stroke="" width="100" height="100"></svg>']);
 queryDB(tx);
}
// form the query
function queryDB(tx) {
 tx.executeSql("SELECT id, data1, data2, svgImage from test_table;", [], querySuccess, errorCB);
}
// Display the results
function querySuccess(tx, results) {
 var len = results.rows.length;
 alert("results.rows.length: " + results.rows.length + " [should be 2]"); 
 for (var i = 0; i < len; i++) { // loop as many times as there are row results
 document.getElementById("output").innerHTML +=
 "<table><tr><td>ID = " + results.rows.item(i).id + 
 "</td><td>data1 = " + results.rows.item(i).data1 + 
 "</td><td>data2 = " + results.rows.item(i).data2 + 
 "</td><td>svgImage = " + results.rows.item(i).svgImage + "</td></tr></table>";
 } 
}
// Transaction error callback
function errorCB(err) {
console.log("Error processing SQL: " + err.code);
}
// Success error callback
function successCB() {
}



var app = {
	//db: null,
    // Application Constructor
    initialize: function() {
		//app.db = window.sqlitePlugin.openDatabase({name: "my.db"});
    }
};
