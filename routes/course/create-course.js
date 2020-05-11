const createCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
        console.log('preparing to create course...');
        console.log(req.body);
        try {
            const course = await Course.create(req.body);
            res.status(201).location(`/courses/${course.id}`).end();
        } catch (err) {
            console.log(err);
            next(err);
        }
    }));
};

module.exports = createCourse;
