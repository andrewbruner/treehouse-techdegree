const createCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
        try {
            // test if  title exists
            if (!req.body.title) {
                throw new Error('Title required');
            }
            // test if description exists
            if (!req.body.description) {
                throw new Error('Description required');
            }
            // create course
            const course = await Course.create(req.body);
            // set location header to '/courses/:id'
            res.status(201).location(`/courses/${course.id}`).end();
        } catch (err) {
            // on error, log above messages
            console.error('Validation Error: ', err.message);
            res.status(400).json({ message: `Validation Error: ${err.message}` });
        }
    }));
};

module.exports = createCourse;
