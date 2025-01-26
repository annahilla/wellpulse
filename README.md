# WellPulse

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)´
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Description

WellPulse is a web application designed to help users track and improve their healthy habits. The frontend is built using **React 18** and provides an intuitive and interactive experience for users to monitor their progress.

## Features

- **Visual Insights**: Charts and graphs to track habit completion.
- **Goal Tracking**: Set and achieve habit-related goals.
- **Scheduling**: Organize habits by categories and time.
- **Healthy Places**: Discover locations for maintaining healthy habits (parks, gyms, cafés, etc.).

## Tech Stack

- **Framework**: React (with Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Calendar**: FullCalendar
- **Charts**: Chart.js & React Chart.js 2
- **Maps**: Leaflet & React Leaflet
- **Routing**: React Router
- **Backend**: [WellPulse backend (Node.js + MongoDB)](https://github.com/annahilla/wellpulse-api)

## Installation

### Prerequisites

- Node.js >= 16
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/annahilla/wellpulse
   cd wellpulse
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key-here
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain-here
     VITE_FIREBASE_PROJECT_ID=your-project-id-here
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-here
     VITE_FIREBASE_APP_ID=your-app-id-here
     VITE_FIREBASE_MESAUREMENT_ID=your-measurement-id-here
     VITE_API_BASE_URL=api-url-here
     ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

1. **Create an Account**: Sign up and log in to start tracking your habits.
2. **Add Habits**: Define your daily or weekly habits.
3. **Track Progress**: View completion stats through interactive charts.
4. **Explore Healthy Places**: Find recommended locations to support your habits.

## API Endpoints

The frontend interacts with the [WellPulse backend API](https://github.com/annahilla/wellpulse-api). The main endpoints used are:

- `GET /habits` - Fetch user habits
- `POST /habits` - Create a new habit
- `PUT /habits/:id` - Update a habit
- `DELETE /habits/:id` - Delete a habit
- `GET /locations` - Fetch healthy locations

## Deployment

WellPulse is deployed with **Vercel** and accessible in the following link: **[WellPulse Live Demo](https://wellpulse.app)**

## Contributing

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request

## License

This project is licensed under the **MIT License**.

---

**WellPulse** - Empowering Healthy Habits
