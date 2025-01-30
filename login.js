// Ensure SweetAlert library is loaded by including its CDN in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value.trim();

  // Check if email or password is empty
  if (email === "" && pass === "") {
    Swal.fire({
      title: "Error!",
      text: "Please fill out both email and password fields!",
      icon: "warning",
    });
    return; // Stop further execution
  } else if (email === "") {
    Swal.fire({
      title: "Error!",
      text: "Please enter the email!",
      icon: "warning",
    });
    return;
  } else if (pass === "") {
    Swal.fire({
      title: "Error!",
      text: "Please enter the password!",
      icon: "warning",
    });
    return;
  }

  // Fetch user data from local API
  fetch(`https://mock-server-app-snv6.onrender.com/users?email=${email}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((res) => {
      console.log("API Response:", res);

      if (res.length === 0) {
        Swal.fire({
          title: "Error!",
          text: "Email not found. Please check and try again!",
          icon: "error",
        });
      } else {
        if (res[0].password === pass) {
          Swal.fire({
            title: "Success!",
            text: "Login successful!",
            icon: "success",
          }).then(() => {
            window.location.href = "index.html"; // Redirect on success
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Incorrect password. Please try again!",
            icon: "error",
          });
        }
      }
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while connecting to the server.",
        icon: "error",
      });
    });
});
