/*
Created by: Preston Luie 01971155
Github account: PLuie88
10/30/24
*/

const maxColumn = document.getElementById("maxC");
const minColumn = document.getElementById("minC");

const maxRow = document.getElementById("maxRow");
const minRow = document.getElementById("minRow");

const inputNumForm = document.getElementById("tableBounds");

const minCError = document.getElementById("minCSpan");
const maxCError = document.getElementById("maxCSpan");
const minRError = document.getElementById("minRSpan");
const maxRError = document.getElementById("maxRSpan");

/*
This function is in response to the onclick submit method from the HTML file. In this function I gather all of the data input and clear the table from previous entry
It then checks the values that have been input by the user (see valueChecker for explanation) to ensure that all inputs are valid. If not valid then return and do 
not create the table. If valid then the function will continue on to create the table first creating a temporary table in which we will appened the multiplication results.
First in the table I create the top left tile to be clear so that the table lines up  and append it to the top row which are all headers, I then apply this concept
again for the rows allowing for an easier way to style the first tile in each row as well as the top row. Next I add the appropritate values into their corresponding
spot in each row which I then append to the table itself (values go into rows which then goes into the table) after the valid bounds have been parsed through and all the
rows completed and added to the temporary table, I then append the temporary table to the tablePlaceHodlerFind which then applies my updated table to the html place holder
giving the final product of a correct table.
 */
function subButtonClicked() {

    const tablePlaceHolderFind = document.getElementById("tableHolder");

    //gets values to integers (if applicable)
    const maxCValue = parseInt(maxColumn.value);
    const minCValue = parseInt(minColumn.value);
    const maxRValue = parseInt(maxRow.value);
    const minRValue = parseInt(minRow.value);

    tablePlaceHolderFind.textContent = ""; //clears previous table (if any)


    //checks if valid
    var resultOne = valueChecker(maxCValue, minCValue, maxCError, minCError);
    var resultTwo = valueChecker(maxRValue, minRValue, maxRError, minRError);

    if (resultOne == false || resultTwo == false) {  //if any of the input is false do not create the table
        return;
    }

    //create temp variables
    const updateTable = document.createElement("table");
    const tempRow = document.createElement("tr");

    const topLeftFiller = document.createElement("th");
    tempRow.appendChild(topLeftFiller);

    //header for top (horizontal)
    for (var k = minCValue; k <= maxCValue; k++) {
        const tCell = document.createElement("th");
        tCell.textContent = k;
        tempRow.appendChild(tCell);
    }
    updateTable.appendChild(tempRow);


    //fill in rest of table putting values into the row and then appending the row to the table
    for (var j = minRValue; j <= maxRValue; j++) {
        const createdRows = document.createElement("tr");
        const rowHeader = document.createElement("th");
        rowHeader.textContent = j; //set first item in each row to be a header
        createdRows.appendChild(rowHeader);
        for (var i = minCValue; i <= maxCValue; i++) {
            const nCell = document.createElement("td");
            nCell.textContent = i * j;
            createdRows.appendChild(nCell);
        }
        updateTable.appendChild(createdRows); //udpate table with filled in row w/ values
    }
    tablePlaceHolderFind.appendChild(updateTable); //updates holder with completed table

};


/*This function is passed in the max and min for either the row or the columns respectively. From there it goes to check if there is a number as well as if
the maximum is between -50 to 50 as well as the minium being in the range of -50 to 50 (if not valid return false)
, after this it checks to see if the maximum is less than the minimum (if valid return false)
as well as if the maximum and minimum are both valid inputs and are equal to one another*/

function valueChecker(maximum, minimum, maxMsg, minMsg) {

    var result = true;

    //check if empty
    if (isNaN(maximum) || isNaN(minimum)) {
        if (isNaN(maximum) && isNaN(minimum)) {
            maxMsg.textContent = "Invalid NaN: inputs must be numbers between -50 and 50";
            minMsg.textContent = "Invalid NaN: inputs must be numbers between -50 and 50";
            return false;
        }
        if (isNaN(maximum)) {
            maxMsg.textContent = "Invalid NaN: inputs must be numbers between -50 and 50";
            return false;
        }
        if (isNaN(minimum)) {
            minMsg.textContent = "Invalid NaN: inputs must be numbers between -50 and 50";
            return false;
        }
    }

    //validate max & min respectively
    if (maximum > 50 || maximum < -50) {
        maxMsg.textContent = "Invalid maximum: Please enter a value between -50 and 50";
        return false;
    } else {
        maxMsg.textContent = "";
        result = true;
    }

    if (minimum > 50 || minimum < -50) {
        minMsg.textContent = "Invalid minimum: Please enter a value between -50 and 50";
        return false;
    } else {
        minMsg.textContent = "";
        result = true;
    }

    if (maximum < minimum) {
        maxMsg.textContent = "Invalid, Max < Min: Please Enter value greater than or equal to min between -50 and 50";
        minMsg.textContent = "Invalid, Min > Max: Please Enter value less than or equal to max between -50 and 50";
        result = false;
    
    }

    //ensure equal is true
    if (result === true && maximum === minimum) {
        result = true;
    }

    return result;
}


