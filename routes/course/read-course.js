const readCourse = (router, asyncHandler, Course) => {
    router.get('/courses/:id', asyncHandler(async (req, res) => {
        // find current course, excluding certain attributes
        const course = await Course.findOne({
		attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: req.params.id
            }
        });
        // send current course
        res.status(200).json(course);
    }));
};

module.exports = readCourse;
