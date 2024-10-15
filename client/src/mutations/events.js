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

export { SUBMIT_EVENT_FEEDBACK };
