import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';
import { resetPassword } from '../../api';
import { PasswordField } from '../../components/common/PasswordField';
import { NavBar } from '../../components/layout/NavBar';
import { ResetPasswordSchema } from '../../utils/schemas/user.schema';
import { toErrorMap } from '../../utils/toErrorMap';
import { NextSeo } from 'next-seo';

const ResetPassword = () => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState('');

  return (
    <>
      <NextSeo title="Reset Password" />
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
            <Heading>Reset Password</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <Formik
              initialValues={{ newPassword: '', confirmNewPassword: '' }}
              validationSchema={ResetPasswordSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const token =
                    typeof router.query.token === 'string'
                      ? router.query.token
                      : '';
                  const { data } = await resetPassword({ ...values, token });
                  if (data) {
                    mutate('/users', data);
                    await router.push('/');
                  }
                } catch (err) {
                  if (err?.response?.data?.errors) {
                    const errors = err?.response?.data?.errors;
                    const errorMap = toErrorMap(errors);

                    if ('token' in errorMap) {
                      setTokenError(errorMap.token);
                    }
                    setErrors(errorMap);
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
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
                    Reset Password
                  </Button>
                </Form>
              )}
            </Formik>
            {tokenError ? (
              <Flex direction="column" mt="4" justify="center" align="center">
                <Text>Invalid or expired token.</Text>
                <NextLink href="/forgot-password">
                  <Link color="red">Click here to get a new token</Link>
                </NextLink>
              </Flex>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ResetPassword;
