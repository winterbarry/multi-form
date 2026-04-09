export function homePage() {
    const pageContent = document.getElementById("content");

    let header = document.createElement("h3");
    header.textContent = "Craving the Ultimate Burger?";
    pageContent.appendChild(header);

    let paragraph = document.createElement("p");
    paragraph.textContent =
      "Come to John's Burgers, where every bite is packed with flavor! From juicy, handcrafted patties to fresh, locally sourced ingredients, we serve up mouthwatering burgers, crispy fries, and refreshing drinks.";
    pageContent.appendChild(paragraph);

    let location = document.createElement("p");
    location.textContent =
      "Find Us at: 123 Main Street, Downtown Maine City ";
    pageContent.appendChild(location); 
}