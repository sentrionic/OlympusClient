import React, { useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  Text,
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
import { login } from '../api';
import { formatErrors } from '../utils/formatErrors';
import { NavBar } from '../components/NavBar';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const response = await login(values);
                  console.log(response);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {({ isSubmitting, handleChange, errors }) => (
                <Form>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email"
                      size="lg"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    {errors ? (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl isRequired mt={6}>
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
                    {errors ? (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    ) : null}
                  </FormControl>
                  <Button
                    variantColor="blue"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={4}
                    isLoading={isSubmitting}
                  >
                    Sign In
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

export default Login;
