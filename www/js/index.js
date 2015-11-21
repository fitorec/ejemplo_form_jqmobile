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
Date.prototype.addDays = function (num_of_days) {
	 var value = this.valueOf() + (86400000 + num_of_days);
	 return new Date(value);
}

Date.prototype.diaStr = function () {
	var dias = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
	return dias[this.getDay()];
}

Date.prototype.mes = function () {
	var dias = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
	return dias[this.getMonth()];
}


var app = {
    // Application Constructor
    initialize: function() {
        $('#form_datos').submit(function(event) {
			app.generarDias($(this), event);
		});
    },
    generarDias: function($el, event) {
		event.preventDefault();
		$.mobile.changePage('#result');
		var f_inicio = new Date($('#f_inicio').val() + ' 00:00');
		var f_final = new Date($('#f_final').val() + ' 00:00');
		console.log($('#f_inicio').val());
		console.log($('#f_final').val());
		console.log($el);
		if(f_inicio>=f_final) {
			console.log('vale verga!!!');
			return;
		}
		var contentTable = '';
		while(f_inicio<=f_final) {
			var dia = f_inicio.diaStr();
			console.log($('[name='+dia+']').val());
			if(app.isChecked(dia)) {
				contentTable += 
						'<tr>'
						+  '<td>'+f_inicio.getDate()+'/'+f_inicio.mes()+'</td>'
						+  '<td>'+ dia +'</td>'
						+ '</tr>';
			}
			console.log(f_inicio);
			f_inicio = f_inicio.addDays(1);
		}
		$('#t-result tbody').html(contentTable);
	},
	isChecked : function (name) {
		$elem = $('[name='+name+']');
		if($elem.length==0) {
			return false;
		}
		return $elem.is(":checked");
	}
};
