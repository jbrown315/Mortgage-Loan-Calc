
function simpleCalc() {

    //window.first = Date.now();


    deleteTable("simpleFinal");

    var loanAmountSimple = document.getElementById("loanAmountSimple");
    var intRateSimple = document.getElementById("intRateSimple");
    var loanLengthSimple = document.getElementById("loanLengthSimple");

    validator(loanAmountSimple);
    validator(intRateSimple);
    validator(loanLengthSimple);

    var simpleEl = document.getElementById("simpleTable");

    var simpleHeaders = ["Payment Number", "Beginning Balance", "Interest", "Principal Amount", "Payment", "End Balance"];

    tableMaker(simpleEl, "simpleFinal" , simpleHeaders, loanAmountSimple.value, intRateSimple.value, loanLengthSimple.value);

    var totalIntSimple = document.createTextNode("Total Interest: " + formatAsMoney((loanAmountSimple.value) * parseInt(intRateSimple.value) / 100));
    var totalIntElSimple = document.createElement("p");
    totalIntElSimple.setAttribute("id", "totalInt");

    var totalLoanSimple = document.createTextNode("Total Cost of Loan: " + formatAsMoney(parseInt(loanAmountSimple.value) + (parseInt(loanAmountSimple.value) * parseInt(intRateSimple.value) / 100)));
    var totalLoanElSimple = document.createElement("p");
    totalLoanElSimple.setAttribute("id", "totalLoan");

    totalIntElSimple.style.fontSize = "2em";
    totalIntElSimple.style.textAlign = "center";
    totalLoanElSimple.style.fontSize = "2em";
    totalLoanElSimple.style.textAlign = "center";

    totalIntElSimple.appendChild(totalIntSimple);
    totalLoanElSimple.appendChild(totalLoanSimple);

    simpleEl.appendChild(totalIntElSimple);
    simpleEl.appendChild(totalLoanElSimple);
}

function compoundCalc() {

    deleteTable("compFinal");

    var loanAmountComp = document.getElementById("loanAmountComp");
    var intRateComp = document.getElementById("intRateComp");
    var loanLengthComp = document.getElementById("loanLengthComp");
    var compPeriod = document.getElementById("compPeriod");
    var compAdd = document.getElementById("compAdd");

    validator(loanAmountComp);
    validator(intRateComp);
    validator(loanLengthComp);

    if (compAdd.value < 0 || isNaN(compAdd.value) == true) {
        compAdd.value = "";
        compAdd.setAttribute("placeholder", "A number greater than 0");

    }
    else {
        compAdd.removeAttribute("placeholder");

    }

    var compEl = document.getElementById("compTable");

    var compHeaders = ["Payment Number", "Beginning Balance", "Interest", "Additional Payment", "Principal", "Payment", "End Balance"];

    tableMaker(compEl, "compFinal", compHeaders, loanAmountComp.value, (intRateComp.value)/100, loanLengthComp.value, compPeriod.value, compAdd.value);
}

function tableMaker(tableLoc, loanType, headers, loanAmount, intRate, loanLength, period, add) {
    var table = document.createElement("table");
    table.setAttribute("id", loanType);

    var headRow = document.createElement("tr");

    for (i=0; i<headers.length; i++) {
        var node = document.createTextNode(headers[i]);
        var head = document.createElement("th");
        head.appendChild(node);
        headRow.appendChild(head);
    }

    table.appendChild(headRow);

    if (loanType == "simpleFinal") {
        var data = rowCalcSimple(parseInt(loanAmount), parseInt(intRate), parseInt(loanLength));
        }
    else if (loanType == "compFinal") {
        var data = rowCalcComp(parseInt(loanAmount), intRate, parseInt(add), period, parseInt(loanLength));
    }
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

}

// Length is in years
function rowCalcSimple(bal, rate, length) {
    var totalInterest = length*bal*rate/100;
    var intAmount = totalInterest / (length*12);

    //var intAmount = (length)/(bal * (rate)/100);
    var principal = (bal/(length*12));
    var rowsSimple = [];
    for (i=1; i<=(length*12); i++) {
        var newRowSimple = [];
        newRowSimple.push(i);
        newRowSimple.push(formatAsMoney(bal));
        newRowSimple.push(formatAsMoney(intAmount));
        newRowSimple.push(formatAsMoney(principal));
        newRowSimple.push(formatAsMoney(principal+intAmount));
        bal = bal-principal;
        if (bal < 0){
            bal = 0;
        }
        newRowSimple.push(formatAsMoney(bal));
        rowsSimple.push(newRowSimple);
    }

    return(rowsSimple);

}

function rowCalcComp(bal, rate, additional, period, length) {
    var conversion = {"Monthly":12, "Weekly":52, "Daily":365};

    var compPrincipalMath = Math.pow(1+(rate/(conversion[period])),(length*(conversion[period])));
    var compPrincipal = (bal * (rate/(conversion[period])) * compPrincipalMath)/(compPrincipalMath - 1);

    var rowsComp = [];
    for (i=1; i<=length*12; i++) {
        var newRowComp = [];
        if(bal >= compPrincipal+(additional/12)){
            newRowComp.push(i);
            newRowComp.push(formatAsMoney(bal));
            newRowComp.push(formatAsMoney(bal * (rate/(conversion[period]))));
            newRowComp.push(formatAsMoney(additional/12));
            newRowComp.push(formatAsMoney(compPrincipal - (bal * (rate/(conversion[period])))));
            var compNewBal = bal - ((compPrincipal - (bal * (rate/(conversion[period])))) + (additional/12));
            newRowComp.push(formatAsMoney(compPrincipal + (additional/12)));
            newRowComp.push(formatAsMoney(compNewBal));

            bal = compNewBal;

            rowsComp.push(newRowComp);
        }

        else {
            newRowComp.push(i);
            newRowComp.push(formatAsMoney(bal));
            newRowComp.push(formatAsMoney(bal * (rate/(conversion[period]))));
            newRowComp.push(formatAsMoney(additional/12));
            newRowComp.push(formatAsMoney(bal));
            newRowComp.push(formatAsMoney(bal + (bal * (rate/(conversion[period])))));
            newRowComp.push(formatAsMoney(0));
            rowsComp.push(newRowComp);
            break;

        }



    }

    return(rowsComp);

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
    var newTable = document.getElementById(tableName);
    var int = document.getElementById("totalInt");
    var loan = document.getElementById("totalLoan");

    if (newTable) {
        newTable.remove();
    }

    if (int) {
        int.remove();
    }

    if (loan) {
        loan.remove();
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

