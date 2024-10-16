import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import RegisterExpoModal from "../components/RegisterExpoModal"

const RegisterExpo = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
     <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register Expo
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4} minW="20rem">
                <FormControl id="company" isRequired>
                  <FormLabel>Company</FormLabel>
                  <Input type="text" />
                </FormControl>
            <FormControl id="services" isRequired>
              <FormLabel>Services</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="documents" isRequired>
              <FormLabel>Documents</FormLabel>
              <InputGroup>
                <Input type="file" />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={onOpen}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Submit
              </Button>
              <RegisterExpoModal isOpen={isOpen} onClose={onClose} />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default RegisterExpo