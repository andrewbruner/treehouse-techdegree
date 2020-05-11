const createUser = (router, asyncHandler, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        await User.create(req.body);
        res.status(201).location('/').end();
    }));
};

module.exports = createUser;