const deleteCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
        // find current course for reference
        const course = await Course.findOne({
            where: {
                id: req.params.id
            }
        });
        // test if currentUser is current course owner
        if (req.currentUser.id !== course.userId) {
            const message = 'Access Denied: Only course owner may delete course';
            // if not, log above message
            console.error(message);
            return res.status(403).json({ message });
        }
        // delete current course
        await Course.destroy({
            where: { 
                id: req.params.id
            }
        });
        res.status(204).end();
    }));
};

module.exports = deleteCourse;
