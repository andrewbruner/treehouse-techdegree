const createUser = (router, asyncHandler, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        console.dir(req.body);
        await User.create(req.body);
        res.status(201).location('/');
    }));
};

module.exports = createUser;