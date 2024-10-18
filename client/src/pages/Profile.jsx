import { useState } from "react";
import {
    Box,
    Button,
    Center,
    Container,
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
import useUserStore from "../store/user";

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profilePicture, setProfilePicture] = useState(null);
    const { user } = useUserStore();
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
                        src={user.profile_picture}
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
                    value={user.name}
                    onChange={handlePersonalInfoChange}
                    mb={2}
                />
                <Input
                    placeholder="Email"
                    value={user.email}
                    onChange={handlePersonalInfoChange}
                    mb={2}
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
