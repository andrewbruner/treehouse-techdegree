const updateCourse = (router, asyncHandler, Course) => {
    router.put('/courses/:id', asyncHandler(async (req, res) => {
        const course = await Course.update(req.body, {
            where: { 
                id: req.params.id
            }
        });
        res.status(204).end();
    }));
};

module.exports = updateCourse;