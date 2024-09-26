document.querySelector(".fa-arrow-up").addEventListener("click", () => {
  moveRowUp();
});

document.querySelector(".fa-arrow-down").addEventListener("click", () => {
  moveRowDown();
});

document.querySelector(".fa-rotate").addEventListener("click", () => {
  refreshTable();
});

document.addEventListener("DOMContentLoaded", () => {
  const storedData = localStorage.getItem("invoiceData");
  if (storedData) {
    const data = JSON.parse(storedData);
    populateTable(data); // Populate the table with locally stored data
  } else {
    fetchDataAndPopulateTable(); // Function to fetch data from the JSON file
  }
});

// Function to fetch JSON data and populate the table
function fetchDataAndPopulateTable() {
  fetch("invoice_details.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      populateTable(data); // Call populateTable function
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function populateTable(data) {
  const tableBody = document.getElementById("invoice-table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  // Iterate the data to create table
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index === 0 ? '<i class="fa-solid fa-check"></i>' : ""}</td>
          <td>${index + 1}</td>
          <td>${item.chemical_name || "N/A"}</td>
          <td>${item.vendor || "N/A"}</td>
          <td>${item.density ? parseFloat(item.density).toFixed(2) : "N/A"}</td>
          <td>${item.viscosity ? parseFloat(item.viscosity).toFixed(5) : "N/A"}</td>
          <td>${item.packaging || "N/A"}</td>
          <td>${item.pack_size || "N/A"}</td>
          <td>${item.unit || "N/A"}</td>
          <td>${item.quantity || "N/A"}</td>
      `;

    // Apply 'selected-row' class to the first row when the table loads
    if (index === 0) {
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
  });
}
