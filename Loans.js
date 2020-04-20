
function simpleCalc(index) {

    var simpleEl = document.getElementsByClassName("simpleTable")[index];

    deleteTable("collapsibleSimple", "contentSimple", "totalIntSimple", "totalLoanSimple", index);

    var loanAmountSimple = document.getElementsByClassName("loanAmountSimple")[index];
    var intRateSimple = document.getElementsByClassName("intRateSimple")[index];
    var loanLengthSimple = document.getElementsByClassName("loanLengthSimple")[index];

    validator(loanAmountSimple);
    validator(intRateSimple);
    validator(loanLengthSimple);

    //start building collapsible
    var simpleTableButton = document.createElement("button");
    simpleTableButton.innerHTML = "Amortization Schedule";
    simpleTableButton.setAttribute("type", "button");
    simpleTableButton.setAttribute("class", "collapsibleSimple");

    var simpleTableLoc = document.createElement("div");
    simpleTableLoc.setAttribute("class", "contentSimple");

    simpleTableButton.addEventListener("click", function() {
        this.classList.toggle("active");
        var simpleContent = simpleTableLoc;
        if (simpleTableLoc.style.maxHeight) {
            simpleTableLoc.style.maxHeight = null;
        }
        else {
            simpleTableLoc.style.maxHeight = simpleTableLoc.scrollHeight + "px";
        }

    });

    simpleEl.appendChild(simpleTableButton);
    simpleEl.appendChild(simpleTableLoc);

    var simpleHeaders = ["Payment Number", "Beginning Balance", "Interest", "Principal Amount", "Payment", "End Balance"];

    tableMaker(simpleTableLoc, "simpleFinal" , simpleHeaders, loanAmountSimple.value, intRateSimple.value, loanLengthSimple.value);

    var totalIntSimple = document.createTextNode("Total Interest: " + formatAsMoney((loanAmountSimple.value) * parseInt(intRateSimple.value) / 100));
    var totalIntElSimple = document.createElement("p");
    totalIntElSimple.setAttribute("class", "totalIntSimple");

    var totalLoanSimple = document.createTextNode("Total Cost of Loan: " + formatAsMoney(parseInt(loanAmountSimple.value) + (parseInt(loanAmountSimple.value) * parseInt(intRateSimple.value) / 100)));
    var totalLoanElSimple = document.createElement("p");
    totalLoanElSimple.setAttribute("class", "totalLoanSimple");

    totalIntElSimple.style.fontSize = "2em";
    totalIntElSimple.style.textAlign = "center";
    totalLoanElSimple.style.fontSize = "2em";
    totalLoanElSimple.style.textAlign = "center";

    totalIntElSimple.appendChild(totalIntSimple);
    totalLoanElSimple.appendChild(totalLoanSimple);

    simpleEl.appendChild(totalIntElSimple);
    simpleEl.appendChild(totalLoanElSimple);
}


