const ids = ["#ffi", "#premiereAnnee", "#deuxiemeAnnee", "#troisiemeAnnee", "#quatriemeAnnee", "#cinquiemeAnnee"]

import {
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
    logeTaux,
    nourriBase,
    nourriTaux,
    SSTotTauxFrance,
    SSTotTauxAlsace,
    SSTotBase,
    SSPlafTaux,
    SSPlafBase,
    CRDSTaux,
    CRDSBase,
    CSGDedTaux,
    CSGDedBase,
    CSGNonDedTaux,
    CSGDNonDedBase,
    IRCANTECTauxInf,
    IRCANTECTauxSup,
    IRCANTECBase    
} from "/assets/js/donnees.js";

const content = [
    {key: "title", type: "th", cells: ["Traitement LIBELLE", "NB ou TAUX", "BASE", "TOTAL"]},
    {key: "traitement", type: "td", cells: ["Traitement Base Médical", traitementTaux.toFixed(2), "", ""]},
    {key: "sujetion", type: "td", cells: ["Indémnité Sujétion Internes", sujetionTaux.toFixed(2), "", ""]},
    {key: "responsabilite", type: "td", cells: ["Prime Responsabilité", responsabiliteTaux.toFixed(2), "", ""]},
    {key: "semaine", type: "td", cells: ["Gardes Semaine", "", montantGardeSemaine, ""]},
    {key: "WE", type: "td", cells: ["Gardes WE", "", montantGardeWE, ""]},
    {key: "loge", type: "td", cells : ["Majoration Logement", "", (logeBase/12).toFixed(2), ""]},
    {key: "nourri", type: "td", cells : ["Majoration Nourriture", "", (nourriBase/12).toFixed(2), ""]},
    {key: "brut", type: "th", cells: ["Brut Imposable", "", "", ""]},
    {key: "SSTot", type: "td", cells: ["S.S Totalité", "", "", ""]},
    {key: "SSPlaf", type: "td", cells: ["S.S Plafonnée", (SSPlafTaux*100).toFixed(2) + "%", "", ""]},
    {key: "CRDS", type: "td", cells: ["C.R.D.S", (CRDSTaux*100).toFixed(2) + "%", "", ""]},
    {key: "CSGDed", type: "td", cells: ["C.S.G Déductible", (CSGDedTaux*100).toFixed(2) + "%", "", ""]},
    {key: "CSGNonDed", type: "td", cells: ["C.S.G Non Déductible", (CSGNonDedTaux*100).toFixed(2) + "%", "", ""]},
    {key: "IRCANTECA", type: "td", cells: ["IRCANTEC Tranche A", (IRCANTECTauxInf*100).toFixed(2) + "%", "", ""]},
    {key: "cotisations", type: "th", cells: ["Total cotisations", "", "", ""]},
    {key: "net", type: "th", cells: ["Net à payer avant impôt", "", "", ""]},
    {key: "source", type: "td", cells: ["Prélèvement à la source", "", "", ""]},
    {key: "percu", type: "th", cells: ["Total Net Perçu", "", "", ""]}
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
    if(nbSemaineElement.innerText == 0)
    {
        nbSemaineElement.classList.remove("clicked");
        tab.getLineElement("semaine").style.display = "none";
    }
    tab.refreshGardeSemaine();
});

const plusSemaineElement = document.querySelector("#plusSemaine");
plusSemaineElement.classList.add("unclicked");
plusSemaineElement.addEventListener("click", function (){
    nbSemaineElement.innerText ++;
    if(nbSemaineElement.innerText > 0)
    {
        nbSemaineElement.classList.add("clicked");
        tab.getLineElement("semaine").style.display = "table-row";
    }
    tab.refreshGardeSemaine();
});

nbWEElement.innerText = "0";

const moinsWEElement = document.querySelector("#moinsWE");
moinsWEElement.classList.add("unclicked");
moinsWEElement.addEventListener("click", function (){
    if(nbWEElement.innerText != 0){nbWEElement.innerText --;}
    if(nbWEElement.innerText == 0)
    {
        nbWEElement.classList.remove("clicked");
        tab.getLineElement("WE").style.display = "none";
    }
    tab.refreshGardeWE();
});

const plusWEElement = document.querySelector("#plusWE");
plusWEElement.classList.add("unclicked");
plusWEElement.addEventListener("click", function (){
    nbWEElement.innerText ++;
    if(nbWEElement.innerText > 0)
    {
        nbWEElement.classList.add("clicked");
        tab.getLineElement("WE").style.display = "table-row";
    }
    tab.refreshGardeWE();
});

const ouiLogeElement = document.querySelector("#ouiLoge");
ouiLogeElement.classList.add("clicked");
ouiLogeElement.addEventListener("click", function (){
    if(ouiLogeElement.classList.contains("unclicked"))
    {
        ouiLogeElement.classList.add("clicked");
        ouiLogeElement.classList.remove("unclicked");
        nonLogeElement.classList.add("unclicked");
        nonLogeElement.classList.remove("clicked");
    }
    tab.refreshLoge();
});

const ouiNourriElement = document.querySelector("#ouiNourri");
ouiNourriElement.classList.add("clicked");
ouiNourriElement.addEventListener("click", function (){
    if(ouiNourriElement.classList.contains("unclicked"))
    {
        ouiNourriElement.classList.add("clicked");
        ouiNourriElement.classList.remove("unclicked");
        nonNourriElement.classList.add("unclicked");
        nonNourriElement.classList.remove("clicked");
    }
    tab.refreshNourri();
});

