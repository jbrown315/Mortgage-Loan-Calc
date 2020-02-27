
function simpleCalc() {

    var loanAmount = document.getElementById("loanAmount");

    errors(loanAmount);

    var simpleEl = document.getElementById("simpleInt");
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