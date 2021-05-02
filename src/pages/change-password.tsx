import { Box, Button, Flex, Heading, Link, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import NextLink from 'next/link';
import { changePassword } from '../api';
import { PasswordField } from '../components/common/PasswordField';
import { NavBar } from '../components/layout/NavBar';
import { ChangePasswordSchema } from '../utils/schemas/user.schema';
import { useIsAuth } from '../utils/useIsAuth';
import { toErrorMap } from '../utils/toErrorMap';
import { NextSeo } from 'next-seo';

const ChangePassword = () => {
  useIsAuth();
  const toast = useToast();

  return (
    <>
      <NavBar />
      <NextSeo title="Change Password" />
      <Flex width="full" align="center" justifyContent="center" mt="10">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Change Password</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const { data } = await changePassword(values);
                  if (data) {
                    toast({
                      title: 'Changed Password',
                      description: 'Successfully changed your password',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
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
                  <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    autoComplete="current-password"
                  />

                  <PasswordField
                    label="New Password"
                    name="newPassword"
                    autoComplete="new-password"
                  />

                  <PasswordField
                    label="Confirm New Password"
                    name="confirmNewPassword"
                  />

                  <Button
                    colorScheme="blue"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={8}
                    isLoading={isSubmitting}
                  >
                    Change Password
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Flex mt="6" justify="center" align="center">
            <NextLink href="/account">
              <Link>Go Back</Link>
            </NextLink>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default ChangePassword;
