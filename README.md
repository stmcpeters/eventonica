# Eventonica

## Overview
Eventonica is an easy-to-use web application allows you to view, add, edit, and delete events for local tech meetups in your area. This project was created for week 9's Techtonica program assignment. The system uses a React frontend and a Node.js backend to create an interactive UI.

## Demo
![Eventonica](link to demo pic)

## Features
- View a list of upcoming tech events
- Add new events
- Edit existing events
- Delete unwanted events
- Responsive design built with React
- Real-time data synchronization between frontend and backend

## Technologies
Frontend
- React: JavaScript library for building responsive user interfaces
- React Bootstrap: Styling and layout of the app
- Fetch API: Makes HTTP requests to the backend
Backend
- Express.js: A Node.js framework for setting up the server and handling HTTP requests
- Node.js: JavaScript environment used to run the Express server
- Cors: Middleware to handle Cross-Origin Resource Sharing
- Dotenv: Hides sensitive environment variables
- PostgreSQL: Database management system

## Installation
### Pre Requisites 
- Node.js (which includes npm): [Download Node.js](https://nodejs.org/en/download/package-manager)
- Git (for cloning the repository): [Download Git](https://git-scm.com/downloads)

1. Clone the repo <br>
`git clone https://github.com/stmcpeters/eventonica.git`<br>
`cd eventonica` 
2. Set up the backend
- Navigate to the `server` folder
- Install backend dependencies: `npm install`
- Create a `.env` file in the server directory and add your environment variables (see `.env-sample` for example)
- Import and configure `dotenv` in your `server.js` file: <br>
`import dotenv from 'dotenv';` <br>
`dotenv.config();` <br>
- Start the server using: `npm start`
3. Set up the frontend:
- Navigate to the `client` folder
- Install dependencies: `npm install`
- Start the React development server using `npm run dev`

## API Endpoints
- GET `/api/events`: Fetches all events
- GET `/api/events/:eventId`: Fetches a specific event by ID
- POST `/api/events`: Creates a new event
- PUT `/api/events/:eventId`: Updates an existing event
- DELETE `/api/events/:eventId`: Deletes an event

## Strech Goals/Help Wanted
- Receives date syntax error when creating a new event
- Search bar/filter events by category, date, etc
- Ability to favorite events

## Contributing
Contributions are welcomed to this project! If you have an idea for a new feature or a bug fix, please open an issue or a pull request.

## License
This project is licensed under the MIT License.