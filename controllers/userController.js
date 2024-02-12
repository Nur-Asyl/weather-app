const UserModel = require('../models/user');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: 'Fields cannot be empty!' });
        return;
    }

    const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        creationDate: Date.now(),
        adminStatus: false
    });

    try {
        const savedUser = await user.save();

        res.redirect('login');
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while creating user" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.session.user = user;
        
        console.log(req.session.userId)
        res.render('index.ejs', { weatherData: null, forecastData: null, user: req.session.user});
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error during login' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update can not be empty!" });
        return;
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
        if (updatedUser) {
            res.json({ message: "User updated successfully.", user: updatedUser });
        } else {
            res.status(404).send({ message: "User not found." });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedUser = await UserModel.findOneAndDelete(req.params.id);
        if (deletedUser) {
            res.json({ message: "User deleted successfully!" });
        } else {
            res.status(404).send({ message: "User not found." });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};