const deleteCourse = (router, asyncHandler, Course) => {
    router.delete('/courses/:id', asyncHandler(async (req, res) => {
        const course = await Course.destroy({
            where: { 
                id: req.params.id
            }
        });
        res.status(204).end();
    }));
};

module.exports = deleteCourse;