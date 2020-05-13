const createUser = (router, asyncHandler, bcryptjs, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        try {
            if (!req.body.firstName) {
                throw new Error('First name required');
            }
            if (!req.body.lastName) {
                throw new Error('Last name required');
            }
            if (!req.body.emailAddress) {
                throw new Error('Email address required');
            }
            if (!req.body.password) {
                throw new Error('Password required');
            }
            req.body.password = bcryptjs.hashSync(req.body.password);
            await User.create(req.body);
            res.status(201).location('/').end();
        } catch (err) {
            console.error('Validation Error: ', err.message);
            res.status(400).json({ message: `Validation Error: ${err.message}` });
        }
    }));
};

module.exports = createUser;
