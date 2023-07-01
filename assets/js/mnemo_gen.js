let response = await fetch("assets/js/mnemos.json",{
    headers: {
        Accept: 'application/json'
    }
});
let colleges = await response.json();

let sectionMnemo = document.querySelector("#mnemos");

for(let college of colleges)
{
    let collegeElement = document.createElement("div");
    sectionMnemo.appendChild(collegeElement)

    let titreCollege = document.createElement("h2");
    titreCollege.classList.add("titreCollege");
    titreCollege.setAttribute("id", "mm-" + college.nom.toLowerCase());
    let titre = college.nom;
    titreCollege.innerHTML = titre + "&nbsp&nbsp" + college.emoji;
    collegeElement.appendChild(titreCollege);
    const contenuElement = document.createElement("div");
    collegeElement.appendChild(contenuElement);
    
    for(let item of (college.contenu))
    {
        let itemElement = document.createElement("div");
        contenuElement.appendChild(itemElement);

        itemElement.setAttribute("class", "item-border");
        
        let titreItem = document.createElement("h3");
        titreItem.innerText = item.titre;
        itemElement.appendChild(titreItem);
        
        let pElement = document.createElement("p");
        pElement.innerHTML = " " + item.mnemo;
        itemElement.appendChild(pElement);

        let ULElement = document.createElement("ul");
        pElement.appendChild(ULElement);

        for(let ligne of item.liste)
        {
            let LIElement = document.createElement("li");
            LIElement.innerHTML = ligne;
            ULElement.appendChild(LIElement);
        }
    }

    contenuElement.style.display = "none";

    titreCollege.addEventListener("click", function(){
        if(contenuElement.style.display == "none")
        {
            contenuElement.style.display = "block"
        }

        else
        {
            contenuElement.style.display = "none"
        }
    })
}