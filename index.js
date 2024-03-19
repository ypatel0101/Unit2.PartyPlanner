const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-FT/events";

const partiesList = document.getElementById("parties");
const addPartyForm = document.getElementById("addParty");

async function addParty(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    const newParty = {
        name,
        date,
        time,
        location,
        description,
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newParty),
    });

    const updatedParties = await response.json();

    state.events = updatedParties;

    event.target.reset();

    renderParties();
}

function renderParties() {
    partiesList.innerHTML = "";

    state.events.forEach((party) => {
        const partyElement = document.createElement("div");
        partyElement.innerHTML = `
            <h3>${party.name}</h3>
            <p>${party.date} ${party.time}</p>
            <p>${party.location}</p>
            <p>${party.description}</p>
        `;

        partiesList.appendChild(partyElement);
    });
}

const state = {
    events: [],
};

getParties().then(() => {
    addPartyForm.addEventListener("submit", addParty);
});

async function getParties() {
    const response = await fetch(API_URL);
    const parties = await response.json();

    state.events = parties;
}