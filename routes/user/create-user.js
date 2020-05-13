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
            // test if email address is of valid format
            const regEx = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
            if (!regEx.test(req.body.emailAddress)) {
                throw new Error('Email address must be valid');
            }
            // test if email address is already in use
            const matchingEmail = await User.findAll({ where: { emailAddress: req.body.emailAddress } });
            if (matchingEmail.length > 0) {
                throw new Error('Email address already in use');
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
