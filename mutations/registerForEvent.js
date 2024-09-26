const keystone = require("../keystone");
const { eventList } = require("../lists");

const getEventAttendees = `
    query getEventAttendees($eventId: ID!){
        Event(where: { id: $eventId }) {
            attendees {
                id
            }
        }
    }
`;

const registerAttendeeMutation = `
    mutation RegisterAttendee($eventId: ID!, $attendeeId: ID!){
        updateEvent(
            id: $eventId,
            data: { attendees: { connect: { id: $attendeeId } } }
        ) {
            id,
            title,
            description,
            location,
            date,
            exhibitors {
                id,
                name,
                email,
            },
            attendees {
                id,
                name,
                email,
            }
        }
    }
`;

async function registerForEvent(_, { id }, context) {
    // 1. Check if user is authenticated & is an admin user
    const user = context.authedItem;
    if (!user) throw new Error("You must be logged in to register for events");

    // 2. Check user role
    if (user.role === "exhibitor") {
        throw new Error(
            "You cannot register for event, instead send a joining application"
        );
    }

    // 3. Check if id is provided
    // (idk why but maybe, mutation is not gonna execute until id is
    // provided, so it's kindof a useless check here)
    if (!id) throw new Error("Event id is missing");

    // TODO: check if ID is a mongodb id or some random string

    // 4. Check if event exists
    const event = await eventList.adapter.findById(id);
    if (!event) throw new Error("Event no longer exists");

    // 5. Check if attendee is already registered for this event
    const result = await keystone.executeGraphQL({
        query: getEventAttendees,
        variables: { eventId: id.toString() },
        context,
    });
    if (result.errors) {
        console.log(result.errors);
        throw new Error("Unable to fetch attendees of the event");
    }

    // Extract ids from attendees objects
    // Event.attendees is an array containing objects with ids
    // => [{ id: "12343" }, { id: "4235" }]
    const attendeesIds = result.data.Event.attendees.map((obj) => obj.id);
    const userIdStr = user.id.toString();
    if (attendeesIds.includes(userIdStr)) {
        throw new Error("You have already registered for this event");
    }

    // 6. If user is not registered then register him/her for the event
    const userId = user.id.toString();
    const result2 = await keystone.executeGraphQL({
        query: registerAttendeeMutation,
        variables: { eventId: id, attendeeId: userId },
        context,
    });
    if (result2.errors) {
        console.log(result2.errors);
        throw new Error("Unable to register you for the event");
    }

    return result2.data.updateEvent;
}

module.exports = registerForEvent;
