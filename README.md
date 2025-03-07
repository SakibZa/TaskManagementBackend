Task Management Application
Overview
The Task Management Application is a full-stack web application designed to help users manage their tasks efficiently. It includes features like user authentication, task creation, editing, deletion, and status tracking. The application is built using React for the frontend, Node.js with Express for the backend, and PostgreSQL for the database.

Features
User Authentication:

Secure login and registration using JWT (JSON Web Tokens).

Refresh token mechanism for persistent sessions.

Task Management:

Create, Read, Update, and Delete (CRUD) tasks.

Track task status (Pending, In Progress, Completed).

Set due dates for tasks.

Protected Routes: Ensures only authenticated users can access task management features.

Responsive Design: Works seamlessly on both desktop and mobile devices.

Technologies Used
Frontend:

React.js

Tailwind CSS (for styling)

React Router (for routing)

Backend:

Node.js

Express.js

PostgreSQL (database)

JWT (for authentication)

Other Tools:

Axios (for API requests)

Bcrypt (for password hashing)

Dotenv (for environment variables)

Installation
Prerequisites
Node.js and npm installed on your machine.

PostgreSQL database setup.

Steps to Run the Application
Clone the Repository:

bash
Copy
git clone https://github.com/SakibZa/task-management-app.git
cd task-management-app
Install Dependencies:

For the backend:

bash
Copy
cd backend
npm install
For the frontend:

bash
Copy
cd ../frontend
npm install
Set Up the Database:

Create a PostgreSQL database named task_management.

Update the database configuration in the backend .env file:

plaintext
Copy
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=task_management
JWT_SECRET=your_jwt_secret_key
Run Migrations:

Navigate to the backend directory and run the database migrations:

bash
Copy
npm run migrate
Start the Backend Server:

In the backend directory, start the server:

bash
Copy
npm start
Start the Frontend Development Server:

In the frontend directory, start the React app:

bash
Copy
npm start
Access the Application:

Open your browser and navigate to http://localhost:3000.

API Endpoints
Authentication
POST /api/user/register: Register a new user.

POST /api/user/login: Log in an existing user.

POST /api/user/refresh-token: Refresh the access token using a refresh token.

Tasks
GET /api/task/allTasks: Fetch all tasks for the authenticated user.

POST /api/task/create: Create a new task.

GET /api/task/:id: Fetch a specific task by ID.

PUT /api/task/:id: Update an existing task.

DELETE /api/task/:id: Delete a task.

Folder Structure
Copy
task-management-app/
├── backend/
│   ├── controllers/          # Backend controllers
│   ├── db/                   # Database connection and queries
│   ├── middleware/           # Authentication middleware
│   ├── routes/               # API routes
│   ├── schema/               # Database schema definitions
│   ├── .env                  # Environment variables
│   ├── index.js              # Backend entry point
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React context for state management
│   │   ├── pages/            # Application pages
│   │   ├── App.js            # Main application component
│   │   └── index.js          # Frontend entry point
│   └── package.json          # Frontend dependencies
├── README.md                 # Project documentation
└── .gitignore                # Files to ignore in version control
