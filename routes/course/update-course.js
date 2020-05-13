const updateCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
        try {
            const course = await Course.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (req.currentUser.id !== course.userId) {
                const message = 'Access Denied: Only course owner may update course';
                console.error(message);
                return res.status(403).json({ message });
            }
            if (!req.body.title) {
                throw new Error('Title required');
            }
            if (!req.body.description) {
                throw new Error('Description required');
            }
            await Course.update(req.body, {
                where: { 
                    id: req.params.id
                }
            });
            res.status(204).end();
        } catch (err) {
            console.error('Validation Error: ', err.message);
            res.status(400).json({ message: `Validation Error: ${err.message}` });
        }
    }));
};

module.exports = updateCourse;
