let currentEditingId = null;

document.querySelector(".fa-arrow-up").addEventListener("click", () => {
  moveRowUp();
});

document.querySelector(".fa-arrow-down").addEventListener("click", () => {
  moveRowDown();
});

document.querySelector(".fa-trash").addEventListener("click", () => {
  deleteData();
});

document.querySelector(".fa-rotate").addEventListener("click", () => {
  refreshTable();
});

document.getElementById("add-entry-icon").addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

document.getElementById("edit-icon").addEventListener("click", () => {
  const selectedRow = document.querySelector(".selected-row");
  // Check if a row is selected
  if (!selectedRow) {
    alert("Please select a row to edit.");
    return;
  }

  // Get the data from the selected row
  const chemical_name = selectedRow.cells[3].innerText;
  const vendor = selectedRow.cells[4].innerText;
  const density = selectedRow.cells[5].innerText;
  const viscosity = selectedRow.cells[6].innerText;
  const packaging = selectedRow.cells[7].innerText;
  const pack_size = selectedRow.cells[8].innerText;
  const unit = selectedRow.cells[9].innerText;
  const quantity = selectedRow.cells[10].innerText;

  // Populate the modal form with the selected row data
  document.getElementById("chemical_name").value = chemical_name;
  document.getElementById("vendor").value = vendor;
  document.getElementById("density").value = density;
  document.getElementById("viscosity").value = viscosity;
  document.getElementById("packaging").value = packaging;
  document.getElementById("pack_size").value = pack_size;
  document.getElementById("unit").value = unit;
  document.getElementById("quantity").value = quantity;

  // Store the order_id if needed
  currentEditingId = selectedRow.cells[2].innerText;

  document.getElementById("modal").style.display = "block";
});

document.querySelector(".fa-xmark").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

document.getElementById("entryForm").addEventListener("submit", (event) => {
  handleFormSubmission(event, currentEditingId);
});

// Close the modal when the user clicks outside the modal
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("invoiceData");

  // If localStorage is empty, fetch data from invoice_details.json
  if (!storedData) {
    fetchAndStoreLocalData();
  } else {
    // If localStorage is not empty, populate the table with stored data
    populateTable(JSON.parse(storedData));
  }
});

// Function to fetch data from JSON and store it in localStorage
function fetchAndStoreLocalData() {
  fetch("invoice_details.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((jsonData) => {
      // Assign unique order_id to each JSON entry if missing
      jsonData.forEach((item) => {
        if (!item.order_id) {
          item.order_id = Date.now() + "-" + Math.floor(Math.random() * 10000); // Unique ID generation
        }
      });

      // Store the JSON data in localStorage
      localStorage.setItem("invoiceData", JSON.stringify(jsonData));

      populateTable(jsonData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Populate table based on localStorage data
function populateTable(data) {
  const tableBody = document.getElementById("invoice-table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  // Iterate the data to create table
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");

    // Create a row with dynamically generated ID based on iteration
    row.innerHTML = `
      <td>${i === 0 ? '<i class="fa-solid fa-check"></i>' : ""}</td>
      <td>${i + 1}</td>
      <td>${data[i].order_id}</td>
      <td>${data[i].chemical_name || "N/A"}</td>
      <td>${data[i].vendor || "N/A"}</td>
      <td>${
        data[i].density ? parseFloat(data[i].density).toFixed(3) : "N/A"
      }</td>
      <td>${
        data[i].viscosity ? parseFloat(data[i].viscosity).toFixed(4) : "N/A"
      }</td>
      <td>${data[i].packaging || "N/A"}</td>
      <td>${data[i].pack_size || "N/A"}</td>
      <td>${data[i].unit || "N/A"}</td>
      <td>${data[i].quantity || "N/A"}</td>
    `;

    // Set the dynamic ID based on iteration
    row.id = `row-${i + 1}`;

    // Apply 'selected-row' class to the first row when the table loads
    if (i === 0) {
      row.classList.add("selected-row");
    }

    // Logging data of the first row for first index
    // if (index === 0) {
    //   console.log("Selected Row Data (Default):", item);
    // }

    // Add click event listener to toggle icon and selection
    row.addEventListener("click", () => {
      // console.log("Selected Row Data:", item);

      // Remove icon from all rows
      const allRows = tableBody.querySelectorAll("tr");
      allRows.forEach((r) => {
        r.classList.remove("selected-row");
        // Clear the icon cell
        r.cells[0].innerHTML = "";
      });

      // Add icon to the clicked row
      row.classList.add("selected-row");
      row.cells[0].innerHTML = '<i class="fa-solid fa-check"></i>';
    });

    tableBody.appendChild(row);
  }
}
