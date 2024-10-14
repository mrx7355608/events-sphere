import { useState, useEffect } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../mutations/authMutations";
import FormError from "../components/form/FormError";
import { useMutation } from "@apollo/client";
import useUserStore from "../store/user";

const Login = () => {
    const { loginUser } = useUserStore();
    const navigate = useNavigate();
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });
    const [loginUserMutation, { data, error, loading }] = useMutation(
        LOGIN_MUTATION
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        setCreds({ ...creds, [name]: value });
    };

    useEffect(() => {
        if (!data || !data.authenticateUserWithPassword) return;

        const { item } = data.authenticateUserWithPassword;
        loginUser(item); // update user state in store

        if (item.role === "attendee") {
            navigate("/attendee-dashboard");
        } else {
            navigate("/exhibitor-portal");
        }
    }, [data]);

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    {error && <FormError error={error.message} />}
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                onChange={onChange}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                onChange={onChange}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Text color={"blue.400"}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                onClick={() =>
                                    loginUserMutation({ variables: creds })
                                }
                                loadingText={"Logging in..."}
                                isLoading={loading}
                                disabled={loading}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Don&#39;t have an account ?{" "}
                                <Button
                                    as={Link}
                                    to="/register"
                                    variant="link"
                                    color={"blue.400"}
                                >
                                    Register
                                </Button>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
