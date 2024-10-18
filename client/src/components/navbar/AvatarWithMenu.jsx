import {
    Flex,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    MenuDivider,
    Text,
    Avatar,
} from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";
import useUserStore from "../../store/user";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../../mutations/authMutations";
import { Link } from "react-router-dom";

const AvatarWithMenu = () => {
    const { user, logoutUser } = useUserStore();
    const [logoutUserMutation, { loading }] = useMutation(LOGOUT_MUTATION);

    return (
        <Flex alignItems={"center"}>
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                >
                    <Avatar size={"sm"} src={user?.profile_picture} />
                </MenuButton>
                <MenuList>
                    <MenuItem as={Link} to="/profile">
                        Profile
                    </MenuItem>
                    <MenuItem
                        fontWeight={"regular"}
                        color="red.500"
                        onClick={() => {
                            if (loading) return;
                            logoutUserMutation();
                            logoutUser(); // unset user from store
                        }}
                    >
                        {!loading ? <IoLogOutOutline size={20} /> : <Spinner />}
                        <Text ml={2} fontSize={"sm"}>
                            {loading ? "Logging out..." : "Log out"}
                        </Text>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default AvatarWithMenu;
