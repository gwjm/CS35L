![Logo](./public/graceIcon.png)

# ![Logo](./public/favicon.ico) Quick Start


To quickly set up and run the application, follow these steps:

1. Run the shell script `sh startWeb.sh` in the root directory. This script will install npm and start both the front-end and back-end.

---

# After Cloning Repo

1. Verify that Node.js is installed by running `node -v` in your terminal.

2. Run `npm install` to install the necessary dependencies.

3. Navigate to the backend folder using `cd backend` and run `npm install` to install the backend dependencies.

4. To start the application, run `nodemon start` while inside the backend folder, and run `npm start` in the root directory.

---

# Start Frontend

To start the front-end, perform the following steps:

1. Run `npm install` to load all the required modules.

2. Execute `npm run` to run the test version of the website.

---

# Start Backend

To start the backend, follow these steps:

1. Navigate to the backend folder using `cd backend` from the project's home directory.

2. Start the server by running `nodemon server`.

Please ensure that both the front-end and back-end are running in order for the backend to communicate with the frontend.

---

# Handling Module Conflicts

If you encounter module conflicts, you can reinstall all the modules by following these steps:

1. Remove the `node_modules` folder.

2. Run `npm install` to reinstall all the required modules.

By following these instructions, you should be able to quickly set up and run the application.