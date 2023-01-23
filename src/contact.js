const express = require('express');
const Contact = require("../models/contact_Us");

 const route = express.Router();


 //create a route for storing a contact message. This route will accept a POST request with a JSON payload containing the message, and will store it in the MongoDB database using the Contact model defined above.

 route.post("/", async (req, res) => {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    await newContact.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Contact message saved!');
      }
    });
  });
 

  // create a route for retrieving a list of all contact message stored in the database. This route will accept a GET request and return a JSON array of all the contact message
  
  route.get("/", (req, res) => {
    Contact.find({}, (err, contacts) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(contacts);
      }
    });
  });
  
//Delete one Post
route.delete("/:id", async (req, res) => {
  try {
    await Contact.deleteOne({_id:req.params.id})
    res.status(202).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

   module.exports = route;