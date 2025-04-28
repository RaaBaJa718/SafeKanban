# SafeKanban 🚀
A Collaborative Kanban Board for Teams!

Welcome to **SafeKanban**, the ultimate workflow management platform built for team collaboration. With intuitive task organization, real-time updates, and secure authentication, SafeKanban helps teams stay productive and in sync.

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

# Description
Streamline your task management with **SafeKanban**! Create Kanban boards, assign tasks, and monitor progress seamlessly. SafeKanban offers JWT-secured authentication, flexible task management, and modern UI features that enhance team productivity.

# Table of Contents

1. Description
2. Features
3. Technologies Used
4. Installation
5. Usage
6. Screenshots
7. API Endpoints
8. Contributing
9. License

# Features

* **User Roles**: User authentication with separate roles for administrators and collaborators.
* **Kanban Boards**: Organize tasks with lanes for `To Do`, `In Progress`, and `Completed`.
* **Real-Time Updates**: Instant synchronization between team members.
* **Responsive Design**: Optimized for desktop and mobile devices.
* **Database Integration**: Stores data securely in PostgreSQL.

# Technologies Used

**Backend**:
* **Node.js** with **Express.js**: For RESTful API development.
* **PostgreSQL**: Reliable database for data storage.
* **JWT**: Secure user authentication.
* **TypeScript**: Improved code quality and type safety.

**Frontend**:
* **React**: Dynamic and interactive user interface.
* **Vite**: Fast bundling and development server.
* **CSS/SCSS**: Polished and responsive styling.

# Deployment
* **Render**: Hosting backend and database.
* **Netlify** (or equivalent): Hosting frontend.

# Installation

**Prerequisites**:
* Node.js and npm
* PostgreSQL installed locally
* A `.env` file with the following keys:

    - PORT=3001
    - JWT_SECRET_KEY=your-secret-key
    - DB_NAME=kanban_db
    - DB_USER=postgres
    - DB_PASSWORD=your-password

# Steps:

1. Clone the repo:
    ```bash
    git clone https://github.com/your-username/SafeKanban.git
    cd SafeKanban
    ```

2. Navigate to the `server` folder and install backend dependencies:
    ```bash
    cd server
    npm install
    ```

3. Set up the PostgreSQL database:
    ```bash
    npx sequelize-cli db:migrate
    ```

4. Navigate to the `client` folder and install frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

5. Run the development servers:
    - **Start the backend**:
      ```bash
      npm run dev
      ```
    - **Start the frontend**:
      ```bash
      npm start
      ```

# Usage

1. Sign up as a team member.
2. Create Kanban boards with tasks and lanes.
3. Collaborate on tasks with real-time updates.
4. Track task progress and completion.

# Screenshots

Coming soon!

# API Endpoints

**Authentication**:
* **POST** `/api/auth/register`: Register a new user.
* **POST** `/api/auth/login`: Log in with credentials.

**Tasks**:
* **GET** `/api/tasks`: Fetch all tasks.
* **POST** `/api/tasks`: Add a new task.

**Boards**:
* **GET** `/api/boards`: Fetch all boards.
* **POST** `/api/boards`: Create a new board.

# Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request. Please follow the project’s code style and include relevant tests.

# License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
