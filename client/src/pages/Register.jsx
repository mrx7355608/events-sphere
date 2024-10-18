import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Select,
    useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { SIGNUP_MUTATION } from "../mutations/authMutations";
import FormError from "../components/form/FormError";
import useToastUtils from "../hooks/useToastUtils";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [registerUserMutation, { loading, error }] = useMutation(
        SIGNUP_MUTATION
    );
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const { showSuccessToast } = useToastUtils();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    {error && <FormError error={error.message} />}
                    <Stack spacing={4}>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={onChange}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="role" isRequired>
                            <FormLabel>Role</FormLabel>
                            <Select
                                placeholder="Select option"
                                onChange={onChange}
                                name="role"
                            >
                                <option value="exhibitor">Exhibitor</option>
                                <option value="attendee">Attendee</option>
                            </Select>
                        </FormControl>
                        <Stack spacing={7} mt={4}>
                            <Button
                                loadingText="Creating account..."
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                isLoading={loading}
                                disabled={loading}
                                onClick={async () => {
                                    await registerUserMutation({
                                        variables: details,
                                    });

                                    if (!error) {
                                        showSuccessToast(
                                            "Account created successfully"
                                        );
                                        navigate("/login");
                                        return;
                                    }
                                }}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Create account
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="link"
                                    color={"blue.400"}
                                >
                                    Login
                                </Button>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Register;
