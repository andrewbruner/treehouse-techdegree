const deleteCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
        try {
	    // find current course for reference
            const course = await Course.findOne({
                where: {
                    id: req.params.id
                }
            });
            // test if currentUser is current course owner
            if (req.currentUser.id !== course.userId) {
                // if not, throw error
                const error = new Error('Access Denied: Only course owner may delete course.'); 
                error.name = 'AccessError';
		throw error;
            }
            // delete current course
            await Course.destroy({
                where: { 
                    id: req.params.id
                }
            });
            res.status(204).end();
        } catch (err) {
	    const message = [];
	    message.push(err.message);
	    console.error('Access Error: ', message);
	    res.status(403).json({ message: message });
	}
}));
};

module.exports = deleteCourse;
