// document.getElementById("form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   let username = document.getElementById("username").value.trim();
//   let email = document.getElementById("email").value.trim();
//   let password = document.getElementById("password").value.trim();

//   // Validation for empty fields
//   if (!username && !email && !password) {
//     Swal.fire({
//       title: "Error!",
//       text: "All Fields Are Required! Please Fill Out All The Fields",
//       icon: "warning",
//     });
//     return;
//   } else if (!username && !email) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please Enter UserName & Email",
//       icon: "warning",
//     });
//     return;
//   } else if (!username && !password) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please Enter UserName & Password",
//       icon: "warning",
//     });
//     return;
//   } else if (!email && !username) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please Enter Email & UserName",
//       icon: "warning",
//     });
//     return;
//   } else if (!email && !password) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please Enter Email & Password",
//       icon: "warning",
//     });
//     return;
//   } else if (!username) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please enter a username!",
//       icon: "warning",
//     });
//     return;
//   } else if (!email) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please enter an email!",
//       icon: "warning",
//     });
//     return;
//   } else if (!password) {
//     Swal.fire({
//       title: "Error!",
//       text: "Please enter a password!",
//       icon: "warning",
//     });
//     return;
//   }

//   // Check if the username or email already exists
//   fetch(`http://localhost:3000/users?email=${email}&username=${username}`)
//     .then((res) => res.json())
//     .then((data) => {
//       // If either email or username exists, show an error
//       if (data.length > 0) {
//         let message = "";
//         if (data.some((user) => user.email === email)) {
//           message += "Email is already taken. ";
//         }
//         if (data.some((user) => user.username === username)) {
//           message += "Username is already taken. ";
//         }
//         Swal.fire({
//           title: "Error!",
//           text: message,
//           icon: "warning",
//         });
//       } else {
//         // Proceed with form submission if no errors
//         let obj = {
//           username,
//           email,
//           password,
//         };

//         fetch(`http://localhost:3000/users`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(obj),
//         })
//           .then((res) => {
//             if (!res.ok) {
//               throw new Error(`Server error: ${res.statusText}`);
//             }
//             console.log("Response received:", res);
//             return res.json();
//           })
//           .then((res) => {
//             console.log("Processed response:", res);
//             // Redirect to login page
//             window.location.href = "login.html";
//           })
//           .catch((err) => {
//             console.error("Error occurred:", err);
//             alert(
//               "Sign up failed. Please check your inputs or try again later."
//             );
//           });
//       }
//     })
//     .catch((err) => {
//       console.error("Error occurred while checking username/email:", err);
//       alert("An error occurred while checking the username/email.");
//     });
// });
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  // Validation for empty fields
  if (!username && !email && !password) {
    Swal.fire({
      title: "Error!",
      text: "All Fields Are Required! Please Fill Out All The Fields",
      icon: "warning",
    });
    return;
  } else if (!username && !email) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter UserName & Email",
      icon: "warning",
    });
    return;
  } else if (!username && !password) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter UserName & Password",
      icon: "warning",
    });
    return;
  } else if (!email && !username) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter Email & UserName",
      icon: "warning",
    });
    return;
  } else if (!email && !password) {
    Swal.fire({
      title: "Error!",
      text: "Please Enter Email & Password",
      icon: "warning",
    });
    return;
  } else if (!username) {
    Swal.fire({
      title: "Error!",
      text: "Please enter a username!",
      icon: "warning",
    });
    return;
  } else if (!email) {
    Swal.fire({
      title: "Error!",
      text: "Please enter an email!",
      icon: "warning",
    });
    return;
  } else if (!password) {
    Swal.fire({
      title: "Error!",
      text: "Please enter a password!",
      icon: "warning",
    });
    return;
  }

  // Password validation (at least 8 characters, one uppercase, one special character)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!passwordRegex.test(password)) {
    Swal.fire({
      title: "Error!",
      text: "Password must be at least 8 characters long and contain at least one uppercase letter and one special character.",
      icon: "warning",
    });
    return;
  }

  // Function to check if the username or email exists
  const checkIfExists = (field, value) => {
    return fetch(`http://localhost:3000/users?${field}=${value}`)
      .then((res) => res.json())
      .then((data) => {
        return data.length > 0; // Returns true if a user is found
      })
      .catch((err) => {
        console.error("Error checking if user exists:", err);
        return false; // Return false if there's an error in the fetch
      });
  };

  // Check if email and username exist
  Promise.all([
    checkIfExists("email", email),
    checkIfExists("username", username),
  ])
    .then(([emailExists, usernameExists]) => {
      let message = ""; // Initialize message string

      if (emailExists) {
        message += "Email is already taken. ";
      }

      if (usernameExists) {
        message += "Username is already taken. ";
      }

      if (message) {
        // If there's a message, show the alert
        Swal.fire({
          title: "Error!",
          text: message,
          icon: "warning",
        });
      } else {
        // Proceed with form submission if both email and username are available
        let obj = {
          username,
          email,
          password,
        };

        fetch(`https://mock-server-app-ezrb.onrender.com/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Server error: ${res.statusText}`);
            }
            console.log("Response received:", res);
            return res.json();
          })
          .then((res) => {
            console.log("Processed response:", res);
            // Redirect to login page
            window.location.href = "login.html";
          })
          .catch((err) => {
            console.error("Error occurred:", err);
            alert(
              "Sign up failed. Please check your inputs or try again later."
            );
          });
      }
    })
    .catch((err) => {
      console.error("Error checking email/username:", err);
      alert("An error occurred while checking the email/username.");
    });
});
