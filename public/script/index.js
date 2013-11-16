$('#post-button').click(function() { 

    $.ajax({
        url: 'service/neo4j',
        type: "POST",
        data: {
        	statement: $('#sub-content').val(),
        },
        success: function (result) {
        	var statement = result.results[0];
        	var resp = '<table><tr>';
        	$.each(statement.columns, function(i,v) {
        		resp += '<th>' + v + "</th>";
        	});
        	resp +="</tr>"
        	$.each(statement.data, function(i,v) {
        		resp += '<tr><td>';
        		resp += JSON.stringify(v.row);
        		resp += "</td></tr>";
        	});
        	resp += "</table>";
        	
        	$('#neo-output').html(resp);
        	console.debug(resp);
        }
    }); 

});