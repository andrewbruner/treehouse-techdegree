const readCourse = (router, asyncHandler, Course) => {
    router.get('/courses/:id', asyncHandler(async (req, res) => {
        const course = await Course.findOne({
		attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(course);
    }));
};

module.exports = readCourse;
