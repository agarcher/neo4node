$('#post-button').click(function() { 

    $.ajax({
        url: 'service/neo4j',
        type: "POST",
        data: {
        	statement: $('#sub-content').val(),
        },
        success: function (result) {
        	console.debug(result);
        	alert("POST sent to service layer!");
        }
    });  

});