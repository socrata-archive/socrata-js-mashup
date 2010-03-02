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
        $.getJSON(dataset.columnsURL(), function(data, textstatus) {
            dataset.columnsCallback(data);
            
            annotation = $("#datasetForm #annotation")[0];
            lat = $("#datasetForm #lat");
            lon = $("#datasetForm #long");
            
            // Construct select lists
            $.each(dataset.columns, function(i, column) {
                if ( column.flags == null || $.inArray("hidden", column.flags) == -1 ) {
                    console.log(column.flags);
                    option = new Option(column.name, column.id);
                    annotation.add(option,null);
                }
            });
            // Show user interface
            $("#datasetForm #details").show('fast');
        });
    });
    
});