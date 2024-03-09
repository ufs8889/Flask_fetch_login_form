# Flask Login, Sign Up, and Forgotten Password Form

Welcome to our Flask application that provides functionality for user login, sign up, and password recovery. This project aims to offer a seamless user authentication experience using Flask.

## Features Implemented

- **User Registration**: Allows new users to sign up for an account.
- **User Login**: Existing users can securely log in to their accounts.
- **Forgotten Password**: Provides a mechanism for users to reset their passwords if forgotten.
- **Session Management**: Handles user sessions securely.
- **Error Handling**: Ensures robust error handling for various scenarios.

## Technologies Used

- **Python**: Backend logic and server-side scripting.
- **Flask**: Microframework for web development.
- **HTML, CSS, Bootstrap**: Frontend design and styling.
- **SQLite3**: Lightweight database for storing user information.
- **JavaScript**: Enhancing interactivity and user experience.

## Installation and Usage

Follow these steps to set up and run the application locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ufs8889/Flask_fetch_login_form.git
   ```

2. Change directory to the repository:

   ```bash
   cd Flask_fetch_login_form
   ```

3. Install all required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask app:

   ```bash
   python fl_fetch_login.py
   ```

5. Open your browser and visit http://127.0.0.1:45289/ to access the application.

## Running Online with Ngrok

You can also run the application online using Ngrok. Follow these steps:

1. Download Ngrok from the official website: [Ngrok](https://ngrok.com/download).

2. Extract the Ngrok executable to a convenient location.

3. Run Ngrok to expose your local server to the internet:

   ```bash
   ./ngrok http 45289
   ```

4. Ngrok will generate a public URL (e.g., https://abc123.ngrok.io). Use this URL to access the application from anywhere.

## Conclusion

Our Flask application provides essential user authentication features with a clean and intuitive interface. Whether you're a new user signing up, an existing user logging in, or someone who needs to reset a forgotten password, our platform has you covered. Join us in embracing secure and hassle-free user authentication with Flask. Happy coding!
