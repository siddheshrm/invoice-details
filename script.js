document.querySelector(".fa-arrow-up").addEventListener("click", () => {
  moveRowUp();
});

document.querySelector(".fa-arrow-down").addEventListener("click", () => {
  moveRowDown();
});

document.querySelector(".fa-rotate").addEventListener("click", () => {
  refreshTable();
});

document.getElementById("add-entry-icon").addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

document.querySelector(".fa-xmark").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

document.getElementById("entryForm").addEventListener("submit", (event) => {
  handleFormSubmission(event);
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
  let localData = storedData ? JSON.parse(storedData) : [];

  // Fetch JSON data and combine it with local storage data
  fetchDataAndPopulateTable(localData);
});

// Function to fetch JSON data and populate the table
function fetchDataAndPopulateTable(localData) {
  fetch("invoice_details.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((jsonData) => {
      // Combine local data and JSON data
      const combinedData = [...localData, ...jsonData];
      populateTable(combinedData); // Call populateTable function with combined data
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
          <td>${item.density ? parseFloat(item.density).toFixed(3) : "N/A"}</td>
          <td>${item.viscosity ? parseFloat(item.viscosity).toFixed(4) : "N/A"}</td>
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
