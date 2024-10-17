import {
    Box,
    Stack,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AvatarWithMenu from "./AvatarWithMenu";
import MyNavLink from "./MyNavLink";
import useUserStore from "../../store/user";
import { IoLogInOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const links = ["Expo", "Contact", "Events", "Profile", "Applications"];

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useUserStore();

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
                        <Box>Logo</Box>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {links.map((link) => (
                                <MyNavLink key={link}>{link}</MyNavLink>
                            ))}
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
                            {links.map((link) => (
                                <MyNavLink key={link}>{link}</MyNavLink>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>
        </>
    );
}