function compoundCalc(index) {

    deleteTable("collapsibleComp", "contentComp", "totalIntComp", "totalLoanComp", index);

    var loanAmountComp = document.getElementsByClassName("loanAmountComp")[index];
    var intRateComp = document.getElementsByClassName("intRateComp")[index];
    var loanLengthComp = document.getElementsByClassName("loanLengthComp")[index];
    var compPeriod = document.getElementsByClassName("compPeriod")[index];
    var compAdd = document.getElementsByClassName("compAdd")[index];

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

    var compEl = document.getElementsByClassName("compTable")[index];

    //start building collapsible
    var compTableButton = document.createElement("button");
    compTableButton.innerHTML = "Amortization Schedule";
    compTableButton.setAttribute("type", "button");
    compTableButton.setAttribute("class", "collapsibleComp");

    var compTableLoc = document.createElement("div");
    compTableLoc.setAttribute("class", "contentComp");

    compTableButton.addEventListener("click", function() {
        this.classList.toggle("active");
        var compContent = compTableLoc;
        if (compTableLoc.style.maxHeight) {
            compTableLoc.style.maxHeight = null;
        }
        else {
            compTableLoc.style.maxHeight = compTableLoc.scrollHeight + "px";
        }

    });

    compEl.appendChild(compTableButton);
    compEl.appendChild(compTableLoc);


    var compHeaders = ["Payment Number", "Beginning Balance", "Interest", "Additional Payment", "Principal", "Payment", "End Balance"];

    tableMaker(compTableLoc, "compFinal", compHeaders, loanAmountComp.value, (intRateComp.value)/100, loanLengthComp.value, compPeriod.value, compAdd.value);

    var totalIntComp = document.createTextNode("Total Interest: " + formatAsMoney(interestTotal));
    var totalIntElComp = document.createElement("p");
    totalIntElComp.setAttribute("class", "totalIntComp");

    var totalLoanComp = document.createTextNode("Total Cost of Loan: " + formatAsMoney(parseInt(loanAmountComp.value) + parseInt(interestTotal)));
    var totalLoanElComp = document.createElement("p");
    totalLoanElComp.setAttribute("class", "totalLoanComp");

    totalIntElComp.style.fontSize = "2em";
    totalIntElComp.style.textAlign = "center";
    totalLoanElComp.style.fontSize = "2em";
    totalLoanElComp.style.textAlign = "center";

    totalIntElComp.appendChild(totalIntComp);
    totalLoanElComp.appendChild(totalLoanComp);

    compEl.appendChild(totalIntElComp);
    compEl.appendChild(totalLoanElComp);

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
    window.conversion = {"Monthly":12, "Weekly":52, "Daily":365};

    var compPrincipalMath = Math.pow(1+(rate/(conversion[period])),(length*(conversion[period])));
    var compPrincipal = (bal * (rate/(conversion[period])) * compPrincipalMath)/(compPrincipalMath - 1);
    window.compPayments = length*12;
    window.interestTotal = 0;
    var rowsComp = [];
    for (i=1; i<=length*12; i++) {
        var newRowComp = [];
        if(bal >= compPrincipal+(additional/12)){
            newRowComp.push(i);
            newRowComp.push(formatAsMoney(bal));
            interestTotal += (bal * (rate/(conversion[period])));
            newRowComp.push(formatAsMoney(bal * (rate/(conversion[period]))));
            newRowComp.push(formatAsMoney(additional/12));
            newRowComp.push(formatAsMoney(compPrincipal - (bal * (rate/(conversion[period])))));
            var compNewBal = bal - ((compPrincipal - (bal * (rate/(conversion[period])))) + (additional/12));
            window.paymentComp = compPrincipal;
            newRowComp.push(formatAsMoney(paymentComp + (additional/12)));
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
            window.compPayments = i;
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

function deleteTable(tableName, contentName, totalInt, totalLoan, index) {
    var newTable = document.getElementsByClassName(tableName)[index];
    var newContent = document.getElementsByClassName(contentName)[index];
    var int = document.getElementsByClassName(totalInt)[index];
    var loan = document.getElementsByClassName(totalLoan)[index];

    if (newTable) {
        newTable.remove();
    }

    if (newContent) {
        newContent.remove();
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

function loanSelect(selection) {
    var loanSelected = document.getElementById(selection);
    if (selection.includes("A") == true) {
        var extra = document.getElementsByClassName("selectedA");
        for (i=0;i<extra.length; i++) {
            extra[i].className = "optionA";
        }
        loanSelected.className = "selectedA";

    }

    else {
        var extra = document.getElementsByClassName("selectedB");
        for (i=0;i<extra.length; i++) {
            extra[i].className = "optionB";
        }
        loanSelected.className = "selectedB";
    }


    if (loanSelected.id.includes("simpleInt") == true) {
        if (loanSelected.id.includes("A") == true) {
            simpleInputs("leftLoanInput");
        }
        else {
            simpleInputs("rightLoanInput");
        }
    }

    else if (loanSelected.id.includes("compInt") == true) {
        if (loanSelected.id.includes("A") == true) {
            compInputs("leftLoanInput");
        }
        else {
            compInputs("rightLoanInput");
        }
    }

    else if (loanSelected.id.includes("intOnly") == true) {
        if (loanSelected.id.includes("A") == true) {
            intOnlyInputs("leftLoanInput");
        }
        else {
            intOnlyInputs("rightLoanInput");
        }
    }
    calcColor();
}

function simpleInputs(loc) {
    simple = document.getElementById(loc);
    simple.innerHTML = "<div id='simpleMain'>Loan Amount:<input type='number' class='loanAmountSimple' min='0' max='10000000' value='120'><br>Yearly Interest Rate:<input type='number' class='intRateSimple' value='10' ><br>Loan Length:<input type='number' class='loanLengthSimple' min='0' max='600' value='1'><br></div>";
}

function compInputs(loc) {
    comp = document.getElementById(loc);
    comp.innerHTML = "<div id='compMain'>Loan Amount:<input type='number' class='loanAmountComp' min='0' max='100000000' value='100000'><br>Interest Rate:<input type='number' class='intRateComp' value='5'><br>Loan Length:<input type='number' class='loanLengthComp' min='0' max='100' value='5'><br>Compounding Period:<select class='compPeriod'><option>Monthly</option><option>Weekly</option><option>Daily</option></select><br>Additional Yearly Payment:<input type='number' class='compAdd' min='0' max='600' value='0'><br></div>";
}

function intOnlyInputs(loc) {
    intOnly = document.getElementById(loc);
    intOnly.innerHTML = "<div id='invalid'>INVALID!</div>";
}

function calcColor() {
    var calcButton = document.getElementById("calcCompare");
    if (document.getElementsByClassName("selectedA").length > 0 && document.getElementsByClassName("selectedB").length > 0 && document.getElementById("leftLoanInput").childNodes[0].id != "invalid" && document.getElementById("rightLoanInput").childNodes[0].id != "invalid") {
        calcButton.style.opacity = "100%";
    }
    else {
        calcButton.style.opacity = "40%";
    }
}

function compareEr(side, tableArea, index) {
    if (side.id.includes("simple") == true) {
        document.getElementById(tableArea).innerHTML = "<div class='simpleTable'></div>";
        for (i=0;i<document.getElementsByClassName("simpleTable").length; i++) {
            document.getElementsByClassName("simpleTable")[i].style.fontSize = "1em";
        }
        simpleCalc(index);
    }
    else if (side.id.includes("comp") == true) {
        document.getElementById(tableArea).innerHTML = "<div class='compTable'></div>";
        for (i=0;i<document.getElementsByClassName("compTable").length; i++) {
            document.getElementsByClassName("compTable")[i].style.fontSize = "1em";
        }
        compoundCalc(index);
    }

}

function compareCalc() {
    if (document.getElementById("calcCompare").style.opacity == "1") {
        var leftSide = document.getElementsByClassName("selectedA")[0];
        var rightSide = document.getElementsByClassName("selectedB")[0];
        if (leftSide.id[0] == rightSide.id[0]){
            compareEr(leftSide, "leftLoanTable", 0);
            compareEr(rightSide, "rightLoanTable", 1);
        }
        else {
            compareEr(leftSide, "leftLoanTable", 0);
            compareEr(rightSide, "rightLoanTable", 0);
        }


    }
}

