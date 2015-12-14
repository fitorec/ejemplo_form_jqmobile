// create table
function registrarUsuario(tx) {
 tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, username text, password text)');
 var username = $('#username').val();
 var password = $('#password').val();
 tx.executeSql('INSERT INTO usuarios (username, password) VALUES (?,?)', [username, password]);
 queryDB(tx);
}

// form the query
function queryDB(tx) {
 tx.executeSql("SELECT id, username, password from usuarios;", [], querySuccess, errorCB);
}

// Display the results
function querySuccess(tx, results) {
 var len = results.rows.length;
 alert("results.rows.length: " + results.rows.length + " [should be 2]"); 
 document.getElementById("output").innerHTML = '';
 for (var i = 0; i < len; i++) { // loop as many times as there are row results
 document.getElementById("output").innerHTML +=
 "<table><tr><td>ID = " + results.rows.item(i).id + 
 "</td><td>username = " + results.rows.item(i).username + 
 "</td><td>password = " + results.rows.item(i).password + "</td></tr></table>";
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
    // Application Constructor
    initialize: function() {
		//
		$('#formulario').submit(function(event) {
			event.preventDefault();
			var db = window.sqlitePlugin.openDatabase({name: "my.db"});
			db.transaction(registrarUsuario, errorCB, successCB);
		});
		$('#borrar_registros').click(function(event) {
			event.preventDefault();
			alert("debemos borrar todos los registros");
		});
    }
};
