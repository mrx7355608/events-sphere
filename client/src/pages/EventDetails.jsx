import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Image,
    List,
    ListItem,
    Text,
    Textarea,
    Spinner,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GET_EVENT_BY_ID } from "../queries/events";
import { useMutation, useQuery } from "@apollo/client";
import useUserStore from "../store/user";
import useToastUtils from "../hooks/useToastUtils";
import { SUBMIT_EVENT_FEEDBACK } from "../mutations/events";
import { useState } from "react";

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useUserStore();
    const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
        variables: { id },
    });
    const [userFeedback, setUserFeedback] = useState("");
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const [
        submitFeedbackMutation,
        { error: error2, loading: loading2 },
    ] = useMutation(SUBMIT_EVENT_FEEDBACK, {
        variables: {
            eventID: id,
            feedback: userFeedback,
        },
    });

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Text color="red">Unable to fetch event</Text>;
    }

    const isAttendeeOfThisEvent = () => {
        const attendeesIDs = data.Event.attendees.map(
            (attendee) => attendee.id
        );
        return attendeesIDs.includes(user.id);
    };

    return (
        <Box maxW="container.xl" p={4}>
            {/* Event Info */}
            <Center>
                <Box bg="gray.200" p={4} borderRadius="md">
                    <Image
                        src={`https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                        alt="Event Image"
                        maxWidth="500px"
                        borderRadius="md"
                        mb={4}
                    />
                    <Heading size="md" textAlign="center">
                        {data.Event.title}
                    </Heading>
                    <Text textAlign="center">
                        {new Date(data.Event.date).toDateString().slice(4)}
                    </Text>
                    <Text textAlign="center">{data.Event.location}</Text>
                </Box>
            </Center>

            <Box mt={4}>
                <Heading size="sm">Event Description</Heading>
                <Text>{data.Event.description}</Text>
            </Box>

            {/* Attendees List */}
            <Heading size="sm" my={4}>
                Attendees
            </Heading>
            <List>
                {data.Event.attendees.map((attendee) => {
                    return (
                        <ListItem key={attendee.id}>{attendee.name}</ListItem>
                    );
                })}
            </List>

            {/* Exhibitors List */}
            <Heading size="sm" my={4}>
                Exhibitors
            </Heading>
            <List>
                {data.Event.exhibitors.map((exhibitor) => {
                    return (
                        <ListItem key={exhibitor.id}>{exhibitor.name}</ListItem>
                    );
                })}
            </List>

            {/* Bookmark Button */}
            <HStack>
                {isAttendeeOfThisEvent() ? (
                    <Alert mx={2} status="success" mt={4}>
                        <AlertIcon />
                        You are already Registered
                    </Alert>
                ) : (
                    <Button colorScheme="orange" mt={4}>
                        Register
                    </Button>
                )}
            </HStack>

            {/* Feedbacks List */}
            <Heading size="sm" my={4}>
                Feedbacks
            </Heading>
            <List>
                {data.Event.feedbacks.map((feedback) => {
                    return (
                        <ListItem key={feedback.id}>
                            <Box
                                p={2}
                                border="1px solid gray"
                                borderRadius="md"
                            >
                                <Text fontWeight="bold">
                                    {feedback.user.name}
                                </Text>
                                <Text>{feedback.feedback}</Text>
                            </Box>
                        </ListItem>
                    );
                })}
            </List>

            {/* Feedback Form */}
            <Heading size="sm" my={4}>
                Leave Feedback
            </Heading>
            <Textarea
                placeholder="Enter your feedback here"
                onChange={(e) => setUserFeedback(e.target.value)}
            />
            <Button
                onClick={submitFeedback}
                colorScheme="blue"
                mx={2}
                variant="outline"
                mt={2}
                isLoading={loading2}
            >
                Submit Feedback
            </Button>

            {/* Registration/Application Buttons */}
        </Box>
    );

    async function submitFeedback() {
        if (!isAttendeeOfThisEvent()) {
            return showErrorToast(
                "You cannot give feedback as you are not a part of this event"
            );
        }

        if (!userFeedback) {
            return showErrorToast("Please enter your feedback to submit");
        }

        await submitFeedbackMutation();

        if (error2) return showErrorToast("Unable to submit feedback");
        return showSuccessToast("Feedback submitted");
    }
};

export default EventDetails;
