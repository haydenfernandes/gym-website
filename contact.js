const form = document.getElementById("contactForm");
const messagesDiv = document.getElementById("messages");

function displayMessages() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    messagesDiv.innerHTML = "";

    if (contacts.length === 0) {
        messagesDiv.innerHTML = "<p>No messages submitted yet.</p>";
        return;
    }

    contacts.forEach(function(contact, index) {
        messagesDiv.innerHTML += `
            <div class="list-card">
                <h3>${contact.name}</h3>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Subject:</strong> ${contact.subject}</p>
                <p><strong>Message:</strong> ${contact.message}</p>
                <p><strong>Date:</strong> ${contact.date}</p>
                <button class="btn" onclick="deleteMessage(${index})">Delete</button>
            </div>
        `;
    });
}

function validateForm(name, email, subject, message) {

    const namePattern = /^[A-Za-z ]{2,30}$/;

    if (!namePattern.test(name)) {
        alert("Name must be 2-30 letters long and contain only letters and spaces.");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (subject.length < 3) {
        alert("Subject must be at least 3 characters long.");
        return false;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters long.");
        return false;
    }

    return true;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!validateForm(name, email, subject, message)) {
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let contact = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
    };

    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    alert("Message submitted successfully!");
    form.reset();
    displayMessages();
});

function deleteMessage(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayMessages();
}

displayMessages();