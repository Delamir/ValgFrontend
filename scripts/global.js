const baseURL = "http://localhost:8080";

// Sort table made with help from https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(tableColumnIndex, tableToSort) {
    let rows, switching, rowIndex, firstLetter, lastLetter, shouldSwitch, sortDirection, switchCount = 0;
    switching = true;
    sortDirection = "asc";

    while (switching) {
        switching = false;
        rows = tableToSort.rows;

        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (rowIndex = 1; rowIndex < (rows.length - 1); rowIndex++) {
            shouldSwitch = false;

            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            firstLetter = rows[rowIndex].getElementsByTagName("td")[tableColumnIndex];
            lastLetter = rows[rowIndex + 1].getElementsByTagName("td")[tableColumnIndex];

            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (sortDirection === "asc") {
                if (firstLetter.innerHTML.toLowerCase() > lastLetter.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (sortDirection === "desc") {
                if (firstLetter.innerHTML.toLowerCase() < lastLetter.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[rowIndex].parentNode.insertBefore(rows[rowIndex + 1], rows[rowIndex]);
            switching = true;
            switchCount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchCount === 0 && sortDirection === "asc") {
                sortDirection = "desc";
                switching = true;
            }
        }
    }
}