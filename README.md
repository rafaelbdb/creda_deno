# Trello Clone

This is a Trello clone project with a RESTful API and an MVC architecture.

> **Warning**
> IMPORTANT!! => Everithing in this project was created using ChatGPT-3.5. **DO NOT** trust anything here blindly! This project is supposed to be only a generic example of an MVC RESTful API folder structure and files.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/trello-clone.git`
2. Install the dependencies: `npm install`
3. Create a .env file with the necessary environment variables (see `.env.example` for an example)
4. Run the server: `npm start`

## Dependencies

This project uses the following dependencies:

- Express: web framework for Node.js
- Sequelize: ORM for Node.js and SQL databases
- JWT: JSON Web Tokens for authentication
- bcrypt: password hashing library
- Mocha and Chai: testing framework and assertion library

## Project Structure

The project has the following structure:

- `app.js`: main entry point for the application
- `controllers/`: directory for the controllers that handle requests and responses
- `middlewares/`: directory for middleware functions used in the application
- `models/`: directory for the Sequelize models
- `routes/`: directory for the Express routes
- `tests/`: directory for the unit tests
- `views/`: directory for the EJS templates used in the application
- `public/`: directory for static assets (CSS, JS, images)

## API Endpoints

The following endpoints are available in the API:

- `POST /api/auth/signup`: create a new user account
- `POST /api/auth/login`: login with an existing user account
- `GET /api/boards:` get all boards for the current user
- `POST /api/boards:` create a new board
- `GET /api/boards/:id:` get a single board by ID
- `PUT /api/boards/:id:` update a board by ID
- `DELETE /api/boards/:id:` delete a board by ID
- `GET /api/lists:` get all lists for the current user
- `POST /api/lists:` create a new list
- `GET /api/lists/:id:` get a single list by ID
- `PUT /api/lists/:id:` update a list by ID
- `DELETE /api/lists/:id:` delete a list by ID
- `GET /api/tasks:` get all tasks for the current user
- `POST /api/tasks:` create a new task
- `GET /api/tasks/:id:` get a single task by ID
- `PUT /api/tasks/:id:` update a task by ID
- `DELETE /api/tasks/:id:` delete a task by ID
- `GET /api/comments:` get all comments for the current user
- `POST /api/comments:` create a new comment
- `GET /api/comments/:id:` get a single comment by ID
- `PUT /api/comments/:id:` update a comment by ID
- `DELETE /api/comments/:id:` delete a comment by ID

## Testing

To run the tests for the project, use the command `npm test`. This will run the unit tests using Mocha and Chai.

## Contributing

Contributions to the project are welcome! To contribute, fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
