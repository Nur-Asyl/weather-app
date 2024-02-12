const WeatherHistory = require('../models/weather');
const User = require('../models/user');

exports.create = async (req, res) => {
    
};


exports.findAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

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