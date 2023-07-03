const ids = ["#ffi", "#premiereAnnee", "#deuxiemeAnnee", "#troisiemeAnnee", "#quatriemeAnnee", "#cinquiemeAnnee"]

const traitementsBase = [17482.22, 19119.55, 21165.75, 27988.47, 28010.20, 28027.80];
const traitementTaux = 1.00;

const sujetionBase = 435.18;
const indemniteTaux = 1.00;

const responsabilite4Base = 2122.27/12;
const responsabiliteTaux = 1.00;

const responsabilite5Base = 4210.77/12;

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
    {key: "title", type: "th", cells: ["Traitement LIBELLE", "NB ou TAUX", "BASE", "TOTAL"]},
    {key: "traitement", type: "td", cells: ["Traitement Base Médical", traitementTaux.toFixed(2), "", ""]},
    {key: "sujetion", type: "td", cells: ["Indémnité Sujétion Internes", indemniteTaux.toFixed(2), "", ""]},
    {key: "responsabilite", type: "td", cells: ["Prime Responsabilité", responsabiliteTaux.toFixed(2), "", ""]},
    {key: "semaine", type: "td", cells: ["Gardes Semaine", "", montantGardeSemaine, ""]},
    {key: "WE", type: "td", cells: ["Gardes WE", "", montantGardeWE, ""]},
    {key: "brut", type: "th", cells: ["Brut Imposable", "", "", ""]},
    {key: "SSTot", type: "td", cells: ["S.S Totalité", (SSTotTaux*100).toFixed(2) + "%", "", ""]},
    {key: "SSPlaf", type: "td", cells: ["S.S Plafonnée", (SSPlafTaux*100).toFixed(2) + "%", "", ""]},
    {key: "CRDS", type: "td", cells: ["C.R.D.S", (CRDSTaux*100).toFixed(2) + "%", "", ""]},
    {key: "CSGDed", type: "td", cells: ["C.S.G Déductible", (CSGDedTaux*100).toFixed(2) + "%", "", ""]},
    {key: "CSGNonDed", type: "td", cells: ["C.S.G Non Déductible", (CSGNonDedTaux*100).toFixed(2) + "%", "", ""]},
    {key: "IRCANTEC", type: "td", cells: ["IRCANTEC Tranche A", (IRCANTECTaux*100).toFixed(2) + "%", "", ""]},
    {key: "net", type: "th", cells: ["Total Net", "", "", ""]}
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
    if(nbSemaineElement.innerText == 0){tab.getLineElement("semaine").style.display = "none";}
    tab.refreshGardeSemaine();
});

const plusSemaineElement = document.querySelector("#plusSemaine");
plusSemaineElement.classList.add("unclicked");
plusSemaineElement.addEventListener("click", function (){
    nbSemaineElement.innerText ++;
    if(nbSemaineElement.innerText > 0){tab.getLineElement("semaine").style.display = "table-row";}
    tab.refreshGardeSemaine();
});

nbWEElement.innerText = "0";

const moinsWEElement = document.querySelector("#moinsWE");
moinsWEElement.classList.add("unclicked");
moinsWEElement.addEventListener("click", function (){
    if(nbWEElement.innerText != 0){nbWEElement.innerText --;}
    if(nbWEElement.innerText == 0){tab.getLineElement("WE").style.display = "none";}
    tab.refreshGardeWE();
});

const plusWEElement = document.querySelector("#plusWE");
plusWEElement.classList.add("unclicked");
plusWEElement.addEventListener("click", function (){
    nbWEElement.innerText ++;
    if(nbWEElement.innerText > 0){tab.getLineElement("WE").style.display = "table-row";}
    tab.refreshGardeWE();
});

class Table
{
    container = null;
    content = [];
    contentElements = [];
    elementsMap = new Map();

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
            this.contentElements.push(lineElement);

            this.elementsMap.set(line.key, lineElement);

