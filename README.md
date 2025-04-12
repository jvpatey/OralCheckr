# 🦷 OralCheckr

## 📝 Description

OralCheckr is a comprehensive application designed to assess and improve your oral health. Through an in-depth questionnaire that covers all aspects of your oral hygiene, the app generates a personalized oral health score and provides tailored recommendations based on your responses. Additionally, OralCheckr includes a habit tracker to help you monitor and maintain your daily oral health habits. With detailed analytics, you can also track your progress through monthly and yearly insights.

## ✨ Motivation

As a dental hygienist, I wanted to create a tool that helps patients take control of their oral health. OralCheckr combines my background in oral health with technology to provide users with personalized insights and tips. It's designed to help patients track their habits and improve their oral hygiene, making it a valuable tool for education and self-care.

## 🛠️ Built with

[![My Skills](https://skillicons.dev/icons?i=react,vite,ts,styledcomponents,bootstrap,)](https://skillicons.dev)

## 🚀 How to run

This project is hosted and deployed through Github Pages. To access the application, use the link below:

https://jvpatey.github.io/OralCheckr/

## 🛠️ Custom Installation

To run the OralCheckr frontend locally, you'll need to serve the files with a server.
Since it's a React app built with Vite, you can easily start a development server using the following commands:

On MacOS or Windows:

```
npm install
npm run dev
```

### Backend Configuration

OralCheckr requires a backend server to function. To run the application locally:

1. Clone the backend repository:

   ```
   git clone https://github.com/jvpatey/OralCheckr-Backend.git
   ```

2. Set up environment variables:
   Create a `.env` file in the backend root directory with the following variables:

   ```
   NODE_ENV=development
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id  # Optional, for Google OAuth
   ```

3. Database Setup:

   - The backend uses Sequelize ORM and supports both MySQL (development) and PostgreSQL (production)
   - For local development, ensure you have MySQL installed and running
   - The tables will be automatically created when you start the server

4. Start the backend server:

   ```
   cd OralCheckr-Backend
   npm install
   npm run dev
   ```

   The server will start on port 3000 by default

5. Configure the frontend:
   - Update the frontend's `.env` file with:
     ```
     VITE_API_URL=http://localhost:3000
     ```
   - This connects your frontend to the local backend server

Note: The backend provides:

- User authentication (both traditional and Google OAuth)
- Database storage for questionnaires, habits, and habit logs
- RESTful API endpoints for all core functionality
- CORS configuration for secure frontend-backend communication

## 📋 How to use

Login Page:

- The login page requires the user to enter a username and password to access the application.

Landing Page:

- After logging in, you will be taken to the dashboard, which provides links to the questionnaire and habit tracker
- These options are also accessible via the navbar.

Questionnaire:

- On the questionnaire page, click Begin to start the questionnaire.
- Navigate through the questions, and upon completion, you'll be directed to the results page. Here, you'll receive an oral health score along with personalized recommendations based on your responses.
- If you wish to retake the questionnaire, navigate back to the questionnaire page to retake. Your score and responses will be updated.

Habit Tracker:

- The habit tracker begins with a Habits page, where you can add habits to track. You'll need to provide a habit name and how many times per day it should be completed.
- Once added, habits will appear as tiles showing the habit details and providing buttons to add or remove logs.
- You can also enter Edit Mode to modify or delete habits.
- Use the date navigation to view your habit log history and track your progress over time.

- The analytics section of the habit tracker gives detailed insights into your habit progress.
  - In the Month View, you can see various statistics for the selected month, including a calendar view of your progress and a line chart displaying trends.
  - In the Year View, a heatmap is provided to visually represent your habit tracking progress over the year for each habit.
