function addOption(select, option) {
    if ( $.browser.msie ) {
        select.add(option);
    } else {
        select.add(option, null);
    }
}

function columnToSelect(column) {
    return new Option(column.name, column.id);
}

$( function() {
    // Contains relevant information about the Socrata dataset
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
            
            allColumns = $("#datasetForm #allColumns:checked").val() != null;
            console.log(allColumns)
            annotation = $("#columnForm #annotation")[0];
            lat = $("#columnForm #lat")[0];
            lon = $("#columnForm #long")[0];
            
            // Construct select lists
            $.each(dataset.columns, function(i, column) {
                // Only look at non-hidden columns for lat/long data
                if ( column.flags == null || $.inArray("hidden", column.flags) == -1 ) {
                    addOption(annotation,  columnToSelect(column));
                    
                    // Make all possible columns available for lat/long, 
                    // otherwise try to be smart
                    if ( allColumns ) {
                        addOption(lat, columnToSelect(column));
                        addOption(lon, columnToSelect(column));
                    } else {
                        s = column.name.toLowerCase();
                        if ( s == "x" || s.indexOf('lat') >= 0 ) {
                            addOption(lat, columnToSelect(column));
                        } else if ( s == "y" || s.indexOf('long') >= 0 ) {
                            addOption(lon, columnToSelect(column));
                        }
                    }
                }
            });
            // Show user interface
            $("#columnForm").show('fast');
        });
    });
    
    
});