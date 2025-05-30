# VoltSync - EV Charging Station Management Platform

VoltSync is a comprehensive full-stack application for managing electric vehicle charging stations. The platform allows users to add, edit, delete, and view charging stations on both a list view and an interactive map.

## 🚀 Features

### Backend

- RESTful API built with Node.js and Express
- MongoDB database integration with Mongoose
- JWT Authentication (Register/Login)
- Protected routes for station management
- CRUD operations for charging stations
- Comprehensive error handling

### Frontend

- Modern Vue.js 3 with Composition API and TypeScript
- Responsive design with Tailwind CSS
- User authentication (Login/Register)
- Dashboard with station listing and advanced filtering
- Add/Edit/Delete station functionality
- Interactive map view with OpenStreetMap/Leaflet
- State management with Pinia

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or Atlas)
- npm or yarn

## 🛠️ Installation & Setup

### Clone the repository

```bash
git clone <https://github.com/Pranav-P-K/VoltSync.git>
cd chargemaster-pro
```

### Backend Setup

```bash
cd backend
npm install
```

#### Create a .env file with the following variables

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
PORT=5000
```

#### Start the backend server

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
```

#### Create a .env file with the following variable

```bash
VITE_API_URL=http://localhost:5000/api
```

#### Start the frontend server

```bash
npm run dev
```

## 📝 API Documentation

### Authentication Endpoints

#### Register a new user

```bash
POST /api/auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```bash
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get user profile

```bash
GET /api/auth/profile
```

Headers:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### Charging Station Endpoints

#### Get all stations

```bash
GET /api/charging-stations
```

Query parameters (all optional):

- `status`: Filter by status (Active, Inactive, Maintenance)
- `connectorType`: Filter by connector type
- `minPower`: Filter by minimum power output
- `maxPower`: Filter by maximum power output

Headers:

- `authorization`: Bearer YOUR_JWT_TOKEN

#### Get a single station

```bash
GET /api/charging-stations/:id
```

Headers:

- `authorization`: Bearer YOUR_JWT_TOKEN

#### Create a new station

```bash
POST /api/charging-stations
```

Request body:

```json
{
  "name": "Tambaram West",
  "location": {
    "latitude": 12.9372,
    "longitude": 80.1112,
    "address": "123 Main St, West Tambaram, Chennai"
  },
  "status": "Active",
  "powerOutput": 500,
  "connectorType": "Type 2"
}
```

Headers:

- `authorization`: Bearer YOUR_JWT_TOKEN

#### Update a station

```bash
PUT /api/charging-stations/:id
```

Request body: Same as create, with fields you want to update

Headers:

- `authorization`: Bearer YOUR_JWT_TOKEN

#### Delete a station

```bash
DELETE /api/charging-stations/:id
```

Headers:

- `authorization`: Bearer YOUR_JWT_TOKEN

## 📦 Project Structure

### Backend Folder

```bash
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── config/          # Configuration files
│   └── utils/           # Utility functions
├── server.js            # Entry point
└── package.json
```

### Frontend Folder

```bash
frontend/
├── src/
│   ├── components/      # Vue components
│   ├── views/           # Page components
│   ├── stores/          # Pinia stores
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   └── router/          # Vue Router
├── App.vue              # Root component
├── main.ts              # Entry point
└── package.json
```

## 👨‍💻 Author

Pranav P K - [Github](https://github.com/Pranav-P-K)
