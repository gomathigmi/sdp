import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, FormControl, FormLabel, Heading, Input, Image, Text } from '@chakra-ui/react';
import backgroundImage from '../assets/Images/volback.png'; 
import logo from '../assets/Images/logo.png';
import userIcon from '../assets/Images/member.png';
import members from '../assets/Images/members.png';
import { FcGoogle } from "react-icons/fc";
import { UsedbContext } from '../Services/UseContext';

const VolLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const { google, setIsLogin, isVolunteer, SignIn } = UsedbContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation  
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.');
      return;
    }

    try {
      await SignIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('auth/user-not-found')) {
        setLoginError('No user found with this email.');
      } else if (error.message.includes('auth/wrong-password')) {
        setLoginError('Incorrect password.');
      } else if (error.message.includes('auth/invalid-credential')) {
        setLoginError('Invalid credentials.');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  return (
    <Box 
      position="relative"
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="4"
    >
      <Box
        position="absolute"
        inset="0"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />

      <Link to="/" className="absolute top-4 left-4 z-20">
        <Image 
          src={logo} 
          alt="Logo" 
          height={{ base: '12', md: '16' }} 
          cursor="pointer"
        />
      </Link>

      <Box
        width={{ base: '90%', sm: '80%', md: 'md' }}
        maxW="md"
        bg="rgba(255, 255, 255, 0.3)"
        borderRadius="15px"
        boxShadow="lg"
        padding={{ base: '6', md: '8' }}
        backdropFilter="blur(10px)"
        zIndex={2}
      >
        <Stack spacing={4} align="center" marginBottom={4}>
          {isVolunteer ? (
            <Image src={userIcon} alt="User Icon" boxSize="4rem" />
          ) : (
            <Image src={members} alt="User Icon" width="100px" />
          )}
          <Heading as="h1" size="lg" textAlign="center" color="#d5d8dc">Login</Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="email" color="#d5d8dc">Email</FormLabel>
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
              <FormLabel htmlFor="password" color="#d5d8dc">Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                color="black"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                  setLoginError('');
                }}
                focusBorderColor="purple.500"
                backgroundColor="white"
              />
            </FormControl>

            {passwordError && (
              <Text color="red.500" marginTop={2}>{passwordError}</Text>
            )}
            {loginError && (
              <Text color="red.500" marginTop={2}>{loginError}</Text>
            )}

            <Box marginTop={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="full">
              <Text>OR</Text>
              <Box marginTop={4} onClick={google} cursor="pointer">
                <FcGoogle size="30px"/>
              </Box>
            </Box>

            <Button
              type="submit"
              bg="purple.600"
              _hover={{ bg: "purple.800" }}
              color="white"
              size="lg"
              fontSize="md"
              borderRadius="10px"
              width="full"
              marginTop={6}
            >
              Login
            </Button>
          </Stack>
        </form>
        <Box mt={4} textAlign="center" color="#d5d8dc" >
          Don&apos;t have an account?{' '}
          <Text as="span" color="purple" onClick={() => setIsLogin(false)} cursor="pointer">Register</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default VolLogin;
