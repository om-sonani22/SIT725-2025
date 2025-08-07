const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", ProjectSchema);

const sampleData = [
  {
    title: "Kitten 1",
    image: "images/kitten-1.jpg",
    link: "About Kitten 1",
    description: "Fluffy and adorable kitten",
  },
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    description: "Loves to nap in sunbeams",
  },
];

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));

// To run this script, use the command: node week4/seed.js
// Ensure MongoDB is running and the database 'myprojectDB' is created.
// This script will populate the database with sample project data.
// Adjust the sampleData array as needed for different projects.
const sampleProject = new Project({
  title: "Kitten 3",
  image: "images/kitten-3.jpg",
  link: "About Kitten 3",
  description: "Demo description about kitten 3",
});
sampleProject.save().then(() => console.log("Sample projectsaved!"));

