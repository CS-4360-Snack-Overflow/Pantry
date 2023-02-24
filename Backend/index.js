<!DOCTYPE html>
<html>
  <head>
    <title>User Form</title>
  </head>
  <body>
    <h1>Create a new user</h1>
    <form action="/users" method="POST">
      <label for="fullName">Full Name:</label>
      <input type="text" id="fullName" name="fullName" required><br>
      <label for="emailAddress">Email Address:</label>
      <input type="email" id="emailAddress" name="emailAddress" required><br>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
      <label for="dateOfBirth">Date of Birth:</label>
      <input type="text" id="dateOfBirth" name="dateOfBirth" required><br>
      <label for="gender">Gender:</label>
      <input type="text" id="gender" name="gender" required><br>
      <label for="countryRegion">Country/Region:</label>
      <input type="text" id="countryRegion" name="countryRegion" required><br>
      <button type="submit">Create User</button>
    </form>

    <h1>All Users</h1>
    <ul id="users-list"></ul>

    <script>
      // Fetch all users from the server and display them in a list
      async function fetchUsers() {
        const response = await fetch('/users');
        const users = await response.json();

        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '';
        for (const user of users) {
          const userItem = document.createElement('li');
          userItem.textContent = `${user.fullName}, ${user.emailAddress}`;
          usersList.appendChild(userItem);
        }
      }

      // Call fetchUsers when the page is loaded
      window.addEventListener('load', fetchUsers);
    </script>
  </body>
</html>

