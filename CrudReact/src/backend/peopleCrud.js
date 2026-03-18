import api from "./configApi.js";

export async function getPeople() {
    const response = await fetch(`${api}/people`);

    const data = await response.json();

    return data;
};

export async function createPerson(person) {
    const response = await fetch(`${api}/people`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(person)
    })

    return response.json();
}

export async function updatePerson(id, person) {
    const response = await fetch(`${api}/people/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(person)
    });

    return response.json();
}

export async function deletePerson(id) {
    await fetch(`${api}/people/${id}`, {
        method: "DELETE"
    });
}