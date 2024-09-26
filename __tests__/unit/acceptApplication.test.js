require("dotenv").config();
const acceptApplication = require("../../mutations/acceptApplication");
const { applicationList, eventList } = require("../../lists");

describe("Testing acceptApplication Custom mutation", () => {
    it("should throw error if user is not authenticated", async () => {
        const context = {
            authedItem: null,
        };

        await expect(
            acceptApplication(null, { id: "some-application-id" }, context)
        ).rejects.toThrow("You must be logged in to approve applications");
    });

    it("should throw error if user is not an admin", async () => {
        const context = {
            authedItem: {
                name: "Fawad Imran",
                role: "attendee",
            },
        };

        await expect(
            acceptApplication(null, { id: "some-application-id" }, context)
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
            acceptApplication(null, { id: "" }, context)
        ).rejects.toThrow("Application not found");
    });

    it("should throw error if application is already approved", async () => {
        const context = {
            authedItem: {
                role: "admin",
            },
        };

        applicationList.adapter.findById = jest.fn().mockReturnValueOnce(
            Promise.resolve({
                status: "approved",
            })
        );

        await expect(
            acceptApplication(null, { id: "" }, context)
        ).rejects.toThrow("Application already approved");
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
            acceptApplication(null, { id: "" }, context)
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
            acceptApplication(null, { id: "" }, context)
        ).rejects.toThrow("Event no longer exists");
    });
});
