const readCourses = (router, asyncHandler, Course, User) => {
    router.get('/courses', asyncHandler(async (req, res) => {
        // find all courses, excluding certain attributes
        const courses = await Course.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            // include associated User as matching alias 'userInfo', excluding certain attributes
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
            }
        });
        // send all courses
        res.status(200).json(courses);
    }));
};

module.exports = readCourses;
