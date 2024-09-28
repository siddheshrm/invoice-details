// Function to move the selected row up
function moveRowUp() {
  const selectedRow = document.querySelector(".selected-row");
  if (!selectedRow) return;

  const previousRow = selectedRow.previousElementSibling;
  // Exit if already at the top
  if (!previousRow) return;

  // Swap rows in the DOM
  const tableBody = document.getElementById("invoice-table-body");
  tableBody.insertBefore(selectedRow, previousRow);

  // Update row numbers
  updateRowNumbers();

  // Update local storage with new order
  updateLocalStorage();
}

// Function to move the selected row down
function moveRowDown() {
  const selectedRow = document.querySelector(".selected-row");
  if (!selectedRow) return;

  const nextRow = selectedRow.nextElementSibling;
  // Exit if already at the bottom
  if (!nextRow) return;

  // Swap rows in the DOM
  const tableBody = document.getElementById("invoice-table-body");
  tableBody.insertBefore(nextRow, selectedRow);

  // Update row numbers
  updateRowNumbers();

  // Update local storage with new order
  updateLocalStorage();
}

// Function to handle form submission and store data in localStorage
function handleFormSubmission(event) {
  // Get existing data from localStorage
  const storedData = localStorage.getItem("invoiceData");
  let data = storedData ? JSON.parse(storedData) : [];

  event.preventDefault();

  const order_id = Date.now() + "-" + Math.floor(Math.random() * 10000);
  const chemical_name = document.getElementById("chemical_name").value.trim();
  const vendor = document.getElementById("vendor").value.trim();
  const density = document.getElementById("density").value;
  const viscosity = document.getElementById("viscosity").value;
  const packaging = document.getElementById("packaging").value.trim();
  const pack_size = document.getElementById("pack_size").value.trim();
  const unit = document.getElementById("unit").value.trim();
  const quantity = document.getElementById("quantity").value;

  // Create a new entry object from the form data
  const newEntry = {
    order_id: order_id,
    chemical_name: chemical_name,
    vendor: vendor,
    density: parseFloat(density).toFixed(3),
    viscosity: parseFloat(viscosity).toFixed(4),
    packaging: packaging,
    pack_size: pack_size,
    unit: unit,
    quantity: quantity,
  };

  // Add the new entry to the data array
  data.push(newEntry);
  console.log("after push: ", data);

  // Store the updated data back in localStorage
  localStorage.setItem("invoiceData", JSON.stringify(data));

  // Refresh the table with updated data
  populateTable(data);

  // Hide the modal
  document.getElementById("modal").style.display = "none";

  location.reload();

  // Reset the form
  event.target.reset();
}

// Function to clear localStorage
function refreshTable() {
  // Clear localStorage
  localStorage.removeItem("invoiceData");
  //   console.log("localStorage cleared");

  // Fetch data from JSON and repopulate the table
  fetchAndStoreLocalData();

  location.reload();
}

// Function to update the Sr. No. in the table
function updateRowNumbers() {
  const tableBody = document.getElementById("invoice-table-body");
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, i) => {
    row.cells[1].innerText = i + 1;
  });
}

function updateLocalStorage() {
  const tableBody = document.getElementById("invoice-table-body");
  const rows = tableBody.querySelectorAll("tr");
  const updatedData = Array.from(rows).map((row) => {
    return {
      order_id: row.cells[2].innerText,
      chemical_name: row.cells[3].innerText,
      vendor: row.cells[4].innerText,
      density: row.cells[5].innerText,
      viscosity: row.cells[6].innerText,
      packaging: row.cells[7].innerText,
      pack_size: row.cells[8].innerText,
      unit: row.cells[9].innerText,
      quantity: row.cells[10].innerText,
    };
  });

  // Save the updated data to local storage
  localStorage.setItem("invoiceData", JSON.stringify(updatedData));
}
