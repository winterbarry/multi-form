export function menuPage() {
    const pageContent = document.getElementById("content");

    let menuBeverages = document.createElement("h3");
    menuBeverages.textContent = "Beverages";
    pageContent.appendChild(menuBeverages);
    let beverageList = document.createElement("ul");
    let beverages = ["Coke", "Pepsi", "Lemonade", "Iced Tea", "Milkshake"];
    beverages.forEach(bev => {
        let item = document.createElement("li");
        item.textContent = bev;
        beverageList.appendChild(item);
    });
    pageContent.appendChild(beverageList);

    let menuAppetizers = document.createElement("h3");
    menuAppetizers.textContent = "Appetizers";
    pageContent.appendChild(menuAppetizers);
    let appetizerList = document.createElement("ul");
    let appetizers = ["French Fries", "Onion Rings", "Mozzarella Sticks", "Chicken Nuggets"];
    appetizers.forEach(app => {
        let item = document.createElement("li");
        item.textContent = app;
        appetizerList.appendChild(item);
    });
    pageContent.appendChild(appetizerList);

    let menuMains = document.createElement("h3");
    menuMains.textContent = "Burgers";
    pageContent.appendChild(menuMains);
    let mainList = document.createElement("ul");
    let mains = ["Classic Cheeseburger", "Bacon Burger", "BBQ Burger", "Mushroom Swiss Burger", "Veggie Burger"];
    mains.forEach(main => {
        let item = document.createElement("li");
        item.textContent = main;
        mainList.appendChild(item);
    });
    pageContent.appendChild(mainList);
}
