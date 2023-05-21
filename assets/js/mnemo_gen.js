let response = await fetch("assets/js/mnemos.json",{
    headers: {
        Accept: 'application/json'
    }
});
let colleges = await response.json();
let sectionSommaire = document.querySelector("#sommaire");
let sectionMnemo = document.querySelector("#mnemos");

let ULElement = document.createElement("ul");
sectionSommaire.appendChild(ULElement);

for(let college of colleges)
{

    let LIElement = document.createElement("li");
    ULElement.appendChild(LIElement);
    let AElement = document.createElement("a");
    LIElement.appendChild(AElement);
    AElement.innerText = college.nom;
    AElement.setAttribute("href", "#mm-" + college.nom.toLowerCase());

}

for(let college of colleges)
{
    let titreCollege = document.createElement("h2");
    titreCollege.classList.add("titreCollege");
    titreCollege.setAttribute("id", "mm-" + college.nom.toLowerCase());
    let titre = college.nom;
    titreCollege.innerHTML = titre + "&nbsp&nbsp" + college.emoji;
    sectionMnemo.appendChild(titreCollege);

    for(let item of (college.contenu))
    {
        let titreItem = document.createElement("h3");
        titreItem.innerText = item.titre;
        sectionMnemo.appendChild(titreItem);
        
        let pElement = document.createElement("p");
        pElement.innerHTML = " " + item.mnemo;
        sectionMnemo.appendChild(pElement);

        let ULElement = document.createElement("ul");
        pElement.appendChild(ULElement);

        for(let ligne of item.liste)
        {
            let LIElement = document.createElement("li");
            LIElement.innerHTML = ligne;
            ULElement.appendChild(LIElement);
        }
    }
}