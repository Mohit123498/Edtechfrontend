const mongoose = require("mongoose");
const CourseProgress = new mongoose.Schema({
  CourseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
  },
});
module.exports = mongoose.model("CourseProgress", CourseProgress);
