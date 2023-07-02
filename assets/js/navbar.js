const navbarContent = [
    {title: "Révision", page: "/revisions"},
    {title: "Stage", page: "/stage"},
    {title: "A propos", page: "/a-propos"}
];

const divElement = document.querySelector(".navbar");
const ULElement = document.createElement("ul");
divElement.appendChild(ULElement);

let currentPage = location.pathname;
currentPage = currentPage.substring(currentPage.lastIndexOf("/") + 1, currentPage.length);

for(let content of navbarContent)
{
    const LiElement = document.createElement("li");
    const AElement = document.createElement("a");
    
    ULElement.appendChild(LiElement);
    LiElement.appendChild(AElement);

    AElement.innerText = content.title;
    AElement.setAttribute("href", content.page);

    if(content.page == currentPage)
    {
        AElement.setAttribute("class", "active");
    }

}