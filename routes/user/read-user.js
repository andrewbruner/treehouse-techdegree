const readUser = (router, authenticateUser, asyncHandler, User) => {
    router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
        const users = await User.findAll({
            where: {
                emailAddress: req.currentUser.emailAddress
            }
        });
        res.status(200).json(users);
    }));
};

module.exports = readUser;