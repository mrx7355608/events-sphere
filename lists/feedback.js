const { Text, Relationship, Select } = require("@keystonejs/fields");
const accessControl = require("../utils/accessControl");
const {
    AuthedRelationship,
} = require("@keystonejs/fields-authed-relationship/dist/fields-authed-relationship.cjs.prod");
const keystone = require("../keystone");

// Access control function for update and delete operations
const userIsAdminOrOwner = ({ existingItem, authentication }) => {
    const user = authentication.item;
    if (!user) {
        return false;
    }

    if (
        user.role === "admin" ||
        existingItem.user.toString() !== user.id.toString() // user owns this feedback
    ) {
        return true;
    }

    return false;
};

const hasUserAttendedEvent = async (userId, userRole, eventId, context) => {
    const query = `
        query HasAttendedEvent ($eventId: ID!) {
            Event (where: { id: $eventId }) {
                attendees {
                    id,
                },
                exhibitors {
                    id,
                },
            }
        }
    `;

    // 1. Make graphql query
    const result = await keystone.executeGraphQL({
        query,
        variables: { eventId },
        context,
    });

    // 2. Throw error if any
    if (result.errors) {
        console.log(result.errors);
        throw new Error("Unable to fetch event details");
    }

    // 3. Create an array of IDs from the result.data
    const { attendees, exhibitors } = result.data.Event;
    const userIDs =
        userRole === "attendee"
            ? attendees.map((obj) => obj.id)
            : exhibitors.map((obj) => obj.id);

    // 4. Return true/false boolean
    return userIDs.includes(userId);
};

const Feedback = {
    fields: {
        feedback: {
            type: Text,
            isRequired: true,
        },
        overallExeperience: {
            type: Select,
            isRequired: true,
            options: "Very good, Good, Neutral, Bad, Very bad",
            dataType: "string",
            defaultValue: "Good",
        },
        user: {
            type: AuthedRelationship,
            isRequired: true,
            many: false,
            ref: "User",
        },
        event: {
            type: Relationship,
            isRequired: true,
            many: false,
            ref: "Event.feedbacks",
        },
    },

    access: {
        read: accessControl.isSignedIn,
        create: async ({ authentication, originalInput, context }) => {
            const user = authentication.item;
            if (!user) {
                return false;
            }

            if (user.role !== "admin") {
                // Check if user has attended the event
                const hasAttendedEvent = await hasUserAttendedEvent(
                    user.id.toString(),
                    user.role,
                    originalInput.event.connect.id.toString(),
                    context
                );

                // If not, throw error
                if (!hasAttendedEvent) {
                    throw new Error(
                        "You cannot give feedback to event you have not attended"
                    );
                }

                return true;
            }

            return true;
        },
        update: userIsAdminOrOwner,
        delete: userIsAdminOrOwner,
    },
};

module.exports = Feedback;
