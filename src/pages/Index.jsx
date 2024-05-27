import { Box, Container, Flex, Heading, Link, Spacer, Text, VStack, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents, useAddEvent } from '../api/supabase';

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEventMutation = useAddEvent();

  if (isLoading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );

  const handleAddEvent = () => {
    addEventMutation.mutate({ name: 'New Event', date: '2023-10-01', description: 'Description of the new event' });
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" bg="gray.100" p={4} borderRadius="md" boxShadow="md">
        <Heading size="md">My Website</Heading>
        <Spacer />
        <Box>
          <Link href="#" p={2}>Home</Link>
          <Link href="#" p={2}>About</Link>
          <Link href="#" p={2}>Contact</Link>
        </Box>
      </Flex>
      <Box as="main" mt={8}>
        <VStack spacing={4}>
          <Heading as="h1" size="2xl">Welcome to My Website</Heading>
          <Text fontSize="lg">This is a simple, clean, and responsive landing page.</Text>
        <Button onClick={handleAddEvent}>Add Event</Button>
          {events && events.map(event => (
            <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="md">{event.name}</Heading>
              <Text>{event.date}</Text>
              <Text>{event.description}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;