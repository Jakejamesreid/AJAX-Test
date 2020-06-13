function getData(URL, cb){
    // xhr = XmlHttpRequest
    var xhr = new XMLHttpRequest(); 

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

    xhr.open("GET", URL);
    xhr.send();
}

// Get the Header titles for the table
function getTableHeaders(obj){
    var tableHeaders = [];

    // Create a header element in the table for eack key in obj
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

// Display previous and next buttons depending on the page the user is on
function generatePaginationButtons(next, prev){
    
    if(next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    }
    else if(next && !prev){
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    }
    else if(!next && pev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

// Write the data from the API to the web page
function writeToDocument(URL){

    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    // Get the data from the API
    getData(URL, function(data){
        var pagination;
        
        // If there is a previous or next page available then store the button configuration in pagination variable
        if(data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous);
        }

        data = data.results;
        
        // data[0] contains the headers from the API request
        var tableHeaders = getTableHeaders(data[0]);

        // Loop over the data and display it in the table
        data.forEach(function(item){
            var dataRow = [];
            
            // Truncate each value and display in table
            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            
            // Create new row in table
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        // Create the HTML table
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}
