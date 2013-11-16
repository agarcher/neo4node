$('#post-button').click(function() { 
	
	var input = $('#sub-content').val();
	var resultNode = $("<div class='result'><div class='heading'>" + input + "</div></div>");
	
	$('#neo-output').prepend(resultNode);
    $.ajax({
        url: 'service/neo4j',
        type: "POST",
        data: {
        	statement: input,
        },
        success: function (result) {
        	var statement = result.results[0];
        	
        	var resp = '<table><tr>';
        	$.each(statement.columns, function(i,v) {
        		resp += '<th' + (i ? ' class="border"' : '') + '>' + v + "</th>";
        	});
        	resp +="</tr>";
        	$.each(statement.data, function(i,v) {
        		resp += '<tr>';
        		$.each(v.row,function(i,v) {
            		resp += '<td' + (i ? ' class="border"' : '') + '>' + JSON.stringify(v) + '</td>';
        		});
        		resp += "</tr>";
        	});
        	resp += "</table>";

        	resultNode.append($(resp));
        }
    }); 

});