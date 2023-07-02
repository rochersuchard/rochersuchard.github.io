const pathElement = document.querySelector("#path");

const pathArray = location.pathname.split("/");

if(pathArray[0] == ""){pathArray.shift();}
if(pathArray[pathArray.length-1] == ""){pathArray.pop();}

const accueilElement = document.createElement("a");
accueilElement.innerText = "Accueil";
pathElement.appendChild(accueilElement);
accueilElement.setAttribute("href", "/");

let currentPath = "";

for(let i in pathArray)
{
    const arrowElement = document.createElement("span");
    arrowElement.innerText = " > "
    pathElement.appendChild(arrowElement);
    
    currentPath += "/";
    currentPath += pathArray[i];

    console.log(i + pathArray[i]);

    let linkElement = null;
    if(i < pathArray.length - 1)
    {
        linkElement = document.createElement("a");
        linkElement.setAttribute("href", currentPath);
    }

    else
    {
        linkElement = document.createElement("span");
    }

    let word = pathArray[i][0].toUpperCase() + pathArray[i].substring(1,pathArray[i].length);
    word = word.replace("-", " ");
    linkElement.innerText = word;

    pathElement.appendChild(linkElement);
}