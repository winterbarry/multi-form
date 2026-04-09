export function contactPage() {
    const pageContent = document.getElementById("content");

    let contact = document.createElement("p")
    contact.textContent = "Contact us at: 555-555-5555"
    pageContent.appendChild(contact);
}