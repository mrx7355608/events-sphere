const { applicationList, eventList } = require("../lists");

async function rejectApplication(_, { id }, context) {
    // 1. Check if user is authenticated & is an admin user
    const user = context.authedItem;
    if (!user) throw new Error("You must be logged in to reject applications");

    if (user.role !== "admin") throw new Error("Access Denied");

    // 2. Check if application exists
    const application = await applicationList.adapter.findById(id);
    if (!application) throw new Error("Application not found");

    // 3. Check if application is already rejected
    if (application.status === "rejected")
        throw new Error("Application already rejected");

    // 4. Reject application
    const updatedApplication = await applicationList.adapter.update(id, {
        status: "rejected",
    });

    // 5. Check for event
    const eventId = application.event;
    if (!eventId) throw new Error("No event associated with this application");

    const event = await eventList.adapter.findById(eventId);
    if (!event) throw new Error("Event no longer exists");

    // 6. Remove user from event's exhibitors
    const result = await context.executeGraphQL({
        query: `
          mutation UpdateEventExhibitors($eventId: ID!, $exhibitorId: ID!) {
            updateEvent(
              id: $eventId,
              data: { exhibitors: { disconnect: { id: $exhibitorId } } }
            ) {
              id
              exhibitors {
                id,
                name,
                email
              }
            }
          }
    `,
        variables: {
            eventId: eventId.toString(),
            exhibitorId: application.exhibitor.toString(),
        },
    });
    if (result.errors) {
        console.log(result.errors);
        throw new Error("Failed to update event exhibitors");
    }

    return updatedApplication;
}

module.exports = rejectApplication;
