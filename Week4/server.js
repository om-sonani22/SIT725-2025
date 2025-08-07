const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const uri = "mongodb://localhost:27017/my_simple_app";
mongoose.connect(uri)
  .then(() => console.log("MongoDB connection successful!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define a Mongoose schema for the contact data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});

// GET all contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
});

// POST new contact
app.post("/api/contacts", async (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const savedContact = await newContact.save();
    res.status(201).json({ message: "Contact submitted successfully!", data: savedContact });
  } catch (error) {
    res.status(500).json({ message: "Error submitting contact", error });
  }
});

app.listen(port, () => {
  console.log("App running at http://localhost:" + port);
});
