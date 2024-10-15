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
                overallExperience
                user {
                    id
                    email
                    name
                }
            }
        }
    }
`;

const GET_EVENT_BY_ID = gql`
    query getEventById($id: ID!) {
        Event(where: { id: $id }) {
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
                overallExperience
                user {
                    id
                    email
                    name
                }
            }
        }
    }
`;

export { GET_ALL_EVENTS, GET_EVENT_BY_ID };
