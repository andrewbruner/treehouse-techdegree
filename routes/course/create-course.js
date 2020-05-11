const createCourse = (router, asyncHandler, Course) => {
    router.post('/courses', asyncHandler(async (req, res) => {
        await Course.create(req.body);
        res.status(201).location('/').end();
    }));
};

module.exports = createCourse;