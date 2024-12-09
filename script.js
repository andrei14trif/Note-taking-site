// Global const to save data 
const savedData = [];

let isTextBoxActive=false;//Bool value to indicate if a note is already opened;

// Ripple effect function
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();
    const rippleX = event.clientX - rect.left;
    const rippleY = event.clientY - rect.top;

    ripple.style.left = `${rippleX}px`;
    ripple.style.top = `${rippleY}px`;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Event listeners for ripple effect
const Newnote = document.getElementById('btn');
const deleteLastbtn = document.getElementById('DeleteLast');
const DeleteAllbtn = document.getElementById('DeleteAll');

Newnote.addEventListener('click', (event) => addRippleEffect(Newnote, event));
deleteLastbtn.addEventListener('click', (event) => addRippleEffect(deleteLastbtn, event));
DeleteAllbtn.addEventListener('click', (event) => addRippleEffect(DeleteAllbtn, event));

// Function to insert textBox+Save button
function addTextBox() {
    const box = document.getElementById("box");

    if(isTextBoxActive){
        alert("You already have one opened note");
        return;
    }
    isTextBoxActive=true;

    const textBoxContainer = document.createElement("div");
    textBoxContainer.style.display = "flex";
    textBoxContainer.style.alignItems = "center";
    textBoxContainer.style.marginBottom = "100px";

    // Multi-line input and textbox creation
    const textarea = document.createElement("textarea");
    textarea.style.width = "500px";  // Horizontal size
    textarea.style.height = "500px"; // Vertical size
    textarea.style.fontSize = "16px";
    textarea.style.padding = "5px"; // Ensures cursor starts from the top-left
    textarea.style.lineHeight = "1.2"; // Controls line spacing
    textarea.style.textAlign = "left"; // Ensures horizontal alignment
    textarea.style.resize = "none"; // Optional: Disable resizing of the textarea

    //create save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.style.backgroundColor = "darkslateblue";
    saveButton.style.color = "white";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "5px";
    saveButton.style.padding = "5px 10px";
    saveButton.style.cursor = "pointer";

    saveButton.addEventListener("click", function () {
        const value = textarea.value;
        if (value) {
            deleteAll();//deletes the textbox and saves the content in the saved tab
            savedData.push(value);
            alert(`Saved: ${value}`);
            input.disabled = true;
            saveButton.disabled = true;
            isTextBoxActive=false;
        } else {
            alert("Text box is empty!");
        }
    });

    textBoxContainer.appendChild(textarea);
    textBoxContainer.appendChild(saveButton);
    box.appendChild(textBoxContainer);
}

// Delete the last text box
function deleteLast() {
    const box = document.getElementById("box");
    const inputs = box.querySelectorAll("input[type='text']");

    if (inputs.length > 0) {
        box.removeChild(inputs[inputs.length - 1].parentNode);
    }
}

// Delete all text boxes
function deleteAll() {
    const box = document.getElementById("box");
    box.innerHTML = ""; // Clears all child elements
    isTextBoxActive=false;
}

// Show saved notes in a separate tab
function showSavedTab() {
    const savedTab = document.getElementById("savedTab");
    const savedNotes = document.getElementById("savedNotes");

    savedNotes.innerHTML = ""; // Clear previous content

    savedData.forEach((note, index) => {
        // Create a container for each saved note
        const noteContainer = document.createElement("div");
        noteContainer.style.marginBottom = "10px";

        // Create the checkbox for each note saved
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.style.marginRight = "10px"; // Adds space between checkbox and text
        checkbox.setAttribute("data-index",index);

        // Create a div to hold the saved note text
        const noteDiv = document.createElement("div");
        noteDiv.textContent = `${index + 1}: ${note}`;
        noteContainer.appendChild(checkbox);  // Add the checkbox
        noteContainer.appendChild(noteDiv);  // Add the note text

        // Append the note container to savedNotes
        savedNotes.appendChild(noteContainer);
    });

    // Show the saved tab and hide the main box
    savedTab.style.display = "block";
    document.getElementById("box").style.display = "none";
}

function deleteCheckedNotes() {
    const savedNotes = document.getElementById("savedNotes");
    const checkboxes = savedNotes.querySelectorAll("input[type='checkbox']");

    // Loop through all checkboxes and remove checked notes
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Get the index of the note to delete
            const noteIndex = checkbox.getAttribute("data-index");

            // Remove the note from savedData
            savedData.splice(noteIndex, 1);
        }
    });

    // Re-render the saved notes after deletion
    showSavedTab();
}

// Hide saved notes tab and return to the main interface
function hideSavedTab() {
    const savedTab = document.getElementById("savedTab");
    savedTab.style.display = "none";
    document.getElementById("box").style.display = "block";
}
