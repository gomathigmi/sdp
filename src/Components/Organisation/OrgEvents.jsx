import { Box, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Flex, Grid, GridItem, Image, Input, Text, Textarea, useDisclosure } from '@chakra-ui/react'; 
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import localEventImage from '../../assets/Images/Brochures/brochure7.png'; 
import event3 from '../../assets/Images/Brochures/brochure1.png';
import event4 from '../../assets/Images/Brochures/brochure2.png';
import event1 from '../../assets/Images/Brochures/brochure3.png';
import event5 from '../../assets/Images/Event5.png';

// Initial event data
const initialEvents = {
  conducted: [
    { id: 1, name: 'Magalir', description: 'Empowering Women: Strength, Equality, and Leadership', imageUrl: event1 },
    { id: 2, name: 'Yugam', description: 'Techno-Cultural-Sports Fest of Kumaraguru Institutions', imageUrl: localEventImage },
    { id: 3, name: 'Kodai', description: 'Collecting Donation for the poor people', imageUrl: event4 },
    { id: 4, name: 'Avantaa', description: 'A National Level Techno Management Fest', imageUrl: event3 },
  ],
  upcoming: [
    { id: 1, name: 'Belove Phase-1', description: 'Feeding Straw Dogs', imageUrl: event5 },
  ]
};

const OrgEventsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', imageUrl: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    if (newEvent.name && newEvent.description && selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEvents({
          ...events,
          upcoming: [...events.upcoming, { id: events.upcoming.length + 1, name: newEvent.name, description: newEvent.description, imageUrl: reader.result }]
        });
        setNewEvent({ name: '', description: '', imageUrl: '' });
        setSelectedFile(null);
        onClose();
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Flex minHeight="100vh" direction="column">
      <Box flex="1" p={{ base: 4, md: 8 }} bg="#2c2c6c">
        <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" mb={{ base: 4, md: 8 }} color="#ff8000">
          Events
        </Text>
        
        {/* Conducted Events */}
        <Box mb={{ base: 6, md: 12 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={{ base: 4, md: 6 }} color="#ff8000">
            Events Conducted So Far!
          </Text>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
            {events.conducted.map((event) => (
              <GridItem
                key={event.id}
                bg="white"
                borderRadius="md"
                overflow="hidden"
                borderColor="gray.900"
                borderWidth="1px"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }} // Scale slightly on hover
              >
                <Image src={event.imageUrl} alt={event.name} objectFit="cover" height="200px" width="100%" />
                <Box p="4">
                  <Text fontSize="xl" fontWeight="bold" mb="2" color="darkblue">
                    {event.name}
                  </Text>
                  <Text fontSize="md" mb="4" color="gray.700">
                    {event.description}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Upcoming Events */}
        <Box>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={{ base: 4, md: 6 }} color="#ff8000">
            Upcoming Events!!!
          </Text>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
            {events.upcoming.map((event) => (
              <GridItem
                key={event.id}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                overflow="hidden"
                borderColor="gray.200"
                borderWidth="1px"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }} // Scale slightly on hover
              >
                <Image src={event.imageUrl} alt={event.name} objectFit="cover" height="200px" width="100%" />
                <Box p="4">
                  <Text fontSize="xl" fontWeight="bold" mb="2" color="darkblue">
                    {event.name}
                  </Text>
                  <Text fontSize="md" mb="4" color="gray.700">
                    {event.description}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
        
        {/* Add Event Button */}
        <Button
          position="fixed"
          top="20px"
          right="30px"
          size="lg"
          borderRadius="full"
          bg="blue.500"
          color="white"
          _hover={{ bg: 'blue.600' }}
          onClick={onOpen}
        >
          <AddIcon />
        </Button>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Create a new event</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              mb="4"
            />
            <Textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              mb="4"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default OrgEventsPage;
