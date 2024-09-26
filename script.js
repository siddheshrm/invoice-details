// Fetch JSON data and populate the table
fetch("invoice_details.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return response.json();
  })
  .then((data) => {
    const tableBody = document.getElementById("invoice-table-body");
    // Clear the table body if needed
    tableBody.innerHTML = "";

    // Iterate the data to create table rows
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${index === 0 ? '<i class="fa-solid fa-check"></i>' : ""}</td>
                <td>${item.id}</td>
                <td>${item.chemical_name || "N/A"}</td>
                <td>${item.vendor || "N/A"}</td>
                <td>${item.density ? parseFloat(item.density).toFixed(2) : "N/A"}</td>
                <td>${item.viscosity ? parseFloat(item.viscosity).toFixed(5) : "N/A"}</td>
                <td>${item.packaging || "N/A"}</td>
                <td>${item.pack_size || "N/A"}</td>
                <td>${item.unit || "N/A"}</td>
                <td>${item.quantity || "N/A"}</td>
            `;

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
          // Clear the icon cell
          r.cells[0].innerHTML = "";
        });

        // Add icon to the clicked row
        row.cells[0].innerHTML = '<i class="fa-solid fa-check"></i>';
      });

      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
