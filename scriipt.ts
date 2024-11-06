import html2pdf from 'html2pdf.js';

function printpdf(): void {
    const element = document.getElementById("print");

    if (element) {
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Hide buttons and checkboxes before printing
        document.querySelectorAll("#print button, .input-checkbox").forEach(el => el.classList.add("none"));

        // Generate and download PDF
        html2pdf().from(element).set(opt).save().then(() => {
            console.log("PDF saved successfully.");
            
            // Restore buttons and checkboxes after download
            document.querySelectorAll("#print button, .input-checkbox").forEach(el => el.classList.remove("none"));
        }).catch((error: unknown) => {
            console.error("Error generating PDF: ", error);
        });
    } else {
        console.error("No element found with ID 'print'.");
    }
}

// Function to save resume content in a hidden textarea for download
function saveresume(): void {
    const sec = document.getElementById("print");
    const info = document.getElementById("custinfo") as HTMLTextAreaElement;

    if (sec && info) {
        info.value = sec.innerHTML; // Set hidden textarea's value to the resume content
    }
}

// Generic add function to dynamically add sections
function addElement(parentId: string, templateHtml: string): void {
    const head = document.createElement('div');
    const parentElement = document.getElementById(parentId);

    if (parentElement) {
        parentElement.appendChild(head);
        head.innerHTML = templateHtml;
        saveresume(); // Update resume content
    }
}

// Generic remove function to handle checkbox-based deletions
function removeElement(event: Event, alertMsg: string): void {
    const target = event.target as HTMLInputElement;
    const allInputCheckboxes = target.closest('.parent-class')?.getElementsByClassName("input-checkbox");

    if (allInputCheckboxes) {
        const array = Array.from(allInputCheckboxes);
        let itemRemoved = false;

        if (array.length === 0) {
            alert(alertMsg);
        } else {
            array.forEach(element => {
                if ((element as HTMLInputElement).checked) {
                    element.parentElement?.parentElement?.remove();
                    itemRemoved = true;
                }
            });

            if (!itemRemoved) alert("Please select the checkboxes to delete the required field!");
        }
    }
    saveresume(); // Update resume content
}

// Specific functions to add and remove sections like Education, Skills, etc.
function addedu(): void {
    addElement("education", '<div class="edublock"><span><input type="checkbox" class="input-checkbox"></span><span class="education-head" contenteditable="true">YOUR DEGREE</span><div><span contenteditable="true">Institute name</span> - <span contenteditable="true">Passing Year</span></div></div>');
}

function remedu(event: Event): void {
    removeElement(event, "No fields are present to be deleted!");
}

function addskill(): void {
    addElement("skills", '<div class="skill"><span><input type="checkbox" class="input-checkbox"></span><span><i class="fas fa-chevron-circle-right"></i></span><span contenteditable="true">write your skill here</span></div>');
}

function remskill(event: Event): void {
    removeElement(event, "No skills to delete!");
}

function addLang(): void {
    addElement("languages", '<div class="language"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">LANGNAME</span> - <span contenteditable="true">level u know</span></div>');
}

function remLang(event: Event): void {
    removeElement(event, "No languages to delete!");
}

function addAch(): void {
    addElement("achievement", '<div class="achieve"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write your achievement</span></div>');
}

function remAch(event: Event): void {
    removeElement(event, "No achievements to delete!");
}

function addInt(): void {
    addElement("interest", '<div class="achieve"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write interest</span></div>');
}

function remInt(event: Event): void {
    removeElement(event, "No interests to delete!");
}

let maxNewSection = 1;

function addsec(): void {
    if (maxNewSection < 2) {
        addElement("newsec", '<div><br><br><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters.</div></div>');
        maxNewSection++;
    } else {
        alert("At most 2 NEW SECTION can be added!");
    }
}

function remsec(event: Event): void {
    removeElement(event, "No new sections to delete!");
    maxNewSection--;
}
