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

// Function to clear localStorage
function refreshTable() {
  // Clear localStorage
  localStorage.removeItem("invoiceData");
  //   console.log("localStorage cleared");

  // Fetch data from JSON and repopulate the table
  fetchDataAndPopulateTable();
}

// Function to update the Sr. No. in the table
function updateRowNumbers() {
  const tableBody = document.getElementById("invoice-table-body");
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    row.cells[1].innerText = index + 1;
  });
}

function updateLocalStorage() {
  const tableBody = document.getElementById("invoice-table-body");
  const rows = tableBody.querySelectorAll("tr");
  const updatedData = Array.from(rows).map((row) => {
    return {
      chemical_name: row.cells[2].innerText,
      vendor: row.cells[3].innerText,
      density: row.cells[4].innerText,
      viscosity: row.cells[5].innerText,
      packaging: row.cells[6].innerText,
      pack_size: row.cells[7].innerText,
      unit: row.cells[8].innerText,
      quantity: row.cells[9].innerText,
    };
  });

  // Save the updated data to local storage
  localStorage.setItem("invoiceData", JSON.stringify(updatedData));
}
