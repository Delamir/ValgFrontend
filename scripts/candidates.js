const candidateTbody = document.getElementById("candidate-tbody");
const newCandidateModal = document.getElementById("new-candidate-modal");
const newCandidateSelectModal = document.getElementById("new-candidate-party");

fetch(baseURL + "/candidates")
.then(response => response.json())
.then(result => {
    result.map(createCandidateTableRow)
});

function createCandidateTableRow(candidate) {
    const tableRow = document.createElement("tr");
    candidateTbody.appendChild(tableRow);

    constructCandidateTableRow(candidate, tableRow);
}

function constructCandidateTableRow(candidate, tableRow) {
    //Table data
    const candidateNameTd = document.createElement("td");
    const candidatePartyTd = document.createElement("td");
    const actionTd = document.createElement("td");

    //Buttons
    const updateCandidateButton = document.createElement("button");
    const deleteCandidateButton = document.createElement("button");
    const acceptUpdateButton = document.createElement("button");

    //Values
    candidateNameTd.innerText = candidate.name;
    candidatePartyTd.innerText = candidate.party.party;
    candidatePartyTd.value = candidate.party.id;
    updateCandidateButton.innerText = "Rediger";
    deleteCandidateButton.innerText = "Slet";

    acceptUpdateButton.innerText = "Gem";
    acceptUpdateButton.style.display = "none";

    //Append buttons to actionTd
    actionTd.appendChild(updateCandidateButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteCandidateButton);

    //Append td elements to tablerow
    tableRow.appendChild(candidateNameTd);
    tableRow.appendChild(candidatePartyTd);
    tableRow.appendChild(actionTd);

    //Eventlisnters on buttons
    updateCandidateButton.addEventListener("click", () => {
        const candidateNameInput = document.createElement("input");
        const candidatePartySelect = document.createElement("select");

        //Candidate name
        candidateNameInput.value = candidateNameTd.innerText;
        candidateNameTd.innerText = "";
        candidateNameTd.appendChild(candidateNameInput);

        //Candidate party select
        fetch(baseURL + "/parties")
            .then(response => response.json())
            .then(result => {
                result.forEach(party => {
                    //Create option for each party available
                    const partyOption = document.createElement("option");
                    partyOption.innerText = party.party;
                    partyOption.value = party.id;
                    candidatePartySelect.appendChild(partyOption);
                })
            });
        candidatePartyTd.innerText = "";
        candidatePartyTd.appendChild(candidatePartySelect);
        updateCandidateButton.style.display = "none";
        acceptUpdateButton.style.display = "";
    });

    acceptUpdateButton.addEventListener("click", () => {
        //Use first child to retrieve the value of the first node returned https://www.w3schools.com/jsref/prop_node_firstchild.asp
        const candidatePartySelect = candidatePartyTd.firstChild;
        const candidateToUpdate = {
            name: candidateNameTd.firstChild.value,
            party: {
                id: Number(candidatePartyTd.firstChild.value),
                //Use options.[index] to retrieve the text of a selected option because value is party id, and the party name is needed as well
                party: candidatePartySelect.options[candidatePartySelect.selectedIndex].text
            }
        };

        fetch(baseURL + "/candidates/" + candidate.id, {
            method: "PATCH",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(candidateToUpdate)
        }).then(response => {
            if(response.status === 200) {
                candidateNameTd.innerHTML = "";
                candidatePartyTd.innerHTML = "";

                candidateNameTd.innerText = candidateToUpdate.name;
                candidatePartyTd.innerText = candidateToUpdate.party.party;
                updateCandidateButton.style.display = "";
                acceptUpdateButton.style.display = "none";
            }
        })
    })

    deleteCandidateButton.addEventListener("click", () => {
        fetch(baseURL + "/candidates/" + candidate.id, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                tableRow.remove();
            } else {
                throw("Kan ikke slette kandidat");
            }
        })
    })
}

//Fetch for party types in select inside modal
fetch(baseURL + "/parties")
    .then(response => response.json())
    .then(result => {
        result.forEach(party => {
            const partyOption = document.createElement("option");
            partyOption.innerText = party.party;
            partyOption.value = party.id;
            newCandidateSelectModal.appendChild(partyOption);
        })
    })

function createCandidate () {
    const candidateToCreate = {
        name: document.getElementById("new-candidate-name").value,
        party: {
            id: newCandidateSelectModal.value,
            party: newCandidateSelectModal.options[newCandidateSelectModal.selectedIndex].text
        }
    }
console.log(document.getElementById("new-candidate-party").value)
    fetch(baseURL + "/candidates", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidateToCreate)
    }).then(response => {
        if (response.status === 200) {
            newCandidateModal.style.display = "none";
            document.getElementById("new-candidate-name").value = "";
            createCandidateTableRow(candidateToCreate);
        } else {
            throw("Kan ikke oprette kandidat")
        }
    });
}

document.getElementById("new-candidate-submit").addEventListener("click", () => createCandidate());

//Made with help from w3school https://www.w3schools.com/howto/howto_css_modals.asp
document.getElementById("new-candidate-button").onclick = function () {
    newCandidateModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === newCandidateModal) {
        newCandidateModal.style.display = "none";
    }
}
document.getElementsByClassName("close")[0].onclick = function () {
    newCandidateModal.style.display = "none";
}

