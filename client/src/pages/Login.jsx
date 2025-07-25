import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Input,
  Button,
  Text,
  Link,
  useColorModeValue,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const bg = useColorModeValue('#f2ffe5ff', '#283840ff');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
      toast({
        title: 'Welcome back!',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'Invalid credentials',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg={bg}
        p={8}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
        shadow="lg"
        w="full"
        maxW="md"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <Heading
              size="lg"
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
            >
              Welcome Back
            </Heading>
            
            <VStack spacing={4} w="full">
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Toggle password visibility"
                      icon={showPassword ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </VStack>
            
            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              w="full"
              isLoading={loading}
            >
              Sign In
            </Button>
            
            <HStack>
              <Text>Don't have an account?</Text>
              <Link as={RouterLink} to="/signup" color="brand.500">
                Sign up
              </Link>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;