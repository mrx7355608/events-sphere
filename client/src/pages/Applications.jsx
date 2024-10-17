import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Button,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Applications = () => {
  const applicationsData = [
    { id: 1, title: 'Marketing Campaign Launch', submitDate: '2024-10-15', status: 'pending' },
    { id: 2, title: 'Website Redesign Proposal', submitDate: '2024-10-10', status: 'approved' },
    { id: 3, title: 'Internal Training Program', submitDate: '2024-10-08', status: 'rejected' },
  ];

  const handleViewEvent = (id) => {
    // Implement your logic to handle viewing the specific event
    // You can redirect to a dedicated event page or display details in a modal
    console.log(`View event for application ${id}`);
  };

  return (
    <Box maxW="7xl" mx="auto" pt={8} pb={12}>
      <Heading as="h2" size="lg" textAlign="center">
        Applications
      </Heading>

      <TableContainer mt={8}>
        <Table variant="simple">
          <Thead>
            <Tr bgColor="black">
              <Th  color="white">S.No.</Th>
              <Th  color="white">Event Title</Th>
              <Th  color="white">Submit Date</Th>
              <Th  color="white">View Event</Th>
              <Th  color="white">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {applicationsData.map((application) => (
              <Tr key={application.id}>
                <Td>{application.id}</Td>
                <Td>{application.title}</Td>
                <Td>{application.submitDate}</Td>
                <Td>
                  <Button as={RouterLink} to="/events-details/1">
                    View Event
                  </Button>
                </Td>
                <Td>
                  {application.status === 'pending' && (
                    <Box bg="gray.200" px={2} py={1} borderRadius="md">
                      {application.status}
                    </Box>
                  )}
                  {application.status === 'approved' && (
                    <Box bg="green.100" px={2} py={1} borderRadius="md" color="green.500">
                      {application.status}
                    </Box>
                  )}
                  {application.status === 'rejected' && (
                    <Box bg="red.100" px={2} py={1} borderRadius="md" color="red.500">
                      {application.status}
                    </Box>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Applications;