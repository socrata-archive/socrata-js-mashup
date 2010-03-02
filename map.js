$( function() {
    $.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
        alert(textStatus);
        alert(errorThrown);
        alert(XMLHttpRequest.responseText);
    }});
    
    
    var dataset = new Dataset();
    $("#datasetForm").submit( function(e) {
        // Don't actually submit the form
        e.preventDefault();
        
        datasetLocation = $("#datasetForm #location").val();
        // Look for a UID and host name
        dataset.extractUID(datasetLocation);
        dataset.extractHost(datasetLocation);
        
        // Get an array of columns
        console.log(dataset.columnsURL());
        $.getJSON(dataset.columnsURL(), dataset.columnsCallback);
    });
});