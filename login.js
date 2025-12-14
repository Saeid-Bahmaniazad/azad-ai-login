const SHEET_ID = "1R4vLcXshDeMUqDZHO1GUR16AYSSoak1zso0kBdw591w";
const SHEET_NAME = "Clients";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

async function login() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.style.display = "none";

  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();

    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    let foundUser = false;

    rows.forEach(row => {
      const rowEmail = row.c[0]?.v?.toLowerCase() || "";
      const rowPassword = row.c[1]?.v || "";
      const redirectUrl = row.c[2]?.v || "";
      const status = row.c[3]?.v || "";

      if (
        rowEmail === email &&
        rowPassword === password &&
        status === "active"
      ) {
        foundUser = true;
        window.location.href = redirectUrl;
      }
    });

    if (!foundUser) {
      errorMsg.style.display = "block";
    }

  } catch (err) {
    errorMsg.style.display = "block";
  }
}
