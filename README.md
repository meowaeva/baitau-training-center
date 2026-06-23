Baitau Partners Training Center Website

This project is a full-stack web application developed for LLP “Baitau Partners”, a training center that provides professional corporate training and consulting services.

The website is focused on presenting training programs, collecting course requests, managing applications, and displaying active or completed trainings for registered clients.

Project Overview

The main purpose of this project is to create a modern and functional website for a corporate training center. The system allows users to browse available services, submit course requests, register an account, log in, and view their active trainings.
Administrators can access a protected dashboard, view submitted course requests, and update the status of each request.
Main Features
English-language website for LLP “Baitau Partners”
Home page with company and training center information
Services page with training programs
Course request form
User registration and login
JWT-based authentication
Role-based access for admin and clients
Admin dashboard for managing applications
Client dashboard with active and completed courses
MongoDB Atlas database integration
Input validation for forms
REST API testing with Postman
Responsive design for desktop and mobile devices
User Roles
Admin
The administrator can:
Log in to the admin account
View all submitted course requests
Change request status
Mark courses as new, in progress, or completed
Client
A regular user can:
Register and log in
Submit a course request
View active trainings
View completed trainings
The client dashboard displays courses based on the email address used in the submitted request.
Technologies Used
Frontend
React.js
Vite
JavaScript
Bootstrap
CSS
React Router DOM
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JSON Web Token
bcrypt
express-validator
CORS
dotenv
Development and Testing Tools
Visual Studio Code
Postman
Git
GitHub
MongoDB Atlas
Project Structure
baitau-training-center/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   ├── server.js
│   └── package.json
│
├── package.json
├── README.md
└── .gitignore
Database Structure
The project uses MongoDB Atlas as a cloud database.
Main collections:
users — stores registered users, roles, hashed passwords, and active courses
services — stores training services and course information
leads — stores course requests submitted by users
Installation
Clone the repository:
git clone https://github.com/YOUR_USERNAME/baitau-training-center.git
Open the project folder:
cd baitau-training-center
Install root dependencies:
npm install
Install client and server dependencies:
npm run install-all
Environment Variables
Create a .env file inside the server folder based on .env.example.
Example:
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/baitau_training_center_db?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@baitau.kz
ADMIN_PASSWORD=Admin12345
CLIENT_DEMO_EMAIL=client@baitau.kz
CLIENT_DEMO_PASSWORD=Client12345
Important: the real .env file must not be uploaded to GitHub.
Seed the Database
To create demo services, admin account, and demo client account, run:
npm run seed
Demo admin account:
Email: admin@baitau.kz
Password: Admin12345
Demo client account:
Email: client@baitau.kz
Password: Client12345
Run the Project
Start both frontend and backend:
npm run dev
Frontend:
http://localhost:5173
Backend:
http://localhost:5000
API Testing with Postman
The main API requests tested in Postman:
GET /api/services
Returns all training services from the database.
POST /api/auth/register
Registers a new client account.
POST /api/auth/login
Authenticates a user and returns a JWT token.
POST /api/leads
Creates a new course request.
GET /api/leads
Allows admin to view submitted requests.
PATCH /api/leads/:id/status
Allows admin to update the status of a request.
GET /api/auth/me
Returns the currently authenticated user and their active courses.
Input Validation
The project includes input validation for:
Registration form
Login form
Course request form
Email format
Phone number format
Required fields
Password strength
Request status updates
Validation is implemented on both frontend and backend to improve security and data quality.
Project Purpose
This project was developed as part of the industrial practice program. It demonstrates practical skills in full-stack web development, database integration, authentication, API testing, and responsive web design.
Author
Yeva Utemissova
Group: IT-2409
Astana IT University
Practice base: LLP “Baitau Partners”
