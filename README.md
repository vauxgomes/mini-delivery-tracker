# Mini Delivery Tracker

## Overview

Mini Delivery Tracker is a real-time geolocation system designed to demonstrate the implementation of bidirectional communication using WebSockets. The project simulates a logistics scenario where a driver broadcasts live coordinates and an observer tracks the movement on an interactive map.

## Key Features

- **Real-time Bi-directional Tracking:** Low-latency location updates using Socket.io.
- **Role-based Interface:** Specialized views for Drivers (publishers) and Observers (subscribers).
- **Type Safety:** End-to-end type sharing across the monorepo to ensure message integrity.
- **Interactive Mapping:** Visual representation of coordinates with dynamic updates.

## Tech Stack

### Backend

- **Node.js & TypeScript:** Core runtime and type safety.
- **Socket.io:** Event-based communication engine.
- **Express:** Lightweight server for health checks and initial handshake.

### Frontend

- **React & Vite:** Modern UI library and fast build tool.
- **React Router:** For internal navigation between roles.
- **Lucide React:** Iconography for driver and observer identification.

### Shared

- **Shared Contract:** A dedicated package for DTOs (Data Transfer Objects) and event definitions, preventing drift between client and server.

## Architecture & Message Flow

The system utilizes a pub/sub-like pattern over WebSockets:

1. **Driver Node:** Establishes a socket connection and emits `location_update` events containing `ILocation` payloads.
2. **Socket Server:** Acts as a broker, validating the payload and broadcasting it to all authenticated observers.
3. **Observer Node:** Listens for incoming updates and re-renders the map interface in real-time.

## Project Structure

The project is organized as a monorepo using npm workspaces:

```text
.
├── packages
│   ├── backend     # Socket.io server and event handlers
│   ├── frontend    # React application (Driver/Observer UI)
│   └── shared      # Shared interfaces (ILocation, IDeliveryUpdate)
└── package.json
```

## Visual Snapshots

### Role Selection

Simple entry point to define the user context within the ecosystem.
<img src="docs/images/front-snapshot-1.png" alt="Mode Selection" width="600" />

### Live Tracking

Dynamic map interface showing smooth coordinate transitions.
<img src="docs/images/front.gif" alt="Real-time Tracking" width="600" />

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 7.x or higher (for workspaces support)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mini-delivery-tracker
```

2. Install dependencies:

```bash
npm install
```

### Execution

The project is configured to run concurrently for a better development experience.

**Run Full Stack (Recommended):**

```bash
npm run dev
```

**Run Separately:**

```bash
# Backend only
npm run dev:back

# Frontend only
npm run dev:front
```

## Available Scripts

### Root

- `dev`: Starts both backend and frontend concurrently.
- `dev:back`: Bootstraps the Express/Socket.io server.
- `dev:front`: Bootstraps the React/Vite application.

### Backend

- `dev`: Runs the server with `tsx watch` for hot reloading.

### Frontend

- `build`: Compiles the application for production deployment.
- `lint`: Executes ESLint to ensure code quality.
- `preview`: Serves the production build locally for testing.

## License

This project is licensed under the MIT License.
