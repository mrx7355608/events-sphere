const keystone = require("../keystone");

async function rejectApplication(_, { id }, context) {
    // 1. Check if user is authenticated & is an admin user
    const user = context.authedItem;
    if (!user) throw new Error("You must be logged in to accpet applications");

    if (user.role !== "admin") throw new Error("Access Denied");

    // Extract mongoose models from keystone instance
    const { Application, Event } = keystone.adapter.listAdapters;

    // 2. Check if application exists
    const application = await Application.findById(id);
    if (!application) throw new Error("Application not found");

    // 3. Check if application is already rejected
    if (application.status === "rejected")
        throw new Error("Application already rejected");

    // 4. Accept application
    const updatedApplication = await Application.update(id, {
        status: "rejected",
    });

    // 5. Check if event still exists
    const eventId = application.event;
    if (!eventId) throw new Error("No event associated with this application");

    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event no longer exists");

    // 6. Add exhibitor in event's exhibitors array
    await Event.update(eventId, {
        exhibitors: { disconnect: [{ id: application.exhibitor }] },
    });

    return updatedApplication;
}

module.exports = rejectApplication;
