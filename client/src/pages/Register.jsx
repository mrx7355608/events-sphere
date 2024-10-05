import React from 'react'
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
    useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { SIGNUP_MUTATION } from '../mutations/authMutations'
import { useMutation } from "@apollo/client"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
    const [registerUserMutation, {data, loading, error}] = useMutation(SIGNUP_MUTATION);
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details,  [name]:value });
    }

        

  return (
     <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name="name" onChange={onChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email"/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Creating account..."
                size="lg"
                bg={'blue.400'}
                color={'white'}
                isLoading={loading}
                disabled={loading}
                onClick={() => registerUserMutation(details)}
                _hover={{
                  bg: 'blue.500',
                }}>
                Create account
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Button as={Link} to="/login" variant="link" color={'blue.400'}>Login</Button>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )

}

export default Register
