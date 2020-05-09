const createUser = (router, asyncHandler, User) => {
    router.post('/users', asyncHandler(async (req, res, next) => {
        console.dir(req.body);
        try {
            await User.create(req.body);
            console.log('user created!');
            res.status(201).location('/').end();
        } catch (err) {
            console.error('Yikes!', err);
            next(err)
        }
    }));
};

module.exports = createUser;