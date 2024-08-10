import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Heading, Input, Image, Stack, Text, IconButton } from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import backgroundImage from '../assets/Images/volback.png';
import logo from '../assets/Images/logo.png';
import userIcon from '../assets/Images/member.png';
import members from '../assets/Images/members.png';


import { UsedbContext } from '../Services/UseContext';
import { CreateUser } from '../Services/api';



const VolSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const { isVolunteer, setIsLogin,SignUp } = UsedbContext();
  

  useEffect(() => {
    if (isVolunteer) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isVolunteer]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(getPasswordStrength(value));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Too short';
    if (!/[A-Z]/.test(password)) return 'Include uppercase letters';
    if (!/[a-z]/.test(password)) return 'Include lowercase letters';
    if (!/[0-9]/.test(password)) return 'Include numbers';
    if (!/[@$!%*?&#]/.test(password)) return 'Include special characters';
    return 'Strong';
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordStrength !== 'Strong') {
      alert('Password is not strong enough!');
      return;
    }
    if (!validatePhoneNumber(phone)) {
      setPhoneError('Phone number must be 10 digits long');
      return;
    }
    
    await SignUp(email,password);
    await CreateUser({ name, email, phno: phone, password,role:isVolunteer?"volunteer":"organizer"});

  };

  return (
    <>
        <Box
          position="relative"
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Box position="absolute" inset="0" backgroundColor="rgba(0, 0, 0, 0.5)" />

          {/* Logo */}
          <Link to="/" style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 20 }}>
            <Image src={logo} alt="Logo" height={{ base: '12', md: '16' }} cursor="pointer" />
          </Link>

          {/* Signup Form */}
          <Box
            width={{ base: '90%', sm: '80%', md: 'md' }}
            maxW="md"
            bg="rgba(255, 255, 255, 0.2)"
            borderRadius="15px"
            boxShadow="lg"
            padding={{ base: '6', md: '8' }}
            backdropFilter="blur(10px)"
            zIndex={2}
          >
            {/* User Icon */}
            <Stack spacing={4} align="center" mb={4}>
              {isVolunteer ? (
                <Image src={userIcon} alt="User Icon" boxSize="4rem" />
              ) : (
                <Image src={members} alt="User Icon" width="100px" />
              )}
              <Heading as="h1" size="lg" textAlign="center" color="#d5d8dc">Register</Heading>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name" color="#d5d8dc">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    color="black"
                    onChange={(e) => setName(e.target.value)}
                    focusBorderColor="purple.500"
                    backgroundColor="white"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" color="#d5d8dc">Email Address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    color="black"
                    onChange={(e) => setEmail(e.target.value)}
                    focusBorderColor="purple.500"
                    backgroundColor="white"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="phone" color="#d5d8dc">Phone Number</FormLabel>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    color="black"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneError(''); // Clear error when user types
                    }}
                    focusBorderColor="purple.500"
                    backgroundColor="white"
                  />
                  {phoneError && <Text color="red.500" mt={2}>{phoneError}</Text>}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password" color="#d5d8dc">Password</FormLabel>
                  <Box position="relative">
                    <Input
                      id="password"
                      type={passwordVisible ? 'text' : 'password'}
                      value={password}
                      color="black"
                      onChange={handlePasswordChange}
                      focusBorderColor="purple.500"
                      backgroundColor="white"
                    />
                    <IconButton
                      aria-label="Toggle Password Visibility"
                      icon={passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      position="absolute"
                      top="50%"
                      right="0.75rem"
                      transform="translateY(-50%)"
                      background="none"
                      _hover={{ background: 'none' }}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  </Box>
                  <Text mt={2} color={passwordStrength === 'Strong' ? 'green.500' : 'red.500'}>
                    {passwordStrength}
                  </Text>
                </FormControl>
                <Button
                  type="submit"
                  bg="purple.600"
                  _hover={{ bg: "purple.800" }}
                  color="white"
                  width="full"
                  mt={4}
                >
                  Register
                </Button>
              </Stack>
            </form>
            <Text mt={4} textAlign="center" color="#d5d8dc">
              Already have an account?{' '}
              <Text as="span" color="purple" onClick={() => setIsLogin(true)} cursor="pointer">Login</Text>
            </Text>
          </Box>
        </Box>
    </>
  );
};

export default VolSignup;
