const createUser = (router, asyncHandler, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        console.dir(req.body);
        const user = await User.create(req.body);
        console.dir(user);
        res.status(201).location('/');
    }));
};

module.exports = createUser;