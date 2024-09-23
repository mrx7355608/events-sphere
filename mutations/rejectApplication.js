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

    // 4. Reject application
    const updatedApplication = await Application.update(id, {
        status: "rejected",
    });

    return updatedApplication;
}

module.exports = rejectApplication;
