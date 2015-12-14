// create table
function borrarTablaUsuarios(tx) {
 tx.executeSql('DROP TABLE IF EXISTS usuarios');
 queryDB(tx);
}

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
 var out = '';
 for (var i = 0; i < len; i++) {
	 out +=
	 "<tr><td>ID = " + results.rows.item(i).id + 
	 "</td><td>username = " + results.rows.item(i).username + 
	 "</td><td>password = " + results.rows.item(i).password + "</td></tr>";
 }
 $("#output tbody").html(out);
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
			db.transaction(borrarTablaUsuarios, errorCB, successCB);
		});
    }
};
