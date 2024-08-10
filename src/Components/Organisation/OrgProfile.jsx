import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Flex, Grid, Input, Text, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
import { UpdateProfile } from '../../Services/api';
import { UsedbContext } from '../../Services/UseContext';

function OrgProfile() {
  const toast = useToast();  // Initialize the toast hook
  const { dbUser } = UsedbContext();

  const [avatarSrc] = useState('https://bootdey.com/img/Content/avatar/avatar7.png');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [bankAccountHolderName, setBankAccountHolderName] = useState('');
  const [bankAccNo, setBankAccNo] = useState('');
  const [bankIFSC, setBankIFSC] = useState('');
  const [bankName, setBankName] = useState('');
  const [errors] = useState({});

  useEffect(() => {
    if (dbUser) {
      setFullName(dbUser.profile.name);
      setPhone(dbUser.profile.phone);
      setEmail(dbUser.email);
      setStreet(dbUser.profile.street);
      setCity(dbUser.profile.city);
      setState(dbUser.profile.state);
      setZipCode(dbUser.profile.zipCode);
      setLinkedinURL(dbUser.profile.linkedinURL);
      setBankAccountHolderName(dbUser.profile.bankAccountHolderName);
      setBankAccNo(dbUser.profile.bankAccNo);
      setBankIFSC(dbUser.profile.bankIFSC);
      setBankName(dbUser.profile.bankName);
    }
  }, [dbUser]);

  // const handleImageUpload = (event) => {
  // Handle image upload logic here 
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'street':
        setStreet(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      case 'linkedinURL':
        setLinkedinURL(value);
        break;
      case 'bankAccountHolderName':
        setBankAccountHolderName(value);
        break;
      case 'bankAccNo':
        setBankAccNo(value);
        break;
      case 'bankIFSC':
        setBankIFSC(value);
        break;
      case 'bankName':
        setBankName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await UpdateProfile({ name: fullName, email: email, phone: phone, street: street, city: city, state: state, zipCode: zipCode, linkedinURL: linkedinURL, bankAccountHolderName: bankAccountHolderName, bankAccNo: bankAccNo, bankIFSC: bankIFSC, bankName: bankName }, dbUser.profile.id);
    toast({
      title: "Success!",
      description: "Profile Updated!",
      status: "success",
      position: "top-right", // Position of the toast
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" minHeight="100vh" bg="#2c2c6c" p={{ base: '4', md: '8' }}>
      <Box flex="1" p={{ base: '4', md: '8' }}>
        <Box
          maxWidth={{ base: 'full', md: '1200px' }}
          mx="auto"
          bg="#1c1c4c"
          boxShadow="xl"
          borderRadius="md"
          p={{ base: '4', md: '6' }}
        >
          <form onSubmit={handleSubmit}>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 3fr' }} gap={6} pt={5}>
              <Box textAlign="center">
                <Avatar size="xl" src={avatarSrc} mb="4" />
                <Button as="label" colorScheme="blue" cursor="pointer" mb="4" mt="1" ml="5">
                  Upload Your Image
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    // onChange={handleImageUpload}
                    hidden
                  />
                </Button>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="#ff8000" mb="4">Personal Details</Text>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <FormControl isInvalid={!!errors.fullName} mb="4">
                    <FormLabel color="#ff8000">Full Name</FormLabel>
                    <Input
                      name="fullName"
                      value={fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.fullName && <FormErrorMessage>{errors.fullName}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.email} mb="4">
                    <FormLabel color="#ff8000">Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter email ID"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.phone} mb="4">
                    <FormLabel color="#ff8000">Contact No</FormLabel>
                    <Input
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.linkedinURL} mb="4">
                    <FormLabel color="#ff8000">LinkedIn URL</FormLabel>
                    <Input
                      name="linkedinURL"
                      type="url"
                      value={linkedinURL}
                      onChange={handleChange}
                      placeholder="Enter LinkedIn URL"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.linkedinURL && <FormErrorMessage>{errors.linkedinURL}</FormErrorMessage>}
                  </FormControl>
                </Grid>

                <Text fontSize="lg" fontWeight="bold" color="#ff8000" mt="8" mb="4">Address</Text>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <FormControl isInvalid={!!errors.street} mb="4">
                    <FormLabel color="#ff8000">Street</FormLabel>
                    <Input
                      name="street"
                      value={street}
                      onChange={handleChange}
                      placeholder="Enter Street"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.street && <FormErrorMessage>{errors.street}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.city} mb="4">
                    <FormLabel color="#ff8000">City</FormLabel>
                    <Input
                      name="city"
                      value={city}
                      onChange={handleChange}
                      placeholder="Enter City"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.city && <FormErrorMessage>{errors.city}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.state} mb="4">
                    <FormLabel color="#ff8000">State</FormLabel>
                    <Input
                      name="state"
                      value={state}
                      onChange={handleChange}
                      placeholder="Enter State"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.state && <FormErrorMessage>{errors.state}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.zipCode} mb="4">
                    <FormLabel color="#ff8000">ZIP Code</FormLabel>
                    <Input
                      name="zipCode"
                      value={zipCode}
                      onChange={handleChange}
                      placeholder="Enter ZIP Code"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.zipCode && <FormErrorMessage>{errors.zipCode}</FormErrorMessage>}
                  </FormControl>
                </Grid>

                <Text fontSize="lg" fontWeight="bold" color="#ff8000" mt="8" mb="4">Bank Details</Text>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <FormControl isInvalid={!!errors.bankAccountHolderName} mb="4">
                    <FormLabel color="#ff8000">Account Holder Name</FormLabel>
                    <Input
                      name="bankAccountHolderName"
                      value={bankAccountHolderName}
                      onChange={handleChange}
                      placeholder="Enter Account Holder Name"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.bankAccountHolderName && <FormErrorMessage>{errors.bankAccountHolderName}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.bankAccNo} mb="4">
                    <FormLabel color="#ff8000">Account Number</FormLabel>
                    <Input
                      name="bankAccNo"
                      value={bankAccNo}
                      onChange={handleChange}
                      placeholder="Enter Account Number"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.bankAccNo && <FormErrorMessage>{errors.bankAccNo}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.bankIFSC} mb="4">
                    <FormLabel color="#ff8000">IFSC Code</FormLabel>
                    <Input
                      name="bankIFSC"
                      value={bankIFSC}
                      onChange={handleChange}
                      placeholder="Enter IFSC Code"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.bankIFSC && <FormErrorMessage>{errors.bankIFSC}</FormErrorMessage>}
                  </FormControl>
                  <FormControl isInvalid={!!errors.bankName} mb="4">
                    <FormLabel color="#ff8000">Bank Name</FormLabel>
                    <Input
                      name="bankName"
                      value={bankName}
                      onChange={handleChange}
                      placeholder="Enter Bank Name"
                      border="1px solid #cfd1d8"
                      borderColor="#cfd1d8"
                      color="gray.200"
                      required
                    />
                    {errors.bankName && <FormErrorMessage>{errors.bankName}</FormErrorMessage>}
                  </FormControl>
                </Grid>

                <Button
                  colorScheme="blue"
                  mt="8"
                  w="20"
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default OrgProfile;
