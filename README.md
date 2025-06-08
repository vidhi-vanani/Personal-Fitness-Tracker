# TP-CS624_Team3_Personal Fitness App

The **Personal Fitness App** is a MERN stack mobile application designed to help users track their fitness activities, schedule workouts, monitor workout progress, and achieve their fitness goals effectively. 

#### **Key Features**
- **Home Page:**
  - Displays today's workouts
  - Manages today's workout progress

- **Workout Page:**
  - Allows users create workout schedules for each day of the week.
  - Allows users to edit and delete workout schedules.

- **Progress Page:**
  - Enables users to view their progress over time.
  - Allows users to add and delete progress entries (weight, body fat %, muscle mass %).


#### **Technology Stack**
- **Frontend:** React, React Router, JSX, Expo
- **Backend:** Node.js(server-side runtime), Express.js(backend framework)
- **Database:** MongoDB (Mongoose for schema modeling)
- **State Management:** React Context API / Hooks
- **Version Control:** GitHub

#### **Installation & Setup**

1. Clone the repository:
   ```sh
   git clone https://github.com/vidhi-vanani/Personal-Fitness-Tracker.git
   cd Personal-Fitness-Tracker
   ```
2. Install dependencies for the backend and frontend (One time only):
   ```sh
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```
3. Start the backend server:
   ```sh
   cd Backend
   npm start
   ```
4. Start the frontend:
   ```sh
   cd Frontend
   npx expo start --tunnel
   ```
5. Open the URL provided by Expo in your browser to access the application.

#### **Lessons Learned**
- Improved understanding of the MERN stack and full-stack development
- Learning how to integrate generative AI into web applications
- Gained hands-on experience in project collaboration using GitHub
- Enhanced UI design and state management in React
- Developed skills in fitness tracking and data visualization

---

## Project Structure

The project is organized into two main directories:

```
Personal-Fitness-Tracker/
├── Backend/           # Server-side code and API endpoints
│   ├── controllers/   # API controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── server.js     # Main server file
└── Frontend/         # Client-side code and UI components
    ├── components/   # React components
    ├── pages/        # Main pages
    ├── context/      # React context files
    └── App.js        # Main application file
```

## API Endpoints

The backend provides several API endpoints for managing fitness data:

- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:day` - Get workouts for a specific day
- `PUT /api/workouts/:id` - Update a workout
- `GET /api/progress` - Get fitness progress data
- `POST /api/progress` - Add a new progress entry
- `DELETE /api/progress/:id` - Delete a progress entry