            for(let cell of line.cells)
            {
                const cellElement = document.createElement(line.type);
                cellElement.innerText = cell;
                lineElement.appendChild(cellElement);
            }

        }

        this.getLineElement("title").children[0].setAttribute("style", "width: 50%");
        
        this.getLineElement("semaine").style.display = "none";
        this.getLineElement("WE").style.display = "none";


        this.refreshTraitement();
        this.refreshGardeSemaine();
        this.refreshGardeWE();
    }

    refreshTotal(search)
    {
        let cellElements = this.elementsMap.get(search).children;
        this.setCellText(search, 3, (cellElements[1].innerText * cellElements[2].innerText).toFixed(2));
    }
    
    refreshTraitement()
    {
        this.setCellText("traitement", 2, (currentlyClickedBouton.traitementBase/12).toFixed(2));
        this.refreshTotal("traitement");
        this.refreshSujetion();
        this.refreshResponsabilite();
        this.refreshBrut();
    }

    refreshSujetion()
    {
        if([0,1,2].includes(boutonsAnnees.indexOf(currentlyClickedBouton)))
        {
            this.showLine("sujetion");
            this.setCellText("sujetion", 2, sujetionBase.toFixed(2));
        }

        else
        {
            this.hideLine("sujetion");
            this.setCellText("sujetion", 2, 0);
        }

        this.refreshTotal("sujetion");
    }

    refreshResponsabilite()
    {
        if(boutonsAnnees.indexOf(currentlyClickedBouton) == 4)
        {
            this.showLine("responsabilite");
            this.setCellText("responsabilite", 2, responsabilite4Base.toFixed(2));
        }

        else if(boutonsAnnees.indexOf(currentlyClickedBouton) == 5)
        {
            this.showLine("responsabilite");
            this.setCellText("responsabilite", 2, responsabilite5Base.toFixed(2));
        }

        else
        {
            this.hideLine("responsabilite");
            this.setCellText("responsabilite", 2, 0);
        }

        this.refreshTotal("responsabilite");
    }

    refreshGardeSemaine()
    {
        this.setCellText("semaine", 1, nbSemaineElement.innerText);
        this.refreshTotal("semaine");
        this.refreshBrut();
    }

    refreshGardeWE()
    {
        this.setCellText("WE", 1, nbWEElement.innerText);
        this.refreshTotal("WE");
        this.refreshBrut();
    }

    refreshBrut()
    {
        let somme = +this.getCellText("traitement", 3) + +this.getCellText("sujetion", 3) + +this.getCellText("responsabilite", 3) + +this.getCellText("semaine", 3) + +this.getCellText("WE", 3);
        this.setCellText("brut", 3, somme.toFixed(2));

        this.refreshTaxes();
    }

    refreshTaxes()
    {
        const brut = this.getCellText("brut", 3);
        this.setCellText("SSTot", 2, (SSTotBase*brut).toFixed(2));
        this.setCellText("SSTot", 3, "-" + (SSTotTaux*this.getCellText("SSTot",2)).toFixed(2));

        this.setCellText("SSPlaf", 2, (SSPlafBase*brut).toFixed(2));
        this.setCellText("SSPlaf", 3, "-" + (SSPlafTaux*this.getCellText("SSPlaf",2)).toFixed(2));

        this.setCellText("CRDS", 2, (CRDSBase*brut).toFixed(2));
        this.setCellText("CRDS", 3, "-" + (CRDSTaux*this.getCellText("CRDS",2)).toFixed(2));

        this.setCellText("CSGDed", 2, (CSGDedBase*brut).toFixed(2));
        this.setCellText("CSGDed", 3, "-" + (CSGDedTaux*this.getCellText("CSGDed",2)).toFixed(2));

        this.setCellText("CSGNonDed", 2, (CSGDNonDedBase*brut).toFixed(2));
        this.setCellText("CSGNonDed", 3, "-" + (CSGNonDedTaux*this.getCellText("CSGNonDed",2)).toFixed(2));

        this.setCellText("IRCANTEC", 2, (IRCANTECBase*brut).toFixed(2));
        this.setCellText("IRCANTEC", 3, "-" + (IRCANTECTaux*this.getCellText("IRCANTEC",2)).toFixed(2));

        this.refreshNet();
    }

    refreshNet()
    {
        let somme = this.getCellText("brut", 3);

        for(let key of ["SSTot", "SSPlaf", "CRDS", "CSGDed", "CSGNonDed", "IRCANTEC"])
        {
            somme -= this.getCellText(key, 3).substring(1);
        }

        this.setCellText("net", 3, somme.toFixed(2));
    }

    getCellText(search, column)
    {
        return this.elementsMap.get(search).children[column].innerText;
    }

    getCell(search, column)
    {
        return this.elementsMap.get(search).children[column];
    }

    setCellText(search, column, text)
    {
        this.elementsMap.get(search).children[column].innerText = text;
    }

    getLineElement(search)
    {
        return this.elementsMap.get(search);
    }

    showLine(search)
    {
        this.elementsMap.get(search).style.display = "table-row";
    }

    hideLine(search)
    {
        this.elementsMap.get(search).style.display = "none";
    }
}

let tab = new Table(document.querySelector("#tableContainer"), content);
tab.build();
tab.getCell("title", 0).style.width="50%";