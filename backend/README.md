# Uber Backend

This backend project powers the server-side API for the Uber clone. It is built using Node.js, Express, and MongoDB, and uses Socket.io for real-time communications.

## Table of Contents

- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation & Running](#installation--running)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)
  - [Ride Endpoints](#ride-endpoints)
  - [Maps Endpoints](#maps-endpoints)
- [Socket.io](#socketio)
- [Additional Services](#additional-services)

## Project Structure

```
backend/
├── controllers/
│   ├── captain.controller.js
│   ├── map.controller.js
│   ├── ride.controller.js
│   └── user.controller.js
├── db/
│   └── db.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── blacklistToken.model.js
│   ├── captain.model.js
│   ├── ride.model.js
│   └── user.model.js
├── routes/
│   ├── captain.routes.js
│   ├── maps.routes.js
│   ├── ride.routes.js
│   └── user.routes.js
├── services/
│   ├── captain.service.js
│   ├── maps.service.js
│   ├── ride.service.js
│   └── user.services.js
├── socket.js
├── server.js
└── app.js
```

- **controllers/**: Contains the logic for handling HTTP requests.
- **models/**: Mongoose models for User, Captain, Ride, and Blacklisted Tokens.
- **routes/**: Express routes that map endpoints to controller methods.
- **services/**: Business logic and external integrations like maps API.
- **middlewares/**: Authentication middleware for users and captains.
- **socket.js**: Initializes Socket.io for real-time communications.
- **app.js**: Express application setup.
- **server.js**: Creates the HTTP server and attaches Socket.io.

## Environment Setup

Create a `.env` file in the backend folder with the following variables (adjust values as needed):

```
PORT=3000
MongoURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API=your_google_maps_api_key
```

This file is ignored by Git.

## Installation & Running

1. Install the dependencies:

   ```sh
   npm install
   ```

2. To run the server in development mode (with nodemon):

   ```sh
   npm run dev
   ```

3. To run in production mode:

   ```sh
   npm start
   ```

The server will start on the port defined in `.env` (default 3000).

## API Endpoints

All endpoints assume that the server is accessible at `http://localhost:3000`.

### User Endpoints

- **POST /users/register**  
  Register a new user.  
  **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
  **Response:** Returns the created user and authentication token.  
  _See_ user.routes.js and user.controller.js.

- **POST /users/login**  
  Authenticate a user.  
  **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
  **Response:** Returns user details and token.
  _See_ user.routes.js.

- **GET /users/profile**  
  Fetch the user's profile. Requires valid token (sent as cookie or Authorization header).  
  **Response:** Returns the authenticated user.  
  _See_ user.controller.js.

- **GET /users/logout**  
  Logs the user out by blacklisting the token and clearing the cookie.

### Captain Endpoints

- **POST /captains/register**  
  Register a new captain along with vehicle details.  
  **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com",
    "password": "captainpassword",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
  **Response:** Returns the new captain and a token.  
  _See_ captain.routes.js and captain.controller.js.

- **POST /captains/login**  
  Authenticate a captain.  
  **Request Body:**
  ```json
  {
    "email": "alice@example.com",
    "password": "captainpassword"
  }
  ```
  **Response:** Returns captain details and token.

- **GET /captains/profile**  
  Fetch the captain's profile. Requires valid token.  
  **Response:** Captain data.

- **GET /captains/logout**  
  Logs out the captain by blacklisting the token and clearing the cookie.

### Ride Endpoints

- **POST /rides/create**  
  Create a new ride request.  
  **Request Body:**
  ```json
  {
    "pickup": "123 Main St",
    "destination": "456 Park Ave",
    "vehicleType": "car"
  }
  ```
  **Response:** Returns the created ride with fare computed. After creation the service notifies nearby captains via socket.
  _See_ ride.routes.js and ride.controller.js.

- **GET /rides/get-fare**  
  Calculate fare based on pickup and destination addresses.
  **Query Parameters:**
  - `pickup`: "123 Main St"
  - `destination`: "456 Park Ave"
  
  **Response:** Returns an object with fares mapped to vehicle types.
  _See_ ride.controller.js.

- **POST /rides/confirm**  
  Confirm a ride by a captain.
  **Request Body:**
  ```json
  {
    "rideId": "ride_object_id"
  }
  ```
  This sets the ride status to accepted.  
  _See_ ride.routes.js.

- **GET /rides/start-ride**  
  Start a ride using OTP verification.  
  **Query Parameters:**
  - `rideId`: "ride_object_id"
  - `otp`: "123456"
  
  **Response:** Returns ride details after setting status to `ongoing`.

- **POST /rides/end-ride**  
  Marks the ride as completed.  
  **Request Body:**
  ```json
  {
    "rideId": "ride_object_id"
  }
  ```
  **Response:** Updated ride data.

### Maps Endpoints

- **GET /maps/get-coordinates**  
  Convert an address to geographic coordinates.
  **Query Parameters:**
  - `address`: e.g., "123 Main St"
  
  **Response:** Returns an object with `ltd` and `lng`.  
  _See_ maps.routes.js and map.controller.js.

- **GET /maps/get-distance-time**  
  Get the travel distance and duration between two addresses.
  **Query Parameters:**
  - `origin`: e.g., "123 Main St"
  - `destination`: e.g., "456 Park Ave"
  
  **Response:** Returns distance and duration data.

- **GET /maps/get-suggestions**  
  Fetch address suggestions using Google Maps Autocomplete API.
  **Query Parameters:**
  - `input`: e.g., "Centr"
  
  **Response:** An array of address strings.

## Socket.io

Socket connections are initialized in socket.js. Some points:

- When a user or captain connects the server saves the socket ID in the database.
- The backend uses Socket.io to emit events like `new-ride`, `ride-confirmed`, `ride-started`, and `ride-ended` to keep the frontend updated in real time.
- Clients join using the `"join"` event with a payload such as `{ userId, userType }`.

## Additional Services

- **Maps Service:** Located in services/maps.service.js, this service integrates with the Google Maps API to provide geocoding, distance, duration, and autocomplete suggestions.
- **User & Captain Services:** Business logic for creating new users/captains are in services/user.services.js and services/captain.service.js.
- **Ride Service:** Located in services/ride.service.js, it calculates fares, manages ride creation, confirmation, starting (with OTP), and ending.

## License

Distributed under the MIT License. See `LICENSE` for more information.
```
