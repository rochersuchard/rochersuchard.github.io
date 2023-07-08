const test = "test";

import {
    date,
    source,
    traitementsBase,
    traitementTaux,
    sujetionBase,
    sujetionTaux,
    responsabilite4Base,
    responsabilite5Base,
    responsabiliteTaux,
    montantGardeSemaine,
    montantGardeWE,
    SSTotTaux,
    SSTotBase,
    SSPlafTaux,
    SSPlafBase,
    CRDSTaux,
    CRDSBase,
    CSGDedTaux,
    CSGDedBase,
    CSGNonDedTaux,
    CSGDNonDedBase,
    IRCANTECTaux,
    IRCANTECBase   
} from "/assets/js/donnees.js";

document.querySelector("#date").innerText = date;

const sourceElement = document.querySelector("#source")
sourceElement.innerText = "Legifrance";
sourceElement.setAttribute("href", source);
sourceElement.setAttribute("target", "_blank");

const remunerationElement = document.querySelector("#remunerationBrute");
for(let i in traitementsBase)
{
    const ligneElement = remunerationElement.insertRow(-1);
    const anneeElement = document.createElement("td");
    anneeElement.innerText = (i==0) ? "FFI" : i;
    const annuelElement = document.createElement("td");
    annuelElement.innerText = traitementsBase[i] + "€";
    const mensuelElement = document.createElement("td");
    mensuelElement.innerText = (traitementsBase[i]/12).toFixed(2) + "€";

    ligneElement.appendChild(anneeElement);
    ligneElement.appendChild(annuelElement);
    ligneElement.appendChild(mensuelElement);
}

document.querySelector("#sujetion").innerText = sujetionBase;

document.querySelector("#responsabilite4").innerText = responsabilite4Base + "€ par an (soit " + (responsabilite4Base/12).toFixed(2) + "€ par mois)";
document.querySelector("#responsabilite5").innerText = responsabilite5Base + "€ par an (soit " + (responsabilite5Base/12).toFixed(2) + "€ par mois)";