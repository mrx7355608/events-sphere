import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Input,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Textarea,
    Text,
    useDisclosure,
    Tab,
} from "@chakra-ui/react";

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profilePicture, setProfilePicture] = useState(null);
    const [personalInfo, setPersonalInfo] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "This is a sample biography.",
    });
    const [activeTab, setActiveTab] = useState("settings"); // Initialize active tab

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handlePersonalInfoChange = (event) => {
        setPersonalInfo({
            ...personalInfo,
            [event.target.name]: event.target.value,
        });
    };

    const handleSaveProfile = async () => {
        // Replace with your actual API call
        console.log("Saving profile changes...");
    };

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };

    return (
        <Box>
            {/* Profile Picture */}
            <Container>
                <Center mb={4}>
                    <Image
                        src="https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile Picture"
                        borderRadius="full"
                        width="200px"
                        height="200px"
                    />
                    <Input type="file" ml={4} />
                </Center>
            </Container>
            {/* Personal Information */}
            <Container p={4} border="1px solid gray" borderRadius="md">
                <Heading size="md">Personal Information</Heading>
                <Input
                    placeholder="Name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    mb={2}
                />
                <Input
                    placeholder="Email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    mb={2}
                />
                <Textarea
                    placeholder="Bio"
                    value={personalInfo.bio}
                    onChange={handlePersonalInfoChange}
                    height="100px"
                />
                <Button onClick={handleSaveProfile} mt={4} colorScheme="blue">
                    Save Changes
                </Button>
            </Container>

            {/* Tabs for Settings and Bookmarks */}
            <Container>
                <Tabs variant="soft-rounded" colorScheme="gray" mt={4}>
                    <TabList>
                        <Tab onClick={() => handleTabChange("settings")}>
                            Settings
                        </Tab>
                        <Tab onClick={() => handleTabChange("bookmarks")}>
                            Bookmarks
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Heading size="md">Settings</Heading>
                            <ul>
                                <li>Account Settings</li>
                                <li>Notifications</li>
                                <li>Privacy</li>
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <Heading size="md">Bookmarks</Heading>
                            <ul>
                                <li>Event A</li>
                                <li>Event B</li>
                                <li>Event C</li>
                            </ul>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default Profile;
