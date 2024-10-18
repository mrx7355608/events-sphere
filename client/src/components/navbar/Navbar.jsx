import {
    Box,
    Stack,
    Flex,
    HStack,
    IconButton,
    Button,
    Image,
    useDisclosure,
    useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AvatarWithMenu from "./AvatarWithMenu";
import useUserStore from "../../store/user";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useUserStore();
    const isAttendee = () => user?.role === "attendee";

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    {/* Mobile Hamburger Button */}
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    {/* Desktop navbar */}
                    <HStack spacing={8} alignItems={"center"}>
                        <Image src={"/logo.png"} width="60px" />
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            <Link
                                to={
                                    isAttendee()
                                        ? "/attendee-dashboard"
                                        : "/exhibitor-dashboard"
                                }
                            >
                                Dashboard
                            </Link>
                            <Link to="/contact">Contact</Link>
                            {isAttendee() ? (
                                <Link to="/registered-events">
                                    Registered Events
                                </Link>
                            ) : (
                                <Link to="/applications">Applications</Link>
                            )}
                        </HStack>
                    </HStack>

                    {/* User avatar with menu */}
                    {user ? (
                        <AvatarWithMenu />
                    ) : (
                        <Link to="/login">
                            <Button
                                leftIcon={<IoLogInOutline size={21} />}
                                variant={"outline"}
                                borderColor="black"
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                </Flex>

                {/* Mobile Menu */}
                {isOpen && (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            <Link
                                to={
                                    isAttendee()
                                        ? "/attendee-dashboard"
                                        : "/exhibitor-dashboard"
                                }
                            >
                                Dashboard
                            </Link>
                            <Link to="/contact">Contact</Link>
                            {isAttendee() ? (
                                <Link to="/registered-events">
                                    Registered Events
                                </Link>
                            ) : (
                                <Link to="/applications">Applications</Link>
                            )}
                        </Stack>
                    </Box>
                )}
            </Box>
        </>
    );
}
