import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { mutate } from 'swr';
import { register } from '../api';
import { InputField } from '../components/common/InputField';
import { PasswordField } from '../components/common/PasswordField';
import { NavBar } from '../components/layout/NavBar';
import { RegisterSchema } from '../utils/schemas/user.schema';
import { toErrorMap } from '../utils/toErrorMap';

const Register = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo title="Register" />
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
              validationSchema={RegisterSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const { data } = await register(values);
                  if (data) {
                    await mutate('/user', data);
                    await router.push('/');
                  }
                } catch (err) {
                  if (err?.response?.data?.errors) {
                    const errors = err?.response?.data?.errors;
                    setErrors(toErrorMap(errors));
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    placeholder="Username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />

                  <InputField
                    type="email"
                    placeholder="Email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />

                  <PasswordField
                    autoComplete="new-password"
                    label="Password"
                    name="password"
                  />

                  <Button
                    colorScheme="blue"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={8}
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
