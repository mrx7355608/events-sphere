// Access control functions
const isSignedIn = ({ authentication: { item: user } }) => {
    return user ? true : false;
};
const userIsAdmin = ({ authentication: { item: user } }) => {
    return Boolean(user && user.role && user.role.toLowerCase() === "admin");
};
const userOwnsItem = ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }
    return { id: user.id };
};

let access = { userIsAdmin, userOwnsItem, isSignedIn };

const userIsAdminOrOwner = (auth) => {
    const isAdmin = access.userIsAdmin(auth);
    const isOwner = access.userOwnsItem(auth);
    return isAdmin ? isAdmin : isOwner;
};

access = { ...access, userIsAdminOrOwner };

module.exports = access;
