# BANK ACCOUNT BACKEND

The backend is the part of the application that handles the data. It is responsible for storing the data in a database, and for retrieving it.

The bank account application is a CRUD API that allows you to:

- Register user with Personal Information, User for Authentication, and Account Information.
- Transfer money between accounts.
- View the balance of an account.
- View the history of transactions.
- Retrieve the information of an account, user, or transaction.

The concepts of the application are the following:

- Personal information (name, last name, address, phone number).
- User information for authentication (email as username, password).
- Account information (account number, balance, owner, product).
- Transfer information (amount, origin account, destination account).

- The product is the type of account (checking, savings, credit card).
- The transfer is the type of transaction (deposit, withdrawal) between two accounts.
- The operation is the via which the transfer is made (spei, interbank, transfer, other).
- The status is the current status of the transfer (pending, completed, failed).

## CONSTRAINTS

- The money is only integer values.
- The money is always positive.
- An account can get a negative balance.
- The initial balance is zero.
- The User can have multiple accounts.
- The CARGO transfer reduce balance for the origin account and increases the balance of the destination account.
- The ABONO transfer reduce balance for the destination account and increases the balance of the origin account.

## TROUBLESHOOTING

Acctualy, the application is not perfect and has a error with the initial configuration.

- The library `config` is not working as expected. I appreciate if you can put the entire configuration in a `./config/default.ts`. This problem will be solved as soon as possible.

## REQUIREMENTS

- MongoDB URI for the database.

## LIBRARIES

- [**Express**](https://expressjs.com/): The backend server.
- [**MongoDB**](https://www.mongodb.com/): The database.
- [**Mongoose**](https://mongoosejs.com/): The ORM for MongoDB.
- [**TypeScript**](https://www.typescriptlang.org/): The compiler for the backend.
- [**Pino**](https://getpino.io/#/): The logger for the backend.
- [**dotenv**](https://www.npmjs.com/package/dotenv): The environment variables for the backend.
- [**config**](https://www.npmjs.com/package/config): The hierarchical configuration for the backend.
- [**bcryptjs**](https://www.npmjs.com/package/bcryptjs): The password hashing library for the backend.
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken): The JSON Web Token library for the backend.
- [**cors**](https://www.npmjs.com/package/cors): The CORS library for the backend.
- [**express-validator**](https://www.npmjs.com/package/express-validator): The validation library for the backend.
- [**jest**](https://jestjs.io/): The testing framework for the backend.

## AVAIBLE ROUTES

| Route              | Method | Handler                     | Protected |                          Protected                           |
| ------------------ | :----: | --------------------------- | :-------: | :----------------------------------------------------------: |
| /auth/register     |  POST  | `authService.register`      |           | Register a User and create the Person, Account and User data |
| /auth/login        |  POST  | `authService.login`         |           |               Login a User and create the JWT                |
| /auth/me           |  POST  | `authService.me`            |    yes    |                      Get the User data                       |
| /transfer          |  GET   | `transferService.getAll`    |    yes    |                    Get all the transfers                     |
| /transfer/register |  POST  | `transferService.register`  |    yes    |                     Register a transfer                      |
| /user              |  GET   | `userService.get`           |    yes    |                      Get the User data                       |
| /user              | PATCH  | `userService.update`        |    yes    |                     Update the User data                     |
| /user              | DELETE | `userService.logicalDelete` |    yes    |                     Delete the User data                     |
| /ping              |  GET   | `ping`                      |           |        Simple ping to check if the server is running         |

## SCRIPTS

```sh
# Install the backend dependencies
npm install
# Start the backend server
npm run start

# Test the backend
npm run test
```

## DOCKER

Docker is used to run the backend server in a development environment. For more information, see [**Docker**](https://www.docker.com/).

```sh
# Build the backend image using DOCKER_BUILDKIT for linux and mac
npm run docker

# Build the backend image for windows
npm run docker:win

# Run the docker image as normal
npm run docker:run

# Run the docker image and enter the container via bash
npm run docker:run:sh
```

## SWAGGER

A [Swagger](https://swagger.io/) specification is available for the backend. The project has a [swagger.yaml](https://github.com/Razielini/Bank-Account-Backend/blob/main/swagger.yaml) file for documentation.

## POSTMAN

Postman is used to test the backend. For more information, see [**Postman**](https://www.getpostman.com/). In order to test the backend, you need to import the postman collection and postman environment file. The files are located in the `./postman` folder.
