import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import NavBar from '../Components/NavBar';
import backgroundImage from '../assets/Images/land.jpg'; 
import { UsedbContext } from '../Services/UseContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setisVolunteer } = UsedbContext();

  const handleButtonClick = (isVolunteer) => {
    setisVolunteer(isVolunteer);
    navigate('/auth');
  };

  return (
    <Box
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      backgroundColor="#1e1e1e"
      display="flex"
      flexDirection="column"
    >
      <NavBar />
      <Flex
        direction="column"
        minHeight="calc(100vh - 60px)"
        align="center"
        justify="center"
        textAlign="center"
        p={{ base: 4, md: 6 }}
        zIndex="1"
      >
        <Box p={{ base: 2, md: 4 }}>
          <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mb={4} color="black">
            Connect with Opportunities
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={4} color="black">
            Explore thousands of volunteer and organizational opportunities.
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={4} color="black" fontWeight="medium">
            Our platform helps you find the right fit for volunteering or organizational roles, quickly and efficiently.
          </Text>
          <Flex gap={{ base: 2, md: 4 }} mt={4} justify="center" direction={{ base: 'column', md: 'row' }}>
            <Button
              onClick={() => handleButtonClick(true)}
              px={6}
              py={3}
              bg="purple.600"
              color="white"
              borderRadius="md"
              boxShadow="md"
              _hover={{ bg: 'purple.800' }}
              transition="background-color 0.3s ease"
              width={{ base: '100%', md: 'auto' }}
            >
              Volunteer
            </Button>
            <Button
              onClick={() => handleButtonClick(false)}
              px={6}
              py={3}
              bg="purple.600"
              color="white"
              borderRadius="md"
              boxShadow="md"
              _hover={{ bg: 'purple.800' }}
              transition="background-color 0.3s ease"
              width={{ base: '100%', md: 'auto' }}
            >
              Organization
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingPage;
