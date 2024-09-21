// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => {
    return Boolean(user && user.isAdmin);
};
const userOwnsItem = ({ authentication: { item: user } }) => {
    if (!user) {
        return false;
    }

    // Instead of a boolean, you can return a GraphQL query:
    // https://www.keystonejs.com/api/access-control#graphqlwhere
    return { id: user.id };
};

let access = { userIsAdmin, userOwnsItem };

const userIsAdminOrOwner = (auth) => {
    const isAdmin = access.userIsAdmin(auth);
    const isOwner = access.userOwnsItem(auth);
    return isAdmin ? isAdmin : isOwner;
};

access = { ...access, userIsAdminOrOwner };

module.exports = access;
