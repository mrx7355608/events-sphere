import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Image,
  HStack,
  chakra,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <HStack spacing={4} p={4}>
      <Heading as="h1">Event Management System</Heading>
      <Link to="/user-login">Sign In</Link>
      <Link to="/user-registration">Sign Up</Link>
    </HStack>
  );
};

const HeroSection = () => {
  return (
    <Box p={4} bgImage="url(https://cdn-cjhkj.nitrocdn.com/krXSsXVqwzhduXLVuGLToUwHLNnSxUxO/assets/images/optimized/rev-f8c6d5b/spotme.com/wp-content/uploads/2020/07/Hero-1.jpg)" bgSize="cover" bgPosition="center">
      <Flex alignItems="center" justifyContent="center" h="100%" color="white">
        <Heading as="h2" fontSize="4xl" fontWeight="bold">
          Plan Your Next Event with Ease
        </Heading>
      </Flex>
    </Box>
  );
};

const Home = () => {
  return (
    <chakra.div>
      <Navbar />
      <HeroSection />
    </chakra.div>
  );
};

export default Home;