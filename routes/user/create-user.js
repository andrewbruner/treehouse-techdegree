const createUser = (router, asyncHandler, bcryptjs, User) => {
    router.post('/users', asyncHandler(async (req, res) => {
        try {
	    // hash password on request object, if password exists
	    if (req.body.password) {
            	req.body.password = bcryptjs.hashSync(req.body.password);
	    }
	    // create user
            await User.create(req.body);
            // send 201 and set location header to '/'
            res.status(201).location('/').end();
        } catch (err) {
            // on error, log error messages
	    const message = [];
	    err.errors.forEach(error => message.push(error.message));
            console.error('Validation Error: ', message);
	    res.status(400).json({ message: message });
        }
    }));
};

module.exports = createUser;
