/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


// create table
function populateDB(tx) {
 tx.executeSql('DROP TABLE IF EXISTS usuarios');
 tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, username text, password text)');
}

// Display the results
function querySuccess(tx, results) {
	 var len = results.rows.length;
	 alert("results.rows.length: " + results.rows.length + " [should be 2]");
	 var contenido = '';
	 for (var i = 0; i < len; i++) { // loop as many times as there are row results
		 contenido +=
		 "<tr><td>ID = " + results.rows.item(i).id +
		 "</td><td>username = " + results.rows.item(i).usename +
		 "</td><td>password = " + results.rows.item(i).password +
		 "</td></tr>";
	 }
	 $('#tabla-resultados tbody').html(contenido);
	 $.mobile.changePage('#principal');
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
		app.db = window.sqlitePlugin.openDatabase({name: "my.db"});
		app.db.transaction(populateDB, errorCB, successCB);
		
        $('#formulario').submit(function(event) {
			event.preventDefault();
			//guardo el username
			var username = $('#username').val();
			//guardo el password
			var password = $('#password').val();
			//app.revisarDatos();
			app.db.transaction(function (txt){
				tx.executeSql(
					'INSERT INTO usuarios (username, password) VALUES (?, ?)',
					[username, password]
				  );
			}, errorCB, querySuccess);
		});
		
		$('#regresar_login').click(function(even) {
			even.preventDefault();
			$.mobile.changePage('#login');
		});
		//app.revisarDatos();
    },

    revisarDatos: function($el, event) {
		/*var username = window.applicationPreferences.get("username");
		if(username != null || username != '') {
			var username = window.applicationPreferences.get("username");
			$('#username-result').text(username);
			$.mobile.changePage('#principal');
		} else {
			$.mobile.changePage('#login');
		} */
	}
};
