// form the query
function queryDB(tx) {
	tx.executeSql("SELECT id, username, password from usuarios;", [], querySuccess, errorCB);
}

// Display the results
function querySuccess(tx, results) {
	var len = results.rows.length;
	if(len == 0) {
		$("#output").fadeOut();
		return;
	}
	var out = '';
	for (var i = 0; i < len; i++) {
	out +=
	"<tr><td>" + results.rows.item(i).id + 
	"</td><td>" + results.rows.item(i).username + 
	"</td><td>" + results.rows.item(i).password + "</td></tr>";
	}
	$("#output tbody").fadeIn().html(out);
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
			db.transaction(app.registrarUsuario, errorCB, successCB);
		});
		$('#borrar_registros').click(function(event) {
			event.preventDefault();
			var db = window.sqlitePlugin.openDatabase({name: "my.db"});
			db.transaction(app.borrarTablaUsuarios, errorCB, successCB);
		});
	}, //end initialize
	// Registra a un usuario si este no existe.
	registrarUsuario: function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, username text, password text)');
		var username = $('#username').val();
		var password = $('#password').val();
		$('#username').val('');
		$('#password').val('');
		tx.executeSql('INSERT INTO usuarios (username, password) VALUES (?,?)', [username, password]);
		queryDB(tx);
	},
	// Borra una tabla y la vuelve a crear(truncate)
	borrarTablaUsuarios: function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS usuarios');
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, username text, password text)');
		queryDB(tx);
	}
};
