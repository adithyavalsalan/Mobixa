const express = require("express");

const router = express.Router();

const User = require("../models/User");


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password,
            role
        } = req.body;


        // Check fields
        if (!email || !password || !role) {

            return res.status(400).json({

                message:
                    "Email, password and role are required."

            });
        }


        // Find user
        const user = await User.findOne({
            email: email
        });


        if (!user) {

            return res.status(401).json({

                message:
                    "User not found."

            });
        }


        // Check role
        if (user.role !== role) {

            return res.status(401).json({

                message:
                    "Incorrect login role."

            });
        }


        // Check password
        if (user.password !== password) {

            return res.status(401).json({

                message:
                    "Incorrect password."

            });
        }


        // Successful login

        res.json({

            message: "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message:
                "Server error."

        });
    }

});


module.exports = router;