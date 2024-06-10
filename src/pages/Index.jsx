import { useState } from "react";
import { Container, VStack, Text, Box, Button, Image, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { FaTicketAlt } from "react-icons/fa";

const shows = [
  { id: 1, city: "New York", date: "2023-11-01", venue: "Madison Square Garden", image: "https://images.unsplash.com/photo-1464225951723-4cd81a298434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrJTIwY29uY2VydHxlbnwwfHx8fDE3MTgwMTUxMTl8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, city: "Los Angeles", date: "2023-11-05", venue: "Staples Center", image: "https://images.unsplash.com/photo-1584944661667-e626d681152d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwY29uY2VydHxlbnwwfHx8fDE3MTgwMTUxMTl8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, city: "London", date: "2023-11-10", venue: "O2 Arena", image: "https://images.unsplash.com/photo-1522776203873-e4961ae6e07d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBjb25jZXJ0fGVufDB8fHx8MTcxODAxNTExOXww&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 4, city: "Tokyo", date: "2023-11-15", venue: "Tokyo Dome", image: "https://images.unsplash.com/photo-1717037371067-4e96af0682c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxUb2t5byUyMGNvbmNlcnR8ZW58MHx8fHwxNzE4MDE1MTIwfDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 5, city: "Sydney", date: "2023-11-20", venue: "Sydney Opera House", image: "https://images.unsplash.com/photo-1509163501462-d49dfd20bafc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxTeWRuZXklMjBjb25jZXJ0fGVufDB8fHx8MTcxODAxNTEyMHww&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedShow, setSelectedShow] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", tickets: 1 });

  const handleOpenModal = (show) => {
    setSelectedShow(show);
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Text fontSize="4xl" fontWeight="bold">
          August Moon World Tour
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {shows.map((show) => (
            <Box key={show.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={show.image} alt={`${show.city} concert`} />
              <Box p={6}>
                <Text fontSize="xl" fontWeight="bold">
                  {show.city}
                </Text>
                <Text>{show.date}</Text>
                <Text>{show.venue}</Text>
                <Button leftIcon={<FaTicketAlt />} colorScheme="teal" mt={4} onClick={() => handleOpenModal(show)}>
                  Buy Tickets
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy Tickets for {selectedShow?.city}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="tickets" mb={4}>
              <FormLabel>Number of Tickets</FormLabel>
              <Select name="tickets" value={formData.tickets} onChange={handleInputChange}>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
