const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();


const app = express();


// Middleware

app.use(cors());

app.use(express.json());

app.use(express.static("../frontend"));


// MongoDB connection

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

    })
    .catch(error => {

        console.log(
            "MongoDB connection error:",
            error
        );

    });


// Authentication routes

const authRoutes =
    require("./routes/auth");

app.use(
    "/api/auth",
    authRoutes
);


// Test route

app.get("/", (req, res) => {

    res.send("Mobixa server is running");

});


// Start server

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});