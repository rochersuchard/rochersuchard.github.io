const ids = ["#ffi", "#premiereAnnee", "#deuxiemeAnnee", "#troisiemeAnnee", "#quatriemeAnnee", "#cinquiemeAnnee"];
const tauxTraitement = 1.0;
const traitementsBase = [17482.22, 19119.55, 21165.75, 27988.47, 28010.20, 28027.80];
const indemniteBase = 435.18;
const montantGardeSemaine = 154.22;
const montantGardeWE = 168.71;
const taxes = [
    {
        nom: "S.S Totalité",
        taux: 1.7,
        base: 1
    },
    {
        nom: "S.S Plafonnée",
        taux: 6.9,
        base: 1
    },
    {
        nom: "C.R.D.S",
        taux: 0.5,
        base: 0.9825
    },
    {
        nom: "C.S.G Déductible",
        taux: 6.8,
        base: 0.9825
    },
    {
        nom: "C.S.G Non Déductible",
        taux: 2.4,
        base: 0.9825
    },
    {
        nom: "IRCANTEC Tranche A",
        taux: 2.8,
        base: 2/3
    }

]

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

        tab.rafraichir();

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
    tab.rafraichir();
});

const plusSemaineElement = document.querySelector("#plusSemaine");
plusSemaineElement.classList.add("unclicked");
plusSemaineElement.addEventListener("click", function (){
    nbSemaineElement.innerText ++;
    if(nbSemaineElement.innerText > 0){tab.getLineElement(3).style.display = "table-row";}
    tab.rafraichir();
});

nbWEElement.innerText = "0";

const moinsWEElement = document.querySelector("#moinsWE");
moinsWEElement.classList.add("unclicked");
moinsWEElement.addEventListener("click", function (){
    if(nbWEElement.innerText != 0){nbWEElement.innerText --;}
    if(nbWEElement.innerText == 0){tab.getLineElement(4).style.display = "none";}
    tab.rafraichir();
});

const plusWEElement = document.querySelector("#plusWE");
plusWEElement.classList.add("unclicked");
plusWEElement.addEventListener("click", function (){
    nbWEElement.innerText ++;
    if(nbWEElement.innerText > 0){tab.getLineElement(4).style.display = "table-row";}
    tab.rafraichir();
});

class Table
{
    content = [
        {type: "th", cells: ["Traitement LIBELLE", "NB ou TAUX", "BASE", "TOTAL"], lineElement: null, cellElements: []},
        {type: "td", cells: ["Traitement Base Médical", 1.00.toFixed(2), "", ""], lineElement: null, cellElements: []},
        {type: "td", cells: ["Indémnité Sujétion Internes", 1.00.toFixed(2), indemniteBase, ""], lineElement: null, cellElements: []},
        {type: "td", cells: ["Gardes Semaine", "", montantGardeSemaine, ""], lineElement: null, cellElements: []},
        {type: "td", cells: ["Gardes WE", "", montantGardeWE, ""], lineElement: null, cellElements: []},
        {type: "th", cells: ["Brut Imposable", "", "", ""], lineElement: null, cellElements: []}
    ];

    constructor(tableElement)
    {
        this.tableElement = tableElement;
    }

    construire()
    {
        for(let line of this.content)
        {
            const lineElement = this.tableElement.insertRow(-1);
            for(let cell of line.cells)
            {
                const cellElement = document.createElement(line.type);
                cellElement.innerText = cell;
                lineElement.appendChild(cellElement);
                line.cellElements.push(cellElement);
            }

            line.lineElement = lineElement;

        }
        this.getLineElement(3).style.display = "none";
        this.getLineElement(4).style.display = "none";
        this.rafraichir();
    }
    
    rafraichir()
    {
        this.setCell(1, 2, (currentlyClickedBouton.traitementBase/12).toFixed(2));
        this.setCell(3, 1, nbSemaineElement.innerText);
        this.setCell(4, 1, nbWEElement.innerText);
        
    }

    getCell(line, column)
    {
        return this.content[line].cellElements[column].innerText;
    }

    setCell(line, column, text)
    {
        this.content[line].cellElements[column].innerText = text;
    }

    getLineElement(line)
    {
        return this.content[line].lineElement;
    }
}

let tab = new Table(document.querySelector("#tableContainer"));
tab.construire();