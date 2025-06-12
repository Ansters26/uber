
# Uber  – Fullstack Ride Sharing Application

Welcome to **Uber **, a fullstack ride sharing application designed to provide a smooth, real-time experience for both riders and drivers. This project demonstrates a complete solution including a robust Node.js/Express backend with MongoDB and a modern React (Vite) frontend with Socket.io integration.

## Features

- **User & Captain Authentication**  
  Secure sign up, login, and logout flows for both riders and drivers using JWTs.  
  See [User routes](backend/routes/user.routes.js) and [Captain routes](backend/routes/captain.routes.js).

- **Real-Time Ride Requests**  
  Leverages Socket.io for instant ride notifications between users and captains.  
  Check out [socket.js](backend/socket.js) for details.

- **Ride Management**  
  Book rides, calculate fare based on distance/duration through Google Maps API and confirm rides using OTP verification.  
  Explore [ride.controller.js](backend/controllers/ride.controller.js) and [ride.service.js](backend/services/ride.service.js).

- **Dynamic Frontend Experience**  
  Styled with Tailwind CSS, animated using GSAP and built using React with Vite for lightning fast performance.  
  View pages like [Home.jsx](frontend/src/pages/Home.jsx) and [CaptainHome.jsx](frontend/src/pages/CaptainHome.jsx).

- **Responsive & Modern UI**  
  Clean design with intuitive navigation and instant feedback in ride booking and driver details.

## Project Structure

```
uber/
├── backend/                # API, business logic and real-time services
│   ├── controllers/        # HTTP request handlers
│   ├── models/             # Mongoose models and schema definitions
│   ├── routes/             # Express routes mapping endpoints to controllers
│   ├── services/           # Business logic including ride, captain, and maps services
│   ├── socket.js           # Socket.io initialization and event handling
│   ├── app.js              # Express app setup
│   ├── server.js           # HTTP server creation and Socket.io attachment
│   └── .env                # Environment configuration (ignored by Git)
└── frontend/               # React application for user and driver interactions
    ├── public/
    ├── src/
    │   ├── components/     # Reusable UI components (e.g., VehiclePanel, RidePopUp)
    │   ├── context/        # Global state management with React Context API
    │   ├── pages/          # Route-based pages (e.g., UserLogin, CaptainSignup)
    │   ├── App.jsx         # Main application and routing configuration
    │   └── main.jsx        # Application entry point
    ├── vite.config.js      # Vite configuration
    ├── tailwind.config.js  # Tailwind CSS customizations
    └── .env                # Frontend environment configuration (ignored by Git)
```

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io  
  See [backend/package.json](backend/package.json).

- **Frontend:** React, Vite, Tailwind CSS, GSAP, Axios, React Router  
  See [frontend/package.json](frontend/package.json).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) instance or [Mongo Atlas](https://www.mongodb.com/cloud/atlas)
- npm or yarn package manager

### Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-repo/uber-clone.git
   cd uber-clone
   ```

2. **Configure Environment Variables**

   - In **backend**, create a `.env` file with:
     ```
     PORT=4000
     MongoURL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GOOGLE_MAPS_API=your_google_maps_api_key
     ```
     
   - In **frontend**, create a `.env` file with:
     ```
     VITE_BASE_URL=http://localhost:4000
     ```

3. **Install Dependencies**

   - For the backend:
     ```sh
     cd backend
     npm install
     ```
     
   - For the frontend:
     ```sh
     cd ../frontend
     npm install
     ```

4. **Run the Application**

   - Start the backend server:
     ```sh
     npm run dev
     ```
     
   - Start the frontend development server:
     ```sh
     npm run dev
     ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Please follow the code conventions and write clean, well-documented code.

## License

Distributed under the MIT License. See the LICENSE file for details.

## Contact

For more information or feedback, please contact atharva2004pandey@gmail.com.

---

Enjoy exploring and contributing to the **Uber Clone** project!
