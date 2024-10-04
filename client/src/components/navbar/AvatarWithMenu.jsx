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

const AvatarWithMenu = () => {
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
                    <Avatar
                        size={"sm"}
                        src={
                            "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        }
                    />
                </MenuButton>
                <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem fontWeight={"regular"} color="red.500">
                        <IoLogOutOutline size={20} />
                        <Text ml={2} fontSize={"sm"}>
                            Log out
                        </Text>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default AvatarWithMenu;
