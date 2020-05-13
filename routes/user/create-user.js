const createUser = (router, asyncHandler, bcryptjs, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        try {
            // test if firstName exists
            if (!req.body.firstName) {
                throw new Error('First name required');
            }
            // test if lastName exists
            if (!req.body.lastName) {
                throw new Error('Last name required');
            }
            // test if emailAddress exists
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
            // test if password exists
            if (!req.body.password) {
                throw new Error('Password required');
            }
            // hash password on request object
            req.body.password = bcryptjs.hashSync(req.body.password);
            // create user
            await User.create(req.body);
            // send 201 and set location header to '/'
            res.status(201).location('/').end();
        } catch (err) {
            // on error, log above messages
            console.error('Validation Error: ', err.message);
            res.status(400).json({ message: `Validation Error: ${err.message}` });
        }
    }));
};

module.exports = createUser;
