const deleteCourse = (router, authenticateUser, asyncHandler, Course) => {
    router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
        const course = await Course.destroy({
            where: { 
                id: req.params.id
            }
        });
        res.status(204).end();
    }));
};

module.exports = deleteCourse;
