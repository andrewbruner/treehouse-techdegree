const readCourses = (router, asyncHandler, Course) => {
    router.get('/courses', asyncHandler(async (req, res) => {
        // find all courses, excluding certain attributes
        const courses = await Course.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        // send all courses
        res.status(200).json(courses);
    }));
};

module.exports = readCourses;
