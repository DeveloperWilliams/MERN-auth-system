# <span style="color:blue">Login System</span>

This is a simple login system implemented using Express.js and MongoDB, with password hashing for security.

## <span style="color:blue">Features</span>

- **Signup:** Allows users to create new accounts by providing their name, email, and password.
- **Login:** Enables registered users to log in using their email and password.
- **Password Hashing:** Securely hashes passwords using bcrypt before storing them in the database.
- **Validation:** Validates user input for signup and login forms.
- **Error Handling:** Provides error messages for incorrect login attempts and internal server errors.

## <span style="color:blue">Technologies Used</span>

- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database used for storing user data.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **bcrypt:** Library for hashing passwords.
- **express-validator:** Middleware for input validation in Express.js.

## <span style="color:blue">Setup</span>

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/login-system.git
   ```

2. **Install Dependencies:**
   ```bash
   cd login-system
   npm install
   ```

3. **Configure MongoDB:**
   - Make sure MongoDB is installed and running on your system.
   - Update the connection string in `app.js` to point to your MongoDB instance.

4. **Run the Application:**
   ```bash
   npm start
   ```
   The application should now be running on `http://localhost:8080`.

## <span style="color:blue">Usage</span>

- **Signup:**
  - Navigate to `http://localhost:8080/signup`.
  - Fill in the signup form with your name, email, and password.
  - Click the "Register" button to create your account.

- **Login:**
  - Navigate to `http://localhost:8080/login`.
  - Enter your email and password in the login form.
  - Click the "Login" button to log in.

## <span style="color:blue">Contributing</span>

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvements.

## <span style="color:blue">License</span>

This project is licensed under the [MIT License](LICENSE).
