import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { forgotPassword } from '../api';
import { InputField } from '../components/common/InputField';
import { NavBar } from '../components/layout/NavBar';
import { ForgotPasswordSchema } from '../utils/schemas/user.schema';
import { toErrorMap } from '../utils/toErrorMap';

const ForgotPassword = () => {
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <NavBar />
      <Flex width='full' align='center' justifyContent='center' mt='10'>
        <Box
          p={8}
          maxWidth='500px'
          borderWidth={1}
          borderRadius={8}
          boxShadow='lg'
        >
          <Box textAlign='center'>
            <Heading>Forgot Password</Heading>
          </Box>
          <Box my={4} textAlign='left'>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const { data } = await forgotPassword(values.email);
                  if (data) {
                    toast({
                      title: 'Reset Mail.',
                      description:
                        'If an account with that email already exists, we sent you an email',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
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
                    type='email'
                    placeholder='Email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                  />
                  <Button
                    variantColor='blue'
                    variant='outline'
                    type='submit'
                    width='full'
                    mt={8}
                    leftIcon='email'
                    isLoading={isSubmitting}
                  >
                    Send Mail
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

export default ForgotPassword;
