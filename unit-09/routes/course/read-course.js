const readCourse = (router, asyncHandler, Course, User) => {
    router.get('/courses/:id', asyncHandler(async (req, res) => {
        // find current course, excluding certain attributes
        const course = await Course.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                id: req.params.id
            },
            // include associated User as matching alias 'userInfo', excluding certain attributes
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                },
            }
        });
        // send current course
        res.status(200).json(course);
    }));
};

module.exports = readCourse;
