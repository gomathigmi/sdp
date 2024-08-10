import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import brochure1 from '../../assets/Images/Brochures/brochure1.png';
import brochure2 from '../../assets/Images/Brochures/brochure2.png';
import brochure3 from '../../assets/Images/Brochures/brochure3.png';
import brochure4 from '../../assets/Images/Brochures/brochure4.png';
import brochure5 from '../../assets/Images/Brochures/brochure5.png';
import brochure6 from '../../assets/Images/Brochures/brochure6.png';
import brochure7 from '../../assets/Images/Brochures/brochure7.png';
import brochure8 from '../../assets/Images/Brochures/brochure8.png';

// Map brochure names to images
const brochureImages = {
  'AV': brochure1,
  'Charity': brochure2,
  'Women': brochure3,
  'Medical': brochure4,
  'Smile': brochure5,
  'Technical': brochure6,
  'Yugam': brochure7,
  'Wildlife': brochure8,
};

// Event data
const eventsData = [
  {
    id: 1,
    title: 'Avantaa Techno Management Fest',
    brochure: 'AV',
    venue: 'Sri Krishna College of Technology',
  },
  {
    id: 2,
    title: 'Charity Program Conducted by NGO',
    brochure: 'Charity',
    venue: 'Chennai',
  },
  {
    id: 3,
    title: 'Women Empowerment Programme',
    brochure: 'Women',
    venue: 'Jaipur',
  },
  {
    id: 4,
    title: 'Medical Camp by Apollo Hospitals',
    brochure: 'Medical',
    venue: 'Coimbatore',
  },
  {
    id: 5,
    title: 'Charity Program by Smile Foundations',
    brochure: 'Smile',
    venue: 'Various Locations',
  },
  {
    id: 6,
    title: 'Free Technical Training for Students',
    brochure: 'Technical',
    venue: 'By Government of India',
  },
  {
    id: 7,
    title: 'Yugam Techno Cultural Sports Fest',
    brochure: 'Yugam',
    venue: 'Kumaraguru College of Technology',
  },
  {
    id: 8,
    title: 'Wildlife Charity Program by Wildlife Welfare Association',
    brochure: 'Wildlife',
    venue: 'Pune, India',
  },
];

function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle opening modal
  const openModal = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  // Handle closing modal
  const closeModal = () => {
    setSelectedEvent(null);
    onClose();
  };

  // Filter events based on search query
  const filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex direction="column" bg="#1c1c4c" minH="100vh" p={4} position="relative">
      {/* Search Bar */}
      <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" mb={8} color="white" textAlign={{ base: 'center', md: 'left' }}>
        Start Your Volunteering Now!
      </Text>
      <Box position={{ base: 'static', md: 'absolute' }} top={8} right={8} w={{ base: 'full', md: '96' }} mb={{ base: 4, md: 0 }}>
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          color="white"
          borderColor="gray.600"
          _placeholder={{ color: 'gray.300' }}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
        />
      </Box>


      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8} pt={5}>
        {filteredEvents.map((event) => (
          <GridItem
            key={event.id}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            cursor="pointer"
          >
            <Image
              src={brochureImages[event.brochure] || '/path/to/default-image.jpg'}
              alt={event.title}
              objectFit="cover"
              height="200px"
              width="full"
              borderTopRadius="md"
            />
            <Box p={4}>
              <Text fontSize="xl" fontWeight="bold" mb={2} color="black">
                {event.title}
              </Text>
              <Text fontSize="md" mb={4} color="gray.700" height="48px" overflow="hidden" textOverflow="ellipsis">
                {event.venue}
              </Text>
              <Button
                bg="#ff8000"
                color="white"
                _hover={{ bg: '#e67e22' }}
                width="full"
                onClick={() => openModal(event)}
              >
                Apply Now
              </Button>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Modal */}
      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent bg="#1c1c4c">
            <ModalHeader color="white">{selectedEvent.title}</ModalHeader>
            <ModalBody>
              <Text fontSize="md" mb={4} color="white">
                {selectedEvent.venue}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={closeModal}>
                Close
              </Button>
              <Button colorScheme="green" onClick={closeModal}>
                Confirm Now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}

export default EventsPage;
