const readUser = (router, authenticateUser, asyncHandler, User) => {
    router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
        const user = await User.findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: {
                emailAddress: req.currentUser.emailAddress
            }
        });
        res.status(200).json(user);
    }));
};

module.exports = readUser;
