const createUser = (router, asyncHandler, bcryptjs, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        req.body.password = bcryptjs.hashSync(req.body.password);
	await User.create(req.body);
        res.status(201).location('/').end();
    }));
};

module.exports = createUser;
