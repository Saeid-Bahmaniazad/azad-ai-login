async function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  if (!user || !pass) {
    error.innerText = "Please enter username and password";
    return;
  }

  // THIS WILL BE YOUR n8n OR GOOGLE SCRIPT ENDPOINT
  const endpoint = "https://YOUR-N8N-WEBHOOK-URL";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = data.redirect;
  } else {
    error.innerText = "Invalid login details";
  }
}
