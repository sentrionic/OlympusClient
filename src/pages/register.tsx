import React, { useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { register } from '../api';
import { NavBar } from '../components/NavBar';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <NavBar />
      <Flex width="full" align="center" justifyContent="center" mt="10">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Register Account</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{ email: '', username: '', password: '' }}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const { data } = await register(values);

                  if (data?.user) {
                    mutate('/user', data?.user);
                    await router.push('/');
                  }
                } catch (err) {
                  if (err?.response?.data?.errors) {
                    setErrors({
                      email: 'Invalid Credentials',
                    });
                  }
                }
              }}
            >
              {({ isSubmitting, handleChange, errors, touched }) => (
                <Form>
                  <FormControl isInvalid={errors.username && touched.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder="Username"
                      size="lg"
                      name="username"
                      autoComplete="username"
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={6} isInvalid={errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email"
                      size="lg"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={6}
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="*******"
                        size="lg"
                        name="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                      <InputRightElement width="3rem">
                        <Button
                          h="1.5rem"
                          size="sm"
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? (
                            <Icon name="view-off" />
                          ) : (
                            <Icon name="view" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button
                    variantColor="blue"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
