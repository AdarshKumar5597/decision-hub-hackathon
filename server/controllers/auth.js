const jwt = require("jsonwebtoken");
const { getClient } = require('../config/database');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const filterObj = require("../utils/filterObj");

// Model
const UserDbName = 'User';
const { promisify } = require("util");

// this function will return you jwt token
const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// this function will return whether the password at the time of login is properly hashed and matches with the hashed password in user db
const correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

exports.register = async (req, res, next) => {
    let client;

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required.",
            });
        }

        // hashing the password
        req.body.password = await bcrypt.hash(password, 12);

        const filteredBody = filterObj(
            req.body,
            "firstName",
            "lastName",
            "email",
            "password"
        );

        client = getClient(); // Use the global connection

        const User = client.db().collection(UserDbName);

        const existing_user = await User.findOne({ email: email });

        if (existing_user) {
            return res.status(400).json({
                success: false,
                message: "Email already in use, Please login.",
            });
        }else {
            const new_user = await User.insertOne(filteredBody);
            req.userId = new_user._id;
            
            return res.status(200).json({
                success: true,
                message: "User registered successfully."
            })
        }
    } catch (error) {
        console.log("Error in register: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering user.",
        })
    }
};

// User Login
exports.login = async (req, res, next) => {
    let client;

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Both email and password are required",
        });
        return;
    }

    client = getClient(); // Use the global connection

    const User = client.db().collection(UserDbName);

    const user = await User.findOne({ email: email });

    if (!user || !user.password) {
        res.status(400).json({
            success: false,
            message: "Incorrect password",
        });

        return;
    }

    if (!user || !(await correctPassword(password, user.password))) {
        res.status(400).json({
            success: false,
            message: "Email or password is incorrect",
        });

        return;
    }

    const token = signToken(user._id);

    res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        token,
        user_id: user._id,
    });
};

// Protect
exports.protect = async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token;
    let client;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({
            message: "You are not logged in! Please log in to get access.",
        });
    }
    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded);

    // 3) Check if user still exists

    client = getClient(); // Use the global connection
    const User = client.db().collection(UserDbName);

    const this_user = await User.findById(decoded.userId);

    if (!this_user) {
        return res.status(401).json({
            message: "The user belonging to this token does no longer exists.",
        });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = this_user;
    next();
};