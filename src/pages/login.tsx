import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { mutate } from 'swr';
import { login } from '../api';
import { InputField } from '../components/common/InputField';
import { PasswordField } from '../components/common/PasswordField';
import { NavBar } from '../components/layout/NavBar';
import { LoginSchema } from '../utils/schemas/user.schema';
import { toErrorMap } from '../utils/toErrorMap';

const Login = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo title="Login" />
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
              validationSchema={LoginSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const { data } = await login(values);
                  if (data) {
                    mutate('/user', data);
                    if (typeof router.query.next === 'string') {
                      await router.push(router.query.next);
                    } else {
                      // worked
                      await router.push('/');
                    }
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
                    type="email"
                    placeholder="Email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />

                  <PasswordField
                    autoComplete="current-password"
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
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>

            <Flex mt="4" justify="center" align="center">
              <NextLink href="/forgot-password">
                <Link>Forgot Password?</Link>
              </NextLink>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
