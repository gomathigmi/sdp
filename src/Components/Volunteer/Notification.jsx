import { Box, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { BiSolidMessageRoundedCheck, BiMessageRoundedX } from "react-icons/bi";
import { useState } from "react";

function Notification() {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const items = [
        {
            text: 'Organizer has Approved.',
            status: true,
            event: {
                event: 'AVANTAA TECHNO MANAGEMENT FEST',
                organization: 'Sri Krishna College of Technology, Coimbatore',
                date: '1st August, 2024',
                timings: '10.00am to 3.30pm'
            }
        },
        {
            text: 'Organizer has Not Approved.',
            status: false,
            event: null
        }
        // Add more items with event details as needed
    ];

    const handleNotificationClick = (item) => {
        setSelectedNotification(item);
        onOpen();
    };

    const handleViewEventClick = () => {
        setIsEventDetailsOpen(true);
    };

    const handleCloseEventDetails = () => {
        setIsEventDetailsOpen(false);
    };

    return (
        <Box className="m-5">
            <Box className="flex flex-col">
                <Text className="text-center font-bold text-3xl text-black">Notifications(2)</Text>
            </Box>
            {items.map((item, index) => (
                <Box key={index}>
                    <Box
                        onClick={() => handleNotificationClick(item)}
                        className="flex items-center ml-7 p-3 rounded-lg hover:bg-gray-100 gap-5 cursor-pointer"
                    >
                        <Box className="mr-4">
                            {item.status ? (
                                <BiSolidMessageRoundedCheck size={'30px'} color="green" />
                            ) : (
                                <BiMessageRoundedX size={'30px'} color="red" />
                            )}
                        </Box>
                        <Text className="text-xl text-black">{item.text}</Text>
                    </Box>
                </Box>
            ))}
            
            {/* Modal for notification details */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Notification Details</ModalHeader>
                    <ModalBody>
                        {selectedNotification ? (
                            <Text>{selectedNotification.text || 'No additional details available.'}</Text>
                        ) : (
                            <Text>No additional details available.</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {selectedNotification?.status && (
                            <Button colorScheme="blue" onClick={handleViewEventClick}>View Event</Button>
                        )}
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal for event details */}
            <Modal isOpen={isEventDetailsOpen} onClose={handleCloseEventDetails}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event Details</ModalHeader>
                    <ModalBody>
                        {selectedNotification?.event ? (
                            <Box>
                                <Text><strong>Event:</strong> {selectedNotification.event.event}</Text>
                                <Text><strong>Organization:</strong> {selectedNotification.event.organization}</Text>
                                <Text><strong>Date:</strong> {selectedNotification.event.date}</Text>
                                <Text><strong>Timings:</strong> {selectedNotification.event.timings}</Text>
                            </Box>
                        ) : (
                            <Text>No event details available.</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleCloseEventDetails}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Notification;
