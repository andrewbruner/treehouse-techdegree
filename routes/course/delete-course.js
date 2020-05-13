const deleteCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
        const course = await Course.findOne({
            where: {
                id: req.params.id
            }
        });
        if (req.currentUser.id !== course.userId) {
            const message = 'Access Denied: Only course owner may delete course';
            console.error(message);
            return res.status(403).json({ message });
        }
        await Course.destroy({
            where: { 
                id: req.params.id
            }
        });
        res.status(204).end();
    }));
};

module.exports = deleteCourse;
