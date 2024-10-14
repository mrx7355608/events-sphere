import { Box, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
    const { children } = props;

    return (
        <Box
            as={Link}
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
            }}
            to={`/${children.toLowerCase()}`}
        >
            {children}
        </Box>
    );
};

export default NavLink;
