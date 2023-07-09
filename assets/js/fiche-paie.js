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
    logeBase,
    nourriBase,
    logenourriBase,
    SSTotTauxFrance,
    SSTotTauxAlsace,
    SSTotBase,
    SSPlafTaux,
    SSPlafBase,
    plafondSS,
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

document.querySelector("#loge").innerText = logeBase + "€ par an (soit " + (logeBase/12).toFixed(2) + "€ par mois)";
document.querySelector("#nourri").innerText = nourriBase + "€ par an (soit " + (nourriBase/12).toFixed(2) + "€ par mois)";
document.querySelector("#logenourri").innerText = logenourriBase + "€ par an (soit " + (logenourriBase/12).toFixed(2) + "€ par mois)";

document.querySelector("#SSTotTauxFrance").innerText = SSTotTauxFrance*100 + "%";
document.querySelector("#SSTotTauxAlsace").innerText = (SSTotTauxAlsace*100).toFixed(1) + "%";

document.querySelector("#SSPlafTaux").innerText = (SSPlafTaux*100).toFixed(1) + "%";

for(let element of document.querySelectorAll(".plafondSS")){element.innerText = plafondSS + "€";}