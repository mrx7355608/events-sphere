const { applicationList, eventList } = require("../lists");

async function acceptApplication(_, { id }, context) {
    // 1. Check if user is authenticated & is an admin user
    const user = context.authedItem;
    if (!user) throw new Error("You must be logged in to approve applications");

    if (user.role !== "admin") throw new Error("Access Denied");

    // 2. Check if application exists
    const application = await applicationList.adapter.findById(id);
    if (!application) throw new Error("Application not found");

    // 3. Check if application is already accepted
    if (application.status === "approved")
        throw new Error("Application already approved");

    // 4. Accept application
    const updatedApplication = await applicationList.adapter.update(id, {
        status: "approved",
    });

    // 5. Check if event still exists
    const eventId = application.event;
    if (!eventId) throw new Error("No event associated with this application");

    const event = await eventList.adapter.findById(eventId);
    if (!event) throw new Error("Event no longer exists");

    // 6. Add exhibitor in event's exhibitors array
    const result = await context.executeGraphQL({
        query: `
          mutation UpdateEventExhibitors($eventId: ID!, $exhibitorId: ID!) {
            updateEvent(
              id: $eventId,
              data: { exhibitors: { connect: { id: $exhibitorId } } }
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

module.exports = acceptApplication;
