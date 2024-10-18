import { gql } from "@apollo/client";

const SUBMIT_EVENT_FEEDBACK = gql`
    mutation submit($eventID: ID!, $feedback: String!) {
        createFeedback(
            data: {
                feedback: $feedback
                event: { connect: { id: $eventID } }
                overallExperience: "Good"
            }
        ) {
            id
            feedback
            user {
                id
                name
            }
        }
    }
`;

const REGISTER_EVENT = gql`
    mutation registerEvent($eventID: ID!) {
        registerForEvent(id: $eventID) {
            attendees {
                id
                email
                name
            }
        }
    }
`;

export { SUBMIT_EVENT_FEEDBACK, REGISTER_EVENT };
