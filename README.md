# S.T.A.R.S

This project is a client-server application that allows users to register, login, and access a home page. The server is built with Node.js and Express, while the client is built with React. The server provides RESTful APIs for user registration, login, user retrieval, and user deletion. The client consumes these APIs to provide a user interface for user authentication and interaction.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Client](#client)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Tokens (JWT)

## Prerequisites

- Node.js installed
- MongoDB instance running
- Environment variables set up (`.env` file) with the following variables:
  - `PORT` - Port number for the server (default: 3001)
  - `DB_URL` - MongoDB connection URL
  - `JWT_SECRET` - Secret key for JWT

## Getting Started

To get started with the project, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/Phillipml/s.t.a.r.s.git
```

### Install dependencies:

```bash
cd s.t.a.r.s
npm install
```

### Set up the environment variables:

Create a .env file in the root directory of the project and provide the required variables:

```bash
PORT=3001
DB_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
```

Start the server:

```bash
npm start
```

### API Endpoints

The server provides the following API endpoints:

POST /api/register - Register a new user
POST /api/login - Login and get an access token
GET /api/user - Get the current user
GET /api/users - Get all users from the database
DELETE /api/user/:username - Delete a user by username
Client
The client is built with React and provides a user interface for user authentication and interaction. It includes login and registration forms, a home page, and basic navigation.

### Technologies Used

React
React Router
Prerequisites
Node.js installed
Getting Started
To start the client, follow the steps below:

### Install dependencies:

```bash
cd client
npm install
```

Start the client:

```bash
npm start
```

### Pages

Login: Allows users to log in and obtain an access token.
Register: Allows new users to create an account.
Home: Displays a welcome message and a logout button for authenticated users.

### Usage

Access the client application by visiting http://localhost:3000 in your web browser.
Register a new user by filling out the registration form.
Log in using the registered credentials.
Upon successful login, you will be redirected to the home page, where you can see a welcome message with your username.
To log out, click the "Logout" button.

## License

This project is licensed under the MIT License.

### Acknowledgements

Node.js
Express
MongoDB
Mongoose
Bcrypt
JSON Web Tokens (JWT)
React
React Router
