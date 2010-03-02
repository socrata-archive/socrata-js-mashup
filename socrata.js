function Dataset() {
    this.host = "http://www.socrata.com";
}


// Given a string, look for a properly formatted UID. 
//  returns: false on failure
Dataset.prototype.extractUID = function(url) {
    matches = url.match(/.*([a-z0-9]{4}-[a-z0-9]{4}).*/);
    if ( matches == null || matches.length < 2 ) {
        return false;
    }
    this.uid = matches[1];
    return true;
};

// TODO: Better protocol handling
Dataset.prototype.extractHost = function(url) {
    matches = url.match(/^(?:[^\/]+:\/\/)?([^\/:]+)/im);
    if ( matches == null || matches.length < 2 ) {
        return;
    }
    this.host = "http://" + matches[1];
}

// Where to get general information about this dataset
Dataset.prototype.viewDataURL = function() {
    return this.host + "/views/" + this.uid + ".json"; 
}

// Where to get the rows JSON from
Dataset.prototype.rowsURL = function() {
    return this.host + "/views/" + this.uid + "/rows.json";
};

// And the columns
Dataset.prototype.columnsURL = function() {
    return this.host + "/views/" + this.uid + "/columns.json";
};

// A short link to this dataset
Dataset.prototype.shortURL = function() {
    return this.host + "/d/" + this.uid;
}