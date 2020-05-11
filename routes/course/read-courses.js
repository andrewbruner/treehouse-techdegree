const readCourses = (router, asyncHandler, Course) => {
    router.get('/courses', asyncHandler(async (req, res) => {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    }));
};

module.exports = readCourses;