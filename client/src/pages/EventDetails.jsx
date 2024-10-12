import React from "react";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    List,
    ListItem,
    SimpleGrid,
    Text,
    Textarea,
} from "@chakra-ui/react";

const EventDetails = () => {
    let isAttendee = true;
    return (
        <Box maxW="container.xl" p={4}>
            {/* Event Info */}
            <Center>
                <Box bg="gray.200" p={4} borderRadius="md">
                    <Image
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Event Image"
                        maxWidth="500px"
                        borderRadius="md"
                        mb={4}
                    />
                    <Heading size="md" textAlign="center">
                        Event Title
                    </Heading>
                    <Text textAlign="center">12/10/2024</Text>
                    <Text textAlign="center">honolulu</Text>
                </Box>
            </Center>

            <Box mt={4}>
                <Heading size="sm">Event Description</Heading>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </Text>
            </Box>

            {/* Attendees List */}
            <Heading size="sm" my={4}>
                Attendees
            </Heading>
            <List>
                <ListItem>Attendee 1</ListItem>
                <ListItem>Attendee 2</ListItem>
                <ListItem>Attendee 3</ListItem>
            </List>

            {/* Exhibitors List */}
            <Heading size="sm" my={4}>
                Exhibitors
            </Heading>
            <List>
                <ListItem>Exhibitor 1</ListItem>
                <ListItem>Exhibitor 2</ListItem>
                <ListItem>Exhibitor 3</ListItem>
            </List>

            {/* Bookmark Button */}
            <HStack>
                <Button colorScheme="blue" variant="outline" mt={4}>
                    Bookmark Event
                </Button>
                {isAttendee ? (
                    <Button mx={2} colorScheme="green" mt={4}>
                        Register
                    </Button>
                ) : (
                    <Button colorScheme="orange" mt={4}>
                        Apply as Exhibitor
                    </Button>
                )}
            </HStack>

            {/* Feedbacks List */}
            <Heading size="sm" my={4}>
                Feedbacks
            </Heading>
            <List>
                <ListItem mb={2}>
                    <Box p={2} border="1px solid gray" borderRadius="md">
                        <Text fontWeight="bold">User 1:</Text>
                        <Text>This event was amazing!</Text>
                    </Box>
                </ListItem>
                <ListItem mb={2}>
                    <Box p={2} border="1px solid gray" borderRadius="md">
                        <Text fontWeight="bold">User 2:</Text>
                        <Text>I had a great time at this event.</Text>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box p={2} border="1px solid gray" borderRadius="md">
                        <Text fontWeight="bold">User 3:</Text>
                        <Text>The speakers were excellent.</Text>
                    </Box>
                </ListItem>
            </List>

            {/* Feedback Form */}
            <Heading size="sm" my={4}>
                Leave Feedback
            </Heading>
            <Textarea placeholder="Enter your feedback here" />
            <Button colorScheme="blue" mx={2} variant="outline" mt={2}>
                Submit Feedback
            </Button>

            {/* Registration/Application Buttons */}
        </Box>
    );
};

export default EventDetails;
