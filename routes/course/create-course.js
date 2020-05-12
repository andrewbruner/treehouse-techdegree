const createCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
        const course = await Course.create(req.body);
        res.status(201).location(`/courses/${course.id}`).end();
    }));
};

module.exports = createCourse;
