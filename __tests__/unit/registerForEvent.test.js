require("dotenv").config();
const { eventList } = require("../../lists");
const registerForEvent = require("../../mutations/registerForEvent");

describe("Testing registerForEvent Custom mutation", () => {
    it("should throw error if user is not authenticated", async () => {
        const context = {
            authedItem: null,
        };

        await expect(
            registerForEvent(null, { id: "some-event-id" }, context)
        ).rejects.toThrow("You must be logged in to register for events");
    });

    it("should throw error if eventId is not provided", async () => {
        const context = {
            authedItem: {
                role: "attendee",
            },
        };

        await expect(
            registerForEvent(null, { id: null }, context)
        ).rejects.toThrow("Event id is missing");
    });

    it("should only allow users with role 'attendee' to register for event", async () => {
        const context = {
            authedItem: {
                role: "exhibitor",
            },
        };

        await expect(
            registerForEvent(null, { id: "some-event-id" }, context)
        ).rejects.toThrow(
            "You cannot register for event, instead send a joining application"
        );
    });

    it("should throw error if does not exist", async () => {
        const context = {
            authedItem: {
                role: "attendee",
            },
        };

        eventList.adapter.findById = jest
            .fn()
            .mockReturnValueOnce(Promise.resolve(null));

        await expect(
            registerForEvent(null, { id: "some-event-id" }, context)
        ).rejects.toThrow("Event no longer exists");
    });
});
