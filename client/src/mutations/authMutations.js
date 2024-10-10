import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            item {
                id
                name
                email
                role
                profile_picture
            }
        }
    }
`;

const SIGNUP_MUTATION = gql`
    mutation Signup(
        $name: String!
        $role: String!
        $email: String!
        $password: String!
    ) {
        createUser(
            data: {
                name: $name
                email: $email
                password: $password
                role: $role
            }
        ) {
            id
        }
    }
`;

const LOGOUT_MUTATION = gql`
    mutation Logout {
        unauthenticateUser {
            success
        }
    }
`;

export { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION };
