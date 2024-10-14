import { gql } from "@apollo/client";

const GET_LOGGEDIN_USER = gql`
    query GetLoggedInUser {
        authenticatedUser {
            id
            name
            profile_picture
            email
            role
        }
    }
`;

export { GET_LOGGEDIN_USER };
