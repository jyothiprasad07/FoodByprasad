const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3035;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Database');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for serving intro.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/opening.html');
});


// Route for signup-login.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Route for signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send('This email id already exists. Please log in.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // Save the new user's data to the database
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  // Send confirmation email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bollauday123@gmail.com', // Replace with your email
      pass: 'plaf clvw inoq zwik' // Replace with your password
    },
    debug: true
  });

  const mailOptions = {
    from: 'bollauday123@gmail.com', // Replace with your email
    to: email,
    subject: 'Welcome to ProfCheck!!!Confirm your registration',
    text: 'Click the link to confirm your registration: http://localhost:3035/confirm'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('Confirmation email sent. Please check your inbox.');
});

// Route for confirming registration
app.get('/confirm', (req, res) => {
  // Logic to handle confirmation
  const confirmationMessage = 'Registration confirmed. You can now log in.';
  const redirectToLoginButton = '<button class="login-button" onclick="redirectToLogin()">Go to Login</button>';

  // Sending HTML response with confirmation message and button
  const htmlResponse = `
    <html>
      <head>
        <title>Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            animation: gradientBackground 10s ease infinite alternate;
          }

          @keyframes gradientBackground {
            0% {
              background-color: rgba(8, 61, 119, 1);
            }
            100% {
              background-color: rgba(9, 41, 88, 1);
            }
          }

          .confirmation-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          h2 {
            color: #fff;
            font-size: 24px;
            margin-bottom: 20px;
          }

          .login-button {
            background-color: #0056b3;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .login-button:hover {
            background-color: #004080;
          }
        </style>
      </head>
      <body>
        <div class="confirmation-container">
          <h2>${confirmationMessage}</h2>
          ${redirectToLoginButton}
        </div>
      </body>
      <script>
        function redirectToLogin() {
          window.location.href = '/signup-login.html';
        }
      </script>
    </html>
  `;

  res.send(htmlResponse);
});


// Route for login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.send('Email not found. Please sign up.');
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return res.send('Incorrect password.');
  }

  // Password is correct, redirect to intro.html
  res.redirect('/allitems.html');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  