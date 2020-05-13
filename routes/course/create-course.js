const createCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
        try {
            if (!req.body.title) {
                throw new Error('Title required');
            }
            if (!req.body.description) {
                throw new Error('Description required');
            }
            const course = await Course.create(req.body);
            res.status(201).location(`/courses/${course.id}`).end();
        } catch (err) {
            console.error('Validation Error: ', err.message);
            res.status(400).json({ message: `Validation Error: ${err.message}` });
        }
    }));
};

module.exports = createCourse;
