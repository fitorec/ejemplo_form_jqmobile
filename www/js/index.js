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



var app = {
    // Application Constructor
    initialize: function() {
        $('#formulario').submit(function(event) {
			event.preventDefault();
			//guardo el username
			var username = $('#username').val();
			window.localStorage.setItem("username", username);
			//guardo el password
			var password = $('#password').val();
			window.localStorage.setItem("password", password);
			//revisamos la existencia de datos en el Storage
			app.revisarDatos();
		});
		$('#borrar_datos').click(function(even) {
			even.preventDefault();
			window.localStorage.clear();
			app.revisarDatos();
		});
		app.revisarDatos();
    },
    
    revisarDatos: function($el, event) {
		if(window.localStorage.getItem("username") != null) {
			var username = window.localStorage.getItem("username");
			$('#username-result').text(username);
			$.mobile.changePage('#principal');
		} else {
			$.mobile.changePage('#login');
		}
	}
};
