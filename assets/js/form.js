let response = await fetch("/assets/js/mnemos.json",{
    headers: {
        Accept: 'application/json'
    }
});
let colleges = await response.json();

let divElement = document.querySelector("#mnemo-form");

let selectElement = document.createElement("select");
divElement.append(selectElement);

for(let college of colleges)
{
    let optionElement = document.createElement("option");
    optionElement.innerText = college.nom;
    selectElement.appendChild(optionElement);
}

let formElement = document.createElement("form");