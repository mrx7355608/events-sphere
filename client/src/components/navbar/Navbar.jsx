import {
    Box,
    Stack,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AvatarWithMenu from "./AvatarWithMenu";
import MyNavLink from "./MyNavLink";

const links = ["Expo", "Contact"];

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <AvatarWithMenu />
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
