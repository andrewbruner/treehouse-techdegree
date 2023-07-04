const readUser = (router, authenticateUser, asyncHandler, User) => {
    router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
        // find the user with matching email address of currentUser and exclude certain attributes
        const user = await User.findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: {
                emailAddress: req.currentUser.emailAddress
            }
        });
        // send user data
        res.status(200).json(user);
    }));
};

module.exports = readUser;
