# Frontend for Uber Clone

This project is a React application bootstrapped with Vite. It serves as the user and captain client for the Uber clone backend API. The app is styled with Tailwind CSS and uses GSAP for animations. It also integrates with Socket.io for real-time updates.

## Table of Contents

- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation & Running](#installation--running)
- [Routing & Pages](#routing--pages)
- [Context Providers](#context-providers)
- [Components](#components)
- [ESLint & Tailwind CSS](#eslint--tailwind-css)
- [Useful Links](#useful-links)

## Project Structure

```
frontend/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    ├── context/
    │   ├── CaptainContext.jsx   // [CaptainDataContext](frontend/src/context/CaptainContext.jsx)
    │   ├── SocketContext.jsx    // [SocketContext](frontend/src/context/SocketContext.jsx)
    │   └── UserContext.jsx      // [UserDataContext](frontend/src/context/UserContext.jsx)
    ├── components/
    │   ├── CaptainDetails.jsx
    │   ├── ConfirmRide.jsx
    │   ├── ConfirmRidePopUp.jsx
    │   ├── FinishRide.jsx
    │   ├── LocationSearchPanel.jsx
    │   ├── LookingForDriver.jsx
    │   ├── RidePopUp.jsx
    │   └── VehiclePanel.jsx
    └── pages/
        ├── CaptainHome.jsx
        ├── CaptainLogout.jsx
        ├── CaptainProtectWrapper.jsx
        ├── CaptainRiding.jsx
        ├── Captainlogin.jsx
        ├── CaptainSignup.jsx
        ├── Home.jsx
        ├── Riding.jsx
        ├── Start.jsx
        ├── UserLogin.jsx
        ├── UserProtectWrapper.jsx
        ├── UserSignup.jsx
        └── UserLogout.jsx
```

- **public/**: Static assets.
- **src/**  
  - **pages/**: Contains route-based components for user flows and captain flows. For example, [Home.jsx](frontend/src/pages/Home.jsx) is the main page for users while [CaptainHome.jsx](frontend/src/pages/CaptainHome.jsx) serves captains.
  - **components/**: Reusable UI components such as [VehiclePanel.jsx](frontend/src/components/VehiclePanel.jsx) for ride selection, [ConfirmRide.jsx](frontend/src/components/ConfirmRide.jsx) for ride confirmation, etc.
  - **context/**: Global state management providers for users ([UserContext.jsx](frontend/src/context/UserContext.jsx)), captains ([CaptainContext.jsx](frontend/src/context/CaptainContext.jsx)), and socket handling ([SocketContext.jsx](frontend/src/context/SocketContext.jsx)).
  - **App.jsx & main.jsx**: Entry points for the React application. Routing is handled in [App.jsx](frontend/src/App.jsx).

## Environment Setup

Create a `.env` file in the `frontend` folder with the following variables (update the backend URL as needed):

```
VITE_BASE_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
```

## Installation & Running

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

3. Build for production:

   ```sh
   npm run build
   ```

4. Preview the production build:

   ```sh
   npm run preview
   ```

## Routing & Pages

The app uses `react-router-dom` for routing. Key pages include:

- **Start.jsx** ([frontend/src/pages/Start.jsx](frontend/src/pages/Start.jsx)): Landing page with a simple "Get Started" button.
- **UserLogin.jsx** ([frontend/src/pages/UserLogin.jsx](frontend/src/pages/UserLogin.jsx)) & **UserSignup.jsx** ([frontend/src/pages/UserSignup.jsx](frontend/src/pages/UserSignup.jsx)): User authentication flows.
- **Captainlogin.jsx** ([frontend/src/pages/Captainlogin.jsx](frontend/src/pages/Captainlogin.jsx)) & **CaptainSignup.jsx** ([frontend/src/pages/CaptainSignup.jsx](frontend/src/pages/CaptainSignup.jsx)): Captain authentication flows.
- **Home.jsx** ([frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)): User homepage for booking a ride.
- **Riding.jsx** ([frontend/src/pages/Riding.jsx](frontend/src/pages/Riding.jsx)): Displays ride details when a ride is ongoing.
- **CaptainHome.jsx** ([frontend/src/pages/CaptainHome.jsx](frontend/src/pages/CaptainHome.jsx)): Captain dashboard to view incoming ride requests.
- **CaptainRiding.jsx** ([frontend/src/pages/CaptainRiding.jsx](frontend/src/pages/CaptainRiding.jsx)): Page for captains during an ongoing ride.

Protected routes are wrapped with the *ProtectWrapper* components ([UserProtectWrapper.jsx](frontend/src/pages/UserProtectWrapper.jsx) and [CaptainProtectWrapper.jsx](frontend/src/pages/CaptainProtectWrapper.jsx)) which perform token validation with the backend.

## Context Providers

- **UserContext** ([frontend/src/context/UserContext.jsx](frontend/src/context/UserContext.jsx)): Provides current user state and setters.
- **CaptainContext** ([frontend/src/context/CaptainContext.jsx](frontend/src/context/CaptainContext.jsx)): Manages captain-specific state.
- **SocketContext** ([frontend/src/context/SocketContext.jsx](frontend/src/context/SocketContext.jsx)): Initializes and provides the Socket.io client instance for real-time communications.

These contexts are configured in [main.jsx](frontend/src/main.jsx) so that their values are available across the application.

## Components

The application leverages several reusable components:

- **VehiclePanel.jsx** ([frontend/src/components/VehiclePanel.jsx](frontend/src/components/VehiclePanel.jsx)): Lets users select a vehicle type and shows fare details.
- **LocationSearchPanel.jsx** ([frontend/src/components/LocationSearchPanel.jsx](frontend/src/components/LocationSearchPanel.jsx)): Provides auto-complete suggestions for pickup/destination addresses.
- **ConfirmRide.jsx** ([frontend/src/components/ConfirmRide.jsx](frontend/src/components/ConfirmRide.jsx)) & **ConfirmRidePopUp.jsx** ([frontend/src/components/ConfirmRidePopUp.jsx](frontend/src/components/ConfirmRidePopUp.jsx)): Used in the confirmation process before starting a ride.
- **RidePopUp.jsx** ([frontend/src/components/RidePopUp.jsx](frontend/src/components/RidePopUp.jsx)): Displays incoming ride requests for captains.
- **FinishRide.jsx** ([frontend/src/components/FinishRide.jsx](frontend/src/components/FinishRide.jsx)): Used by captains to complete a ride.
- **LookingForDriver.jsx** ([frontend/src/components/LookingForDriver.jsx](frontend/src/components/LookingForDriver.jsx)): Shows feedback to users while the system locates a driver.
- **CaptainDetails.jsx** ([frontend/src/components/CaptainDetails.jsx](frontend/src/components/CaptainDetails.jsx)): Displays the captain profile and earnings on [CaptainHome.jsx](frontend/src/pages/CaptainHome.jsx).

## ESLint & Tailwind CSS

- **ESLint Configuration**: Linting is configured via [eslint.config.js](frontend/eslint.config.js) using recommended rules for React and React Hooks.
- **Tailwind CSS**: Styling is done using Tailwind. The configuration file is [tailwind.config.js](frontend/tailwind.config.js) and styles are imported in [index.css](frontend/src/index.css).

## Useful Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [GSAP Documentation](https://greensock.com/gsap/)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)

````

Feel free to modify the examples and explanations to best match your project details.
