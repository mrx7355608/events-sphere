import React from "react";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    SimpleGrid,
    Text,
    Input,
} from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";

const EventList = () => {
    const events = [
        {
            id: 1,
            title: "Event 1",
            imageUrl:
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            date: "2023-12-31",
            location: "City Hall",
        },
        {
            id: 2,
            title: "Event 2",
            imageUrl:
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            date: "2024-01-15",
            location: "Community Center",
        },
        {
            id: 3,
            title: "Event 3",
            imageUrl:
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            date: "2024-02-20",
            location: "Park",
        },
    ];

    return (
        <>
            <Navbar />
            <Box maxW="container.xl" p={4}>
                <Input placeholder="Search events" my={4} />
                <Heading size="md" mb={4}>
                    Upcoming Events
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {events.map((event) => (
                        <Box
                            key={event.id}
                            border="1px solid gray"
                            borderRadius="md"
                            p={4}
                        >
                            <Image
                                src={event.imageUrl}
                                alt={event.title}
                                borderRadius="md"
                                mb={4}
                            />
                            <Heading size="sm">{event.title}</Heading>
                            <Text>{event.date}</Text>
                            <Text>{event.location}</Text>
                            <Button colorScheme="blue" variant="outline" mt={4}>
                                <Link href={`/event-details`}>
                                    View Details
                                </Link>
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default EventList;
