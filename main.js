function getData(cb){
    // xhr = XmlHttpRequest
    var xhr = new XMLHttpRequest(); 

    xhr.open("GET", "https://swapi.co/api/");
    xhr.send();

    /* xhr Ready States
    0 Unsent
    1 Opened
    2 Headers Received
    3 Loading
    4 Done
    */
    xhr.onreadystatechange = function() {

        // When Data is received
        if (this.readyState == 4 && this.status == 200){
            // Change the inner HTML of the DIV to JSON response text
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data){
    console.log(data);
}

// Use Inspect in Google Chrome to view result
getData(printDataToConsole);