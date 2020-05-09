const readUser = (router, asyncHandler, User) => {
    router.get('/users', asyncHandler(async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    }));
};

module.exports = readUser;