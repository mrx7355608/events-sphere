require("dotenv").config();
const rejectApplication = require("../../mutations/rejectApplication");
const { applicationList, eventList } = require("../../lists");

describe("Testing rejectApplication Custom mutation", () => {
    it("should throw error if user is not authenticated", async () => {
        const context = {
            authedItem: null,
        };

        await expect(
            rejectApplication(null, { id: "some-application-id" }, context)
        ).rejects.toThrow("You must be logged in to reject applications");
    });

    it("should throw error if user is not an admin", async () => {
        const context = {
            authedItem: {
                name: "Fawad Imran",
                role: "attendee",
            },
        };

        await expect(
            rejectApplication(null, { id: "some-application-id" }, context)
        ).rejects.toThrow("Access Denied");
    });

    it("should throw error if application does not exist", async () => {
        const context = {
            authedItem: {
                role: "admin",
            },
        };

        // Mocked "findById" function on applicationList.adapter
        applicationList.adapter.findById = jest
            .fn()
            .mockReturnValueOnce(Promise.resolve(null));

        await expect(
            rejectApplication(null, { id: "" }, context)
        ).rejects.toThrow("Application not found");
    });

    it("should throw error if application is already rejected", async () => {
        const context = {
            authedItem: {
                role: "admin",
            },
        };

        applicationList.adapter.findById = jest.fn().mockReturnValueOnce(
            Promise.resolve({
                status: "rejected",
            })
        );

        await expect(
            rejectApplication(null, { id: "" }, context)
        ).rejects.toThrow("Application already rejected");
    });

    it("should throw error if application is not associated with any event", async () => {
        const context = {
            authedItem: {
                role: "admin",
            },
        };

        // Mocked "update" function of applicationList.adapter
        applicationList.adapter.update = jest.fn().mockReturnValueOnce(
            Promise.resolve({
                status: "approved",
            })
        );
        applicationList.adapter.findById = jest.fn().mockReturnValueOnce(
            Promise.resolve({
                event: null,
            })
        );

        await expect(
            rejectApplication(null, { id: "" }, context)
        ).rejects.toThrow("No event associated with this application");
    });

    it("should throw error if event no longer exists", async () => {
        const context = {
            authedItem: {
                role: "admin",
            },
        };

        // Mocked "update" function of applicationList.adapter
        applicationList.adapter.update = jest.fn().mockReturnValueOnce(
            Promise.resolve({
                status: "approved",
            })
        );
        applicationList.adapter.findById = jest.fn().mockReturnValueOnce(
            Promise.resolve({
                event: "some-event-id",
            })
        );
        eventList.adapter.findById = jest.fn().mockReturnValueOnce(null);

        await expect(
            rejectApplication(null, { id: "" }, context)
        ).rejects.toThrow("Event no longer exists");
    });
});
