
// Variables representing the form data
// At the beginning, the form is empty and therefore not valid.

// Data to send
var formData = {
    username: "",
    email: "",
    password: "",
    buyer: false,
    seller: false
};

// Data read but not sent as part of the form submission
var formValid = false;
var repPassword = "";
var tosCheckBox = false;


// Function to read the form
function readForm() {
    formData.username = document.getElementById("name").value.trim();
    formData.email = document.getElementById("email").value.trim();
    formData.password = document.getElementById("password").value.trim();
    repPassword = document.getElementById("repPassword").value.trim();

    // Read the buyer and seller checkboxes
    formData.buyer = document.getElementById("buyer").checked;
    formData.seller = document.getElementById("seller").checked;

    tosCheckBox = document.getElementById("tos").checked;
}


// Function to validate the form
function validateForm() {
    formValid = false;

    var errors = [];

    // Email format
    var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Check that required fields are filled in
    if (formData.username === "") {
        errors.push("Please enter your name.");
    }

    if (formData.email === "") {
        errors.push("Please enter your email address.");
    }

    if (formData.password === "") {
        errors.push("Please enter a password.");
    }

    if (repPassword === "") {
        errors.push("Please re-type your password.");
    }

    // Check email format
    if (formData.email !== "" && !formData.email.match(mailformat)) {
        errors.push("Please enter a valid email address.");
    }

    // Check password length
    if (formData.password !== "" && formData.password.length < 8) {
        errors.push("Your password must contain at least 8 characters.");
    }

    // Check that both passwords match
    if (formData.password !== "" && repPassword !== "" &&
        formData.password !== repPassword) {
        errors.push("Your passwords do not match.");
    }

    // Check that at least one account type is selected
    if (!formData.buyer && !formData.seller) {
        errors.push("Please select at least one account type: buyer or seller.");
    }

    // Check that the Terms of Use checkbox is selected
    if (!tosCheckBox) {
        errors.push("Please agree to the Terms of Use and Privacy Policy.");
    }

    // The form is valid only when there are no errors
    formValid = errors.length === 0;

    // Display errors if the form is invalid
    if (!formValid) {
        alert(errors.join("\n"));
    }

    return formValid;
}


// Function to write the registration success message on the page
function createNewParagraph(content) {
    var text = document.createTextNode(content);
    var paragraph = document.createElement("p");

    paragraph.appendChild(text);
    paragraph.style = "white-space: pre;";
    paragraph.id = "hiddenParagraph";

    var element = document.getElementById("hiddenSection");
    var existingParagraph = document.getElementById("hiddenParagraph");

    element.replaceChild(paragraph, existingParagraph);
}


// Function to submit the form
// This is called when the Register button is clicked
function submitForm() {
    readForm();

    // Call the validation function
    if (validateForm()) {
        var formText = formData.username + " registered as:\n";

        formText += formData.buyer ? "buyer\n" : "";
        formText += formData.seller ? "seller" : "";

        console.log(formText);
        createNewParagraph(formText);
    }
}
