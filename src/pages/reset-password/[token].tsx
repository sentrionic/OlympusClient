import { Box, Button, Flex, Heading } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { mutate } from 'swr';
import { resetPassword } from '../../api';
import { PasswordField } from '../../components/common/PasswordField';
import { NavBar } from '../../components/layout/NavBar';
import { ResetPasswordSchema } from '../../utils/schemas/user.schema';

const ResetPassword = () => {
  const router = useRouter();

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
                    Object.keys(errors).map((key) => {
                      setErrors({ [key]: errors[key] });
                    });
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
                    variantColor="blue"
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
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ResetPassword;
