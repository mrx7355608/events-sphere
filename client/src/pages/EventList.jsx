import {
    Box,
    Button,
    Spinner,
    Heading,
    Image,
    Link,
    SimpleGrid,
    Text,
    Input,
} from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "../queries/events";
import { useState } from "react";

const EventList = () => {
    const image =
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const [search, setSearch] = useState("");

    const { data: events, loading, error, refetch } = useQuery(GET_ALL_EVENTS, {
        variables: { title: "" },
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await refetch({ title: search });
    };

    return (
        <>
            <Navbar />
            <Box maxW="container.xl" p={4}>
                <form onSubmit={handleOnSubmit}>
                    <Input
                        placeholder="Search events"
                        my={4}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {loading && <Spinner size="lg" />}
                    {error && <Text>Unable to fetch events</Text>}
                    {events?.allEvents &&
                        (events.allEvents.length < 1 ? (
                            <Text>No events to show</Text>
                        ) : (
                            events.allEvents.map((event) => {
                                return (
                                    <Box
                                        key={event.id}
                                        border="1px solid gray"
                                        borderRadius="md"
                                        p={4}
                                    >
                                        <Image
                                            src={event.imageUrl || image}
                                            alt={event.title}
                                            borderRadius="md"
                                            mb={4}
                                        />
                                        <Heading size="sm">
                                            {event.title}
                                        </Heading>
                                        <Text>
                                            {new Date(event.date)
                                                .toDateString()
                                                .slice(4)}
                                        </Text>
                                        <Text>{event.location}</Text>
                                        <Button
                                            colorScheme="blue"
                                            variant="outline"
                                            mt={4}
                                        >
                                            <Link
                                                href={`/event-details/${event.id}`}
                                            >
                                                View Details
                                            </Link>
                                        </Button>
                                    </Box>
                                );
                            })
                        ))}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default EventList;
