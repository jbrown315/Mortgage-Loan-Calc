
function simpleCalc() {

    deleteTable();

    var loanAmount = document.getElementById("loanAmount");

    errors(loanAmount);

    var simpleEl = document.getElementById("simpleTable");
    var table = document.createElement("table");
    table.setAttribute("id", "table");
    var headRow = document.createElement("tr");

    var headers = ["Payment Number", "Beginning Balance", "Interest", "Payment", "End Balance"];

    for (i=0; i<headers.length; i++) {
        var node = document.createTextNode(headers[i]);
        var head = document.createElement("th");
        head.appendChild(node);
        headRow.appendChild(head);
    }
    table.appendChild(headRow);
    for (i=1; i<10; i++) {
        var row = document.createElement("tr");

        table.appendChild(row);
    }

    table.setAttribute("id","simpleFinal")
    simpleEl.appendChild(table);


}

function errors(num) {
    if (num.value <= 0 || isNaN(num.value) == true) {
        num.value = "";
        num.setAttribute("placeholder", "A number greater than 0");

    }
    else {
        num.removeAttribute("placeholder");

    }

}

function deleteTable() {
    var newTable = document.getElementById("simpleFinal")
    if (newTable) {
        newTable.remove()
    }
}