const nonLogeElement = document.querySelector("#nonLoge");
nonLogeElement.classList.add("unclicked");
nonLogeElement.addEventListener("click", function (){
    if(nonLogeElement.classList.contains("unclicked")){
        nonLogeElement.classList.add("clicked");
        nonLogeElement.classList.remove("unclicked");
        ouiLogeElement.classList.add("unclicked");
        ouiLogeElement.classList.remove("clicked");
    }
    tab.refreshLoge();
});

const nonNourriElement = document.querySelector("#nonNourri");
nonNourriElement.classList.add("unclicked");
nonNourriElement.addEventListener("click", function (){
    if(nonNourriElement.classList.contains("unclicked"))
    {
        nonNourriElement.classList.add("clicked");
        nonNourriElement.classList.remove("unclicked");
        ouiNourriElement.classList.add("unclicked");
        ouiNourriElement.classList.remove("clicked");
    }
    tab.refreshNourri();
});

let SSTotTaux = SSTotTauxFrance;
const alsaceElement = document.querySelector("#alsace");
alsaceElement.addEventListener("change", function() {
    SSTotTaux = (this.checked) ? SSTotTauxAlsace : SSTotTauxFrance;
    tab.refreshTaxes();
})

const sourceElement = document.querySelector("#source");
sourceElement.addEventListener("focus", function () {
    
    function waitFocus()
    {
        setTimeout(function (){
            if(document.activeElement == sourceElement)
            {
                tab.refreshSource();
                waitFocus();
            }
        }, 500);
    }

    waitFocus();
})

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
        this.refreshLoge();
        this.refreshNourri();
    }

    refreshTotal(search)
    {
        let cellElements = this.elementsMap.get(search).children;
        let tauxTemp = cellElements[1].innerText;
        if(tauxTemp.slice(-1) == "%"){
            tauxTemp = tauxTemp.slice(0,-1);
            tauxTemp /= -100;
        }
        this.setCellText(search, 3, (tauxTemp * cellElements[2].innerText).toFixed(2));
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
            this.setCellText("responsabilite", 2, (responsabilite4Base/12).toFixed(2));
        }

        else if(boutonsAnnees.indexOf(currentlyClickedBouton) == 5)
        {
            this.showLine("responsabilite");
            this.setCellText("responsabilite", 2, (responsabilite5Base/12).toFixed(2));
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

    refreshLoge()
    {
        this.setCellText("loge", 1, (nonLogeElement.classList.contains("clicked")) ? logeTaux.toFixed(2) : 0);
        this.refreshTotal("loge");
        this.refreshBrut();
        
        if(ouiLogeElement.classList.contains("clicked")){this.getLineElement("loge").style.display = "none";}
        else{this.getLineElement("loge").style.display = "table-row";}
    }

    refreshNourri()
    {
        this.setCellText("nourri", 1, (nonNourriElement.classList.contains("clicked")) ? nourriTaux.toFixed(2) : 0);
        this.refreshTotal("nourri");
        this.refreshBrut();
        
        if(ouiNourriElement.classList.contains("clicked")){this.getLineElement("nourri").style.display = "none";}
        else{this.getLineElement("nourri").style.display = "table-row";}
    }

    refreshBrut()
    {
        let somme = +this.getCellText("traitement", 3) + +this.getCellText("sujetion", 3) + +this.getCellText("responsabilite", 3) + +this.getCellText("semaine", 3) + +this.getCellText("WE", 3) + +this.getCellText("loge", 3) + +this.getCellText("nourri", 3);
        this.setCellText("brut", 3, somme.toFixed(2));

        this.refreshTaxes();
    }

    refreshTaxes()
    {
        const brut = this.getCellText("brut", 3);
        this.setCellText("SSTot", 1, (SSTotTaux*100).toFixed(2) + "%");
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

        this.setCellText("IRCANTECA", 2, (IRCANTECBase*(+this.getCellText("traitement", 3) + +this.getCellText("responsabilite",3))).toFixed(2));
        this.setCellText("IRCANTECA", 3, "-" + (IRCANTECTauxInf*this.getCellText("IRCANTECA",2)).toFixed(2));

        this.setCellText("cotisations", 3, (+this.getCellText("SSTot", 3) + +this.getCellText("SSPlaf", 3) + +this.getCellText("CRDS", 3) + +this.getCellText("CSGDed", 3) + +this.getCellText("CSGNonDed", 3) + +this.getCellText("IRCANTECA", 3)).toFixed(2));

        this.refreshNet();
    }

    refreshNet()
    {
        let somme = this.getCellText("brut", 3);

        for(let key of ["SSTot", "SSPlaf", "CRDS", "CSGDed", "CSGNonDed", "IRCANTECA"])
        {
            somme -= this.getCellText(key, 3).substring(1);
        }

        this.setCellText("net", 3, somme.toFixed(2));
        this.refreshSource();
    }

    refreshSource()
    {

        if(sourceElement.value == "" || (sourceElement.value >= 0 && sourceElement.value <= 100))
        {
            sourceElement.style.color = "black";
            sourceElement.style.backgroundColor = "white";
            document.querySelector(".erreur").style.display = "none";
        }

        else
        {
            sourceElement.style.color = "white";
            sourceElement.style.backgroundColor = "rgb(228, 83, 83)";
            document.querySelector(".erreur").style.display = "inline";
        }

        this.setCellText("source", 1, (sourceElement.value == "") ? "0%" : (sourceElement.value + "%"));
        this.setCellText("source", 2, this.getCellText("net", 3) );
        this.refreshTotal("source");
        this.refreshPercu();

    }

    refreshPercu()
    {
        this.setCellText("percu", 3, (+this.getCellText("net", 3) + +this.getCellText("source", 3)).toFixed(2));
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

for(let th of tab.getLineElement("cotisations").children)
{
    th.style.color = "black";
    th.style.backgroundColor = "rgb(238, 239, 241)";
}
