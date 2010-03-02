$( function() {
    var mapDataset = new Dataset();
    $("#datasetForm").submit( function(e) {
        // Don't actually submit the form
        e.preventDefault();
        
        datasetLocation = $("#datasetForm #location").val();
        // Look for a UID and host name
        mapDataset.extractUID(datasetLocation);
        mapDataset.extractHost(datasetLocation);
        
        alert(mapDataset.host);
        alert(mapDataset.uid);
    });
});