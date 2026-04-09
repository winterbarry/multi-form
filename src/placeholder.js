export function placeHolder () {
    const pageContent = document.getElementById("content");

    let header = document.createElement("h3");
    header.textContent = "Welcome to John's Burgers";
    pageContent.appendChild(header);
}