
function simpleCalc() {

    deleteTable("simpleFinal");

    var loanAmount = document.getElementById("loanAmount");
    var intRate = document.getElementById("intRate");
    var loanLength = document.getElementById("loanLength");

    validator(loanAmount);
    validator(intRate);
    validator(loanLength);

    var simpleEl = document.getElementById("simpleTable");

    tableMaker(simpleEl, "simpleFinal");


}

function tableMaker(tableLoc, loanType) {
    var table = document.createElement("table");
    table.setAttribute("id", loanType);

    var headers = ["Payment Number", "Beginning Balance", "Interest", "Principal Amount", "Payment", "End Balance"];
    var headRow = document.createElement("tr");

    for (i=0; i<headers.length; i++) {
        var node = document.createTextNode(headers[i]);
        var head = document.createElement("th");
        head.appendChild(node);
        headRow.appendChild(head);
    }

    table.appendChild(headRow);

    var data = rowCalc(parseInt(loanAmount.value), parseInt(intRate.value), parseInt(loanLength.value));
    for (i=0; i<data.length; i++) {
        var tableRow = document.createElement("tr");
        for (x=0; x<data[i].length; x++) {
            var newData = document.createElement("td");
            var newNode = document.createTextNode((data[i])[x]);
            newData.appendChild(newNode);
            tableRow.appendChild(newData);
        }
        table.appendChild(tableRow);
    }

    tableLoc.appendChild(table);

    var totalInt = document.createTextNode("Total Interest: " + formatAsMoney((loanAmount.value) * parseInt(intRate.value) / 100));
    var totalIntEl = document.createElement("p");

    var totalLoan = document.createTextNode("Total Cost of Loan: " + formatAsMoney(parseInt(loanAmount.value) + (parseInt(loanAmount.value) * parseInt(intRate.value) / 100)));
    var totalLoanEl = document.createElement("p");

    totalIntEl.style.fontSize = "2em";
    totalIntEl.style.textAlign = "center";
    totalLoanEl.style.fontSize = "2em";
    totalLoanEl.style.textAlign = "center";

    totalIntEl.appendChild(totalInt);
    totalLoanEl.appendChild(totalLoan);

    tableLoc.appendChild(totalIntEl);
    tableLoc.appendChild(totalLoanEl);
}

// Length is in years
function rowCalc(bal, rate, length) {
    var totalInterest = length*bal*rate/100;
    var intAmount = totalInterest / (length*12);

    //var intAmount = (length)/(bal * (rate)/100);
    var principal = (bal/(length*12));
    var rows = [];
    for (i=1; i<=(length*12); i++) {
        var newRow = [];
        newRow.push(i);
        newRow.push(formatAsMoney(bal));
        newRow.push(formatAsMoney(intAmount));
        newRow.push(formatAsMoney(principal));
        newRow.push(formatAsMoney(principal+intAmount));
        bal = bal-principal;
        if (bal < 0){
            bal = 0;
        }
        newRow.push(formatAsMoney(bal));
        rows.push(newRow);
    }

    return(rows);

}

function validator(num) {
    if (num.value <= 0 || isNaN(num.value) == true) {
        num.value = "";
        num.setAttribute("placeholder", "A number greater than 0");

    }
    else {
        num.removeAttribute("placeholder");

    }

}

function deleteTable(tableName) {
    var newTable = document.getElementById(tableName)
    if (newTable) {
        newTable.remove()
    }
}

// Format the value to look like money....with 2 decimals and a currency symbol.....what which you will eventually allow user to customize

function formatAsMoney(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return(formatter.format(value));
}