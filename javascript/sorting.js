// Function to initialize sorting with event listeners
function setupSorting() {
  const tableBody = document .getElementById("invoice-table-body") .closest("table");
  const headers = tableBody.querySelectorAll("thead th");

  // Define data types for each sortable column (null means no sorting)
  const dataTypes = [
    null, "numeric", "alphanumeric", "alphanumeric", "alphanumeric", "numeric", "numeric", null, "numeric", null, "numeric",
  ];

  headers.forEach((header, columnIndex) => {
    if (dataTypes[columnIndex] !== null) {
      // Only add sorting where required
      let isAscending = true;

      header.addEventListener("click", () => {
        // Sort the table based on the current header clicked
        sortTable(columnIndex, dataTypes[columnIndex], isAscending);

        // Toggle the sort icon direction
        toggleSortIcon(header, isAscending);

        // Toggle the sorting direction for the next click
        isAscending = !isAscending;
      });
    }
  });
}

// Function to sort a table by a specific column
function sortTable(columnIndex, dataType, isAscending) {
  const tableBody = document.getElementById("invoice-table-body");
  const rowsArray = Array.from(tableBody.querySelectorAll("tr"));

  // Sort rows based on dataType (text, numeric, etc.)
  rowsArray.sort((rowA, rowB) => {
    let cellA = rowA.cells[columnIndex].innerText.trim();
    let cellB = rowB.cells[columnIndex].innerText.trim();

    // Handle N/A cases: Considering N/A as the smallest value
    if (cellA === "N/A") return isAscending ? -1 : 1;
    if (cellB === "N/A") return isAscending ? 1 : -1;

    // Determine sorting logic based on dataType
    switch (dataType) {
      // Convert valid numeric strings to numbers, defaulting to 0 for non-numeric values
      case "numeric":
        const numA = isNaN(parseFloat(cellA)) ? 0 : parseFloat(cellA);
        const numB = isNaN(parseFloat(cellB)) ? 0 : parseFloat(cellB);
        return isAscending ? numA - numB : numB - numA;
      case "alphanumeric":
        return isAscending
          ? cellA.localeCompare(cellB)
          : cellB.localeCompare(cellA);
      default:
        return 0; // For unrecognised data-type
    }
  });

  // Append sorted rows back into the table body
  rowsArray.forEach((row) => tableBody.appendChild(row));

  updateRowNumbers();
}

// Function to toggle sort icons based on the sorting direction
function toggleSortIcon(clickedHeader, isAscending) {
  const table = document.getElementById("invoice-table-body").closest("table");
  const headers = table.querySelectorAll("thead th");

  headers.forEach((header) => {
    const icon = header.querySelector("i");

    // For all other headers, reset to fa-sort
    if (header !== clickedHeader) {
      // To check if icon is not null, since not all headers are intended to use for sorting
      if (icon) {
        icon.classList.remove("fa-sort-up", "fa-sort-down");
        icon.classList.add("fa-sort");
      }
    }
  });

  // Toggle the icon for the clicked header
  const clickedIcon = clickedHeader.querySelector("i");
  if (clickedIcon) {
    clickedIcon.classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");

    // Set the appropriate class based on sorting order
    if (isAscending) {
      clickedIcon.classList.add("fa-sort-up");
    } else {
      clickedIcon.classList.add("fa-sort-down");
    }
  }
}

setupSorting("invoice-table-body");
