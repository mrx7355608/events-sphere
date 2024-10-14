import { gql } from "@apollo/client";

const GET_ALL_EVENTS = gql`
    query getAllEvents {
        allEvents {
            id
            title
            description
            location
            date
            exhibitors {
                id
                name
                email
            }
            attendees {
                id
                name
                email
            }
            feedbacks {
                feedback
                overallExeperience
                user {
                    id
                    email
                    name
                }
            }
        }
    }
`;

export { GET_ALL_EVENTS };
