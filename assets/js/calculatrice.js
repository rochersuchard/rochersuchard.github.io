const ids = ["#ffi", "#premiereAnnee", "#deuxiemeAnnee", "#troisiemeAnnee", "#quatriemeAnnee", "#cinquiemeAnnee"]

const traitementsBase = [17482.22, 19119.55, 21165.75, 27988.47, 28010.20, 28027.80];
const traitementTaux = 1.00;

const indemniteBase = 435.18;
const indemniteTaux = 1.00;

const montantGardeSemaine = 154.22;
const montantGardeWE = 168.71;

const SSTotTaux = 0.0170;
const SSTotBase = 1;

const SSPlafTaux = 0.0690;
const SSPlafBase = 1;

const CRDSTaux = 0.005;
const CRDSBase = 0.9825;

const CSGDedTaux = 0.068;
const CSGDedBase = 0.9825;

const CSGNonDedTaux = 0.024;
const CSGDNonDedBase = 0.9825;

const IRCANTECTaux = 0.028;
const IRCANTECBase = 2/3;

const content = [
    {type: "th", cells: ["Traitement LIBELLE", "NB ou TAUX", "BASE", "TOTAL"]},
    {type: "td", cells: ["Traitement Base Médical", traitementTaux.toFixed(2), "", ""]},
    {type: "td", cells: ["Indémnité Sujétion Internes", indemniteTaux.toFixed(2), indemniteBase, ""]},
    {type: "td", cells: ["Gardes Semaine", "", montantGardeSemaine, ""]},
    {type: "td", cells: ["Gardes WE", "", montantGardeWE, ""]},
    {type: "th", cells: ["Brut Imposable", "", "", ""]},
    {type: "td", cells: ["S.S Totalité", (SSTotTaux*100).toFixed(2) + "%", "", ""]},
    {type: "td", cells: ["S.S Plafonnée", (SSPlafTaux*100).toFixed(2) + "%", "", ""]},
    {type: "td", cells: ["C.R.D.S", (CRDSTaux*100).toFixed(2) + "%", "", ""]},
    {type: "td", cells: ["C.S.G Déductible", (CSGDedTaux*100).toFixed(2) + "%", "", ""]},
    {type: "td", cells: ["C.S.G Non Déductible", (CSGNonDedTaux*100).toFixed(2) + "%", "", ""]},
    {type: "td", cells: ["IRANTEC Tranche A", (IRCANTECTaux*100).toFixed(2) + "%", "", ""]},
    {type: "th", cells: ["Total Net", "", "", ""]}
];

let boutonsAnnees = [];

let currentlyClickedBouton;
let traitementBase = traitementsBase[0];

for(let i = 0 ; i < 6 ; i++)
{
    boutonsAnnees.push(
        {
            element: document.querySelector(ids[i]),
            traitementBase: traitementsBase[i]
        });

    if(i == 0)
    {
        boutonsAnnees[i].element.classList.add("clicked");
        currentlyClickedBouton = boutonsAnnees[i];
    }
    else{boutonsAnnees[i].element.classList.add("unclicked");}

    boutonsAnnees[i].element.addEventListener("click", function () {
        if(boutonsAnnees[i] != currentlyClickedBouton)
        {
            currentlyClickedBouton.element.classList.remove("clicked");
            currentlyClickedBouton.element.classList.add("unclicked");
            boutonsAnnees[i].element.classList.remove("unclicked");
            boutonsAnnees[i].element.classList.add("clicked");
            currentlyClickedBouton = boutonsAnnees[i];
        }

        tab.refreshTraitement();

    });
}

const nbSemaineElement = document.querySelector("#nbSemaine");
const nbWEElement = document.querySelector("#nbWE");
let montantGardeTotal;

nbSemaineElement.innerText = "0";

const moinsSemaineElement = document.querySelector("#moinsSemaine");
moinsSemaineElement.classList.add("unclicked");
moinsSemaineElement.addEventListener("click", function (){
    if(nbSemaineElement.innerText != 0){nbSemaineElement.innerText --;}
    if(nbSemaineElement.innerText == 0){tab.getLineElement(3).style.display = "none";}
    tab.refreshGardeSemaine();
});

const plusSemaineElement = document.querySelector("#plusSemaine");
plusSemaineElement.classList.add("unclicked");
plusSemaineElement.addEventListener("click", function (){
    nbSemaineElement.innerText ++;
    if(nbSemaineElement.innerText > 0){tab.getLineElement(3).style.display = "table-row";}
    tab.refreshGardeSemaine();
});

nbWEElement.innerText = "0";

const moinsWEElement = document.querySelector("#moinsWE");
moinsWEElement.classList.add("unclicked");
moinsWEElement.addEventListener("click", function (){
    if(nbWEElement.innerText != 0){nbWEElement.innerText --;}
    if(nbWEElement.innerText == 0){tab.getLineElement(4).style.display = "none";}
    tab.refreshGardeWE();
});

const plusWEElement = document.querySelector("#plusWE");
plusWEElement.classList.add("unclicked");
plusWEElement.addEventListener("click", function (){
    nbWEElement.innerText ++;
    if(nbWEElement.innerText > 0){tab.getLineElement(4).style.display = "table-row";}
    tab.refreshGardeWE();
});

class Table
{
    container = null;
    content = [];
    contentElements = [];

    constructor(container, content)
    {
        this.container = container;
        this.content = content;
    }

    build()
    {
        for(let line of this.content)
        {
            const lineElement = this.container.insertRow(-1);
            this.contentElements.push({lineElement: lineElement, cellElements: []});

            for(let cell of line.cells)
            {
                const cellElement = document.createElement(line.type);
                cellElement.innerText = cell;
                lineElement.appendChild(cellElement);
                this.contentElements[this.contentElements.length - 1].cellElements.push(cellElement);
            }

        }
        this.getLineElement(3).style.display = "none";
        this.getLineElement(4).style.display = "none";

        this.refreshTotal(2);

        this.refreshTraitement();
        this.refreshGardeSemaine();
        this.refreshGardeWE();
    }

    refreshTotal(line)
    {
        this.setCell(line, 3, (this.getCell(line, 1)*this.getCell(line, 2)).toFixed(2));
    }
    
    refreshTraitement()
    {
        this.setCell(1, 2, (currentlyClickedBouton.traitementBase/12).toFixed(2));
        this.refreshTotal(1);
        this.refreshBrut();
    }

    refreshGardeSemaine()
    {
        this.setCell(3, 1, nbSemaineElement.innerText);
        this.refreshTotal(3);
        this.refreshBrut();
    }

    refreshGardeWE()
    {
        this.setCell(4, 1, nbWEElement.innerText);
        this.refreshTotal(4);
        this.refreshBrut();
    }

    refreshBrut()
    {
        let somme = 0;

        for(let i = 1 ; i < 5 ; i++)
        {
            somme += +this.getCell(i, 3);
        }

        this.setCell(5, 3, somme.toFixed(2));

        this.refreshTaxes();
    }

    refreshTaxes()
    {
        this.setCell(6, 2, (SSTotBase*this.getCell(5,3)).toFixed(2));
        this.setCell(6, 3, "-" + (SSTotTaux*this.getCell(6,2)).toFixed(2));

        this.setCell(7, 2, (SSPlafBase*this.getCell(5,3)).toFixed(2));
        this.setCell(7, 3, "-" + (SSPlafTaux*this.getCell(7,2)).toFixed(2));

        this.setCell(8, 2, (CRDSBase*this.getCell(5,3)).toFixed(2));
        this.setCell(8, 3, "-" + (CRDSTaux*this.getCell(8,2)).toFixed(2));

        this.setCell(9, 2, (CSGDedBase*this.getCell(5,3)).toFixed(2));
        this.setCell(9, 3, "-" + (CSGDedTaux*this.getCell(9,2)).toFixed(2));

        this.setCell(10, 2, (CSGDNonDedBase*this.getCell(5,3)).toFixed(2));
        this.setCell(10, 3, "-" + (CSGNonDedTaux*this.getCell(10,2)).toFixed(2));

        this.setCell(11, 2, (IRCANTECBase*this.getCell(5,3)).toFixed(2));
        this.setCell(11, 3, "-" + (IRCANTECTaux*this.getCell(11,2)).toFixed(2));

        this.refreshNet();
    }

    refreshNet()
    {
        let somme = this.getCell(5, 3);

        for(let i = 6 ; i < 12 ; i++)
        {
            somme -= this.getCell(i, 3).substring(1);
        }

        this.setCell(12, 3, somme.toFixed(2));
    }

    getCell(line, column)
    {
        return this.contentElements[line].cellElements[column].innerText;
    }

    setCell(line, column, text)
    {
        this.contentElements[line].cellElements[column].innerText = text;
    }

    getLineElement(line)
    {
        return this.contentElements[line].lineElement;
    }
}

let tab = new Table(document.querySelector("#tableContainer"), content);
tab.build();