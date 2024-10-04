import React from "react";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Icon,
    Image,
    Link,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <Box
                bgImage="url(https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                bgPosition="center"
                bgSize="cover"
                height="500px"
            >
                <Center h="full" w="full" bg="rgba(0, 0, 0, 0.5)">
                    <Box p={6} textAlign="center">
                        <Heading color="white" fontSize="4xl">
                            Plan Your Next Event with Ease
                        </Heading>
                        <Text color="white" mt={4}>
                            Discover the perfect venue, find talented vendors,
                            and manage all aspects of your event in one place.
                        </Text>
                        <Button mt={4} colorScheme="blue" variant="outline">
                            Get Started
                        </Button>
                    </Box>
                </Center>
            </Box>

            <Box bg="white" p={6}>
                <Heading size="md">Our Features</Heading>
                <Flex flexWrap="wrap" justifyContent="center">
                    <Box
                        maxW="sm"
                        p={4}
                        border="1px solid gray"
                        borderRadius="md"
                        m={2}
                    >
                        <Icon
                            name="calendar-alt"
                            fontSize="3xl"
                            color="blue.500"
                        />
                        <Heading size="sm" mt={2}>
                            Easy Event Planning
                        </Heading>
                        <Text>
                            Create, manage, and track your events effortlessly.
                        </Text>
                    </Box>
                    {/* Add more feature boxes here */}
                </Flex>
            </Box>
            <Box bg="gray.200" p={6}>
                <Heading size="md">What Our Clients Say</Heading>
                <Flex flexWrap="wrap" justifyContent="center">
                    <Box
                        maxW="sm"
                        p={4}
                        border="1px solid gray"
                        borderRadius="md"
                        m={2}
                    >
                        <Image
                            src="https://randomuser.me/portraits/women/50.jpg"
                            alt="Client testimonial"
                            borderRadius="full"
                        />
                        <Heading size="sm" mt={2}>
                            John Doe
                        </Heading>
                        <Text>
                            "The event management system was a lifesaver for our
                            recent conference. It streamlined the entire process
                            and made planning a breeze."
                        </Text>
                    </Box>
                    {/* Add more testimonial boxes here */}
                </Flex>
            </Box>
            <Box bg="white" p={6}>
                <Heading size="md">Contact Us</Heading>
                <Flex flexWrap="wrap" justifyContent="center">
                    <Box
                        maxW="sm"
                        p={4}
                        border="1px solid gray"
                        borderRadius="md"
                        m={2}
                    >
                        <Icon name="phone" fontSize="3xl" color="green.500" />
                        <Heading size="sm" mt={2}>
                            Phone
                        </Heading>
                        <Text>+92 300 1234567</Text>
                    </Box>
                    <Box
                        maxW="sm"
                        p={4}
                        border="1px solid gray"
                        borderRadius="md"
                        m={2}
                    >
                        <Icon
                            name="envelope"
                            fontSize="3xl"
                            color="purple.500"
                        />
                        <Heading size="sm" mt={2}>
                            Email
                        </Heading>
                        <Text>info@eventmanagement.com</Text>
                    </Box>
                </Flex>
            </Box>

            {/* Footer */}
            <Box bg="gray.200" p={4} textAlign="center">
                <Text>
                    © 2024 Event Management System. All rights reserved.
                </Text>
            </Box>
        </Box>
    );
};

export default Home;

