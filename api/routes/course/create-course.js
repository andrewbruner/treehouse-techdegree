const createCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
        try {
            // create course
            const course = await Course.create(req.body);
            // set location header to '/courses/:id'
            res.status(201).location(`/courses/${course.id}`).end();
        } catch (err) {
            // on error, log error messages
            const message = [];
	    err.errors.forEach(error => message.push(error.message));
            console.error('Validation Error: ', message);
            res.status(400).json({ message: message });
        }
    }));
};

module.exports = createCourse;
