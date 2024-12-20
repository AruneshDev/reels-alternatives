# Reels Alternatives Web App

A MERN stack web application that encourages users to engage in productive activities instead of spending time watching reels on social media. The app provides a curated list of 10 fun and engaging indoor and outdoor activities.

---

## Features

- **Activity Listing**: View a list of 10 curated indoor and outdoor activities.
- **Random Activity Generator**: Get a random activity suggestion.
- **Add New Activities**: Admins can add new activities to the list.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **Backend API**: API to fetch and add activities using Express.js and MongoDB.

---

## Tech Stack

### **Frontend**
- React.js
- Axios for API requests
- React Router for navigation

### **Backend**
- Node.js with Express.js
- MongoDB for the database
- Mongoose for data modeling
- CORS for cross-origin requests

### **Tools and Deployment**
- Git and GitHub for version control
- Netlify for frontend hosting
- Render/Heroku for backend hosting

---

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud-based, such as MongoDB Atlas)
- npm or yarn

---

## Getting Started

Follow these steps to set up and run the app locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/reels-alternatives.git
cd reels-alternatives
```

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```

The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`.

---

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Explore the list of activities or use the random activity generator.
3. Add new activities using the add activity form (if implemented).

---

## Project Structure

```
reels-alternatives/
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── Activity.js    # Activity schema
│   ├── routes/
│   │   └── activityRoutes.js  # API routes
│   ├── server.js          # Main server file
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityCard.js   # Activity card component
│   │   │   └── ActivityList.js   # Activity list component
│   │   ├── pages/
│   │   │   ├── HomePage.js       # Home page
│   │   │   └── AddActivityPage.js # Add activity page
│   │   ├── App.js               # Main app component
│   │   └── index.js             # React entry point
│   └── package.json            # Frontend dependencies
├── README.md                   # Project instructions
```

---

## Deployment

1. **Frontend**:
   - Deploy to Netlify or Vercel.
   - Update the `proxy` field in `frontend/package.json` if deploying separately from the backend.

2. **Backend**:
   - Deploy to Heroku, Render, or any Node.js-compatible hosting.
   - Ensure your MongoDB connection string is accessible from the deployed environment.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or suggestions, contact:
- **Your Name**: [your-email@example.com](mailto:your-email@example.com)
- GitHub: [https://github.com/your-username](https://github.com/your-username)

