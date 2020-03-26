const baseURL = "https://swapi.co/api/";
function getData(type, cb){
    // xhr = XmlHttpRequest
    var xhr = new XMLHttpRequest(); 

    xhr.open("GET", baseURL+type+"/");
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


function getTableHeaders(obj){
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type){

    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function (data){
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item){
            //el.innerHTML += "<p>" + item.name + "</p>";
        });

        el.innerHTML = `<table>${tableHeaders}</table>`;
    });
}