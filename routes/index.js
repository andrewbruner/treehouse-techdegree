const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db.models;
const { Course } = db.models;

const asyncHandler = cb => (
    async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/users', asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}));

router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
}));

module.exports = router;