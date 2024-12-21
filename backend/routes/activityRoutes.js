const express = require('express');
const router = express.Router();

// Mock activities data
const activities = [
  {
    id: 1,
    name: "Take a Walk or Go for a Run",
    type: "outdoor",
    image: "backend/photos/run.jpg",
    link: "https://www.mapmyrun.com/",
  },
  {
    id: 2,
    name: "Read a Book or Listen to an Audiobook",
    type: "indoor",
    image: "backend/photos/reading.jpg",
    link: "https://www.goodreads.com/",
  },
  {
    id: 3,
    name: "Practice Meditation or Mindfulness",
    type: "indoor",
    image: "backend/photos/meditate.jpg",
    link: "https://www.headspace.com/",
  },
  {
    id: 4,
    name: "Try a New Recipe or Bake Something",
    type: "indoor",
    image: "backend/photos/cooking.jpg",
    link: "https://www.allrecipes.com/",
  },
  {
    id: 5,
    name: "Exercise or Try Yoga",
    type: "indoor/outdoor",
    image: "backend/photos/exercise.jpg",
    link: "https://www.youtube.com/user/yogawithadriene",
  },
  {
    id: 6,
    name: "Call or Video Chat with a Friend",
    type: "indoor",
    image: "backend/photos/callafriend.jpg",
    link: "https://zoom.us/",
  },
  {
    id: 7,
    name: "Start a Creative Project",
    type: "indoor",
    image: "backend/photos/skills.jpg",
    link: "https://www.skillshare.com/",
  },
  {
    id: 8,
    name: "Declutter or Organize a Space",
    type: "indoor",
    image: "backend/photos/organize.jpg",
    link: "https://konmari.com/",
  },
  {
    id: 9,
    name: "Watch an Educational Video or Learn Something New",
    type: "indoor",
    image: "backend/photos/courses.jpg",
    link: "https://www.coursera.org/",
  },
  {
    id: 10,
    name: "Volunteer or Help Someone",
    type: "outdoor/indoor",
    image: "backend/photos/volunteer.jpg",
    link: "https://www.volunteermatch.org/",
  },
];

// Route to get all activities
router.get('/', (req, res) => {
  res.status(200).json(activities);
});

// Export the router
module.exports = router;
