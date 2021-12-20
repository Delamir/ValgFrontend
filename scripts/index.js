const showCandidateTbody = document.getElementById("show-candidate-tbody");
const showCandidateTable = document.getElementById("show-candidate-table");
const partyTableHead = document.getElementById("party-th");

fetch(baseURL + "/candidates")
    .then(response => response.json())
    .then(result => {
        result.map(createShowCandidateTableRow)
    });

function createShowCandidateTableRow(candidate) {
    const tableRow = document.createElement("tr");
    showCandidateTbody.appendChild(tableRow);
    constructShowCandidateTableRow(candidate, tableRow);
}

function constructShowCandidateTableRow(candidate, tableRow) {
    const candidateNameTd = document.createElement("td");
    const candidatePartyTd = document.createElement("td");

    candidateNameTd.innerText = candidate.name;
    candidatePartyTd.innerText = candidate.party.party;

    tableRow.appendChild(candidateNameTd);
    tableRow.appendChild(candidatePartyTd);
}

//Sort table on "Partier"
partyTableHead.onclick = () => sortTable(1, showCandidateTable);
