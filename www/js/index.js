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
 tx.executeSql(
	'INSERT INTO usuarios (id, username, password) VALUES (?,?,?)',
	[1, "fitorec", "secret"]
  );
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
	 for (var i = 0; i < len; i++) { // loop as many times as there are row results
		 document.getElementById("login").innerHTML +=
		 "<table><tr><td>ID = " + results.rows.item(i).id +
		 "</td><td>data1 = " + results.rows.item(i).usename +
		 "</td><td>data2 = " + results.rows.item(i).password +
		 "</td></tr></table>";
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
	db: null,
    // Application Constructor
    initialize: function() {
		app.db = window.sqlitePlugin.openDatabase({name: "my.db"});
		db.transaction(populateDB, errorCB, successCB);
        /*$('#formulario').submit(function(event) {
			event.preventDefault();
			//guardo el username
			var username = $('#username').val();
			//window.localStorage.setItem("username", username);
			window.applicationPreferences.set("username", username);
			//guardo el password
			var password = $('#password').val();
			//
			// window.localStorage.setItem("password", password);
			window.applicationPreferences.set("password", password);
			//revisamos la existencia de datos en el Storage
			app.revisarDatos();
		});
		$('#borrar_datos').click(function(even) {
			even.preventDefault();
			//window.localStorage.clear();
			//app.revisarDatos();
			$.mobile.changePage('#login');
			window.applicationPreferences.set("username", "");
		});
		app.revisarDatos();*/
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
