import { Box, Container, Flex, Heading, Link, Spacer, Text, VStack } from "@chakra-ui/react";

const Index = () => {
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
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;