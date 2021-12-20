const resultTbody = document.getElementById("result-tbody");

fetch(baseURL + "/parties")
    .then(response => response.json())
    .then(result => {
        result.map(createResultTableRow)
    });

function createResultTableRow(party) {
    const tableRow = document.createElement("tr");
    resultTbody.appendChild(tableRow);
    constructResultTableRow(party, tableRow)
}

function constructResultTableRow(party, tableRow) {
    const partyTd = document.createElement("td");
    const votesTd = document.createElement("td");

    partyTd.innerText = party.party;
    votesTd.innerText = party.votes.toString();

    tableRow.appendChild(partyTd);
    tableRow.appendChild(votesTd);
}


