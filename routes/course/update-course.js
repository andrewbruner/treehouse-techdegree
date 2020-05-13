const updateCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
        try {
            // find current course for reference
            const course = await Course.findOne({
                where: {
                    id: req.params.id
                }
            });
            // test if currentUser owns current course
            if (req.currentUser.id !== course.userId) {
                const message = 'Access Denied: Only course owner may update course';
                // if not, log above message
                console.error(message);
                return res.status(403).json({ message });
            }
            // test if title exists
            if (!req.body.title) {
                throw new Error('Title required');
            }
            // test if description exists
            if (!req.body.description) {
                throw new Error('Description required');
            }
            // update current course
            await Course.update(req.body, {
                where: { 
                    id: req.params.id
                }
            });
            res.status(204).end();
        } catch (err) {
            // on error, log above messages
            console.error('Validation Error: ', err.message);
            res.status(400).json({ message: `Validation Error: ${err.message}` });
        }
    }));
};

module.exports = updateCourse;
